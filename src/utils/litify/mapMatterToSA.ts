import { applyMaps } from "../misc/object.utils";
import { Vehicle__c as Vehicle } from "../../types/Vehicle__c";
import { Answer } from "../../types/surveyAnswer";
import * as moment from "moment";
import { Matter } from "../../types/matter";

const map: { [att: string]: (matter: Matter) => Answer } = {
  personal_limited_business: (matter) => {
    if (!matter.Personal_limited_business__c) {
      return undefined;
    }

    return {
      answer: matter.Personal_limited_business__c === "Yes",
      questionId: "personal_limited_business",
      isFile: false,
    };
  },
  personal_company_role: (matter) => {
    if (!matter.Personal_company_role__c) {
      return undefined;
    }

    let saSalutation: string;
    let litifySalutation = matter.Personal_company_role__c;
    switch (litifySalutation) {
      case "Director": {
        saSalutation = "director";
        break;
      }
      case "Officer": {
        saSalutation = "officer";
        break;
      }
      case "Secretary": {
        saSalutation = "secretary";
        break;
      }
      case "Other": {
        saSalutation = "other";
        break;
      }
      default: {
        //do nothing
      }
    }

    if (!saSalutation) {
      return undefined;
    }
    return {
      answer: saSalutation,
      questionId: "personal_company_role",
      isFile: false,
    };
  },
  personal_business_name: (matter) => {
    if (!matter.Personal_Business_Name__c) {
      return undefined;
    }

    return {
      answer: matter.Personal_Business_Name__c,
      questionId: "personal_business_name",
      isFile: false,
    };
  },
  q_1594063065076: (matter) => {
    const matterAnswer = matter.lead_source__c;
    if (!matterAnswer) {
      return undefined;
    }

    let surveyAnswer: string;
    switch (matterAnswer) {
      //"Television Ad"
      case "Television Ad": {
        surveyAnswer = "_1594063065077";
        break;
      }
      //"Radio Ad"
      case "Radio Ad": {
        surveyAnswer = "_1594063065078";
        break;
      }
      //"Social Media (Facebook, Instagram, Twitter, LinkedIn etc)"
      case "Social Media (Facebook, Instagram, Twitter, LinkedIn etc)": {
        surveyAnswer = "_1594063065079";
        break;
      }
      //"Search engine (Google etc)"
      case "Search engine (Google,Bing etc)": {
        surveyAnswer = "_1594063065080";
        break;
      }
      //"Word of mouth"
      case "Word of mouth": {
        surveyAnswer = "_1594063065081";
        break;
      }
      //"Other"
      case "Other (please specify)": {
        surveyAnswer = "_1594063065082";
        break;
      }
      default: {
        return undefined;
      }
    }

    return {
      answer: surveyAnswer,
      questionId: "q_1594063065076",
      isFile: false,
    };
  },
  q_1594063065083: (matter) => {
    if (!matter.lead_source_other__c) {
      return undefined;
    }

    return {
      answer: matter.lead_source_other__c,
      questionId: "q_1594063065076",
      isFile: false,
    };
  },
};
export const matterToSuveyAnswer = (matter: Matter) => {
  return applyMaps<Matter>(matter, map);
};
