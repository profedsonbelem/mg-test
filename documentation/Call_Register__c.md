#Call_Register__c 

 ## Fields 

| Label | API Name | Type | Length | Possible Choices |
| --- | --- | --- | --- | --- |
|Record ID|Id|id | 18 | |
|Owner ID|OwnerId|reference | 18 | |
|Deleted|IsDeleted|boolean | | |
|Call Register Name|Name|string | 80 | |
|Created Date|CreatedDate|datetime | | |
|Created By ID|CreatedById|reference | 18 | |
|Last Modified Date|LastModifiedDate|datetime | | |
|Last Modified By ID|LastModifiedById|reference | 18 | |
|System Modstamp|SystemModstamp|datetime | | |
|Last Activity Date|LastActivityDate|date | | |
|Last Viewed Date|LastViewedDate|datetime | | |
|Last Referenced Date|LastReferencedDate|datetime | | |
|Phoned to|Phoned_to__c|phone | 40 | |
|Subject|Subject__c|string | 200 | |
|Notes|Notes__c|textarea | 32768 | |
|Start Time|Start_Time__c|datetime | | |
|End Time|End_Time__c|datetime | | |
|Account Id|Party__c|string | 200 | | 

 ## Relationships 

| Name | Child Object | Field |
| --- | --- | --- |
|ActivityHistories|ActivityHistory|WhatId|
|AttachedContentDocuments|AttachedContentDocument|LinkedEntityId|
|AttachedContentNotes|AttachedContentNote|LinkedEntityId|
|Attachments|Attachment|ParentId|
|Histories|Call_Register__History|ParentId|
|Shares|Call_Register__Share|ParentId|
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
|null|OutgoingEmail|RelatedToId|
|ProcessInstances|ProcessInstance|TargetObjectId|
|ProcessSteps|ProcessInstanceHistory|TargetObjectId|
|RecordActions|RecordAction|RecordId|
|Tasks|Task|WhatId|
|null|TaskChangeEvent|WhatId|
|TopicAssignments|TopicAssignment|EntityId|