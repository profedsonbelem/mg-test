import { APIGatewayProxyHandler } from "aws-lambda";
import { Responses } from "./common/api.response";
import { DenylistModel } from "../models/denylist.model";
import { authorizeAdminToken } from "./common/auth";

export const addToDenylist: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  //Auth
  const authorizationResult = authorizeAdminToken(event);
  if (!authorizationResult.authorized) {
    return Responses._400(`Not allowed to perform this operation.`, 403);
  }

  try {
    const { email, reason }: { email: string; reason: string } = JSON.parse(
      event.body
    );

    await DenylistModel.addToList(email, reason);

    return Responses._200(`Success`);
  } catch (error) {
    console.log(`Internal server error: ${error}`);
    return Responses._500(`Internal server error: ${error}`);
  }
};

export const getDenylist: APIGatewayProxyHandler = async (event, _context) => {
  //Auth
  const authorizationResult = authorizeAdminToken(event);
  if (!authorizationResult.authorized) {
    return Responses._400(`Not allowed to perform this operation.`, 403);
  }

  try {
    const detailed = !!event.queryStringParameters
      ? event.queryStringParameters.detailed === "true"
      : false;

    const list = detailed
      ? await DenylistModel.getDetailedList()
      : await DenylistModel.getList();

    return Responses._200(`Sucess`, list);
  } catch (error) {
    console.log(`Internal server error: ${error}`);
    return Responses._500(`Internal server error: ${error}`);
  }
};

export const isInDenylist: APIGatewayProxyHandler = async (event, _context) => {
  //Auth
  const authorizationResult = authorizeAdminToken(event);
  if (!authorizationResult.authorized) {
    return Responses._400(`Not allowed to perform this operation.`, 403);
  }

  try {
    const email = event.pathParameters.email;

    const result = await DenylistModel.isEmailOnList(email);

    return Responses._200(`Success`, result);
  } catch (error) {
    console.log(`Internal server error: ${error}`);
    return Responses._500(`Internal server error: ${error}`);
  }
};
