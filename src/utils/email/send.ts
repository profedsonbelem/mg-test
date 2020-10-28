import { SES, AWSError } from "aws-sdk";
const ses = new SES({ region: "us-east-1" });
import mailcomposer = require("nodemailer/lib/mail-composer");
import * as Mustache from "mustache";
import * as EmailValidator from "email-validator";
import * as fs from "fs";
import { putObjectOnS3 } from "../aws/s3.utils";
import { getFullDate } from "../misc/date.utils";
import { EmailData } from "../../types/email";
import Mail = require("nodemailer/lib/mailer");
import { ContactModel } from "../../models/contact.model";
import { DenylistModel } from "../../models/denylist.model";
import { sendFailEmail } from "./email.utils";
import { clear } from "console";
import { Contact } from "../../types/contact";

/**
 * @todo modularize
 * @todo process bulk request
 * @todo figure why trhowing error inside setTimeout breaks the script
 */
export async function processEmailRequest(
  data: EmailData,
  returnIfFail: boolean = false,
  logContact: boolean = true,
  contact?: Contact
): Promise<string> {
  if (!contact) {
    console.log(`Creating contact`);
    contact = ContactModel.createEmailContact(data);
  }

  const isInDenylist = await DenylistModel.isEmailOnList(data.data.email);
  if (isInDenylist) {
    console.log(`Target email ${data.data.email} is in the denylist!`);
    console.log(`Will return: ${returnIfFail}`);
    if (returnIfFail) {
      console.log(`Sending fail email to ${data.from}`);
      await sendFailEmail(
        `Target email ${data.data.email} is in the denylist!`,
        data.from
      );
    }

    throw new Error(`Target email ${data.data.email} is in the denylist!`);
  }

  // Filling html
  const msg: string = fillHtml(data.html, data.data);
  const subject: string = fillSubject(data.subject, data.data);
  console.log("TRYING", data.data.email);

  // Validating email
  if (!EmailValidator.validate(data.data.email)) {
    console.log("ERROR validate", data.data.email);
    throw new Error("Fail 1: Invalid email");
  }

  // Filling attachments
  let att: string[];
  console.log("Check Atts");
  if (!!data.attachments && data.attachments.length > 0) {
    console.log("Have atts");
    // console.log("The atts", att);
    att = data.attachments.map((att) => {
      let base64Image = att.data.split(";base64,").pop();
      fs.writeFileSync(`/tmp/${att.name}`, base64Image, {
        encoding: "base64",
      });
      return `/tmp/${att.name}`;
    });
  } else {
    console.log(`Don't have atts`, data.data.email);
  }

  console.log(`Sending`);
  const result = await sendMail(
    data.data.email,
    data.from,
    subject,
    msg,
    att,
    data.bcc
  )
    .then((e) => {
      console.log(`SENT(${!!att ? "att" : "noAtt"})`, data.data.email);
      return e;
    })
    .catch((error) => {
      console.log(
        `Error in sendMail() with ${
          !!att ? "ATT" : "noATT"
        } ATT in processEmailRequest(): ${error}`
      );
      throw new Error(
        `Error in sendMail() with ${
          !!att ? "ATT" : "noATT"
        } in processEmailRequest(): ${error}`
      );
    });

  // Log result
  console.log("Result", result);
  if (!!result.sesResponse.$response.error) {
    console.log("result.$response.error: ", result.sesResponse.$response.error);
    throw new Error(
      `Fail 2: Sending error ${result.sesResponse.$response.error}`
    );
  } else {
    console.log("SUCESS!!!");
    if (logContact) {
      console.log(`Upserting log ${contact._id}`);
      contact.idSES = result.sesResponse.MessageId;
      contact.recordPath = result.s3Path;
      const updateResult = await ContactModel.updateContactInDb(
        contact._id,
        contact,
        true
      );
      console.log(`Update result: ${JSON.stringify(updateResult)}`);
    }
    return "Success 1";
  }
}

function fillHtml(html: string, data: any): string {
  return Mustache.render(html, data);
}

function fillSubject(subject: string, data: any): string {
  return Mustache.render(subject, data);
}

/** @todo modularize */
async function sendMail(
  to: string | string[],
  from: string,
  subject: string,
  body: string,
  attachmentsPath?: string[],
  bcc?: string
) {
  console.log("SEND EMAIL");

  // Create object key
  const date = new Date();
  let objectKey = `${getFullDate(date)}/${subject}/${to}/${
    !!attachmentsPath ? "wa_" : ""
  }${date.getTime()}.txt`;

  // Compose email
  const mailContent: Mail.Options = {
    from: from,
    to: to,
    subject: subject,
    html: body,
    attachments: !!attachmentsPath
      ? attachmentsPath.map((e) => {
          return { path: e };
        })
      : undefined,
    bcc,
  };

  const msg: SES.RawMessageData = await buildRaw(mailContent)
    .then((e) => {
      return e;
    })
    .catch((error) => {
      console.error("buildRaw() error in sendMail", error);
      throw new Error(`buildRaw() error in sendMail ${error}`);
    });

  if (!!msg) {
    const sesResponse = await ses
      .sendRawEmail({
        RawMessage: { Data: msg },
        ConfigurationSetName: process.env.configurationSet,
      })
      .promise();

    let s3Path = `${process.env.emailBucket}/${objectKey}`;
    try {
      // Try to put log in s3
      console.log(`Will put in ${s3Path}`);
      // console.log(`Putting ${JSON.stringify(mailContent)}`);
      await putObjectOnS3(
        msg.toString("utf8"),
        process.env.emailBucket,
        objectKey
      );
      console.log(`Check message in ${s3Path}`);
    } catch (error) {
      console.log("couldn't put", error);
      s3Path = undefined;
    }

    // Send email
    return {
      sesResponse,
      s3Path,
    };
  } else {
    console.log("else !!msg");
    throw new Error(`Couldn't compose message for ${mailContent}`);
  }
}

function buildRaw(mailOptions: Mail.Options): Promise<SES.RawMessageData> {
  return new Promise((res, rej) => {
    var mail: any = new mailcomposer(mailOptions).compile();
    mail.keepBcc = true;
    mail.build((err, message) => {
      if (!err) {
        res(message);
      } else {
        rej(err);
      }
    });
  });
}

/** @todo implement properly */
export interface BulkEmailRequest {
  html: string;
  data: { [field: string]: string; email: string };
  subject: string;
  from: string;
  attachments?: {
    data: string;
    name: string;
  }[];
}
