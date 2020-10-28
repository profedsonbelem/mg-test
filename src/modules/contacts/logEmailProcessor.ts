import { ContactModel } from "../../models/contact.model";
import { getHeaderInfo } from "../../utils/aws/sns.utils";
import { ContactTags } from "../../types/contact";
import { S3MessageContent } from "../../lambdas/contacts";
import { getS3Object } from "../../utils/aws/s3.utils";
import { simpleParser } from "mailparser";

export async function processRecord(parsedContent: S3MessageContent) {
  console.log(`Parsed Content`);
  console.log(parsedContent);

  if (!parsedContent.mail || !parsedContent.mail.headers) {
    throw new Error(`Missing mail or mail.headers`);
  }

  console.log("Headers");
  console.log(JSON.stringify(parsedContent.mail.headers));

  const originHeader = parsedContent.mail.headers.find((header) => {
    return header.name === "origin";
  });
  const origin = originHeader.value;

  if (origin != "sent" && origin != "received") {
    throw new Error(`Invalid origin ${origin}`);
  }

  console.log(`Received in ${origin}`);
  const desiredHeaders = ["From", "To", "Subject", "Date"];
  const headerInfo = getHeaderInfo(parsedContent.mail, desiredHeaders);

  const emailContentFile = await getS3Object(
    parsedContent.receipt.action.bucketName,
    parsedContent.receipt.action.objectKey
  );
  if (!emailContentFile.Body) {
    throw new Error(
      `No bot in file ${parsedContent.receipt.action.bucketName}/${parsedContent.receipt.action.objectKey}`
    );
  }
  const emailContent = emailContentFile.Body.toString("utf8");
  const parsedEmail = await simpleParser(emailContent);

  const destinations = parsedContent.mail.destination;
  const tag = origin === "sent" ? ContactTags.Outbound : ContactTags.Inbound;

  for (let i in destinations) {
    const to = destinations[i];

    const emailContact = ContactModel.createEmailContact(
      {
        attachments: parsedEmail.attachments.map((att) => {
          return { data: att.content.toString(), name: att.filename || "" };
        }),
        data: { email: to },
        from: parsedContent.mail.source,
        html: !!parsedEmail.html ? parsedEmail.html : parsedEmail.textAsHtml,
        subject: headerInfo.Subject,
      },
      `${parsedContent.receipt.action.bucketName}/${parsedContent.receipt.action.objectKey}`,
      parsedContent.mail.messageId
    );
    emailContact.startTime = new Date(headerInfo.Date);
    emailContact.endTime = new Date();
    emailContact.tags.push(tag);

    console.log(`Creating contact: ${JSON.stringify(emailContact)}`);

    const result = await ContactModel.createContactInDb(emailContact);

    console.log(`Contact saved in db as ${JSON.stringify(result.insertedIds)}`);
  }
}
