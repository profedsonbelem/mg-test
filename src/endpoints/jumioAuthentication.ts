import { APIGatewayProxyHandler, AuthResponseContext } from "aws-lambda";
import { Responses } from "./common/api.response";
import {
  postInJumio,
  savePostData,
  validateCallback,
  parseJumioData,
  updateJumioData,
  emailJumioData,
  getJumioData,
  JumioData,
} from "../modules/jumio/jumio";
import { TokenPayload } from "../types/tokenPayload";
import { authorizeJWT, authorizeAdminOrJWT } from "./common/auth";

export const authenticateDoc: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  const authorizationResult = authorizeJWT(event);
  if (!authorizationResult.authorized) {
    return Responses._400(`Not allowed to perform this operation.`, 403);
  }

  const decodedToken = authorizationResult.info;

  if (!decodedToken || !decodedToken.userId) {
    console.log("Missing token");
    return Responses._400(
      "Internal server error: didn't decode token in authorizer",
      403
    );
  }

  try {
    const postResponse = await postInJumio(decodedToken.userId);
    console.log(`Post response: ${JSON.stringify(postResponse)}`);

    await savePostData(postResponse);

    return Responses._200("Posted in Jumio", {
      link: postResponse.jumioResponse.redirectUrl,
      transactionReference: postResponse.jumioResponse.transactionReference,
    });
  } catch (error) {
    console.log(`Failed to post: ${error}`);
    console.log(`Failed to post (stringify): ${JSON.stringify(error)}`);
    return Responses._500(`Failed to post: ${error}`);
  }
};

export const jumioCallback: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  console.log(`Received Jumio callback!`);
  const validCallback = await validateCallback(event);

  if (!validCallback) {
    console.log("Invalid Jumio callback!");
    return Responses._500("Invalid Jumio Callback!");
  }

  try {
    const jumioData = await parseJumioData(event);
    console.log(`Jumio data: ${JSON.stringify(jumioData)}`);

    await updateJumioData(jumioData);
    console.log("Saved Jumio data");

    await emailJumioData(jumioData);
    console.log(`Email with data sent`);

    return Responses._200("Ok!");
  } catch (error) {
    console.log(`Server error: ${error}`);
    return Responses._500(`Server error: ${error}`);
  }
};

export const getAuthenticationResult: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  const authorizationResult = authorizeAdminOrJWT(event);
  if (!authorizationResult.authorized) {
    return Responses._400(`Not allowed to perform this operation.`, 403);
  }

  if (!event.queryStringParameters) {
    console.log("Missing query params");
    return Responses._400("Missing query params", 401);
  }

  const transactionReference = event.queryStringParameters.transactionReference;

  if (!transactionReference) {
    console.log("Missing token");
    return Responses._400("Missing token", 401);
  }

  console.log(`Getting Jumio data for ${transactionReference}`);
  try {
    const jumioData = await getJumioData(transactionReference);

    //Authorize request
    const allowed = authorize(jumioData, authorizationResult.info);
    if (!allowed) {
      return Responses._400(
        `Not allowed to get results for ${transactionReference}`,
        403
      );
    }

    if (!jumioData.jumioResult) {
      console.log(`Jumio not done`);
      return Responses._200("Not done", { done: false });
    } else {
      console.log(`Jumio done`);
      return Responses._200("Done", { done: true, data: jumioData });
    }
  } catch (error) {
    console.log(`Couldn't retrieve result: ${error}`);
    return Responses._500(`Couldn't retrieve result: ${error}`);
  }
};

function authorize(data: JumioData, authContext?: AuthResponseContext) {
  if (!authContext) {
    console.log("No auth context");
    return false;
  }

  const tokenPayload = authContext;

  if (!!tokenPayload.allowedAsAdmin) {
    console.log("Allowed as admin");
    return true;
  }

  console.log(
    `Allowed if ${data.internalReference.userReference} === ${tokenPayload.userId}`
  );
  return data.internalReference.userReference === tokenPayload.userId;
}
