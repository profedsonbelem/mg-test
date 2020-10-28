import { CLIENT_STATUS } from "./status";

export interface Account {
  Id?: string;
  Name?: string;
  BillingStreet?: string;
  BillingCity?: string;
  BillingState?: string;
  BillingPostalCode?: string;
  BillingCountry?: string;
  ShippingStreet?: string;
  ShippingCity?: string;
  ShippingState?: string;
  ShippingPostalCode?: string;
  ShippingCountry?: string;
  Phone?: string;
  Fax?: string;
  Website?: string;
  Industry?: string;
  AnnualRevenue?: number;
  NumberOfEmployees?: number;
  Description?: string;
  CreatedDate?: Date;
  LastModifiedDate?: Date;
  LastActivityDate?: Date;
  IsCustomerPortal?: boolean;
  litify_pm__Date_of_birth__c?: Date;
  litify_pm__Email__c?: string;
  litify_pm__First_Name__c?: string;
  litify_pm__Gender__c?: string; // Picklist
  litify_pm__Last_Name__c?: string;
  litify_pm__Phone_Home__c?: string;
  litify_pm__Phone_Mobile__c?: string;
  litify_pm__Phone_Other__c?: string;
  litify_pm__Phone_Work__c?: string;
  litify_pm__SLA__c?: string; // Picklist
  litify_pm__Salutation__c?: string; // Picklist
  litify_pm__Social_Security_Number__c?: string;
  litify_pm__Last_Called_At__c?: Date;
  litify_pm__Last_Emailed_At__c?: Date;
  litify_pm__Total_Calls__c?: number;
  litify_pm__Total_Emails__c?: number;
  Personal_Surname__c?: string;
  OldSFID__c?: string;
  litify_pm__lit_Calculated_Age__c?: number;
  litify_pm__lit_Has_Birthdate__c?: boolean;
  litify_pm__lit_Is_Deceased__c?: boolean;
  litify_pm__lit_Billing_County__c?: string;
  litify_pm__lit_Shipping_County__c?: string;
  Does_client_live_or_work_in_London__c?: string; // Picklist
  Occupation__c?: string;
  Country__c?: string; // Picklist
  Type_of_ID__c?: string; // Picklist
  Actual_ID_Value__c?: string;
  Date_of_Death__c?: Date;
  Does_client_lack_capacity__c?: string; // Picklist
  CPF__c?: string;
  secondary_email__c?: string;
  City__c?: string;
  State__c?: string;
  Zip_Code__c?: string;
  Discontinued__c?: string; // Picklist
  Breakup_sent__c?: string; // Picklist
  Contract_status__c?: string; // Picklist
  Observation__c?: string;
  Source__c?: string;
  Street__c?: string;
  Schooling__c?: string; // Picklist
  PGMBM_ID__c?: string;
  Id_da_Lista__c?: number;
}
