import { render } from "mustache";

import { Intake } from "../../types/intake";
import { processEmailRequest } from "./send";
import { EmailData } from "../../types/email";
import { getInnerXML } from "../misc/xml.utils";

/**
 * gets the xml in the body of the email
 * @todo Get answers limiter as param
 */
export function getXMLFromEmail(emailBody: string): string {
  // Remove unecessary parts
  const removeWeirdStuff2 = emailBody.replace(/=/g, "");
  let removeWeirdStuff = removeWeirdStuff2.replace(/[\n\t]/g, "");
  removeWeirdStuff = removeWeirdStuff.replace(/(<br>)/g, "");
  console.log("---------------------\n\n\n\n");
  console.log(removeWeirdStuff);

  //Get XML inside <SPG> tag
  console.log("Get XML inside SPG");
  const insideSPG =
    getInnerXML(removeWeirdStuff, "SPG", false)[0] || removeWeirdStuff;

  //Get XML inside <xml> tag
  console.log("Get XML inside xml");
  const insidexml = getInnerXML(insideSPG, "xml", false)[0] || insideSPG;

  //Remove more unesessary parts (can be with first part?)
  const finalString = insidexml.replace(/\r?\n|\r/g, "");

  return "<xml>" + finalString + "</xml>";
}

/**
 * @deprecated use email/send.processEmailRequest instead
 */
export async function sendEmailWithTemplate(
  template: string,
  intake: Intake,
  subject: string,
  from: string,
  attachments: {
    data: string;
    name: string;
  }[]
): Promise<any> {
  console.log("SEND EMAIL WITH TEMPLATE");
  console.log("SEND EMAIL WITH TEMPLATE");
  // data: { mI: Intake; qA: QuestionnaireAnswer }
  const EMAIL_CONFIG: EmailData = {
    from,
    subject: subject,
    data: { email: intake.email },
    attachments,
    html: template,
  };

  return processEmailRequest(EMAIL_CONFIG);
}

export async function sendDuplicateEmail(
  resource: string,
  object: any,
  err: any
) {
  try {
    console.log(`Sending duplicate email`);
    await processEmailRequest(
      {
        attachments: [],
        data: { email: process.env.failedEmail },
        from: "duplicate.alert@pgmbm.com",
        html: `<p>Error trying to create ${resource}:</p><br>${JSON.stringify(
          object,
          null,
          4
        )}<br><br><p>Error</p><br>${JSON.stringify(err, null, 4)}`,
        subject: "Duplicate detected in salesforce insertion",
      },
      false,
      false
    );
  } catch (err) {
    console.log(`Error sending duplicate email: ${err}`);
  }
}

export function sendEmergencyEmail(message: string, from: string) {
  console.log("SENDING EMERGENGY EMAIL");

  const emDt: EmailData = {
    data: { email: process.env.failedEmail },
    from,
    html: `<p>${message}</p>`,
    subject: "Intake error",
    attachments: [],
  };

  return processEmailRequest(emDt);
}

export function sendFailEmail(reason: string, to: string) {
  console.log("SENDING FAIL EMAIL");

  const emDt: EmailData = {
    data: { email: to },
    from: "sendfailure@pgmbm.com",
    html: `<p>We're sorry to inform that we couldn't send your email.</p><p>${reason}</p>`,
    subject: "Email send error",
    attachments: [],
  };

  return processEmailRequest(emDt);
}

/** @todo should load the subject for the same email template? */
export async function loadEmailSubject(
  resourcesFolder: string,
  attachmentSubfolder: string = "default"
) {
  console.log(`Loading subject for ${attachmentSubfolder}`);
  let attributeMap = await getTemplateMap(resourcesFolder, `subjects.json`);
  if (!attributeMap) {
    return "";
  } else {
    return attributeMap[attachmentSubfolder] || attributeMap["default"] || "";
  }
}

/** @todo Guarantee that the template and the map are for the same email
 *  (Currently, they may be for different cases)
 */
export async function loadEmailTemplate(
  state: State,
  resourcesFolder: string,
  attachmentSubfolder: string = ""
): Promise<string> {
  console.log(`LOAD EMAIL TEMPLATE for ${resourcesFolder}`);
  let template = await getTemplateFile(
    resourcesFolder,
    `email${attachmentSubfolder}.html`
  );
  if (!template) {
    template = await getTemplateFile(resourcesFolder, `email.html`);
  }

  let attributeMap = await getTemplateMap(
    resourcesFolder,
    `templateMap${attachmentSubfolder}.json`
  );
  if (!attributeMap) {
    attributeMap =
      (await getTemplateMap(resourcesFolder, `templateMap.json`)) || {};
  }

  const templateAttribute = mapAttributes(state, attributeMap);

  return render(template, templateAttribute);
}

import { getS3ObjectsWithPrefix } from "../aws/s3.utils";
import { getTemplateFile, getTemplateMap } from "../templates/loadTemplate";
import { State } from "../../types/state";
import { mapAttributes } from "../misc/object.utils";

/**
 * Load all files from contract folder in resources bucket
 * @todo change the contracts folder to attachments (?)
 */
export async function loadAttachments(
  resourcesFolder: string,
  attachmentSubfolder: string = "default",
  getDefault: boolean = true
): Promise<{ data: string; name: string }[]> {
  const bucket = process.env.resources;

  let attachments = await getS3ObjectsWithPrefix(
    bucket,
    `${resourcesFolder}/contracts/${attachmentSubfolder}/`
  );

  //If no attachments in the given subfolder, send the default
  if (
    attachments.length === 0 &&
    attachmentSubfolder != "default" &&
    getDefault
  ) {
    attachments = await getS3ObjectsWithPrefix(
      bucket,
      `${resourcesFolder}/contracts/default/`
    );
  }

  return attachments.map((att) => {
    const name = att.key.split("/")[att.key.split("/").length - 1];

    if (!att.file.Body) {
      console.log(`File ${att.key} without body`);
      return {
        data: "",
        name,
      };
    }
    const data = "a;base64," + att.file.Body.toString("base64");
    return {
      data,
      name,
    };
  });
}

export function sendClientAddedDenylist(email: string, reason?: string) {
  console.log("Sending email when client added in denylist");

  const emDt: EmailData = {
    data: { email: process.env.failedEmail },
    from: "denylist@pgmbm.com",
    html: `<p>Email: ${email}</p><br><p>Reason: ${
      reason ? reason : "unspecified reason"
    }</p>`,
    subject: "Client added in Denylist",
    attachments: [],
  };

  return processEmailRequest(emDt);
}
