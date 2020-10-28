import { APIGatewayProxyHandler } from "aws-lambda";
import { decodeJWT } from "../utils/auth/token.utils";
import { Responses } from "./common/api.response";

export const validateToken: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  const tokenType = !!event.queryStringParameters
    ? event.queryStringParameters.type || "admin"
    : "admin";
  const token = event.pathParameters.token;

  try {
    switch (tokenType) {
      case "admin": {
        if (token !== "ernj4ZLjhhm2sRxB" && token !== "3YsyYH7duA8EjGDP") {
          throw new Error(`Invalid token`);
        } else {
          break;
        }
      }
      case "agent": {
        if (token !== "qCqLTQmgLn8xCY8g") {
          throw new Error(`Invalid token`);
        } else {
          break;
        }
      }
      case "jwt": {
        const decoded = decodeJWT(token);

        if (!decoded.userEmail || !decoded.userId) {
          console.log(
            `Token has ${decoded.userId} _id and ${decoded.userEmail} email`
          );
          throw new Error("Decoded token missing properties.");
        } else {
          break;
        }
      }
      default: {
        throw new Error(`Unknown token type ${tokenType}`);
      }
    }
  } catch (error) {
    return Responses._400(`Invalid ${tokenType} token: ${error}`);
  }
  return Responses._200(`Valid ${tokenType} token`, { valid: true });
};
