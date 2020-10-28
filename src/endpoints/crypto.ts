import { APIGatewayProxyHandler } from "aws-lambda";
import { Responses } from "./common/api.response";
import { decryptToken as decrypt, createJWT } from "../utils/auth/token.utils";
import { TokenPayload } from "../types/tokenPayload";

export { decryptToken };

const decryptToken: APIGatewayProxyHandler = async (event, _context) => {
  try {
    const token = event.pathParameters.token;
    const tokenDecrypted = decrypt(token);
    const payload: TokenPayload = JSON.parse(tokenDecrypted);
    const sessionJWT = createJWT(payload);

    return Responses._200("Decrypted", { tokenDecrypted, sessionJWT });
  } catch (error) {
    console.log("ERROR - ", error);
    return Responses._500(`Internal error. See logs for details ${error}`);
  }
};
