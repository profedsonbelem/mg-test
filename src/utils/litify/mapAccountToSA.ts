import { applyMaps } from "../misc/object.utils";
import { Answer } from "../../types/surveyAnswer";
import { Account } from "../../types/accounts";
import * as moment from "moment";

const map: { [att: string]: (account: Account) => Answer } = {
  contact_email: (account) => {
    if (!account.litify_pm__Email__c) {
      return undefined;
    }

    return {
      answer: account.litify_pm__Email__c,
      questionId: "contact_email",
      isFile: false,
    };
  },
  contact_phone: (account) => {
    const phone = [account.litify_pm__Phone_Mobile__c];
    let saAnswer;

    for (let i = 0; i < phone.length; i++) {
      if (!!phone[i]) {
        saAnswer = phone[i];
        return {
          answer: saAnswer,
          questionId: "contact_phone",
          isFile: false,
        };
      }
    }

    if (!saAnswer) {
      return undefined;
    }
  },
  address_complete: (account) => {
    const streetAndNumber = (account.BillingStreet || "").split(",");
    const contact_street = (streetAndNumber[0] || "").trim();
    const contact_house_name_number = (streetAndNumber[1] || "").trim();
    const contact_county = account.BillingCountry || "";
    const contact_town = account.BillingCity || "";
    const contact_postcode = account.BillingPostalCode || "";

    if (
      !contact_street ||
      !contact_house_name_number ||
      !contact_county ||
      !contact_town ||
      !contact_postcode
    ) {
      return undefined;
    }

    return {
      answer: JSON.stringify({
        contact_street,
        contact_house_name_number,
        contact_county,
        contact_town,
        contact_postcode,
      }),
      questionId: "address_complete",
      isFile: false,
      additionalInfo: " ",
    };
  },
  personal_date_of_birth: (account) => {
    if (!account.litify_pm__Date_of_birth__c) {
      return undefined;
    }
    const date = new Date(account.litify_pm__Date_of_birth__c);
    console.log("DOB", date);

    return {
      answer: moment(date).utc().format("DD/MM/YYYY"),
      questionId: "personal_date_of_birth",
      isFile: false,
    };
  },
  personal_first_name: (account) => {
    if (!account.litify_pm__First_Name__c) {
      return undefined;
    }
    return {
      answer: account.litify_pm__First_Name__c,
      questionId: "personal_first_name",
      isFile: false,
    };
  },
  personal_surname: (account) => {
    if (!account.litify_pm__Last_Name__c) {
      return undefined;
    }
    return {
      answer: account.litify_pm__Last_Name__c,
      questionId: "personal_surname",
      isFile: false,
    };
  },
  personal_title: (account) => {
    if (!account.litify_pm__Salutation__c) {
      return undefined;
    }

    let saSalutation: string;
    let litifySalutation = account.litify_pm__Salutation__c;
    switch (litifySalutation) {
      case "Mr.": {
        saSalutation = "mr";
        break;
      }
      case "Mrs.": {
        saSalutation = "mrs";
        break;
      }
      case "Ms.": {
        saSalutation = "ms";
        break;
      }
      default: {
        // Nothing
      }
    }

    if (!saSalutation) {
      return undefined;
    }
    return {
      answer: saSalutation,
      questionId: "personal_title",
      isFile: false,
    };
  },
  // personal_company_role: (account) => {
  //   if (!account.Occupation__c) {
  //     return undefined;
  //   }

  //   const possible = ["director", "officer", "secretary"];
  //   let saOcupation = account.Occupation__c.toLowerCase();
  //   if (!possible.includes(saOcupation)) {
  //     saOcupation = "other";
  //   }
  //   return {
  //     answer: saOcupation,
  //     questionId: "personal_company_role",
  //     isFile: false,
  //   };
  // },
};
export const accountToSuveyAnswer = (account: Account) => {
  return applyMaps<Account>(account, map);
};
