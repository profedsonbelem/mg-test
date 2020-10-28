import { Contact, ContactTags, ContactType } from "../../types/contact";
import db from "../../utils/database/db.model";
import { State } from "../../types/state";
import {
  Emails_Messages__c as EmailMessage,
  allFields as EMFields,
  salesforceName as EMName,
} from "../../types/Emails_Messages__c";
import litify from "../../utils/database/litify.model";
import {
  Call_Register__c,
  allFields as CRFields,
  salesforceName as CRName,
} from "../../types/Call_Register__c";
import { ContactModel } from "../../models/contact.model";
import * as striptags from "striptags";
import { normalizeString } from "../../utils/misc/string.utils";

/** @todo overload
 * @todo change retrieve to aggregate
 */
export async function getRelatedContacts(
  clientId?: string
): Promise<{
  emailMessages: EmailMessage[];
  callRegisters: Call_Register__c[];
}> {
  if (!clientId) {
    return { emailMessages: [], callRegisters: [] };
  }

  let query = {
    "litifyData.accountId": { $exists: true },
    "intake._id": clientId,
  };
  // if (clientId) {
  //   query.$or.push({ "intake._id": clientId });
  // }
  // if (phone) {
  //   query.$or.push({ "client.phone": phone });
  // }
  // if (email) {
  //   query.$or.push({ "client.email": normalize(email) });
  // }

  // if (query.$or.length === 0) {
  //   console.log(`Not enough information to retrieve client.`);
  //   return { emailMessages: [], callRegisters: [] };
  // }

  const [state] = await db.retrieve<State>("States", query, { litifyData: 1 });

  if (!state || !state.litifyData.accountId) {
    console.log(`No client found with info.`);
    return { emailMessages: [], callRegisters: [] };
  }

  const accountId = state.litifyData.accountId;
  console.log(`Got accountId ${accountId}`);

  const emailMessages = await litify.soqlFind<EmailMessage>(
    `SELECT ${EMFields} FROM ${EMName} WHERE RelatedParty__c='${accountId}'`
  );

  const callRegisters = await litify.soqlFind<Call_Register__c>(
    `SELECT ${CRFields} FROM ${CRName} WHERE Party__c='${accountId}'`
  );

  return { emailMessages, callRegisters };
}

const getRelatedAccountId = async (contact: Contact) => {
  if (!contact) {
    console.log(`No contact given`);
    return [];
  }

  let query = { "litifyData.accountId": { $exists: true }, $or: [] };
  if (contact.clientId) {
    query.$or.push({ "intake._id": contact.clientId });
  }
  if (contact.telTo) {
    query.$or.push({ "client.phone": contact.telTo });
  }
  if (contact.emailFrom) {
    query.$or.push({ "client.email": normalizeString(contact.emailFrom) });
    query.$or.push({ "intake.email": new RegExp(contact.emailFrom, "i") });
  }
  if (contact.emailTo) {
    query.$or.push({ "client.email": normalizeString(contact.emailTo) });
    query.$or.push({ "intake.email": new RegExp(contact.emailTo, "i") });
  }

  if (query.$or.length === 0) {
    console.log(`Not enough information to retrieve client.`);
    return [];
  }

  const accountId: { _id: string }[] = await db.aggregate("States", [
    { $match: query },
    { $group: { _id: "$litifyData.accountId" } },
  ]);

  return accountId || [];

  // if (state.length === 0) {
  //   console.log(`No client found with info.`);
  //   return undefined;
  // }

  // console.log(`Got accountId ${state[0].litifyData.accountId}`);
  // return state[0].litifyData.accountId;
};

export const sendToLitify = async (contact: Contact) => {
  if (!contact) {
    throw new Error(`No contact given`);
  }

  if (!contact.accountId) {
    const accountId = await getRelatedAccountId(contact);

    if (accountId.length === 0) {
      throw new Error("AccountId not found");
    } else if (accountId.length > 1) {
      throw new Error("Multiples AccountId found");
    }
    contact.accountId = accountId[0]._id;
  }

  switch (contact.type) {
    case ContactType.email: {
      const emailMessage: EmailMessage = mapContactToEmailMessage(contact);
      const litifyId = await litify.create(EMName, emailMessage);
      return litifyId;
    }
    case ContactType.call: {
      const callRegister: Call_Register__c = mapContactToCallRegister(contact);
      const litifyId = await litify.create(CRName, callRegister);
      return litifyId;
    }
    default: {
      throw new Error("Can't insert this contact type in litify");
    }
  }
};

export const updateInLitify = async (contact: Contact) => {
  if (!contact) {
    throw new Error(`No contact given`);
  }

  if (!contact.litifyId) {
    throw new Error("Contact doesn't exist in litify");
  }

  switch (contact.type) {
    case ContactType.email: {
      const emailMessage: EmailMessage = mapContactToEmailMessage(contact);
      const litifyId = await litify.update(EMName, {
        Id: contact.litifyId,
        ...emailMessage,
      });
      return litifyId;
    }
    case ContactType.call: {
      const callRegister: Call_Register__c = mapContactToCallRegister(contact);
      const litifyId = await litify.update(CRName, {
        Id: contact.litifyId,
        ...callRegister,
      });
      return litifyId;
    }
    default: {
      throw new Error("Can't insert this contact type in litify");
    }
  }
};

const mapContactToEmailMessage = (contact: Contact) => {
  let Incoming = contact.tags && contact.tags.includes(ContactTags["Inbound"]);
  // striptags(contact.notes, [], " ");
  const emailMessage: EmailMessage = {
    Incoming__c: Incoming,
    To_Address__c: contact.emailTo,
    From_Address__c: contact.emailFrom,
    Subject__c: contact.subject,
    Has_Attachment__c: contact.hasAttachments,
    RelatedParty__c: contact.accountId,
    Html_Body__c: contact.notes.length > 32000 ? undefined : contact.notes,
    Text_Body__c: contact.textEmailBody || striptags(contact.notes, [], " "),
  };

  return emailMessage;
};

export const mapEmailMessageToContact = (emailMessage: EmailMessage) => {
  const contact: Contact = ContactModel.createEmailContact({
    attachments: [],
    data: { email: emailMessage.To_Address__c },
    from: emailMessage.From_Address__c,
    html: emailMessage.Html_Body__c || emailMessage.Text_Body__c,
    subject: emailMessage.Subject__c,
  });

  contact.tags.push(
    !!emailMessage.Incoming__c ? ContactTags.Inbound : ContactTags.Outbound
  );
  contact.accountId = emailMessage.RelatedParty__c;
  contact.hasAttachments = emailMessage.Has_Attachment__c;
  contact.litifyId = emailMessage.Id;

  return contact;
};

const mapContactToCallRegister = (contact: Contact) => {
  const callRegister: Call_Register__c = {
    Party__c: contact.accountId,
    Subject__c: contact.subject,
    Notes__c: contact.notes,
    Phoned_to__c: contact.telTo,
    Start_Time__c: contact.startTime,
    End_Time__c: contact.endTime,
  };

  return callRegister;
};

export const mapEmailMessageToCall = (call: Call_Register__c) => {
  const contact: Contact = ContactModel.createCallContact({
    endTime: call.End_Time__c,
    notes: call.Notes__c,
    startTime: call.Start_Time__c,
    subject: call.Subject__c,
    telTo: call.Phoned_to__c,
  });

  contact.accountId = call.Party__c;
  contact.litifyId = call.Id;

  return contact;
};
