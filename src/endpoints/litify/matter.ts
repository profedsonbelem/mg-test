// import { APIGatewayProxyHandler } from "aws-lambda";

// import { Responses } from "../common/api.response";
// import {
//   createMatterLitify,
//   getMatterLitify,
//   updateMatterLitify,
//   deleteMatterLitify,
// } from "../../utils/litify/matter";
// import { authorizeIfAny } from "../../modules/auth/core";

// export const createMatter: APIGatewayProxyHandler = async (event, _context) => {
//   try {
//     const authorizationResult = authorizeIfAny(event, ["validateAdminToken"]);
//     if (!authorizationResult.authorized) {
//       return Responses._400(`Not allowed to perform this operation.`, 403);
//     }

//     const token = process.env.AuthorizationLitify;

//     const matter = JSON.parse(event.body);
//     const matterId = await createMatterLitify(matter, token);
//     return Responses._200(`Success`, matterId, 201);
//   } catch (error) {
//     console.log(`Internal server error: ${error}`);
//     return Responses._500(`Internal server error: ${error}`);
//   }
// };

// export const getMatter: APIGatewayProxyHandler = async (event, _context) => {
//   try {
//     const authorizationResult = authorizeIfAny(event, ["validateAdminToken"]);
//     if (!authorizationResult.authorized) {
//       return Responses._400(`Not allowed to perform this operation.`, 403);
//     }

//     const id = event.pathParameters.id;
//     const token = process.env.AuthorizationLitify;

//     const matter = await getMatterLitify(id, token);
//     return Responses._200(`Success`, matter);
//   } catch (error) {
//     console.log(`Internal server error: ${error}`);
//     return Responses._500(`Internal server error: ${error}`);
//   }
// };

// export const updateMatter: APIGatewayProxyHandler = async (event, _context) => {
//   try {
//     const authorizationResult = authorizeIfAny(event, ["validateAdminToken"]);
//     if (!authorizationResult.authorized) {
//       return Responses._400(`Not allowed to perform this operation.`, 403);
//     }

//     const token = process.env.AuthorizationLitify;
//     const matter = JSON.parse(event.body);
//     const matterUpdated = await updateMatterLitify(matter, token);

//     return Responses._200(`Success`, matterUpdated);
//   } catch (error) {
//     console.log(`Internal server error: ${error}`);

//     return Responses._500(`Internal server error: ${error}`);
//   }
// };

// export const deleteMatter: APIGatewayProxyHandler = async (event, _context) => {
//   try {
//     const authorizationResult = authorizeIfAny(event, ["validateAdminToken"]);
//     if (!authorizationResult.authorized) {
//       return Responses._400(`Not allowed to perform this operation.`, 403);
//     }

//     const token = process.env.AuthorizationLitify;

//     const matterId = event.pathParameters.matterId;
//     const matterDeleted = await deleteMatterLitify(matterId, token);
//     return Responses._200(`Success`, matterDeleted);
//   } catch (error) {
//     console.log(`Internal server error: ${error}`);
//     return Responses._500(`Internal server error: ${error}`);
//   }
// };
