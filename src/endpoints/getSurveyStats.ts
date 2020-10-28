import { APIGatewayProxyHandler } from "aws-lambda";
import db from "../utils/database/db.model";
import { Responses } from "./common/api.response";
import { SurveyAnswer } from "../types/surveyAnswer";
import { authorizeAdminToken } from "./common/auth";

export const getSurveyStats: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  const authorizationResult = authorizeAdminToken(event);
  if (!authorizationResult.authorized) {
    return Responses._400(`Not allowed to perform this operation.`, 403);
  }

  const token = event.headers.Authorization;
  console.log(`token: ${token}`);
  const body = JSON.parse(event.body);
  const questionnaireId = body.questionnaireId;
  let query: any;
  if (!!questionnaireId) {
    query = { questionnaireId };
  } else {
    query = {};
  }

  try {
    const data: any[] = await db.retrieve("SurveyAnswers", query, {
      end: 1,
      userId: 1,
      "answers.contact_email.answer": 1,
      nextQuestion: 1,
    });

    let all: any[] = [];
    let notFinished: any[] = [];
    let finished: any[] = [];
    for (let i in data) {
      const current = data[i];
      all.push(formatOut(current));
      if (!current.end) {
        notFinished.push(formatOut(current));
      } else {
        finished.push(formatOut(current));
      }
    }

    return Responses._200("Success", { all, finished, notFinished });
  } catch (error) {
    console.log(`Error in getSurveyStats: ${error}`);
    return Responses._500(`Internal server error: ${error}`);
  }
};

function formatOut(data: SurveyAnswer) {
  if (!data.answers) {
    data.answers = {};
  }

  return {
    _id: data._id,
    email: !!data.answers.contact_email
      ? data.answers.contact_email.answer
      : "",
    userId: data.userId,
    end: data.end,
    nextQuestion: !!data.nextQuestion ? data.nextQuestion : "",
  };
}
