import { decodeJWT } from "../../utils/auth/token.utils";
import { CustomAuthorizerEvent, APIGatewayProxyEvent } from "aws-lambda";
import { getTokenForMethod } from "./utils/token.management";

export type AuthorizerModule = (
  // event: CustomAuthorizerEvent
  event: APIGatewayProxyEvent,
  authorizerHeader?: string
) => { authorized: boolean; info?: any };

/** Validate admin token
 * @todo change token over time
 * @todo use token depending on the route
 */
export const validateAdminToken: AuthorizerModule = (
  event,
  authorizerHeader = "Authorization"
) => {
  const token = event.headers[authorizerHeader];
  console.log(`Token: ${token}`);

  console.log(`Event: ${JSON.stringify(event)}`);

  const adminToken = getTokenForMethod(event.path);
  console.log(`Admin token: ${adminToken}`);

  if (token === adminToken) {
    return { authorized: true, info: { allowedAsAdmin: true } };
  } else {
    return { authorized: false };
  }
};

/** Validate JWT
 * @todo do further validations
 */
export const validateJWT: AuthorizerModule = (
  event,
  authorizationHeader = "Authorization"
) => {
  const token = event.headers[authorizationHeader];
  try {
    const decodedToken = decodeJWT(token);

    if (!decodedToken.userEmail || !decodedToken.userId) {
      return { authorized: false };
    } else {
      return { authorized: true, info: decodedToken };
    }
  } catch (error) {
    console.log(`Couldn't decode: ${error}`);
    return { authorized: false };
  }
};

export const validateAgentToken: AuthorizerModule = (
  event,
  authorizerHeader = "Authorization"
) => {
  const token = event.headers[authorizerHeader];
  console.log(`Token: ${token}`);

  console.log(`Event: ${JSON.stringify(event)}`);

  const agentToken = "qCqLTQmgLn8xCY8g";
  console.log(`Agent token: ${agentToken}`);

  if (token === agentToken) {
    return { authorized: true, info: { allowedAsAgent: true } };
  } else {
    return { authorized: false };
  }
};

export const validateBotToken: AuthorizerModule = (
  event,
  authorizerHeader = "Authorization"
) => {
  const token = event.headers[authorizerHeader];
  console.log(`Token: ${token}`);

  console.log(`Event: ${JSON.stringify(event)}`);

  const agentToken = "*wYUjqWdew7h5jBam*";
  console.log(`Agent token: ${agentToken}`);

  if (token === agentToken) {
    return { authorized: true, info: { allowedAsAgent: true } };
  } else {
    return { authorized: false };
  }
};
