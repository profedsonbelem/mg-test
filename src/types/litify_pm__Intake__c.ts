/** @constant salesforceName Type name in salesforce */
export const salesforceName = "litify_pm__Intake__c";

/** @constant allFields All fields, comma separated.
 * As salesforce doesn't support 'SELECT *', use 'SELECT `${allFields}`'
 */
export const allFields =
  "Id, OwnerId, IsDeleted, Name, RecordTypeId, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, LastViewedDate, LastReferencedDate, litify_pm__Browser__c, litify_pm__Case_Address_1__c, litify_pm__Case_Address_2__c, litify_pm__Case_City__c, litify_pm__Case_Postal_Code__c, litify_pm__Case_Quality_Score__c, litify_pm__Case_Quality__c, litify_pm__Case_State__c, litify_pm__Case_Type__c, litify_pm__Client__c, litify_pm__Converted_Date__c, litify_pm__Created_to_Referred_Out__c, litify_pm__Created_to_Signed_Up__c, litify_pm__Created_to_Turned_Down__c, litify_pm__Description__c, litify_pm__Device_Type__c, litify_pm__Display_Name__c, litify_pm__Email__c, litify_pm__First_Name__c, litify_pm__Incident_Date__c, litify_pm__Intake_Assigned_to_Current_User__c, litify_pm__Intakes__c, litify_pm__IsConverted__c, litify_pm__Last_Name__c, litify_pm__Matter_Created_Date__c, litify_pm__Matter_Owner__c, litify_pm__Matter__c, litify_pm__Minutes_from_Open_to_Working__c, litify_pm__Minutes_from_Retainer_Sent_to_Signed__c, litify_pm__Minutes_from_Signed_to_Matter_Open__c, litify_pm__Minutes_from_Under_Review_to_Retainer__c, litify_pm__Minutes_from_Working_to_Retainer_Sent__c, litify_pm__Minutes_from_Working_to_Under_Review__c, litify_pm__Minutes_to_Close__c, litify_pm__Minutes_to_Complete_Questionnaire__c, litify_pm__Open_Date__c, litify_pm__Phone__c, litify_pm__Qualified__c, litify_pm__Questionnaire_End_Date__c, litify_pm__Questionnaire_Last_Modified__c, litify_pm__Questionnaire_Start_Date__c, litify_pm__Questions_and_answers__c, litify_pm__Referral__c, litify_pm__Referred_Out_Date__c, litify_pm__Retainer_Agreement_Sent_Date__c, litify_pm__Retainer_Agreement_Signed__c, litify_pm__Search_Engine__c, litify_pm__Sign_Up_Method__c, litify_pm__Source_Type__c, litify_pm__Source__c, litify_pm__Status__c, litify_pm__Statute_of_Limitations_Date__c, litify_pm__Turn_Down_Details__c, litify_pm__Turn_Down_Reason__c, litify_pm__Turned_Down_Date__c, litify_pm__UTM_Campaign__c, litify_pm__UTM_Content__c, litify_pm__UTM_Medium__c, litify_pm__UTM_Source__c, litify_pm__UTM_Term__c, litify_pm__Under_Review_Date__c, litify_pm__Working_Date__c, litify_pm__age_in_days__c, litify_pm__Device_Type2__c, litify_pm__Last_Called_At__c, litify_pm__Last_Emailed_At__c, litify_pm__Phone_Area_Code__c, litify_pm__Total_Calls__c, litify_pm__Total_Emails__c, litify_tso_Questionnaire_Recipient__c, litify_tso_Questionnaire_Subject__c, litify_tso_My_Intake__c, litify_pm__lit_Exact_Source__c, Brazilian_Lawyer__c, litify_mktgROI__Monthly_Marketing_Spend__c, litify_mktgROI__Retainers_Sent__c, litify_mktgROI__Sign_Ups__c, litify_mktgROI__Source_Match__c, litify_pm__lit_Display_Name_Link__c, Total_Converted_Leads__c, Total_Questionnaires__c, Total_Retainer_Sent__c, Total_Under_Review__c, Brazilian_Lawyer_s_contact__c, Date_put_essure__c, Date_removed_device__c, intake_phone__c";

/** @interface litify_pm__Intake__c (labeled as Intake)
 * Check litify_pm__Intake__c.md for fields labels and relationship info.
 */
export interface litify_pm__Intake__c {
  Id?: string; // Max length: 18
  litify_pm__Client__c: any; // Check Account relationship litify_pm__Client__r.
  litify_pm__Matter__c?: any; // Check litify_pm__Matter__c relationship litify_pm__Matter__r.
  OwnerId?: any; // Check Group,User relationship Owner.
  IsDeleted?: boolean;
  Name?: string; // Max length: 80
  RecordTypeId?: any; // Check RecordType relationship RecordType.
  CreatedDate?: Date;
  CreatedById?: any; // Check User relationship CreatedBy.
  LastModifiedDate?: Date;
  LastModifiedById?: any; // Check User relationship LastModifiedBy.
  SystemModstamp?: Date;
  LastActivityDate?: string; // YYYY-MM-DD
  LastViewedDate?: Date;
  LastReferencedDate?: Date;
  litify_pm__Browser__c?: string; // Max length: 255
  litify_pm__Case_Address_1__c?: string; // Max length: 255
  litify_pm__Case_Address_2__c?: string; // Max length: 255
  litify_pm__Case_City__c?: string; // Max length: 255
  litify_pm__Case_Postal_Code__c?: string; // Max length: 255
  litify_pm__Case_Quality_Score__c?: number; // Max length: 18.0
  litify_pm__Case_Quality__c?: string; // Max length: 1300
  litify_pm__Case_State__c?: litify_pm__Case_State__cType;
  litify_pm__Case_Type__c?: any; // Check litify_pm__Case_Type__c relationship litify_pm__Case_Type__r.
  litify_pm__Converted_Date__c?: Date;
  litify_pm__Created_to_Referred_Out__c?: number; // Max length: 18.0
  litify_pm__Created_to_Signed_Up__c?: number; // Max length: 18.0
  litify_pm__Created_to_Turned_Down__c?: number; // Max length: 18.0
  litify_pm__Description__c?: string; // Max length: 131072
  litify_pm__Device_Type__c?: string; // Max length: 255
  litify_pm__Display_Name__c?: string; // Max length: 255
  litify_pm__Email__c?: string; // Email. Max length: 80
  litify_pm__First_Name__c?: string; // Max length: 255
  litify_pm__Incident_Date__c?: string; // YYYY-MM-DD
  litify_pm__Intake_Assigned_to_Current_User__c?: Date;
  litify_pm__Intakes__c?: number; // Max length: 18.0
  litify_pm__IsConverted__c?: boolean;
  litify_pm__Last_Name__c?: string; // Max length: 255
  litify_pm__Matter_Created_Date__c?: string; // YYYY-MM-DD
  litify_pm__Matter_Owner__c?: any; // Check User relationship litify_pm__Matter_Owner__r.
  litify_pm__Minutes_from_Open_to_Working__c?: number; // Max length: 18.0
  litify_pm__Minutes_from_Retainer_Sent_to_Signed__c?: number; // Max length: 18.0
  litify_pm__Minutes_from_Signed_to_Matter_Open__c?: number; // Max length: 18.0
  litify_pm__Minutes_from_Under_Review_to_Retainer__c?: number; // Max length: 18.0
  litify_pm__Minutes_from_Working_to_Retainer_Sent__c?: number; // Max length: 18.0
  litify_pm__Minutes_from_Working_to_Under_Review__c?: number; // Max length: 18.0
  litify_pm__Minutes_to_Close__c?: number; // Max length: 18.0
  litify_pm__Minutes_to_Complete_Questionnaire__c?: number; // Max length: 18.0
  litify_pm__Open_Date__c?: Date;
  litify_pm__Phone__c?: string; // Phone. Max length: 40
  litify_pm__Qualified__c?: boolean;
  litify_pm__Questionnaire_End_Date__c?: Date;
  litify_pm__Questionnaire_Last_Modified__c?: Date;
  litify_pm__Questionnaire_Start_Date__c?: Date;
  litify_pm__Questions_and_answers__c?: string; // Max length: 131072
  litify_pm__Referral__c?: any; // Check litify_pm__Referral__c relationship litify_pm__Referral__r.
  litify_pm__Referred_Out_Date__c?: Date;
  litify_pm__Retainer_Agreement_Sent_Date__c?: Date;
  litify_pm__Retainer_Agreement_Signed__c?: Date;
  litify_pm__Search_Engine__c?: string; // Max length: 255
  litify_pm__Sign_Up_Method__c?: litify_pm__Sign_Up_Method__cType;
  litify_pm__Source_Type__c?: litify_pm__Source_Type__cType;
  litify_pm__Source__c?: any; // Check litify_pm__Source__c relationship litify_pm__Source__r.
  litify_pm__Status__c?: litify_pm__Status__cType;
  litify_pm__Statute_of_Limitations_Date__c?: string; // YYYY-MM-DD
  litify_pm__Turn_Down_Details__c?: string; // Max length: 131072
  litify_pm__Turn_Down_Reason__c?: litify_pm__Turn_Down_Reason__cType;
  litify_pm__Turned_Down_Date__c?: Date;
  litify_pm__UTM_Campaign__c?: string; // Max length: 255
  litify_pm__UTM_Content__c?: string; // Max length: 255
  litify_pm__UTM_Medium__c?: string; // Max length: 255
  litify_pm__UTM_Source__c?: string; // Max length: 255
  litify_pm__UTM_Term__c?: string; // Max length: 255
  litify_pm__Under_Review_Date__c?: Date;
  litify_pm__Working_Date__c?: Date;
  litify_pm__age_in_days__c?: number; // Max length: 18.0
  litify_pm__Device_Type2__c?: string; // Max length: 255
  litify_pm__Last_Called_At__c?: Date;
  litify_pm__Last_Emailed_At__c?: Date;
  litify_pm__Phone_Area_Code__c?: string; // Max length: 1300
  litify_pm__Total_Calls__c?: number; // Max length: 18.0
  litify_pm__Total_Emails__c?: number; // Max length: 18.0
  litify_tso_Questionnaire_Recipient__c?: string; // Email. Max length: 80
  litify_tso_Questionnaire_Subject__c?: string; // Max length: 255
  litify_tso_My_Intake__c?: boolean;
  litify_pm__lit_Exact_Source__c?: string; // Max length: 255
  Brazilian_Lawyer__c?: string; // Max length: 255
  litify_mktgROI__Monthly_Marketing_Spend__c?: any; // Check litify_mktgROI__Monthly_Marketing_Spend__c relationship litify_mktgROI__Monthly_Marketing_Spend__r.
  litify_mktgROI__Retainers_Sent__c?: number; // Max length: 18.0
  litify_mktgROI__Sign_Ups__c?: number; // Max length: 18.0
  litify_mktgROI__Source_Match__c?: string; // Max length: 1300
  litify_pm__lit_Display_Name_Link__c?: string; // Max length: 1300
  Total_Converted_Leads__c?: number; // Max length: 18.0
  Total_Questionnaires__c?: number; // Max length: 18.0
  Total_Retainer_Sent__c?: number; // Max length: 18.0
  Total_Under_Review__c?: number; // Max length: 18.0
  Brazilian_Lawyer_s_contact__c?: string; // Max length: 254
  Date_put_essure__c?: string; // YYYY-MM-DD
  Date_removed_device__c?: string; // YYYY-MM-DD
  intake_phone__c?: string; // Phone. Max length: 40
}

export type litify_pm__Case_State__cType =
  | "AK Alaska"
  | "AL Alabama"
  | "AR Arkansas"
  | "AZ Arizona"
  | "CA California"
  | "CO Colorado"
  | "CT Connecticut"
  | "DC District of Columbia"
  | "DE Delaware"
  | "FL Florida"
  | "GA Georgia"
  | "HI Hawaii"
  | "IA Iowa"
  | "ID Idaho"
  | "IL Illinois"
  | "IN Indiana"
  | "KS Kansas"
  | "KY Kentucky"
  | "LA Louisiana"
  | "MA Massachusetts"
  | "MD Maryland"
  | "ME Maine"
  | "MI Michigan"
  | "MN Minnesota"
  | "MO Missouri"
  | "MS Mississippi"
  | "MT Montana"
  | "NC North Carolina"
  | "ND North Dakota"
  | "NE Nebraska"
  | "NH New Hampshire"
  | "NJ New Jersey"
  | "NM New Mexico"
  | "NV Nevada"
  | "NY New York"
  | "OH Ohio"
  | "OK Oklahoma"
  | "OR Oregon"
  | "PA Pennsylvania"
  | "RI Rhode Island"
  | "SC South Carolina"
  | "SD South Dakota"
  | "TN Tennessee"
  | "TX Texas"
  | "UT Utah"
  | "VA Virginia"
  | "VT Vermont"
  | "WA Washington"
  | "WI Wisconsin"
  | "WV West Virginia"
  | "WY Wyoming"
  | "N/A";

export type litify_pm__Sign_Up_Method__cType =
  | "In Person"
  | "E-signature"
  | "Mail out";

export type litify_pm__Source_Type__cType =
  | "Attorney Referral"
  | "Non-Attorney Referral"
  | "Event"
  | "Advertisement"
  | "Other"
  | "Internet";

export type litify_pm__Status__cType =
  | "Open"
  | "Working"
  | "Under Review"
  | "Retainer Agreement Sent"
  | "Retainer Agreement Signed"
  | "Turned Down"
  | "Referred Out"
  | "Converted";

export type litify_pm__Turn_Down_Reason__cType =
  | "Already represented"
  | "Case already settled"
  | "Client unresponsive"
  | "Conflict with one or more parties"
  | "Decided to use other firm"
  | "Insufficient coverage"
  | "Insufficient damages"
  | "Limited/No injury"
  | "Limited/No treatment"
  | "No defect"
  | "Questionable/No liability"
  | "SOL expired"
  | "Wrong location"
  | "Other";
