import { APIGatewayProxyHandler } from "aws-lambda";
import { authorizeAdminToken } from "./common/auth";
import { Responses } from "./common/api.response";
import db from "../utils/database/db.model";
import { State } from "../types/state";
import { executeSteps } from "../modules/startIntake/core";

type ResumeLeadBody = {
  query: any;
  modules: string[];
};

export const runModules: APIGatewayProxyHandler = async (event, _context) => {
  const authorizationResult = authorizeAdminToken(event);
  if (!authorizationResult.authorized) {
    return Responses._400(`Not allowed to perform this operation.`, 403);
  }

  try {
    const body: ResumeLeadBody = JSON.parse(event.body);

    console.log(`Running ${JSON.stringify(body.query)}`);
    const states = await db.retrieve<State>("States", body.query);
    console.log(`Got ${states.length} states`);

    const succedded: string[] = [];
    const failed: { _id: string; error: string }[] = [];
    await Promise.all(
      states.map(async (state) => {
        try {
          console.log(`Processing state ${state._id}`);
          await executeSteps(state, body.modules);
          succedded.push(state._id);

          return true;
        } catch (error) {
          console.log(`Failed to send ${state.intake.email}: ${error}`);
          failed.push({ _id: state._id, error: `${error}` });

          return false;
        }
      })
    );

    if (failed.length > 0) {
      return Responses._200(
        `Partially executed ${JSON.stringify(body.modules)} in ${
          states.length
        } states`,
        { succedded, failed },
        207
      );
    }

    return Responses._200(
      `Executed ${JSON.stringify(body.modules)} in ${states.length} states`,
      succedded
    );
  } catch (error) {
    return Responses._500(`Internal server error: ${error}`);
  }
};
