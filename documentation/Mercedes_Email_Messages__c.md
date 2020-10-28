#Mercedes_Email_Messages__c 

 ## Fields 

| Label | API Name | Type | Length | Possible Choices |
| --- | --- | --- | --- | --- |
|Record ID|Id|id | 18 | |
|Owner ID|OwnerId|reference | 18 | |
|Deleted|IsDeleted|boolean | | |
|Mercedes Email Messages Name|Name|string | 80 | |
|Created Date|CreatedDate|datetime | | |
|Created By ID|CreatedById|reference | 18 | |
|Last Modified Date|LastModifiedDate|datetime | | |
|Last Modified By ID|LastModifiedById|reference | 18 | |
|System Modstamp|SystemModstamp|datetime | | |
|Last Activity Date|LastActivityDate|date | | |
|Last Viewed Date|LastViewedDate|datetime | | |
|Last Referenced Date|LastReferencedDate|datetime | | |
|From Address|From_Address__c|email | 80 | |
|Has Attachment|Has_Attachment__c|boolean | | |
|Html Body|Html_Body__c|textarea | 32768 | |
|Incoming|Incoming__c|boolean | | |
|Related to (Party)|RelatedParty__c|reference | 18 | |
|Subject|Subject__c|textarea | 32768 | |
|Text Body|Text_Body__c|textarea | 32768 | |
|To Address|To_Address__c|textarea | 32768 | | 

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
|Histories|Mercedes_Email_Messages__History|ParentId|
|Shares|Mercedes_Email_Messages__Share|ParentId|
|Notes|Note|ParentId|
|NotesAndAttachments|NoteAndAttachment|ParentId|
|OpenActivities|OpenActivity|WhatId|
|null|OutgoingEmail|RelatedToId|
|ProcessInstances|ProcessInstance|TargetObjectId|
|ProcessSteps|ProcessInstanceHistory|TargetObjectId|
|RecordActions|RecordAction|RecordId|
|Tasks|Task|WhatId|
|null|TaskChangeEvent|WhatId|
|TopicAssignments|TopicAssignment|EntityId|