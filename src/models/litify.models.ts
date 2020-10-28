import { Intake } from "../types/intake";
import { Account } from "../types/accounts";
import { Matter } from "../types/matter";
import { Vehicle__c as Vehicle } from "../types/Vehicle__c";
import { litify_pm__Intake__c } from "../types/litify_pm__Intake__c";

export class LitifyModel {
  static mapIntakeToAccount(intake: Intake): Account {
    const accountMapped: Account = {
      litify_pm__First_Name__c: intake.first_name || "",
      litify_pm__Last_Name__c: intake.surname || "",
      litify_pm__Email__c: intake.email || "",
      litify_pm__Phone_Home__c: intake.phone,
      litify_pm__Phone_Mobile__c: intake.phone,
    };
    return accountMapped;
  }

  static initializeMatter(
    accountId: string,
    questionnaireId: string,
    token: string
  ): Matter {
    let caseType: string;
    switch (questionnaireId) {
      case "mercedes": {
        caseType = "a035w0000117Y9JAAU";
        break;
      }
      case "test-mercedes": {
        caseType = "a035w0000117Y9JAAU";
        break;
      }
      default: {
        caseType = undefined;
        break;
      }
    }
    return {
      litify_pm__Client__c: accountId,
      statement_of_truth__c: "",
      litify_pm__Status__c: "Open",
      litify_pm__Case_Type__c: caseType,
      Survey_External_Id__c: token,
    };
  }

  static initializeVehicle(accountId: string, matterId: string): Vehicle {
    return {
      Claimant__c: accountId,
      Vehicle__c: matterId,
      Vehicle_Status__c: "Open",
    };
  }

  static initializeIntake(
    accountId: string,
    questionnaireId: string
  ): litify_pm__Intake__c {
    let caseType: string;
    switch (questionnaireId) {
      case "mercedes": {
        caseType = "a035w0000117Y9JAAU";
        break;
      }
      case "test-mercedes": {
        caseType = "a035w0000117Y9JAAU";
        break;
      }
      default: {
        caseType = undefined;
        break;
      }
    }
    return {
      litify_pm__Client__c: accountId,
      litify_pm__Case_Type__c: caseType,
    };
  }
}
