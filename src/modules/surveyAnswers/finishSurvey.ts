import { SurveyAnswer } from "../../types/surveyAnswer";
import { State } from "../../types/state";
import db from "../../utils/database/db.model";
import {
  loadBestFullTemplate,
  FullEmailTemplate,
} from "../../utils/templates/loadTemplate";
import { mapAttributes } from "../../utils/misc/object.utils";
import { render } from "mustache";
import { loadAttachments } from "../../utils/email/email.utils";
import { processEmailRequest } from "../../utils/email/send";
import { Responses } from "../../endpoints/common/api.response";

export default async function FinishSurvey(surveyAnswer: SurveyAnswer) {
  //Get survey (resources folder)
  const [clientState] = await db.retrieve<State>(
    "States",
    {
      "intake._id": surveyAnswer.userId,
    },
    { intake: 1, headers: 1 }
  );
  const resourcesFolder = clientState.headers["Resources-Folder"];

  //Load clientEmail
  const clientEmail = clientState.intake.email;

  //Get template changer attribute
  const attachmentSubfolderAtt = clientState.headers["Attachment-Subfolder"];
  const emailResourcesSubfolder = !!attachmentSubfolderAtt
    ? clientState.intake[attachmentSubfolderAtt]
    : undefined;

  console.log(`Attachments subfolder att: ${attachmentSubfolderAtt}`);
  console.log(`Attachments subfolder: ${emailResourcesSubfolder}`);

  let templateOptions: string[];
  if (!emailResourcesSubfolder) {
    templateOptions = ["endTemplate.json"];
  } else {
    templateOptions = [
      `endTemplate${emailResourcesSubfolder}.json`,
      "endTemplate.json",
    ];
  }

  //Load body and subject
  let fullTemplate: FullEmailTemplate;
  try {
    fullTemplate = await loadBestFullTemplate(resourcesFolder, templateOptions);
  } catch (error) {
    if (error.statusCode == 404) {
      console.log(`Didn't find template`);
      return Responses._400("Didn't find template.", 404);
    } else {
      throw error;
    }
  }
  const templateAttributes = mapAttributes(
    clientState,
    fullTemplate.templateMap
  );
  const emailBody = render(fullTemplate.template, templateAttributes);
  const subject = fullTemplate.subject;

  //Load sender
  const from = clientState.headers["Email-Sender"];

  //Load attachments
  const attachments = [];

  //Send email
  const result = await processEmailRequest(
    {
      attachments,
      data: { email: clientEmail },
      from,
      html: emailBody,
      subject,
    },
    false
  );

  return Responses._200(`Success`, {
    clientEmail,
    from,
    result,
    subject,
  });
}
