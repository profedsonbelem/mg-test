import { APIGatewayProxyHandler } from "aws-lambda";
import { Responses } from "./common/api.response";
import { processBody } from "../modules/startIntake/constructors";
import { StateModel } from "../models/state.model";
import { executeSteps } from "../modules/startIntake/core";
import { authorizeAdminToken } from "./common/auth";
import { State } from "../types/state";
import db from "../utils/database/db.model";
import { mapAttributes } from "../utils/misc/object.utils";
import { authorizeIfAny } from "../modules/auth/core";

export const startFromData: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  try {
    const authorizationResult = authorizeIfAny(event, [
      "validateBotToken",
      "validateAdminToken",
    ]);
    if (!authorizationResult.authorized) {
      return Responses._400(`Not allowed to perform this operation.`, 403);
    }

    console.log("Parsing body");
    let body = JSON.parse(event.body);

    const result = await processBody(body, "link");

    return result;
  } catch (error) {
    console.log(`Error ${error}`);
    return Responses._500(`Internal server error: ${error}`);
  }
};
