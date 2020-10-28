import { CustomAuthorizerHandler, APIGatewayProxyEvent } from "aws-lambda";
import { generateAuthorizerResponse } from "../../utils/aws/policy.utils";
import {
  validateAdminToken,
  validateJWT,
  validateAgentToken,
} from "../../modules/auth/modules";
import { authorizeIfAny } from "../../modules/auth/core";

export type Authorizer = (
  event: APIGatewayProxyEvent
) => { authorized: boolean; info?: any };

/** Authorize using admin token
 */
export const authorizeAdminToken: Authorizer = (event) => {
  try {
    const authResult = validateAdminToken(event);
    return authResult;
  } catch (error) {
    return { authorized: false };
  }
};

export const authorizeAgentToken: Authorizer = (event) => {
  try {
    const authResult = validateAgentToken(event);
    return authResult;
  } catch (error) {
    return { authorized: false };
  }
};

/** Authorize using admin token
 */
export const authorizeJWT: Authorizer = (event) => {
  //Check permissions
  console.log(`got ${event}`);
  try {
    const authResult = validateJWT(event);
    return authResult;
  } catch (error) {
    console.log(`Error on JWT v alidation ${error}`);
  }
  return { authorized: false };
};

export const authorizeAdminOrJWT: Authorizer = (event) => {
  //Authorized if using valid admin token or JWT
  const modules = ["validateAdminToken", "validateJWT"];
  const authResult = authorizeIfAny(event, modules);
  return authResult;
};
