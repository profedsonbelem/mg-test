#Account 

 ## Fields 

| Label | API Name | Type | Length | Possible Choices |
| --- | --- | --- | --- | --- |
|Party ID|Id|id | 18 | |
|Deleted|IsDeleted|boolean | | |
|Master Record ID|MasterRecordId|reference | 18 | |
|Party Name|Name|string | 255 | |
|Party Type|Type|picklist | 40 | Other(Other)<br>Attorney(Attorney)<br>Court(Court)<br>Defendant(Defendant)<br>Doctor(Doctor)<br>Family Member(Family Member)<br>Health Care Facility(Health Care Facility)<br>Insurance Company(Insurance Company)<br>Investigator(Investigator)<br>Judge(Judge)<br>Jury Member(Jury Member)<br>Law Firm(Law Firm)<br>Plaintiff(Plaintiff)<br>Police Department(Police Department)<br>Police Officer(Police Officer)<br>Witness(Witness) |
|Party Record Type|RecordTypeId|reference | 18 | |
|Parent Party|ParentId|reference | 18 | |
|Billing Street|BillingStreet|textarea | 255 | |
|Billing City|BillingCity|string | 40 | |
|Billing State/Province|BillingState|string | 80 | |
|Billing Zip/Postal Code|BillingPostalCode|string | 20 | |
|Billing Country|BillingCountry|string | 80 | |
|Billing Latitude|BillingLatitude|double | 3.15 | |
|Billing Longitude|BillingLongitude|double | 3.15 | |
|Billing Geocode Accuracy|BillingGeocodeAccuracy|picklist | 40 | Address(Address)<br>NearAddress(NearAddress)<br>Block(Block)<br>Street(Street)<br>ExtendedZip(ExtendedZip)<br>Zip(Zip)<br>Neighborhood(Neighborhood)<br>City(City)<br>County(County)<br>State(State)<br>Unknown(Unknown) |
|Billing Address|BillingAddress|address | | |
|Shipping Street|ShippingStreet|textarea | 255 | |
|Shipping City|ShippingCity|string | 40 | |
|Shipping State/Province|ShippingState|string | 80 | |
|Shipping Zip/Postal Code|ShippingPostalCode|string | 20 | |
|Shipping Country|ShippingCountry|string | 80 | |
|Shipping Latitude|ShippingLatitude|double | 3.15 | |
|Shipping Longitude|ShippingLongitude|double | 3.15 | |
|Shipping Geocode Accuracy|ShippingGeocodeAccuracy|picklist | 40 | Address(Address)<br>NearAddress(NearAddress)<br>Block(Block)<br>Street(Street)<br>ExtendedZip(ExtendedZip)<br>Zip(Zip)<br>Neighborhood(Neighborhood)<br>City(City)<br>County(County)<br>State(State)<br>Unknown(Unknown) |
|Shipping Address|ShippingAddress|address | | |
|Party Phone|Phone|phone | 40 | |
|Party Fax|Fax|phone | 40 | |
|Website|Website|url | | |
|Photo URL|PhotoUrl|url | | |
|Industry|Industry|picklist | 40 | Agriculture(Agriculture)<br>Apparel(Apparel)<br>Banking(Banking)<br>Biotechnology(Biotechnology)<br>Chemicals(Chemicals)<br>Communications(Communications)<br>Construction(Construction)<br>Consulting(Consulting)<br>Education(Education)<br>Electronics(Electronics)<br>Energy(Energy)<br>Engineering(Engineering)<br>Entertainment(Entertainment)<br>Environmental(Environmental)<br>Finance(Finance)<br>Food & Beverage(Food & Beverage)<br>Government(Government)<br>Healthcare(Healthcare)<br>Hospitality(Hospitality)<br>Insurance(Insurance)<br>Machinery(Machinery)<br>Manufacturing(Manufacturing)<br>Media(Media)<br>Not For Profit(Not For Profit)<br>Other(Other)<br>Recreation(Recreation)<br>Retail(Retail)<br>Shipping(Shipping)<br>Technology(Technology)<br>Telecommunications(Telecommunications)<br>Transportation(Transportation)<br>Utilities(Utilities) |
|Annual Revenue|AnnualRevenue|currency | 18.0 | |
|Employees|NumberOfEmployees|int | 8 | |
|Party Description|Description|textarea | 32000 | |
|Account Owner|OwnerId|reference | 18 | |
|Created Date|CreatedDate|datetime | | |
|Created By ID|CreatedById|reference | 18 | |
|Last Modified Date|LastModifiedDate|datetime | | |
|Last Modified By ID|LastModifiedById|reference | 18 | |
|System Modstamp|SystemModstamp|datetime | | |
|Last Activity|LastActivityDate|date | | |
|Last Viewed Date|LastViewedDate|datetime | | |
|Last Referenced Date|LastReferencedDate|datetime | | |
|Customer Portal Account|IsCustomerPortal|boolean | | |
|Data.com Key|Jigsaw|string | 20 | |
|Jigsaw Company ID|JigsawCompanyId|string | 20 | |
|Party Source|AccountSource|picklist | 40 | Advertisement(Advertisement)<br>Employee Referral(Employee Referral)<br>External Referral(External Referral)<br>Partner(Partner)<br>Public Relations(Public Relations)<br>Seminar - Internal(Seminar - Internal)<br>Seminar - Partner(Seminar - Partner)<br>Trade Show(Trade Show)<br>Web(Web)<br>Word of mouth(Word of mouth)<br>Other(Other) |
|SIC Description|SicDesc|string | 80 | |
|Date of Birth|litify_pm__Date_of_birth__c|date | | |
|Email|litify_pm__Email__c|email | 80 | |
|First Name|litify_pm__First_Name__c|string | 255 | |
|Gender|litify_pm__Gender__c|picklist | 255 | Male(Male)<br>Female(Female) |
|Last Name|litify_pm__Last_Name__c|string | 255 | |
|Phone Home|litify_pm__Phone_Home__c|phone | 40 | |
|Phone Mobile|litify_pm__Phone_Mobile__c|phone | 40 | |
|Phone Other|litify_pm__Phone_Other__c|phone | 40 | |
|Phone Work|litify_pm__Phone_Work__c|phone | 40 | |
|SLA|litify_pm__SLA__c|picklist | 255 | Gold(Gold)<br>Silver(Silver)<br>Platinum(Platinum)<br>Bronze(Bronze) |
|Salutation|litify_pm__Salutation__c|picklist | 255 | Mr.(Mr.)<br>Mrs.(Mrs.)<br>Ms.(Ms.)<br>Dr.(Dr.)<br>Prof.(Prof.) |
|Social Security Number|litify_pm__Social_Security_Number__c|encryptedstring | | |
|Last Called At|litify_pm__Last_Called_At__c|datetime | | |
|Last Emailed At|litify_pm__Last_Emailed_At__c|datetime | | |
|Total Calls|litify_pm__Total_Calls__c|double | 18.0 | |
|Total Emails|litify_pm__Total_Emails__c|double | 18.0 | |
|Personal Surname|Personal_Surname__c|string | 255 | |
|OldSFID|OldSFID__c|string | 18 | |
|Age|litify_pm__lit_Calculated_Age__c|double | 18.0 | |
|Has Birthdate|litify_pm__lit_Has_Birthdate__c|boolean | | |
|Is Deceased|litify_pm__lit_Is_Deceased__c|boolean | | |
|Billing County|litify_pm__lit_Billing_County__c|string | 255 | |
|Shipping County|litify_pm__lit_Shipping_County__c|string | 255 | |
|Does client live or work in London?|Does_client_live_or_work_in_London__c|picklist | 255 | No Selection Made(No Selection Made)<br>Yes - Lives(Yes - Lives)<br>Yes - Works(Yes - Works)<br>Yes - Lives & Works(Yes - Lives & Works)<br>No(No) |
|Occupation|Occupation__c|string | 255 | |
|Country|Country__c|picklist | 255 | Brazil(Brazil)<br>United Kingdom(United Kingdom)<br>United States(United States) |
|Type of ID|Type_of_ID__c|picklist | 255 | NI Number(NI Number)<br>Social Security Number(Social Security Number)<br>CPF(CPF)<br>RG(RG) |
|Actual ID Value|Actual_ID_Value__c|string | 25 | |
|Date of Death|Date_of_Death__c|date | | |
|Does client lack capacity?|Does_client_lack_capacity__c|picklist | 255 | Yes(Yes)<br>No(No) |
|CPF|CPF__c|string | 11 | |
|secondary email|secondary_email__c|email | 80 | |
|City|City__c|string | 50 | |
|State|State__c|picklist | 255 | AC(AC)<br>AL(AL)<br>AP(AP)<br>AM(AM)<br>BA(BA)<br>CE(CE)<br>DF(DF)<br>ES(ES)<br>GO(GO)<br>MA(MA)<br>MT(MT)<br>MS(MS)<br>MG(MG)<br>PA(PA)<br>PB(PB)<br>PR(PR)<br>PE(PE)<br>PI(PI)<br>RJ(RJ)<br>RN(RN)<br>RS(RS)<br>RO(RO)<br>RR(RR)<br>SC(SC)<br>SP(SP)<br>SE(SE)<br>TO(TO) |
|Zip Code|Zip_Code__c|string | 8 | |
|Discontinued|Discontinued__c|picklist | 255 | Confirmed(Confirmed)<br>To be confirmed(To be confirmed)<br>No(No) |
|Breakup sent|Breakup_sent__c|picklist | 255 | Breakup sent(Breakup sent)<br>To be sent(To be sent)<br>Not needed(Not needed) |
|Contract status|Contract_status__c|picklist | 255 | 1- Send to Client - signature(1- Send to Client - signature)<br>2- Waiting for Client - signature(2- Waiting for Client - signature)<br>4- Send to Firm - signature(4- Send to Firm - signature)<br>5- Waiting on Firm- firm signature(5- Waiting on Firm- firm signature)<br>6- Send to Client - firm signature(6- Send to Client - firm signature)<br>7- Waiting on Client - Acknowledgement(7- Waiting on Client - Acknowledgement)<br>8- Client Acknowledged(8- Client Acknowledged) |
|Observation|Observation__c|textarea | 10000 | |
|Source|Source__c|string | 50 | |
|Street|Street__c|string | 150 | |
|Schooling|Schooling__c|picklist | 255 | Sem escolaridade(Sem escolaridade)<br>Ensino fundamental (1º grau) incompleto(Ensino fundamental (1º grau) incompleto)<br>Ensino fundamental (1º grau) completo(Ensino fundamental (1º grau) completo)<br>Ensino médio (2º grau) incompleto(Ensino médio (2º grau) incompleto)<br>Ensino médio (2º grau) completo(Ensino médio (2º grau) completo)<br>Superior incompleto(Superior incompleto)<br>Superior completo(Superior completo)<br>Mestrado ou doutorado(Mestrado ou doutorado)<br>Não sei informar(Não sei informar) |
|PGMBM ID|PGMBM_ID__c|string | 100 | |
|Id da Lista|Id_da_Lista__c|double | 18.0 | | 

 ## Relationships 

| Name | Child Object | Field |
| --- | --- | --- |
|ChildAccounts|Account|ParentId|
|null|AccountChangeEvent|ParentId|
|AccountContactRoles|AccountContactRole|AccountId|
|Feeds|AccountFeed|ParentId|
|Histories|AccountHistory|AccountId|
|AccountPartnersFrom|AccountPartner|AccountFromId|
|AccountPartnersTo|AccountPartner|AccountToId|
|Shares|AccountShare|AccountId|
|ActivityHistories|ActivityHistory|AccountId|
|Assets|Asset|AccountId|
|ProvidedAssets|Asset|AssetProvidedById|
|ServicedAssets|Asset|AssetServicedById|
|null|AssetChangeEvent|AccountId|
|null|AssetChangeEvent|AssetProvidedById|
|null|AssetChangeEvent|AssetServicedById|
|AttachedContentDocuments|AttachedContentDocument|LinkedEntityId|
|AttachedContentNotes|AttachedContentNote|LinkedEntityId|
|Attachments|Attachment|ParentId|
|Cases|Case|AccountId|
|null|CaseChangeEvent|AccountId|
|RecordAssociatedGroups|CollaborationGroupRecord|RecordId|
|CombinedAttachments|CombinedAttachment|ParentId|
|Contacts|Contact|AccountId|
|null|ContactChangeEvent|AccountId|
|null|ContentDistribution|RelatedRecordId|
|ContentDocumentLinks|ContentDocumentLink|LinkedEntityId|
|null|ContentVersion|FirstPublishLocationId|
|Contracts|Contract|AccountId|
|DuplicateRecordItems|DuplicateRecordItem|RecordId|
|Emails|EmailMessage|RelatedToId|
|FeedSubscriptionsForEntity|EntitySubscription|ParentId|
|null|Event|AccountId|
|Events|Event|WhatId|
|null|EventChangeEvent|AccountId|
|null|EventChangeEvent|WhatId|
|null|EventRelationChangeEvent|RelationId|
|null|FeedComment|ParentId|
|null|FeedItem|ParentId|
|null|FlowRecordRelation|RelatedRecordId|
|null|Lead|ConvertedAccountId|
|null|LeadChangeEvent|ConvertedAccountId|
|Mercedes_Emails_Messages__r|Mercedes_Email_Messages__c|RelatedParty__c|
|Notes|Note|ParentId|
|NotesAndAttachments|NoteAndAttachment|ParentId|
|OpenActivities|OpenActivity|AccountId|
|Opportunities|Opportunity|AccountId|
|null|OpportunityChangeEvent|AccountId|
|OpportunityPartnersTo|OpportunityPartner|AccountToId|
|Orders|Order|AccountId|
|null|OrderChangeEvent|AccountId|
|null|OutgoingEmail|RelatedToId|
|PartnersFrom|Partner|AccountFromId|
|PartnersTo|Partner|AccountToId|
|ProcessInstances|ProcessInstance|TargetObjectId|
|ProcessSteps|ProcessInstanceHistory|TargetObjectId|
|RecordActions|RecordAction|RecordId|
|Personas|SocialPersona|ParentId|
|Posts|SocialPost|WhoId|
|null|Task|AccountId|
|Tasks|Task|WhatId|
|null|TaskChangeEvent|AccountId|
|null|TaskChangeEvent|WhatId|
|TopicAssignments|TopicAssignment|EntityId|
|Users|User|AccountId|
|null|UserRole|PortalAccountId|
|Vehicles__r|Vehicle__c|Claimant__c|
|Vehicles2__r|Vehicle__c|Creditor__c|
|litify_pm__Intakes__r|litify_pm__Intake__c|litify_pm__Client__c|
|Matters__r|litify_pm__Matter__c|Current_Co_Counsel__c|
|litify_pm__Matters__r|litify_pm__Matter__c|litify_pm__Client__c|
|litify_pm__Matters2__r|litify_pm__Matter__c|litify_pm__Court__c|
|litify_pm__Matters1__r|litify_pm__Matter__c|litify_pm__OpposingParty__c|
|litify_pm__Child_Party_Junctions__r|litify_pm__Party_Junction__c|litify_pm__Child_Account__c|
|litify_pm__Party_Junctions__r|litify_pm__Party_Junction__c|litify_pm__Parent_Account__c|
|litify_pm__LitifyResolutionsPayor__r|litify_pm__Resolution__c|litify_pm__Payor__c|
|litify_pm__Roles__r|litify_pm__Role__c|litify_pm__Party__c|
|litify_pm__Sources__r|litify_pm__Source__c|litify_pm__Party__c|
|litify_pm__Time_Entries__r|litify_pm__Time_Entry__c|litify_pm__Bill_To__c|
|litify_pm__Treatments__r|litify_pm__Treatment__c|litify_pm__Doctor_Facility__c|
|litify_pm__lit_Notes__r|litify_pm__lit_Note__c|litify_pm__lit_Account__c|