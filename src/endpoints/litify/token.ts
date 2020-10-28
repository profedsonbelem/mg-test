// import { APIGatewayProxyHandler } from "aws-lambda";
// import { Responses } from "../common/api.response";
// import { authorizeIfAny } from "../../modules/auth/core";
// import { getToken } from "../../utils/litify/token";

// export const get: APIGatewayProxyHandler = async (event, _context) => {
//   try {
//     const authorizationResult = authorizeIfAny(event, ["validateAdminToken"]);
//     if (!authorizationResult.authorized) {
//       return Responses._400(`Not allowed to perform this operation.`, 403);
//     }

//     const tokenAccount = await getToken();
//     const token = `OAuth ${tokenAccount}`;

//     return Responses._200(`Success`, token);
//   } catch (error) {
//     console.log(`Internal server error: ${error}`);
//     return Responses._500(`Internal server error: ${error}`);
//   }
// };
