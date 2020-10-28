// import { APIGatewayProxyHandler } from "aws-lambda";

// import { Responses } from "../common/api.response";
// import {
//   createIntakeLitify,
//   getIntakeLitify,
//   updateIntakeLitify,
//   deleteIntakeLitify,
// } from "../../utils/litify/intakeLitify";
// import { authorizeIfAny } from "../../modules/auth/core";

// export const createIntake: APIGatewayProxyHandler = async (event, _context) => {
//   try {
//     const authorizationResult = authorizeIfAny(event, ["validateAdminToken"]);
//     if (!authorizationResult.authorized) {
//       return Responses._400(`Not allowed to perform this operation.`, 403);
//     }

//     const token = process.env.AuthorizationLitify;
//     const intake = JSON.parse(event.body);
//     const intakeId = await createIntakeLitify(intake, token);
//     return Responses._200(`Success`, intakeId, 201);
//   } catch (error) {
//     console.log(`Internal server error: ${error}`);
//     return Responses._500(`Internal server error: ${error}`);
//   }
// };

// export const getIntake: APIGatewayProxyHandler = async (event, _context) => {
//   try {
//     const authorizationResult = authorizeIfAny(event, ["validateAdminToken"]);
//     if (!authorizationResult.authorized) {
//       return Responses._400(`Not allowed to perform this operation.`, 403);
//     }

//     const intakeId = event.pathParameters.intakeId;
//     const token = process.env.AuthorizationLitify;

//     const intake = await getIntakeLitify(intakeId, token);
//     return Responses._200(`Success`, intake);
//   } catch (error) {
//     console.log(`Internal server error: ${error}`);
//     return Responses._500(`Internal server error: ${error}`);
//   }
// };

// export const updateIntake: APIGatewayProxyHandler = async (event, _context) => {
//   try {
//     const authorizationResult = authorizeIfAny(event, ["validateAdminToken"]);
//     if (!authorizationResult.authorized) {
//       return Responses._400(`Not allowed to perform this operation.`, 403);
//     }

//     const token = process.env.AuthorizationLitify;
//     const intake = JSON.parse(event.body);
//     const intakeId = await updateIntakeLitify(intake, token);

//     return Responses._200(`Success`, intakeId);
//   } catch (error) {
//     console.log(`Internal server error: ${error}`);

//     return Responses._500(`Internal server error: ${error}`);
//   }
// };

// export const deleteIntake: APIGatewayProxyHandler = async (event, _context) => {
//   try {
//     const authorizationResult = authorizeIfAny(event, ["validateAdminToken"]);
//     if (!authorizationResult.authorized) {
//       return Responses._400(`Not allowed to perform this operation.`, 403);
//     }

//     const token = process.env.AuthorizationLitify;
//     const intakeId = event.pathParameters.intakeId;
//     const intakeDeleted = await deleteIntakeLitify(intakeId, token);
//     return Responses._200(`Success`, intakeDeleted);
//   } catch (error) {
//     console.log(`Internal server error: ${error}`);
//     return Responses._500(`Internal server error: ${error}`);
//   }
// };
