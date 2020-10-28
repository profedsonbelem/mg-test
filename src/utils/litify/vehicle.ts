import litify from "../database/litify.model";
import { Vehicle__c as Vehicle } from "../../types/Vehicle__c";

// export async function createVehicleLitify(vehicle: Vehicle, token: string) {
//   const result = await litify.create("Vehicle__c", vehicle);

//   return { vehicleId: result };
// }

// export async function getVehicleLitify(Id: string, token: string) {
//   const vehicle = await litify.retrieve<Vehicle>("Vehicle__c", Id);

//   return vehicle;
// }

// export async function updateVehicleLitify(vehicle: Vehicle, token: string) {
//   if (!vehicle.Id) {
//     console.log(`Must inform Id`);
//     throw new Error("Missing id in vehicle");
//   }
//   const result = await litify.update("Vehicle__c", vehicle);

//   return result;
// }

// export async function deleteVehicleLitify(vehicleId: string, token: string) {
//   return await litify.delete("Vehicle__c", vehicleId);
// }
