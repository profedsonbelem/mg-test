// import { APIGatewayProxyHandler } from "aws-lambda";

// import { Responses } from "../common/api.response";
// import {
//   createAccountLitify,
//   getAccountLitify,
//   updateAccountLitify,
//   deleteAccountLitify,
// } from "../../utils/litify/accounts";
// import { authorizeIfAny } from "../../modules/auth/core";

// export const createAccount: APIGatewayProxyHandler = async (
//   event,
//   _context
// ) => {
//   try {
//     const authorizationResult = authorizeIfAny(event, ["validateAdminToken"]);
//     if (!authorizationResult.authorized) {
//       return Responses._400(`Not allowed to perform this operation.`, 403);
//     }

//     const token = process.env.AuthorizationLitify;
//     const account = JSON.parse(event.body);
//     const partyId = await createAccountLitify(account, token);
//     return Responses._200(`Success`, partyId, 201);
//   } catch (error) {
//     console.log(`Internal server error: ${error}`);
//     return Responses._500(`Internal server error: ${error}`);
//   }
// };

// export const getAccount: APIGatewayProxyHandler = async (event, _context) => {
//   try {
//     const authorizationResult = authorizeIfAny(event, ["validateAdminToken"]);
//     if (!authorizationResult.authorized) {
//       return Responses._400(`Not allowed to perform this operation.`, 403);
//     }

//     const id = event.pathParameters.id;
//     const token = process.env.AuthorizationLitify;

//     const account = await getAccountLitify(id, token);
//     return Responses._200(`Success`, account);
//   } catch (error) {
//     console.log(`Internal server error: ${error}`);
//     return Responses._500(`Internal server error: ${error}`);
//   }
// };

// export const updateAccount: APIGatewayProxyHandler = async (
//   event,
//   _context
// ) => {
//   try {
//     const authorizationResult = authorizeIfAny(event, ["validateAdminToken"]);
//     if (!authorizationResult.authorized) {
//       return Responses._400(`Not allowed to perform this operation.`, 403);
//     }

//     const token = process.env.AuthorizationLitify;
//     const account = JSON.parse(event.body);
//     const partyId = await updateAccountLitify(account, token);

//     return Responses._200(`Success`, partyId);
//   } catch (error) {
//     console.log(`Internal server error: ${error}`);

//     return Responses._500(`Internal server error: ${error}`);
//   }
// };

// export const deleteAccount: APIGatewayProxyHandler = async (
//   event,
//   _context
// ) => {
//   try {
//     const authorizationResult = authorizeIfAny(event, ["validateAdminToken"]);
//     if (!authorizationResult.authorized) {
//       return Responses._400(`Not allowed to perform this operation.`, 403);
//     }

//     const token = process.env.AuthorizationLitify;
//     const partyId = event.pathParameters.partyId;
//     const accountDeleted = await deleteAccountLitify(partyId, token);
//     return Responses._200(`Success`, accountDeleted);
//   } catch (error) {
//     console.log(`Internal server error: ${error}`);
//     return Responses._500(`Internal server error: ${error}`);
//   }
// };
