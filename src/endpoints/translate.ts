import { APIGatewayProxyHandler } from "aws-lambda";
import { processTranslateRequest } from "../modules/translate/doTranslate";
import { authorizeAdminToken } from "./common/auth";
import { Responses } from "./common/api.response";

export const translateText: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  // const eventData = JSON.parse(event.body);

  try {
    const authorizationResult = authorizeAdminToken(event);
    if (!authorizationResult.authorized) {
      return Responses._400(`Not allowed to perform this operation.`, 403);
    }
    // console.log('begin translation', eventData.data.Text);
    // const res = await processTranslateRequest(eventData.data);
    // console.log('end translation', res);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      },
      body: JSON.stringify({
        statusCode: 200,
        message: "Your function executed successfully!",
        input: event,
        result: await processTranslateRequest(JSON.parse(event.body).data),
      }),
    };
  } catch (error) {
    console.log("error:", error);
    return {
      statusCode: 408,
      body: JSON.stringify({
        statusCode: 408,
        message: "Error",
        input: event,
        result: error,
      }),
    };
  }
};
