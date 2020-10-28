import { APIGatewayProxyHandler } from "aws-lambda";
import { Responses } from "./common/api.response";
import { authorizeAdminToken } from "./common/auth";
import { BulkSMSData } from "../types/sms";
import { processSMSRequest } from "../utils/SMS/send";

export const sendSMS: APIGatewayProxyHandler = async (event, _context) => {
  const authorizationResult = authorizeAdminToken(event);
  if (!authorizationResult.authorized) {
    return Responses._400(`Not allowed to perform this operation.`, 403);
  }
  // console.log();

  const eventData: BulkSMSData = JSON.parse(event.body);
  let success: { phone: string; contactId: string; date: number }[] = [];
  let fail: { phone: string; error: string; date: number }[] = [];

  for (let i = 0; i < eventData.receiver.length; i++) {
    try {
      const sts = await processSMSRequest(
        eventData.receiver[i],
        eventData.message,
        eventData.subject,
        eventData.sender
      );
      success.push({
        phone: eventData.receiver[i],
        contactId: JSON.stringify(sts.insertedIds),
        date: new Date().getTime(),
      });
    } catch (error) {
      console.log(`Error sending to ${eventData.receiver[i]}: ${error}`);
      fail.push({
        phone: eventData.receiver[i],
        error: `Error on send: ${error}`,
        date: new Date().getTime(),
      });
    }
  }

  if (fail.length === 0) {
    return Responses._200(
      "Full SMS result. (Object type -> {success: { phone: string; contactId: string; date: number }[]})",
      { statusCode: 200, success }
    );
  } else {
    return Responses._200(
      `Partial SMS result. (Object type -> {
               success: { email: string; status: string; date: number(milis) }[]
               fail: { phone: string; error: string; date: number }[]
            })`,
      { statusCode: 206, success, fail },
      206
    );
  }
};
