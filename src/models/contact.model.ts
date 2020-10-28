import { Contact, ContactType } from "../types/contact";
import db from "../utils/database/db.model";
import { ObjectId } from "mongodb";
import { EmailData } from "../types/email";
import { SMSData } from "../types/sms";
import {
  sendToLitify,
  updateInLitify,
  getRelatedContacts,
  mapEmailMessageToContact,
  mapEmailMessageToCall,
} from "../modules/litify/sendContactTolitify";
import litify from "../utils/database/litify.model";
import { salesforceName as EMName } from "../types/Emails_Messages__c";
import { salesforceName as CRName } from "../types/Call_Register__c";
import striptags = require("striptags");
import { mergeObjects } from "../utils/misc/object.utils";

const defaultListFields: { [attribute in keyof Contact]?: 1 } = {
  _id: 1,
  type: 1,
  subject: 1,
  clientId: 1,
  emailTo: 1,
  telTo: 1,
  emailFrom: 1,
};

export class ContactModel {
  static async createContactInDb(contact: Contact) {
    contact.creationDate = new Date();
    contact.lastModified = new Date();

    if (!contact._id) {
      contact._id = new ObjectId().toHexString();
    }

    try {
      console.log("Trying to create in litify");
      const litifyId = await sendToLitify(contact);
      contact.litifyId = litifyId;
      console.log(`Created with litifyId: ${litifyId}`);
    } catch (error) {
      console.log(`Couldn't create contact in litify: ${error}`);
    }

    return await db.create("Contacts", [contact], false);
  }

  static createEmailContact(
    emailData: EmailData,
    s3RecordPath?: string,
    sesId?: string
  ): Contact {
    return {
      _id: new ObjectId().toHexString(),
      contactedBySource: "email",
      contactedByUser: emailData.from,
      creationDate: new Date(),
      lastModified: new Date(),
      notes: emailData.html,
      startTime: new Date(),
      subject: emailData.subject,
      tags: [],
      type: ContactType.email,
      emailData: emailData.data,
      emailTo: emailData.data.email,
      emailFrom: emailData.from,
      recordPath: s3RecordPath,
      hasAttachments: !!emailData.attachments
        ? emailData.attachments.length > 0
        : false,
      idSES: sesId,
      textEmailBody: striptags(emailData.html, [], " "),
      bcc: emailData.bcc,
    };
  }

  static createSMSContact(smsData: SMSData, s3RecordPath?: string): Contact {
    return {
      _id: new ObjectId().toHexString(),
      contactedBySource: "SMS",
      contactedByUser: smsData.sender,
      creationDate: new Date(),
      lastModified: new Date(),
      notes: smsData.message,
      startTime: new Date(),
      subject: smsData.subject,
      tags: [],
      type: ContactType.SMS,
      telTo: smsData.receiver,
      recordPath: s3RecordPath,
    };
  }

  static createCallContact(callData: {
    subject: string;
    notes: string;
    telTo: string;
    startTime: Date;
    endTime: Date;
  }): Contact {
    return {
      _id: new ObjectId().toHexString(),
      contactedBySource: "call",
      contactedByUser: "",
      creationDate: new Date(),
      lastModified: new Date(),
      notes: callData.notes,
      startTime: callData.startTime,
      endTime: callData.endTime,
      subject: callData.subject,
      tags: [],
      type: ContactType.call,
      telTo: callData.telTo,
    };
  }

  static async updateContactInDb(
    contactId: string,
    contact: Contact,
    upsert = false
  ) {
    contact.lastModified = new Date();

    let [toBeUpdated] = await db.retrieve<Contact>("Contacts", {
      _id: contactId,
    });

    let updatedContact: Contact;
    if (!toBeUpdated) {
      updatedContact = contact;
    } else {
      updatedContact = mergeObjects(contact, toBeUpdated);
    }

    try {
      if (updatedContact.litifyId) {
        console.log("Trying to update in litify");
        const litifyId = await updateInLitify(updatedContact);
        console.log(`Updated litifyId: ${litifyId}`);
      } else {
        console.log("Trying to create in litify");
        const litifyId = await sendToLitify(updatedContact);
        updatedContact.litifyId = litifyId;
        console.log(`Created with litifyId: ${litifyId}`);
      }
    } catch (error) {
      console.log(`Couldn't create or update contact in litify: ${error}`);
    }

    const result = await db.update(
      "Contacts",
      { _id: contactId },
      { $set: updatedContact },
      false,
      upsert
    );

    return result;
  }

  static async listContacts(
    query: any,
    fields?: { [attribute in keyof Contact]?: 1 }
  ) {
    if (!fields) {
      fields = defaultListFields;
    }
    let gettingLitifyId = !!fields.litifyId;
    if (!gettingLitifyId) {
      fields.litifyId = 1;
    }

    console.log(`Projecting fields: ${JSON.stringify(fields)}`);

    const contacts = await db.retrieve<Contact>("Contacts", query, fields);

    if (!gettingLitifyId) {
      return contacts.map((contact) => {
        delete contact.litifyId;

        return contact;
      });
    } else {
      return contacts;
    }
  }

  static async getDetails(clientId?: string, contactEmail?: string) {
    console.time("getRelatedContacts");
    const litifyContacts = await getRelatedContacts(clientId);
    console.timeEnd("getRelatedContacts");
    console.time("getMongoContacts");
    const mongoContacts = await getMongoContacts(clientId, contactEmail);
    console.timeEnd("getMongoContacts");
    console.log(`${mongoContacts.length} in mongo`);

    console.time("theRest");
    const existingInMongo: { [litifyId: string]: true } = {};
    for (let contact of mongoContacts) {
      if (!!contact.litifyId) {
        existingInMongo[contact.litifyId] = true;
      }
    }

    const newContacts: Contact[] = [];
    console.log(`${litifyContacts.emailMessages.length} emails in litify`);
    for (let email of litifyContacts.emailMessages) {
      if (!existingInMongo[email.Id]) {
        console.log(`${email.Id} wasnt in mongo`);
        const newContact = mapEmailMessageToContact(email);
        newContact.clientId = clientId;
        newContacts.push(newContact);
      }
    }

    console.log(`${litifyContacts.callRegisters.length} calls in litify`);
    for (let call of litifyContacts.callRegisters) {
      if (!existingInMongo[call.Id]) {
        console.log(`${call.Id} wasnt in mongo`);
        const newContact = mapEmailMessageToCall(call);
        newContact.clientId = clientId;
        newContacts.push(newContact);
      }
    }

    if (newContacts.length === 0) {
      console.log("No new contacts");
    } else {
      await db.create("Contacts", newContacts, false);
    }
    console.timeEnd("theRest");

    return mongoContacts.concat(newContacts);
    // return mongoContacts;
  }

  static async deleteById(id: string) {
    const [existingContact] = await db.retrieve<Contact>(
      "contacts",
      { _id: id },
      { litifyId: 1, type: 1 }
    );

    if (!existingContact) {
      console.log(`No entry to delete`);
      return false;
    }

    if (!!existingContact.litifyId) {
      try {
        console.log("Deleting on litify");
        const litifyId = existingContact.litifyId;
        switch (existingContact.type) {
          case ContactType.email: {
            await litify.delete(EMName, litifyId);
            break;
          }
          case ContactType.call: {
            await litify.delete(CRName, litifyId);
            break;
          }
          default: {
            throw new Error("It should have an litify resource...");
          }
        }
      } catch (error) {
        throw new Error(`Error deleting on litify: ${error}`);
      }
    }

    console.log(`Trying to delete ${id}`);
    const deleteResult = await db.deleteById("Contacts", id);

    return true;
  }
}

async function getMongoContacts(clientId?: string, contactEmail?: string) {
  let query = { $or: [] };

  if (clientId) {
    query.$or.push({
      $and: [{ clientId: { $exists: true } }, { clientId: clientId }],
    });
  }

  if (contactEmail) {
    query.$or.push(
      {
        $and: [
          { emailFrom: { $exists: true } },
          { emailFrom: { $regex: contactEmail, $options: "i" } },
        ],
      },
      {
        $and: [
          { contactedByUser: { $exists: true } },
          { contactedByUser: { $regex: contactEmail, $options: "i" } },
        ],
      },
      {
        $and: [
          { emailTo: { $exists: true } },
          { emailTo: { $regex: contactEmail, $options: "i" } },
        ],
      }
    );
  }

  return await db.retrieve<Contact>("Contacts", query);
}
