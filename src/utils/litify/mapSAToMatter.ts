import {
  applyMaps,
  getOnlyAttributes,
  getAttribute,
} from "../misc/object.utils";
import { Vehicle__c as Vehicle } from "../../types/Vehicle__c";
import { Answer, SurveyAnswer } from "../../types/surveyAnswer";
import * as moment from "moment";
import { Matter, lead_source__cType } from "../../types/matter";
import { MATTER_STATUS, CLIENT_STATUS } from "../../types/status";

const map: { [att in keyof Matter]?: (surveyAnswer: SurveyAnswer) => any } = {
  Personal_limited_business__c: (surveyAnswer) => {
    const ans = getAttribute(
      surveyAnswer,
      "answers.personal_limited_business.answer"
    );
    if (ans === true) return "Yes";
    else if (ans === false) return "No";
    else return undefined;
  },
  Personal_company_role__c: (surveyAnswer) => {
    const ans = getAttribute(
      surveyAnswer,
      "answers.personal_company_role.answer"
    );

    if (!ans) {
      return undefined;
    }

    switch (ans) {
      case "director": {
        return "Director";
      }
      case "officer": {
        return "Officer";
      }
      case "secretary": {
        return "Secretary";
      }
      case "other": {
        return "Other";
      }
      default: {
        return undefined;
      }
    }
  },
  Personal_Business_Name__c: (surveyAnswer) => {
    return getAttribute(surveyAnswer, "answers.personal_business_name.answer");
  },
  litify_pm__Status__c: (surveyAnswer) => {
    let status: MATTER_STATUS;
    const statusAsClient = surveyAnswer.statusAsClient;
    if (statusAsClient === undefined) {
      status = "Open";
    } else {
      switch (statusAsClient) {
        case CLIENT_STATUS.Active: {
          status = "Open";
          break;
        }
        case CLIENT_STATUS["Confirmed Cancelation"]: {
          status = "Closed";
          break;
        }
        case CLIENT_STATUS["Requested Cancelation"]: {
          status = "Requested Closure";
          break;
        }
        default: {
          status = "Open";
          break;
        }
      }
    }

    return status;
  },
  statement_of_truth__c: (surveyAnswer) => {
    const ans = getAttribute(surveyAnswer, "answers.statement_of_truth.answer");
    if (!ans) {
      return undefined;
    }

    return "Ok";
  },
  litify_pm__Case_Type__c: (surveyAnswer) => {
    switch (surveyAnswer.questionnaireId) {
      case "mercedes": {
        return "a035w0000117Y9JAAU";
      }
      case "test-mercedes": {
        return "a035w0000117Y9JAAU";
      }
      default: {
        return undefined;
      }
    }
  },
  lead_source__c: (surveyAnswer): lead_source__cType => {
    const ans = surveyAnswer.answers?.q_1594063065076.answer;
    if (ans === undefined) {
      return;
    } else {
      switch (ans) {
        //"Television Ad"
        case "_1594063065077": {
          return "Television Ad";
        }
        //"Radio Ad"
        case "_1594063065078": {
          return "Radio Ad";
        }
        //"Social Media (Facebook, Instagram, Twitter, LinkedIn etc)"
        case "_1594063065079": {
          return "Social Media (Facebook, Instagram, Twitter, LinkedIn etc)";
        }
        //"Search engine (Google etc)"
        case "_1594063065080": {
          return "Search engine (Google,Bing etc)";
        }
        //"Word of mouth"
        case "_1594063065081": {
          return "Word of mouth";
        }
        //"Other"
        case "_1594063065082": {
          return "Other (please specify)";
        }
        default: {
          return;
        }
      }
    }
  },
  lead_source_other__c: (surveyAnswer) => {
    const ans = surveyAnswer.answers?.q_1594063065083.answer;
    if (ans === undefined) {
      return;
    } else {
      return ans;
    }
  },
};
export const saToMatter = (surveyAnswers: SurveyAnswer) => {
  return applyMaps<SurveyAnswer>(surveyAnswers, map);
};
