import { APIGatewayProxyHandler } from "aws-lambda";
import db from "../utils/database/db.model";
import { Responses } from "./common/api.response";
import { authorizeIfAny } from "../modules/auth/core";

export const getQuestIds: APIGatewayProxyHandler = async (event, _context) => {
  const authorizationResult = authorizeIfAny(event, [
    "validateAdminToken",
    "validateAgentToken",
  ]);
  if (!authorizationResult.authorized) {
    return Responses._400(`Not allowed to perform this operation.`, 403);
  }

  try {
    const aggregationResult = await db.aggregate("SurveyAnswers", [
      { $match: { questionnaireId: { $ne: null } } },
      { $group: { _id: "$questionnaireId" } },
    ]);
    const questionnaireIds = aggregationResult.map((result) => {
      return result._id;
    });

    return Responses._200("Success", questionnaireIds);
  } catch (error) {
    return Responses._500(`Internal server error: ${error}`);
  }
};
