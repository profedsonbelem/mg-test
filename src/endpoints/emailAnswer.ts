import { APIGatewayProxyHandler, AuthResponseContext } from "aws-lambda";
import * as js2xmlparser from "js2xmlparser";
import { EmailData } from "../types/email";
import { Responses } from "./common/api.response";
import { tokenToSecureLink } from "../utils/auth/token.utils";
import db from "../utils/database/db.model";
import { processEmailRequest } from "../utils/email/send";
import { SecureLink } from "../types/questionnaireAnswers";
import { TokenPayload } from "../types/tokenPayload";
import { authorizeAdminOrJWT } from "./common/auth";

/** @todo get token in headers */
export const getEmailAnswer: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  //Auth
  const authorizationResult = authorizeAdminOrJWT(event);
  if (!authorizationResult.authorized) {
    return Responses._400(`Not allowed to perform this operation.`, 403);
  }

  console.log("Saving final answer");
  if (!event.queryStringParameters) {
    return Responses._400("Missing params");
  }

  //Get token
  const token = event.queryStringParameters.token;
  if (!token) {
    return Responses._400("Missing token", 401);
  }
  console.log("Got token");

  //Get target email
  const targetEmail = event.queryStringParameters.targetEmail;
  if (!targetEmail) {
    return Responses._400("Missing target email");
  }
  console.log("Got target email");

  //Validate secure link against Intake dataset
  console.log("Try to decrypt");
  let secureLink: SecureLink;
  try {
    secureLink = tokenToSecureLink(token);
  } catch (error) {
    return Responses._500(`Couldn't decrypt ${token}`);
  }
  console.log("Decrypted", JSON.stringify(secureLink));

  //Authorize request
  const allowed = authorize(secureLink, authorizationResult.info);
  if (!allowed) {
    return Responses._400(
      `Not allowed to emailAnswer ${JSON.stringify(
        event.queryStringParameters
      )}`,
      403
    );
  }

  //Get intake
  const intake = await db.retrieve("Intakes", {
    _id: secureLink._id,
    email: secureLink.email,
  });
  if (intake.length === 0) {
    return Responses._400("Invalid token", 401);
  }

  //Validate against received email
  const email = event.queryStringParameters.email;
  console.log("Validating with email", email);
  if (!email && email !== secureLink.email) {
    return Responses._400("Not allowed", 403);
  }

  //Update QuestionnaireAnswers
  const answers = JSON.parse(event.body);
  await db.update(
    "QuestionnaireAnswers",
    { secureLink: { ...secureLink } },
    { $addToSet: { answers } }
  );
  console.log("Done saving");

  //Send XML
  console.log("Sending XML as response");
  //await sendAnswerAsXML(answers, targetEmail);

  //Send other email
  //await sendOtherEmail();

  return Responses._200("Success");
};

/** @todo update senderEMAIL */
async function sendAnswerAsXML(answers: any, targetEmail: string) {
  const answerAsXML = toXML(answers);

  const EMAIL_CONFIG: EmailData = {
    from: process.env.senderEmail,
    subject: "Answers as XML",
    data: { email: targetEmail },
    attachments: [],
    html: answerAsXML,
  };

  await processEmailRequest(EMAIL_CONFIG);
}

async function sendOtherEmail() {}

function toXML(data: any) {
  // const builder = new x2j.Builder();
  // const xml = builder.buildObject(data);

  // return Buffer.from(xml).toString('base64');
  const ret = js2xmlparser.parse("answers", data);
  console.log("ret xml", ret);
  return js2xmlparser.parse("answers", data);
}

function authorize(data: SecureLink, authContext?: any) {
  if (!authContext) {
    console.log("No auth context");
    return false;
  }

  const tokenPayload = authContext;

  if (!!tokenPayload.allowedAsAdmin) {
    console.log("Allowed as admin");
    return true;
  }

  console.log(
    `Allowed if ${JSON.stringify(data)} and ${JSON.stringify(
      tokenPayload
    )} have the same id and email`
  );
  return (
    data._id === tokenPayload.userId && data.email === tokenPayload.userEmail
  );
}
