import { APIGatewayProxyHandler } from "aws-lambda";
import { QuestionnaireAnswer } from "../types/questionnaireAnswers";
import db from "../utils/database/db.model";
import { Responses } from "./common/api.response";

/** @todo Add authorization */
export const handler: APIGatewayProxyHandler = async (event, _context) => {
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

  const finished: QuestionnaireAnswer[] = [];
  const notFinished: QuestionnaireAnswer[] = [];
  for (let i in clientAnswers) {
    const answer = clientAnswers[i];
    if (!!answer.answers && !!answer.answers[0]) {
      finished.push(answer);
    } else {
      notFinished.push(answer);
    }
  }

  return Responses._200("Reponse requests sent.", {
    finished,
    notFinished,
  });
};
