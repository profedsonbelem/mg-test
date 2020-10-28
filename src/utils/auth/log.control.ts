import { APIGatewayProxyEvent } from "aws-lambda";
import db from "../database/db.model";
import { ObjectId } from "mongodb";

/** @todo Consider keeping log in s3 */
export async function logUnauthorizedRequest(
  userId: string,
  event: APIGatewayProxyEvent
) {
  const log = {
    method: event.httpMethod,
    collection: event.pathParameters.collection,
    time: new Date(event.requestContext.requestTimeEpoch),
    ip: event.requestContext.identity.sourceIp,
  };

  //Add request to log
  await db.update(
    "UnauthorizedRequests",
    { _id: userId },
    { $addToSet: { requests: log } },
    false
  );

  //Delete user token
  await db.update(
    "Users",
    { _id: new ObjectId(userId) },
    { $unset: { token: "" } },
    false
  );
}
