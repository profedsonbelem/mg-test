import { litify_pm__Intake__c } from "../../types/litify_pm__Intake__c";
import litify from "../database/litify.model";

// export async function createIntakeLitify(
//   intakeLitify: litify_pm__Intake__c,
//   token: string
// ) {
//   const result = await litify.create("litify_pm__Intake__c", intakeLitify);

//   return { intakeId: result };
// }

// export async function getIntakeLitify(id: string, token: string) {
//   const intake = await litify.retrieve<litify_pm__Intake__c>(
//     "litify_pm__Intake__c",
//     id
//   );

//   return intake;
// }

// export async function updateIntakeLitify(
//   intakeLitify: litify_pm__Intake__c,
//   token: string
// ) {
//   if (!intakeLitify.Id) {
//     console.log(`Must inform Id`);
//     throw new Error("Missing id in intake");
//   }
//   const result = await litify.update("litify_pm__Intake__c", intakeLitify);

//   return result;
// }

// export async function deleteIntakeLitify(intakeId: string, token: string) {
//   return await litify.delete("litify_pm__Intake__c", intakeId);
// }
