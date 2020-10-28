import { APIGatewayProxyHandler } from "aws-lambda";
import { addText } from "../modules/pdf/addText";
import { authorizeAdminToken } from "./common/auth";
import { Responses } from "./common/api.response";

export const addTextHandler: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  const authorizationResult = authorizeAdminToken(event);
  if (!authorizationResult.authorized) {
    return Responses._400(`Not allowed to perform this operation.`, 403);
  }

  // console.log();
  const eventData = JSON.parse(event.body);

  if (
    !eventData.token ||
    eventData.token !==
      "9ebb2272-ba07-4771-a426-7ca2609d7e6b-c233f091-8b59-42fc-bcf9-4793a0a846d7"
  ) {
    const file = await addText(
      eventData.bytes,
      eventData.text,
      "serif-bold",
      12,
      0.5,
      0.5,
      1,
      0,
      0
    );

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      },
      body: JSON.stringify(
        {
          message: "ok",
          file,
        },
        null,
        2
      ),
    };
  } else {
    return {
      statusCode: 401,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      },
      body: JSON.stringify(
        {
          message: "Unauthorized",
        },
        null,
        2
      ),
    };
  }
};
