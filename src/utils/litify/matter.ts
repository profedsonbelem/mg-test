import { Matter } from "../../types/matter";
import litify from "../database/litify.model";

// export async function createMatterLitify(matter: Matter, token: string) {
//   if (!matter.litify_pm__Client__c) {
//     throw new Error("Missing account id");
//   }

//   const result = await litify.create<Matter>("litify_pm__Matter__c", matter);

//   return { matterId: result };
// }

// export async function getMatterLitify(id: string, token: string) {
//   const matter = await litify.retrieve<Matter>("litify_pm__Matter__c", id);

//   return matter;
// }

// export async function updateMatterLitify(matter: Matter, token: string) {
//   if (!matter.Id) {
//     console.log(`Must inform Id`);
//     throw new Error("Missing id in matter");
//   }
//   const result = await litify.update("litify_pm__Matter__c", matter);

//   return result;
// }

// export async function deleteMatterLitify(matterId: string, token: string) {
//   return await litify.delete("litify_pm__Matter__c", matterId);
// }

export async function getMatterFromToken(token: string) {
  const [matter] = await litify.queryFind<Matter>("litify_pm__Matter__c", {
    Survey_External_Id__c: token,
  });

  return matter;
}
