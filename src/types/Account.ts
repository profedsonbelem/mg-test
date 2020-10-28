/** @constant salesforceName Type name in salesforce */
export const salesforceName = "Account";

/** @constant allFields All fields, comma separated.
 * As salesforce doesn't support 'SELECT *', use 'SELECT `${allFields}`'
 */
export const allFields =
  "Id, IsDeleted, MasterRecordId, Name, Type, RecordTypeId, ParentId, BillingStreet, BillingCity, BillingState, BillingPostalCode, BillingCountry, BillingLatitude, BillingLongitude, BillingGeocodeAccuracy, BillingAddress, ShippingStreet, ShippingCity, ShippingState, ShippingPostalCode, ShippingCountry, ShippingLatitude, ShippingLongitude, ShippingGeocodeAccuracy, ShippingAddress, Phone, Fax, Website, PhotoUrl, Industry, AnnualRevenue, NumberOfEmployees, Description, OwnerId, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, LastViewedDate, LastReferencedDate, IsCustomerPortal, Jigsaw, JigsawCompanyId, AccountSource, SicDesc, litify_pm__Date_of_birth__c, litify_pm__Email__c, litify_pm__First_Name__c, litify_pm__Gender__c, litify_pm__Last_Name__c, litify_pm__Phone_Home__c, litify_pm__Phone_Mobile__c, litify_pm__Phone_Other__c, litify_pm__Phone_Work__c, litify_pm__SLA__c, litify_pm__Salutation__c, litify_pm__Social_Security_Number__c, litify_pm__Last_Called_At__c, litify_pm__Last_Emailed_At__c, litify_pm__Total_Calls__c, litify_pm__Total_Emails__c, Personal_Surname__c, OldSFID__c, litify_pm__lit_Calculated_Age__c, litify_pm__lit_Has_Birthdate__c, litify_pm__lit_Is_Deceased__c, litify_pm__lit_Billing_County__c, litify_pm__lit_Shipping_County__c, Does_client_live_or_work_in_London__c, Occupation__c, Country__c, Type_of_ID__c, Actual_ID_Value__c, Date_of_Death__c, Does_client_lack_capacity__c, CPF__c, secondary_email__c, City__c, State__c, Zip_Code__c, Discontinued__c, Breakup_sent__c, Contract_status__c, Observation__c, Source__c, Street__c, Schooling__c, PGMBM_ID__c, Id_da_Lista__c";

/** @interface Account (labeled as Party)
 * Check Account.md for fields labels and relationship info.
 */
export interface Account {
  Id?: string; // Max length: 18
  IsDeleted?: boolean;
  MasterRecordId?: any; // Check Account relationship MasterRecord.
  Name: string; // Max length: 255
  Type?: TypeType;
  RecordTypeId?: any; // Check RecordType relationship RecordType.
  ParentId?: any; // Check Account relationship Parent.
  BillingStreet?: string; // Max length: 255
  BillingCity?: string; // Max length: 40
  BillingState?: string; // Max length: 80
  BillingPostalCode?: string; // Max length: 20
  BillingCountry?: string; // Max length: 80
  BillingLatitude?: number; // Max length: 3.15
  BillingLongitude?: number; // Max length: 3.15
  BillingGeocodeAccuracy?: BillingGeocodeAccuracyType;
  BillingAddress?: any; // Check .md for details.
  ShippingStreet?: string; // Max length: 255
  ShippingCity?: string; // Max length: 40
  ShippingState?: string; // Max length: 80
  ShippingPostalCode?: string; // Max length: 20
  ShippingCountry?: string; // Max length: 80
  ShippingLatitude?: number; // Max length: 3.15
  ShippingLongitude?: number; // Max length: 3.15
  ShippingGeocodeAccuracy?: ShippingGeocodeAccuracyType;
  ShippingAddress?: any; // Check .md for details.
  Phone?: string; // Phone. Max length: 40
  Fax?: string; // Phone. Max length: 40
  Website?: any; // Check .md for details.
  PhotoUrl?: any; // Check .md for details.
  Industry?: IndustryType;
  AnnualRevenue?: number; // Max length: 18.0
  NumberOfEmployees?: number; // Max length: 8
  Description?: string; // Max length: 32000
  OwnerId?: any; // Check User relationship Owner.
  CreatedDate?: Date;
  CreatedById?: any; // Check User relationship CreatedBy.
  LastModifiedDate?: Date;
  LastModifiedById?: any; // Check User relationship LastModifiedBy.
  SystemModstamp?: Date;
  LastActivityDate?: string; // YYYY-MM-DD
  LastViewedDate?: Date;
  LastReferencedDate?: Date;
  IsCustomerPortal?: boolean;
  Jigsaw?: string; // Max length: 20
  JigsawCompanyId?: string; // Max length: 20
  AccountSource?: AccountSourceType;
  SicDesc?: string; // Max length: 80
  litify_pm__Date_of_birth__c?: string; // YYYY-MM-DD
  litify_pm__Email__c?: string; // Email. Max length: 80
  litify_pm__First_Name__c?: string; // Max length: 255
  litify_pm__Gender__c?: litify_pm__Gender__cType;
  litify_pm__Last_Name__c?: string; // Max length: 255
  litify_pm__Phone_Home__c?: string; // Phone. Max length: 40
  litify_pm__Phone_Mobile__c?: string; // Phone. Max length: 40
  litify_pm__Phone_Other__c?: string; // Phone. Max length: 40
  litify_pm__Phone_Work__c?: string; // Phone. Max length: 40
  litify_pm__SLA__c?: litify_pm__SLA__cType;
  litify_pm__Salutation__c?: litify_pm__Salutation__cType;
  litify_pm__Social_Security_Number__c?: any; // Check .md for details.
  litify_pm__Last_Called_At__c?: Date;
  litify_pm__Last_Emailed_At__c?: Date;
  litify_pm__Total_Calls__c?: number; // Max length: 18.0
  litify_pm__Total_Emails__c?: number; // Max length: 18.0
  Personal_Surname__c?: string; // Max length: 255
  OldSFID__c?: string; // Max length: 18
  litify_pm__lit_Calculated_Age__c?: number; // Max length: 18.0
  litify_pm__lit_Has_Birthdate__c?: boolean;
  litify_pm__lit_Is_Deceased__c?: boolean;
  litify_pm__lit_Billing_County__c?: string; // Max length: 255
  litify_pm__lit_Shipping_County__c?: string; // Max length: 255
  Does_client_live_or_work_in_London__c?: Does_client_live_or_work_in_London__cType;
  Occupation__c?: string; // Max length: 255
  Country__c?: Country__cType;
  Type_of_ID__c?: Type_of_ID__cType;
  Actual_ID_Value__c?: string; // Max length: 25
  Date_of_Death__c?: string; // YYYY-MM-DD
  Does_client_lack_capacity__c?: Does_client_lack_capacity__cType;
  CPF__c?: string; // Max length: 11
  secondary_email__c?: string; // Email. Max length: 80
  City__c?: string; // Max length: 50
  State__c?: State__cType;
  Zip_Code__c?: string; // Max length: 8
  Discontinued__c?: Discontinued__cType;
  Breakup_sent__c?: Breakup_sent__cType;
  Contract_status__c?: Contract_status__cType;
  Observation__c?: string; // Max length: 10000
  Source__c?: string; // Max length: 50
  Street__c?: string; // Max length: 150
  Schooling__c?: Schooling__cType;
  PGMBM_ID__c?: string; // Max length: 100
  Id_da_Lista__c?: number; // Max length: 18.0
}

export type TypeType =
  | "Other"
  | "Attorney"
  | "Court"
  | "Defendant"
  | "Doctor"
  | "Family Member"
  | "Health Care Facility"
  | "Insurance Company"
  | "Investigator"
  | "Judge"
  | "Jury Member"
  | "Law Firm"
  | "Plaintiff"
  | "Police Department"
  | "Police Officer"
  | "Witness";

export type BillingGeocodeAccuracyType =
  | "Address"
  | "NearAddress"
  | "Block"
  | "Street"
  | "ExtendedZip"
  | "Zip"
  | "Neighborhood"
  | "City"
  | "County"
  | "State"
  | "Unknown";

export type ShippingGeocodeAccuracyType =
  | "Address"
  | "NearAddress"
  | "Block"
  | "Street"
  | "ExtendedZip"
  | "Zip"
  | "Neighborhood"
  | "City"
  | "County"
  | "State"
  | "Unknown";

export type IndustryType =
  | "Agriculture"
  | "Apparel"
  | "Banking"
  | "Biotechnology"
  | "Chemicals"
  | "Communications"
  | "Construction"
  | "Consulting"
  | "Education"
  | "Electronics"
  | "Energy"
  | "Engineering"
  | "Entertainment"
  | "Environmental"
  | "Finance"
  | "Food & Beverage"
  | "Government"
  | "Healthcare"
  | "Hospitality"
  | "Insurance"
  | "Machinery"
  | "Manufacturing"
  | "Media"
  | "Not For Profit"
  | "Other"
  | "Recreation"
  | "Retail"
  | "Shipping"
  | "Technology"
  | "Telecommunications"
  | "Transportation"
  | "Utilities";

export type AccountSourceType =
  | "Advertisement"
  | "Employee Referral"
  | "External Referral"
  | "Partner"
  | "Public Relations"
  | "Seminar - Internal"
  | "Seminar - Partner"
  | "Trade Show"
  | "Web"
  | "Word of mouth"
  | "Other";

export type litify_pm__Gender__cType = "Male" | "Female";

export type litify_pm__SLA__cType = "Gold" | "Silver" | "Platinum" | "Bronze";

export type litify_pm__Salutation__cType =
  | "Mr."
  | "Mrs."
  | "Ms."
  | "Dr."
  | "Prof.";

export type Does_client_live_or_work_in_London__cType =
  | "No Selection Made"
  | "Yes - Lives"
  | "Yes - Works"
  | "Yes - Lives & Works"
  | "No";

export type Country__cType = "Brazil" | "United Kingdom" | "United States";

export type Type_of_ID__cType =
  | "NI Number"
  | "Social Security Number"
  | "CPF"
  | "RG";

export type Does_client_lack_capacity__cType = "Yes" | "No";

export type State__cType =
  | "AC"
  | "AL"
  | "AP"
  | "AM"
  | "BA"
  | "CE"
  | "DF"
  | "ES"
  | "GO"
  | "MA"
  | "MT"
  | "MS"
  | "MG"
  | "PA"
  | "PB"
  | "PR"
  | "PE"
  | "PI"
  | "RJ"
  | "RN"
  | "RS"
  | "RO"
  | "RR"
  | "SC"
  | "SP"
  | "SE"
  | "TO";

export type Discontinued__cType = "Confirmed" | "To be confirmed" | "No";

export type Breakup_sent__cType = "Breakup sent" | "To be sent" | "Not needed";

export type Contract_status__cType =
  | "1- Send to Client - signature"
  | "2- Waiting for Client - signature"
  | "4- Send to Firm - signature"
  | "5- Waiting on Firm- firm signature"
  | "6- Send to Client - firm signature"
  | "7- Waiting on Client - Acknowledgement"
  | "8- Client Acknowledged";

export type Schooling__cType =
  | "Sem escolaridade"
  | "Ensino fundamental (1º grau) incompleto"
  | "Ensino fundamental (1º grau) completo"
  | "Ensino médio (2º grau) incompleto"
  | "Ensino médio (2º grau) completo"
  | "Superior incompleto"
  | "Superior completo"
  | "Mestrado ou doutorado"
  | "Não sei informar";
