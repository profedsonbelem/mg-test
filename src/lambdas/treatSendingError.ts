import { SNSHandler } from "aws-lambda";
import {
  EventPublishMessage,
  BounceEventMessage,
  ComplaintEventMessage,
  RejectEventMessage,
  MailObject,
} from "../types/sns";
import db from "../utils/database/db.model";
import { Contact } from "../types/contact";
import { getHeaderInfo } from "../utils/aws/sns.utils";
import { render } from "mustache";
import { removeFromSuppressionList } from "../utils/aws/ses.utils";
import { ContactModel } from "../models/contact.model";
import {
  addEmailToQueue,
  sendMessageToSQS,
} from "../modules/utils/addEmailToQueue";

const template =
  "<p><strong>Type:</strong>          {{type}}</p><p><strong>Reason:</strong>          {{reason}}</p><p><strong>From:</strong>          {{from}}</p><p><strong>To:</strong>          {{to}}</p><p><strong>Subject:</strong>          {{subject}}</p><p><strong>Content:</strong>          {{content}}</p>";

export const treatSendingError: SNSHandler = (event, _context) => {
  event.Records.forEach(async (eventRecord) => {
    // Get info from record
    const parsedMessage: EventPublishMessage = JSON.parse(
      eventRecord.Sns.Message
    );
    // Act accordling
    switch (parsedMessage.eventType) {
      case "Bounce": {
        // Treat bounce
        treatBounce(<BounceEventMessage>parsedMessage);
        break;
      }
      case "Complaint": {
        // Treat complaint
        treatComplaint(<ComplaintEventMessage>parsedMessage);
        break;
      }
      case "Reject": {
        // Treat reject
        treatRejection(<RejectEventMessage>parsedMessage);
        break;
      }
      default: {
        console.log(`Can't treat eventType: ${parsedMessage.eventType}`);
      }
    }
  });
};

export async function treatBounce(message: BounceEventMessage) {
  console.log(`Treating bounce: ${message.bounce.bounceSubType}`);
  if (
    message.bounce.bounceSubType === "Suppressed" ||
    message.bounce.bounceSubType === "OnAccountSuppressionList"
  ) {
    // Try to remove from list and resend email
    const resended = await removeFromSuppressionAndResend(message.mail);
    if (resended) {
      return;
    }
  }

  let to: string;
  if (message.bounce.bounceType === "Transient") {
    to = message.mail.source;
  } else {
    to = process.env.failedEmail;
  }
  sendNotificationMail(
    "Bounce",
    message.bounce.bounceSubType,
    message.mail,
    to
  );
}

export async function treatComplaint(message: ComplaintEventMessage) {
  console.log(
    `Treating complaint: ${message.complaint.complaintFeedbackType} | ${message.complaint.complaintSubType}`
  );

  sendNotificationMail(
    "Complaint",
    message.complaint.complaintFeedbackType ||
      message.complaint.complaintSubType ||
      "Undefined ",
    message.mail,
    process.env.failedEmail
  );
}

export function treatRejection(message: RejectEventMessage) {
  console.log(`Treating rejection: ${message.reject.reason}`);
  sendNotificationMail(
    "Rejection",
    message.reject.reason,
    message.mail,
    process.env.failedEmail
  );
}

/** @todo Queue email */
async function removeFromSuppressionAndResend(mail: MailObject) {
  const [contact] = await db.retrieve<Contact>("Contacts", {
    $and: [
      {
        idSES: mail.messageId,
      },
      {
        idSES: {
          $exists: true,
        },
      },
    ],
  });

  if (!contact) {
    console.log(`Didn't found contact.`);
    return false;
  }
  if (contact.retried) {
    console.log(`Already retried this contact.`);
    return false;
  }
  // Remove from list
  const removed = await removeFromSuppressionList(contact.emailTo);
  if (!removed) {
    console.log(`Couldn't remove from list`);
    return false;
  }

  contact.retried = true;
  try {
    await ContactModel.updateContactInDb(contact._id, contact);
    console.log(`Updating contact`);

    await sendMessageToSQS(contact._id);

    console.log(`Retry atempt sent to sqs.`);
    return true;
  } catch (error) {
    console.log(`Error on update contact or send it: ${error}`);
    return false;
  }
}

async function sendNotificationMail(
  type: string,
  reason: string,
  mail: MailObject,
  to: string
) {
  const [contact] = await db.retrieve<Contact>("Contacts", {
    $and: [
      {
        idSES: mail.messageId,
      },
      {
        idSES: {
          $exists: true,
        },
      },
    ],
  });

  if (!!contact) {
    if (!contact.error) {
      contact.error = [];
    }
    contact.error.push(`Sending error (${type}): ${reason}`);
    await ContactModel.updateContactInDb(contact._id, contact);
    console.log(`Added error to contact`);
  }

  const templateAtts = {
    type,
    reason,
    from: mail.source,
    to: JSON.stringify(mail.destination),
    subject: getHeaderInfo(mail, ["Subject"])["Subject"],
    content: !!contact ? contact.notes : "~Couldn't retrieve content~",
  };

  const body = render(template, templateAtts);

  const queueResult = await addEmailToQueue(
    {
      attachments: [],
      data: [
        {
          email: to,
        },
      ],
      from: "sendfailure@pgmbm.com",
      html: body,
      subject: `Send failure: ${type}`,
    },
    { email: to }
  );

  if (queueResult instanceof Error) {
    console.log(`Couldn't queue email: ${queueResult}`);
  } else {
    console.log(`Failure email queued: ${queueResult}`);
  }
}
