import { APIGatewayProxyHandler } from "aws-lambda";
import { Intake } from "../types/intake";
import db from "../utils/database/db.model";
import { Responses } from "./common/api.response";
import {
  DeleteIntake,
  DeactivateIntake,
  ActivateIntake,
} from "../modules/intake";
import { tokenToSecureLink } from "../utils/auth/token.utils";
import { authorizeIfAny } from "../modules/auth/core";

/** @todo implement authorizer for agent routes */
export const deactivateClient: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  try {
    const authorizationResult = authorizeIfAny(event, [
      "validateAdminToken",
      "validateAgentToken",
    ]);
    if (!authorizationResult.authorized) {
      return Responses._400(`Not allowed to perform this operation.`, 403);
    }

    const intakeId = event.queryStringParameters.intakeId;

    // Load intake
    const intake = (await db.retrieve<Intake>("Intakes", { _id: intakeId }))[0];
    if (!intake) {
      console.log(`No intake with that id`);
      return Responses._400(`No intake with id ${intakeId}`, 404);
    }
    const { action }: { action: string } = JSON.parse(event.body);

    const result = await DeactivateIntake(intake, intakeId, action);

    return result;
  } catch (error) {
    console.log(`Internal server error: ${error}`);
    return Responses._500(`Internal server error: ${error}`);
  }
};

/** @todo implement authorizer for agent routes */
export const deactivateMultipleClients: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  try {
    const authorizationResult = authorizeIfAny(event, [
      "validateAdminToken",
      "validateAgentToken",
    ]);
    if (!authorizationResult.authorized) {
      return Responses._400(`Not allowed to perform this operation.`, 403);
    }

    let {
      action,
      emailList,
    }: { action: string; emailList: string[] } = JSON.parse(event.body);
    console.log(`List of email to cancel ${emailList}`);
    let emailsRegex: RegExp[] = [];
    let intakesToBeDisabled: Intake[] = [];
    let failedEmails: string[] = [];
    let failedEmailStatus = {};
    let statusObj = {};

    // Load intake list to be canceled
    for (let i = 0; i < emailList.length; i++) {
      emailsRegex.push(new RegExp(emailList[i], "i"));
      statusObj = { [emailList[i]]: true };
      failedEmailStatus = Object.assign(failedEmailStatus, statusObj);
    }

    if (action === "requestCancel") {
      intakesToBeDisabled = await db.retrieve<Intake>("Intakes", {
        email: { $in: emailsRegex },
        $or: [{ statusAsClient: 0 }, { statusAsClient: 2 }],
      });
    } else if (action === "confirmCancel") {
      intakesToBeDisabled = await db.retrieve<Intake>("Intakes", {
        email: { $in: emailsRegex },
        $or: [{ statusAsClient: 0 }, { statusAsClient: 1 }],
      });
    }

    // Deactivate list of intakes
    for (let i = 0; i < intakesToBeDisabled.length; i++) {
      let result = await DeactivateIntake(
        intakesToBeDisabled[i],
        intakesToBeDisabled[i]._id,
        action
      );
      console.log(
        `Intake ${intakesToBeDisabled[i]._id} with email ${intakesToBeDisabled[i].email} was cancelled`,
        result
      );
      failedEmailStatus[intakesToBeDisabled[i].email] = false;
    }

    // mount the failed list
    for (let i = 0; i < emailList.length; i++) {
      if (failedEmailStatus[emailList[i]] === true)
        failedEmails.push(Object.keys(failedEmailStatus)[i]);
    }

    if (failedEmails.length > 0)
      return Responses._200(
        `Success, but some emails were invalid or don't exist in our database, see these emails at aditionalInfo.`,
        failedEmails
      );
    else
      return Responses._200(`Success, all emails in the list were cancelled`);
  } catch (error) {
    console.log(`Internal server error: ${error}`);
    return Responses._500(`Internal server error: ${error}`);
  }
};

/** @todo implement authorizer for agent routes */
export const deleteClient: APIGatewayProxyHandler = async (event, _context) => {
  try {
    const authorizationResult = authorizeIfAny(event, ["validateAdminToken"]);
    if (!authorizationResult.authorized) {
      return Responses._400(`Not allowed to perform this operation.`, 403);
    }

    const intakeId = event.queryStringParameters.intakeId;

    // Load intake
    const intake = (await db.retrieve<Intake>("Intakes", { _id: intakeId }))[0];
    if (!intake) {
      console.log(`No intake with that id`);
      return Responses._400(`No intake with id ${intakeId}`, 404);
    }

    const result = await DeleteIntake(intake, intakeId);

    return result;
  } catch (error) {
    console.log(`Internal server error: ${error}`);
    return Responses._500(`Internal server error: ${error}`);
  }
};

/** @todo implement authorizer for agent routes */
export const activateClient: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  try {
    const authorizationResult = authorizeIfAny(event, [
      "validateAdminToken",
      "validateAgentToken",
    ]);
    if (!authorizationResult.authorized) {
      return Responses._400(`Not allowed to perform this operation.`, 404);
    }

    const intakeId = event.queryStringParameters.intakeId;
    // Load intake
    const intake = (await db.retrieve<Intake>("Intakes", { _id: intakeId }))[0];
    if (!intake) {
      console.log(`No intake with that id`);
      return Responses._400(`No intake with id ${intakeId}`, 404);
    }

    const result = await ActivateIntake(intake, intakeId);

    return result;
  } catch (error) {
    console.log(`Internal server error: ${error}`);
    return Responses._500(`Internal server error: ${error}`);
  }
};
