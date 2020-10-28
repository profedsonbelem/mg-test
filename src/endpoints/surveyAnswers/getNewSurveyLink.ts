import { APIGatewayProxyHandler } from "aws-lambda";
import { Responses } from "../common/api.response";
import { getMatterFromToken } from "../../utils/litify/matter";
import db from "../../utils/database/db.model";
import { State } from "../../types/state";

export const getNewLinkFromToken: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  const token = event.queryStringParameters?.token;

  if (!token) {
    return Responses._400("Missing token.");
  }

  return Responses._500("Not implemented yet.", 503);

  const matter = await getMatterFromToken(token);

  if (!matter) {
    return Responses._400("No matter with that token.", 404);
  }

  const surveyId = await db.retrieve<string, State>(
    "State",
    { "questionnaireAnswers.secureLink.token": token },
    { intake: 1 },
    (state) => {
      return state.intake.survey;
    }
  );

  // const newLink = createLinkFromMatterAndSurveyId(matter, surveyId);

  // return Responses._200("Success", { link: newLink });
};
