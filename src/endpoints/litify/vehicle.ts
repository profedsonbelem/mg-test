// import { APIGatewayProxyHandler } from "aws-lambda";

// import { Responses } from "../common/api.response";
// import {
//   createVehicleLitify,
//   getVehicleLitify,
//   updateVehicleLitify,
//   deleteVehicleLitify,
// } from "../../utils/litify/vehicle";
// import { authorizeIfAny } from "../../modules/auth/core";

// export const createVehicle: APIGatewayProxyHandler = async (
//   event,
//   _context
// ) => {
//   try {
//     const authorizationResult = authorizeIfAny(event, ["validateAdminToken"]);
//     if (!authorizationResult.authorized) {
//       return Responses._400(`Not allowed to perform this operation.`, 403);
//     }

//     const token = process.env.AuthorizationLitify;

//     const vehicle = JSON.parse(event.body);
//     const vehicleId = await createVehicleLitify(vehicle, token);
//     return Responses._200(`Success`, vehicleId, 201);
//   } catch (error) {
//     console.log(`Internal server error: ${error}`);

//     return Responses._500(`Internal server error: ${error}`);
//   }
// };

// export const getVehicle: APIGatewayProxyHandler = async (event, _context) => {
//   try {
//     const authorizationResult = authorizeIfAny(event, ["validateAdminToken"]);
//     if (!authorizationResult.authorized) {
//       return Responses._400(`Not allowed to perform this operation.`, 403);
//     }

//     const vehicleId = event.pathParameters.vehicleId;
//     const token = process.env.AuthorizationLitify;

//     const vehicle = await getVehicleLitify(vehicleId, token);

//     return Responses._200(`Success`, vehicle);
//   } catch (error) {
//     console.log(`Internal server error: ${error}`);

//     return Responses._500(`Internal server error: ${error}`);
//   }
// };

// export const updateVehicle: APIGatewayProxyHandler = async (
//   event,
//   _context
// ) => {
//   try {
//     const authorizationResult = authorizeIfAny(event, ["validateAdminToken"]);
//     if (!authorizationResult.authorized) {
//       return Responses._400(`Not allowed to perform this operation.`, 403);
//     }

//     const token = process.env.AuthorizationLitify;
//     const vehicle = JSON.parse(event.body);
//     const partyId = await updateVehicleLitify(vehicle, token);

//     return Responses._200(`Success`, partyId);
//   } catch (error) {
//     console.log(`Internal server error: ${error}`);

//     return Responses._500(`Internal server error: ${error}`);
//   }
// };

// export const deleteVehicle: APIGatewayProxyHandler = async (
//   event,
//   _context
// ) => {
//   try {
//     const authorizationResult = authorizeIfAny(event, ["validateAdminToken"]);
//     if (!authorizationResult.authorized) {
//       return Responses._400(`Not allowed to perform this operation.`, 403);
//     }

//     const token = process.env.AuthorizationLitify;

//     const vehicleId = event.pathParameters.vehicleId;
//     const vehicleDeleted = await deleteVehicleLitify(vehicleId, token);

//     return Responses._200(`Success`, vehicleDeleted);
//   } catch (error) {
//     console.log(`Internal server error: ${error}`);

//     return Responses._500(`Internal server error: ${error}`);
//   }
// };
