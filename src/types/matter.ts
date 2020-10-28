import { MATTER_STATUS } from "./status";

export type lead_source__cType =
  | "Social Media (Facebook, Instagram, Twitter, LinkedIn etc)"
  | "Search engine (Google,Bing etc)"
  | "Television Ad"
  | "Radio Ad"
  | "Other (please specify)"
  | "Word of mouth";

export interface Matter {
  Id?: string;
  litify_pm__Client__c?: string;
  statement_of_truth__c?: string;
  litify_pm__Status__c: MATTER_STATUS;
  litify_pm__Case_Type__c?: string;
  Personal_company_role__c?: string;
  Personal_Business_Name__c?: string;
  Personal_limited_business__c?: string;
  Survey_External_Id__c?: string;
  lead_source__c?: lead_source__cType;
  /** Max length: 100 */
  lead_source_other__c?: string;
}
