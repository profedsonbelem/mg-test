#litify_pm__Intake__c 

 ## Fields 

| Label | API Name | Type | Length | Possible Choices |
| --- | --- | --- | --- | --- |
|Record ID|Id|id | 18 | |
|Owner ID|OwnerId|reference | 18 | |
|Deleted|IsDeleted|boolean | | |
|Intake Name|Name|string | 80 | |
|Record Type ID|RecordTypeId|reference | 18 | |
|Created Date|CreatedDate|datetime | | |
|Created By ID|CreatedById|reference | 18 | |
|Last Modified Date|LastModifiedDate|datetime | | |
|Last Modified By ID|LastModifiedById|reference | 18 | |
|System Modstamp|SystemModstamp|datetime | | |
|Last Activity Date|LastActivityDate|date | | |
|Last Viewed Date|LastViewedDate|datetime | | |
|Last Referenced Date|LastReferencedDate|datetime | | |
|Browser|litify_pm__Browser__c|textarea | 255 | |
|Case Address 1|litify_pm__Case_Address_1__c|string | 255 | |
|Case Address 2|litify_pm__Case_Address_2__c|string | 255 | |
|Case City|litify_pm__Case_City__c|string | 255 | |
|Case Postal Code|litify_pm__Case_Postal_Code__c|string | 255 | |
|Case Quality Score|litify_pm__Case_Quality_Score__c|double | 18.0 | |
|Case Quality|litify_pm__Case_Quality__c|string | 1300 | |
|Case State|litify_pm__Case_State__c|picklist | 255 | AK Alaska(AK Alaska)<br>AL Alabama(AL Alabama)<br>AR Arkansas(AR Arkansas)<br>AZ Arizona(AZ Arizona)<br>CA California(CA California)<br>CO Colorado(CO Colorado)<br>CT Connecticut(CT Connecticut)<br>DC District of Columbia(DC District of Columbia)<br>DE Delaware(DE Delaware)<br>FL Florida(FL Florida)<br>GA Georgia(GA Georgia)<br>HI Hawaii(HI Hawaii)<br>IA Iowa(IA Iowa)<br>ID Idaho(ID Idaho)<br>IL Illinois(IL Illinois)<br>IN Indiana(IN Indiana)<br>KS Kansas(KS Kansas)<br>KY Kentucky(KY Kentucky)<br>LA Louisiana(LA Louisiana)<br>MA Massachusetts(MA Massachusetts)<br>MD Maryland(MD Maryland)<br>ME Maine(ME Maine)<br>MI Michigan(MI Michigan)<br>MN Minnesota(MN Minnesota)<br>MO Missouri(MO Missouri)<br>MS Mississippi(MS Mississippi)<br>MT Montana(MT Montana)<br>NC North Carolina(NC North Carolina)<br>ND North Dakota(ND North Dakota)<br>NE Nebraska(NE Nebraska)<br>NH New Hampshire(NH New Hampshire)<br>NJ New Jersey(NJ New Jersey)<br>NM New Mexico(NM New Mexico)<br>NV Nevada(NV Nevada)<br>NY New York(NY New York)<br>OH Ohio(OH Ohio)<br>OK Oklahoma(OK Oklahoma)<br>OR Oregon(OR Oregon)<br>PA Pennsylvania(PA Pennsylvania)<br>RI Rhode Island(RI Rhode Island)<br>SC South Carolina(SC South Carolina)<br>SD South Dakota(SD South Dakota)<br>TN Tennessee(TN Tennessee)<br>TX Texas(TX Texas)<br>UT Utah(UT Utah)<br>VA Virginia(VA Virginia)<br>VT Vermont(VT Vermont)<br>WA Washington(WA Washington)<br>WI Wisconsin(WI Wisconsin)<br>WV West Virginia(WV West Virginia)<br>WY Wyoming(WY Wyoming)<br>N/A(N/A) |
|Case Type|litify_pm__Case_Type__c|reference | 18 | |
|Client|litify_pm__Client__c|reference | 18 | |
|Converted Date|litify_pm__Converted_Date__c|datetime | | |
|Created to Referred Out|litify_pm__Created_to_Referred_Out__c|double | 18.0 | |
|Created to Signed Up|litify_pm__Created_to_Signed_Up__c|double | 18.0 | |
|Created to Turned Down|litify_pm__Created_to_Turned_Down__c|double | 18.0 | |
|Description|litify_pm__Description__c|textarea | 131072 | |
|Device Type (DEPRECATED)|litify_pm__Device_Type__c|string | 255 | |
|Display Name|litify_pm__Display_Name__c|string | 255 | |
|Email|litify_pm__Email__c|email | 80 | |
|First Name|litify_pm__First_Name__c|string | 255 | |
|Incident Date|litify_pm__Incident_Date__c|date | | |
|Intake Assigned to Current User|litify_pm__Intake_Assigned_to_Current_User__c|datetime | | |
|Intakes|litify_pm__Intakes__c|double | 18.0 | |
|IsConverted|litify_pm__IsConverted__c|boolean | | |
|Last Name|litify_pm__Last_Name__c|string | 255 | |
|Matter Created Date|litify_pm__Matter_Created_Date__c|date | | |
|Matter Owner|litify_pm__Matter_Owner__c|reference | 18 | |
|Matter|litify_pm__Matter__c|reference | 18 | |
|Minutes from Open to Working|litify_pm__Minutes_from_Open_to_Working__c|double | 18.0 | |
|Minutes from Retainer Sent to Signed|litify_pm__Minutes_from_Retainer_Sent_to_Signed__c|double | 18.0 | |
|Minutes from Signed to Matter Open|litify_pm__Minutes_from_Signed_to_Matter_Open__c|double | 18.0 | |
|Minutes from Under Review to Retainer|litify_pm__Minutes_from_Under_Review_to_Retainer__c|double | 18.0 | |
|Minutes from Working to Retainer Sent|litify_pm__Minutes_from_Working_to_Retainer_Sent__c|double | 18.0 | |
|Minutes from Working to Under Review|litify_pm__Minutes_from_Working_to_Under_Review__c|double | 18.0 | |
|Minutes to Close|litify_pm__Minutes_to_Close__c|double | 18.0 | |
|Minutes to Complete Questionnaire|litify_pm__Minutes_to_Complete_Questionnaire__c|double | 18.0 | |
|Open Date|litify_pm__Open_Date__c|datetime | | |
|Phone|litify_pm__Phone__c|phone | 40 | |
|Qualified|litify_pm__Qualified__c|boolean | | |
|Questionnaire End Date|litify_pm__Questionnaire_End_Date__c|datetime | | |
|Questionnaire Last Modified|litify_pm__Questionnaire_Last_Modified__c|datetime | | |
|Questionnaire Start Date|litify_pm__Questionnaire_Start_Date__c|datetime | | |
|Questionnaire Output|litify_pm__Questions_and_answers__c|textarea | 131072 | |
|Referral|litify_pm__Referral__c|reference | 18 | |
|Referred Out Date|litify_pm__Referred_Out_Date__c|datetime | | |
|Retainer Agreement Sent Date|litify_pm__Retainer_Agreement_Sent_Date__c|datetime | | |
|Retainer Agreement Signed|litify_pm__Retainer_Agreement_Signed__c|datetime | | |
|Search Engine|litify_pm__Search_Engine__c|textarea | 255 | |
|Sign Up Method|litify_pm__Sign_Up_Method__c|picklist | 255 | In Person(In Person)<br>E-signature(E-signature)<br>Mail out(Mail out) |
|Source Type|litify_pm__Source_Type__c|picklist | 255 | Attorney Referral(Attorney Referral)<br>Non-Attorney Referral(Non-Attorney Referral)<br>Event(Event)<br>Advertisement(Advertisement)<br>Other(Other)<br>Internet(Internet) |
|Source|litify_pm__Source__c|reference | 18 | |
|Status|litify_pm__Status__c|picklist | 255 | Open(Open)<br>Working(Working)<br>Under Review(Under Review)<br>Retainer Agreement Sent(Retainer Agreement Sent)<br>Retainer Agreement Signed(Retainer Agreement Signed)<br>Turned Down(Turned Down)<br>Referred Out(Referred Out)<br>Converted(Converted) |
|Statute of Limitations Date|litify_pm__Statute_of_Limitations_Date__c|date | | |
|Turn Down Details|litify_pm__Turn_Down_Details__c|textarea | 131072 | |
|Turn Down Reason|litify_pm__Turn_Down_Reason__c|picklist | 255 | Already represented(Already represented)<br>Case already settled(Case already settled)<br>Client unresponsive(Client unresponsive)<br>Conflict with one or more parties(Conflict with one or more parties)<br>Decided to use other firm(Decided to use other firm)<br>Insufficient coverage(Insufficient coverage)<br>Insufficient damages(Insufficient damages)<br>Limited/No injury(Limited/No injury)<br>Limited/No treatment(Limited/No treatment)<br>No defect(No defect)<br>Questionable/No liability(Questionable/No liability)<br>SOL expired(SOL expired)<br>Wrong location(Wrong location)<br>Other(Other) |
|Turned Down Date|litify_pm__Turned_Down_Date__c|datetime | | |
|UTM Campaign|litify_pm__UTM_Campaign__c|string | 255 | |
|UTM Content|litify_pm__UTM_Content__c|string | 255 | |
|UTM Medium|litify_pm__UTM_Medium__c|string | 255 | |
|UTM Source|litify_pm__UTM_Source__c|string | 255 | |
|UTM Term|litify_pm__UTM_Term__c|string | 255 | |
|Under Review Date|litify_pm__Under_Review_Date__c|datetime | | |
|Working Date|litify_pm__Working_Date__c|datetime | | |
|Age (in days)|litify_pm__age_in_days__c|double | 18.0 | |
|Device Type|litify_pm__Device_Type2__c|string | 255 | |
|Last Called At|litify_pm__Last_Called_At__c|datetime | | |
|Last Emailed At|litify_pm__Last_Emailed_At__c|datetime | | |
|Phone Area Code|litify_pm__Phone_Area_Code__c|string | 1300 | |
|Total Calls|litify_pm__Total_Calls__c|double | 18.0 | |
|Total Emails|litify_pm__Total_Emails__c|double | 18.0 | |
|Questionnaire Recipient|litify_tso_Questionnaire_Recipient__c|email | 80 | |
|Questionnaire Subject|litify_tso_Questionnaire_Subject__c|string | 255 | |
|My Intake|litify_tso_My_Intake__c|boolean | | |
|Exact Source|litify_pm__lit_Exact_Source__c|string | 255 | |
|Brazilian Lawyer|Brazilian_Lawyer__c|textarea | 255 | |
|Monthly Marketing Spend|litify_mktgROI__Monthly_Marketing_Spend__c|reference | 18 | |
|Retainers Sent|litify_mktgROI__Retainers_Sent__c|double | 18.0 | |
|Sign Ups|litify_mktgROI__Sign_Ups__c|double | 18.0 | |
|Source Match|litify_mktgROI__Source_Match__c|string | 1300 | |
|Intake|litify_pm__lit_Display_Name_Link__c|string | 1300 | |
|# Converted|Total_Converted_Leads__c|double | 18.0 | |
|# Questionnaires|Total_Questionnaires__c|double | 18.0 | |
|# Retainer Sent|Total_Retainer_Sent__c|double | 18.0 | |
|# Under Review|Total_Under_Review__c|double | 18.0 | |
|Brazilian Lawyer's contact|Brazilian_Lawyer_s_contact__c|string | 254 | |
|Date put essure|Date_put_essure__c|date | | |
|Date removed device|Date_removed_device__c|date | | |
|intake phone|intake_phone__c|phone | 40 | | 

 ## Relationships 

| Name | Child Object | Field |
| --- | --- | --- |
|ActivityHistories|ActivityHistory|WhatId|
|AttachedContentDocuments|AttachedContentDocument|LinkedEntityId|
|AttachedContentNotes|AttachedContentNote|LinkedEntityId|
|Attachments|Attachment|ParentId|
|RecordAssociatedGroups|CollaborationGroupRecord|RecordId|
|CombinedAttachments|CombinedAttachment|ParentId|
|null|ContentDistribution|RelatedRecordId|
|ContentDocumentLinks|ContentDocumentLink|LinkedEntityId|
|null|ContentVersion|FirstPublishLocationId|
|DuplicateRecordItems|DuplicateRecordItem|RecordId|
|Emails|EmailMessage|RelatedToId|
|FeedSubscriptionsForEntity|EntitySubscription|ParentId|
|Events|Event|WhatId|
|null|EventChangeEvent|WhatId|
|null|EventRelationChangeEvent|RelationId|
|null|FeedComment|ParentId|
|null|FeedItem|ParentId|
|null|FlowRecordRelation|RelatedRecordId|
|Notes|Note|ParentId|
|NotesAndAttachments|NoteAndAttachment|ParentId|
|OpenActivities|OpenActivity|WhatId|
|ProcessInstances|ProcessInstance|TargetObjectId|
|ProcessSteps|ProcessInstanceHistory|TargetObjectId|
|RecordActions|RecordAction|RecordId|
|Tasks|Task|WhatId|
|null|TaskChangeEvent|WhatId|
|TopicAssignments|TopicAssignment|EntityId|
|litify_pm__Injuries__r|litify_pm__Injury__c|litify_pm__Intake__c|
|litify_pm__Insurances__r|litify_pm__Insurance__c|litify_pm__Intake__c|
|Feeds|litify_pm__Intake__Feed|ParentId|
|Histories|litify_pm__Intake__History|ParentId|
|Shares|litify_pm__Intake__Share|ParentId|
|litify_pm__Matters__r|litify_pm__Matter__c|litify_pm__Primary_Intake__c|
|litify_pm__Question_Answers__r|litify_pm__Question_Answer__c|litify_pm__Intake__c|
|litify_pm__Questionnaire_Output__r|litify_pm__Questionnaire_Output__c|litify_pm__Intake__c|
|litify_pm__Converted_Referrals__r|litify_pm__Referral__c|litify_pm__Intake__c|
|litify_pm__Roles__r|litify_pm__Role__c|litify_pm__Intake__c|
|litify_pm__lit_Notes__r|litify_pm__lit_Note__c|litify_pm__lit_Intake__c|