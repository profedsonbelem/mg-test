import { SQS } from "aws-sdk";
import * as fs from "fs";

import { EmailData } from "../types/email";
import db from "../utils/database/db.model";
import { sleep } from "../utils/misc/time.utils";
import { ContactModel } from "../models/contact.model";
import { Contact, ContactTags } from "../types/contact";
import { processEmailRequest } from "../utils/email/send";
import { getS3ObjectsWithPrefix } from "../utils/aws/s3.utils";

async function sendEmailFromQueue() {
  const bucket = process.env.bucket;
  const queueURL = process.env.queueURL;

  const params: SQS.ReceiveMessageRequest = {
    QueueUrl: queueURL,
    MaxNumberOfMessages: 10,
  };

  const data = await sqs.receiveMessage(params).promise();

  if (data.$response.error) {
    console.log("Receive Error", data.$response.error);
    await sleep(interval);
  } else if (data.Messages) {
    console.log(`Got ${data.Messages.length} messages`);

    await Promise.all(
      data.Messages.map(async (message) => {
        try {
          const _id = message.Body;
          const contact = await getContactsById(_id);

          const results = await Promise.all([
            sendEmail(contact, bucket),
            deleteMessage(message.ReceiptHandle),
          ]);

          console.log(`Results: ${JSON.stringify(results)}`);

          return true;
        } catch (error) {
          console.log(`Error (${message.Body}): ${error}`);

          return false;
        }
      })
    );
  } else {
    console.log(`No messages`);
    await sleep(interval);
  }
}

async function deleteMessage(receiptHandle: string) {
  const queueURL = process.env.queueURL;

  const deleteParams = {
    QueueUrl: queueURL,
    ReceiptHandle: receiptHandle,
  };
  const deleteData = await sqs.deleteMessage(deleteParams).promise();

  if (deleteData.$response.error) {
    return `Delete Error ${deleteData.$response.error}`;
  } else {
    return `Message Deleted ${deleteData}`;
  }
}

async function getContactsById(_id: string) {
  const [data] = await db.retrieve<Contact>("Contacts", { _id });

  if (!data) {
    throw new Error(`No contact with id ${_id}`);
  }
  return data;
}

async function getAttachments(contact: Contact, bucket: string) {
  if (contact.hasAttachments) {
    const attachments = await getS3ObjectsWithPrefix(bucket, contact._id);
    return attachments.map((att) => {
      const name = att.key.split("/")[att.key.split("/").length - 1];
      const data = "a;base64," + att.file.Body.toString("base64");

      return { data, name };
    });
  }
}

async function sendEmail(contact: Contact, bucket: string): Promise<string> {
  const attachments = await getAttachments(contact, bucket);
  const emR: EmailData = {
    data: contact.emailData,
    from: contact.emailFrom,
    html: contact.notes,
    subject: contact.subject,
    attachments: attachments || [],
    bcc: contact.bcc,
  };
  try {
    await processEmailRequest(emR, false, true, contact);

    return "Email sent";
  } catch (error) {
    console.log(`Error: ${error}`);
    contact.tags.push(ContactTags.Unsuccessful);
    contact.error
      ? contact.error.push(`Error: ${error}`)
      : (contact.error = [`Error: ${error}`]);
    const updateResult = await ContactModel.updateContactInDb(
      contact._id,
      contact
    );
    console.log(`Update result: ${JSON.stringify(updateResult)}`);
    await sendFailEmail(error, contact._id);

    return "Couldn't send";
  }
}

async function sendFailEmail(reason: string, _id: string) {
  console.log("SENDING FAIL EMAIL");

  const emDt: EmailData = {
    data: {
      email: process.env.failedEmail,
    },
    from: "sendfailure@pgmbm.com",
    html: `<p>Unable to perform the contact ${_id}.</p><p>${reason}</p>`,
    subject: "Email send error",
    attachments: [],
  };

  try {
    await processEmailRequest(emDt, false);
    return true;
  } catch (error) {
    console.log(`Error while sending error email: ${error}`);
    return false;
  }
}

async function main() {
  while (true) {
    await sendEmailFromQueue();
  }
}

// Set variables
const sqs = new SQS({ apiVersion: "v4", region: "us-east-1" });
const envVariables = JSON.parse(
  fs.readFileSync(process.argv[2]).toString("utf8")
);
process.env = {
  ...process.env,
  ...envVariables,
};
const interval = Number.parseInt(process.argv[3] || "1000");
// Run every interval seconds
console.log(`Will await ${interval} ms to try again`);
main();
