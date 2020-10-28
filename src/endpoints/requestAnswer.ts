import { APIGatewayProxyHandler } from "aws-lambda";
import { render } from "mustache";
import { QuestionnaireAnswer } from "../types/questionnaireAnswers";
import db from "../utils/database/db.model";
import { Responses } from "./common/api.response";
import { processEmailRequest } from "../utils/email/send";
import { EmailData } from "../types/email";
import { authorizeAdminToken } from "./common/auth";

/** @todo Fix questionnaire links and email sender */
export const handler: APIGatewayProxyHandler = async (event, _context) => {
  const authorizationResult = authorizeAdminToken(event);
  if (!authorizationResult.authorized) {
    return Responses._400(`Not allowed to perform this operation.`, 403);
  }

  const clientEmail = event.pathParameters.email;

  const clientAnswers = await db.retrieve<QuestionnaireAnswer>(
    "QuestionnaireAnswers",
    {
      "secureLink.email": clientEmail,
    }
  );

  if (clientAnswers.length == 0) {
    return Responses._200("No questionnaire found for this email", {}, 202);
  }

  const notFinished = clientAnswers.filter((answer) => {
    return !answer.answers || !answer.answers[0];
  });

  if (notFinished.length == 0) {
    return Responses._200("All questionnaires have answers", {}, 202);
  }

  const questionnaireLinks = notFinished.map((answer) => {
    return answer.secureLink.token;
  });

  const template = loadTemplate(questionnaireLinks);

  //Fix email sender
  await sendEmailWithTemplate(template, clientEmail, "");

  return Responses._200("Reponse requests sent.", {
    unansweredQuestionnaires: questionnaireLinks.length,
  });
};

function loadTemplate(questionnaireLinks: string[]) {
  return render(
    `<p> Please, respond the following questionnairs </p>
        {{#links}} * {{.}} {{/links}}`,
    { links: questionnaireLinks }
  );
}

async function sendEmailWithTemplate(
  template: string,
  clientEmail: string,
  senderEmail: string
): Promise<any> {
  const EMAIL_CONFIG: EmailData = {
    from: senderEmail,
    subject: "Please fill in questionnaires",
    data: { email: clientEmail },
    attachments: [],
    html: template,
  };

  return processEmailRequest(EMAIL_CONFIG);
}
