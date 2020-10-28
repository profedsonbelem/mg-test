import { APIGatewayProxyHandler } from "aws-lambda";
import { Responses } from "./common/api.response";
import db from "../utils/database/db.model";
import { authorizeAdminOrJWT } from "./common/auth";
import { SurveyAnswer } from "../types/surveyAnswer";
import { FinishSurvey } from "../modules/surveyAnswers";

export const finishSurvey: APIGatewayProxyHandler = async (event, _context) => {
  try {
    //Auth
    const authorizationResult = authorizeAdminOrJWT(event);
    if (!authorizationResult.authorized) {
      return Responses._400(`Not allowed to perform this operation.`, 403);
    }

    //Authorize using surveyAnswer _id and userId
    const surveyAnswerId = event.pathParameters._id;
    const [surveyAnswer] = await db.retrieve<SurveyAnswer>("SurveyAnswers", {
      _id: surveyAnswerId,
    });
    if (!surveyAnswer) {
      return Responses._400(`No SurveyAnswer with that id.`, 204);
    }
    if (!surveyAnswer.end) {
      return Responses._400("Questionnaire isn't finished");
    }
    if (
      !authorizationResult.info.allowedAsAdmin &&
      surveyAnswer.userId !== authorizationResult.info.userId
    ) {
      return Responses._400(
        `Not allowed to finish questionnaire ${surveyAnswerId}`,
        403
      );
    }

    const response = await FinishSurvey(surveyAnswer);

    return response;
  } catch (error) {
    console.log(`Internal server error: ${error}`);
    return Responses._500(`Internal server error: ${error}`);
  }
};
