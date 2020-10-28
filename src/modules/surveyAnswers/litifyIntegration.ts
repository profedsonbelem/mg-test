import litify from "../../utils/database/litify.model";
import { Matter } from "../../types/matter";
import { Vehicle__c as Vehicle } from "../../types/Vehicle__c";
import { Account } from "../../types/accounts";
import { accountToSuveyAnswer } from "../../utils/litify/mapAccountToSA";
import { matterToSuveyAnswer } from "../../utils/litify/mapMatterToSA";
import { vehicleToSuveyAnswer } from "../../utils/litify/mapVehicleToSA";
import { Answer } from "../../types/surveyAnswer";
import { CLIENT_STATUS } from "../../types/status";
// import { saToMatter } from "../../utils/litify/mapSAToMatter";
// import { saToAccount } from "../../utils/litify/mapSAToAccount";
// import { saToVehicle } from "../../utils/litify/mapSAToVehicle";

export async function retrieveFromLitify(
  token: string
): Promise<{ answers: { [id: string]: Answer }; status: CLIENT_STATUS }> {
  // Retrieve litify data
  const { account, matter, vehicle } = await retrievelitifyData(token);

  // Fill answers
  const answers = fillAnswers(account, matter, vehicle);

  // Get status
  const status = getStatus(matter);

  return { answers, status };
}

async function retrievelitifyData(token: string) {
  if (!token) {
    throw new Error("No token given");
  }

  const [matter] = await litify.queryFind<Matter>("litify_pm__Matter__c", {
    Survey_External_Id__c: token,
  });

  if (!matter) {
    throw new Error("Couldn't find matter");
  }

  const [vehicle] = await litify.queryFind<Vehicle>("Vehicle__c", {
    Vehicle__c: matter.Id,
  });

  const [account] = await litify.queryFind<Account>("Account", {
    Id: matter.litify_pm__Client__c,
  });

  return { account, matter, vehicle };
}

// async function retrievelitifyIds(token: string) {
//   if (!token) {
//     throw new Error("No token given");
//   }

//   const [matter] = await litify.soqlFind<Matter>(
//     `SELECT Id, litify_pm__Client__c FROM litify_pm__Matter__c WHERE Survey_External_Id__c='${token}'`
//   );

//   if (!matter) {
//     throw new Error("Couldn't find matter");
//   }
//   // console.log(`\n\n\n\n matter:\n\n\n`);
//   // console.log(matter);
//   // console.log("\n\n\n\n");

//   const [vehicle] = await litify.soqlFind<Vehicle>(
//     `SELECT Id FROM Vehicle__c WHERE Matter__c='${matter.Id}'`
//   );

//   const [account] = await litify.soqlFind<Account>(
//     `SELECT Id FROM Account WHERE Id='${matter.litify_pm__Client__c}'`
//   );

//   return { account, matter, vehicle };
// }

function fillAnswers(account: Account, matter: Matter, vehicle: Vehicle) {
  const answers: { [id: string]: Answer } = {};

  const accountInfo = accountToSuveyAnswer(account);
  for (let att in accountInfo) {
    if (!!accountInfo[att]) {
      answers[att] = accountInfo[att];
    }
  }

  const matterInfo = matterToSuveyAnswer(matter);
  for (let att in matterInfo) {
    if (!!matterInfo[att]) {
      answers[att] = matterInfo[att];
    }
  }

  const vehicleInfo = vehicleToSuveyAnswer(vehicle);
  for (let att in vehicleInfo) {
    if (!!vehicleInfo[att]) {
      answers[att] = vehicleInfo[att];
    }
  }

  return answers;
}

function getStatus(matter: Matter) {
  if (!matter.litify_pm__Status__c) {
    return undefined;
  }

  let saStatus: CLIENT_STATUS;
  let litifyMatterStatus = matter.litify_pm__Status__c;
  switch (litifyMatterStatus) {
    case "Open": {
      saStatus = CLIENT_STATUS.Active;
      break;
    }
    case "Requested Closure": {
      saStatus = CLIENT_STATUS["Requested Cancelation"];
      break;
    }
    case "Closed": {
      saStatus = CLIENT_STATUS["Confirmed Cancelation"];
      break;
    }
    default: {
      saStatus = CLIENT_STATUS.Active;
    }
  }

  if (!saStatus) {
    return undefined;
  }

  return saStatus;
}

// export async function updateInLitify(
//   surveyAnswer: SurveyAnswer,
//   token: string
// ) {
//   // Retrieve litify data
//   let { account, matter, vehicle } = await retrievelitifyIds(token).then(
//     ({ account, matter, vehicle }) => {
//       // Update objects
//       return updateSObjects(surveyAnswer, account.Id, matter.Id, vehicle.Id);
//     }
//   );

//   // Update in litify
//   await updateSObjectsInLitify(account, matter, vehicle);
// }

// function updateSObjects(
//   surveyAnswers: SurveyAnswer,
//   accountId: string,
//   matterId: string,
//   vehicleId: string
// ) {
//   const matter: Matter = { Id: matterId, ...saToMatter(surveyAnswers) };

//   const account: Account = { Id: accountId, ...saToAccount(surveyAnswers) };

//   const vehicle: Vehicle = { Id: vehicleId, ...saToVehicle(surveyAnswers) };

//   return { account, matter, vehicle };
// }

// async function updateSObjectsInLitify(
//   account: Account,
//   matter: Matter,
//   vehicle: Vehicle
// ) {
//   // console.log("\n\n\n\nAccount\n\n\n\n");
//   // console.log(account);
//   // console.log("\n\n\n\nAccount\n\n\n\n");

//   await litify.update("Account", account);
//   await litify.update("litify_pm__Matter__c", matter);
//   await litify.update("Vehicle__c", vehicle);
// }
