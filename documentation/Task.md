#Task 

 ## Fields 

| Label | API Name | Type | Length | Possible Choices |
| --- | --- | --- | --- | --- |
|Activity ID|Id|id | 18 | |
|Related To ID|WhatId|reference | 18 | |
|Subject|Subject|combobox | | |
|Due Date Only|ActivityDate|date | | |
|Status|Status|picklist | 40 | Not Started(Not Started)<br>In Progress(In Progress)<br>Completed(Completed)<br>Waiting on someone else(Waiting on someone else)<br>Deferred(Deferred)<br>Discontinued(Discontinued) |
|Priority|Priority|picklist | 40 | High(High)<br>Normal(Normal)<br>Low(Low) |
|High Priority|IsHighPriority|boolean | | |
|Assigned To ID|OwnerId|reference | 18 | |
|Description|Description|textarea | 32000 | |
|Deleted|IsDeleted|boolean | | |
|Party|AccountId|reference | 18 | |
|Closed|IsClosed|boolean | | |
|Created Date|CreatedDate|datetime | | |
|Created By ID|CreatedById|reference | 18 | |
|Last Modified Date|LastModifiedDate|datetime | | |
|Last Modified By ID|LastModifiedById|reference | 18 | |
|System Modstamp|SystemModstamp|datetime | | |
|Archived|IsArchived|boolean | | |
|Call Duration|CallDurationInSeconds|int | 8 | |
|Call Type|CallType|picklist | 40 | Internal(Internal)<br>Inbound(Inbound)<br>Outbound(Outbound) |
|Call Result|CallDisposition|string | 255 | |
|Call Object Identifier|CallObject|string | 255 | |
|Reminder Date/Time|ReminderDateTime|datetime | | |
|Reminder Set|IsReminderSet|boolean | | |
|Recurrence Activity ID|RecurrenceActivityId|reference | 18 | |
|Create Recurring Series of Tasks|IsRecurrence|boolean | | |
|Recurrence Start|RecurrenceStartDateOnly|date | | |
|Recurrence End|RecurrenceEndDateOnly|date | | |
|Recurrence Time Zone|RecurrenceTimeZoneSidKey|picklist | 40 | (GMT+14:00) Line Islands Time (Pacific/Kiritimati)(Pacific/Kiritimati)<br>(GMT+13:00) Phoenix Islands Time (Pacific/Enderbury)(Pacific/Enderbury)<br>(GMT+13:00) Tonga Standard Time (Pacific/Tongatapu)(Pacific/Tongatapu)<br>(GMT+12:45) Chatham Standard Time (Pacific/Chatham)(Pacific/Chatham)<br>(GMT+12:00) Petropavlovsk-Kamchatski Standard Time (Asia/Kamchatka)(Asia/Kamchatka)<br>(GMT+12:00) New Zealand Standard Time (Pacific/Auckland)(Pacific/Auckland)<br>(GMT+12:00) Fiji Standard Time (Pacific/Fiji)(Pacific/Fiji)<br>(GMT+11:00) Solomon Islands Time (Pacific/Guadalcanal)(Pacific/Guadalcanal)<br>(GMT+11:00) Norfolk Island Time (Pacific/Norfolk)(Pacific/Norfolk)<br>(GMT+10:30) Lord Howe Standard Time (Australia/Lord_Howe)(Australia/Lord_Howe)<br>(GMT+10:00) Australian Eastern Standard Time (Australia/Brisbane)(Australia/Brisbane)<br>(GMT+10:00) Australian Eastern Standard Time (Australia/Sydney)(Australia/Sydney)<br>(GMT+09:30) Australian Central Standard Time (Australia/Adelaide)(Australia/Adelaide)<br>(GMT+09:30) Australian Central Standard Time (Australia/Darwin)(Australia/Darwin)<br>(GMT+09:00) Korean Standard Time (Asia/Seoul)(Asia/Seoul)<br>(GMT+09:00) Japan Standard Time (Asia/Tokyo)(Asia/Tokyo)<br>(GMT+08:00) Hong Kong Standard Time (Asia/Hong_Kong)(Asia/Hong_Kong)<br>(GMT+08:00) Malaysia Time (Asia/Kuala_Lumpur)(Asia/Kuala_Lumpur)<br>(GMT+08:00) Philippine Standard Time (Asia/Manila)(Asia/Manila)<br>(GMT+08:00) China Standard Time (Asia/Shanghai)(Asia/Shanghai)<br>(GMT+08:00) Singapore Standard Time (Asia/Singapore)(Asia/Singapore)<br>(GMT+08:00) Taipei Standard Time (Asia/Taipei)(Asia/Taipei)<br>(GMT+08:00) Australian Western Standard Time (Australia/Perth)(Australia/Perth)<br>(GMT+07:00) Indochina Time (Asia/Bangkok)(Asia/Bangkok)<br>(GMT+07:00) Indochina Time (Asia/Ho_Chi_Minh)(Asia/Ho_Chi_Minh)<br>(GMT+07:00) Western Indonesia Time (Asia/Jakarta)(Asia/Jakarta)<br>(GMT+06:30) Myanmar Time (Asia/Rangoon)(Asia/Rangoon)<br>(GMT+06:00) Bangladesh Standard Time (Asia/Dhaka)(Asia/Dhaka)<br>(GMT+05:45) Nepal Time (Asia/Kathmandu)(Asia/Kathmandu)<br>(GMT+05:30) India Standard Time (Asia/Colombo)(Asia/Colombo)<br>(GMT+05:30) India Standard Time (Asia/Kolkata)(Asia/Kolkata)<br>(GMT+05:00) Pakistan Standard Time (Asia/Karachi)(Asia/Karachi)<br>(GMT+05:00) Uzbekistan Standard Time (Asia/Tashkent)(Asia/Tashkent)<br>(GMT+05:00) Yekaterinburg Standard Time (Asia/Yekaterinburg)(Asia/Yekaterinburg)<br>(GMT+04:30) Afghanistan Time (Asia/Kabul)(Asia/Kabul)<br>(GMT+04:30) Iran Daylight Time (Asia/Tehran)(Asia/Tehran)<br>(GMT+04:00) Azerbaijan Standard Time (Asia/Baku)(Asia/Baku)<br>(GMT+04:00) Gulf Standard Time (Asia/Dubai)(Asia/Dubai)<br>(GMT+04:00) Georgia Standard Time (Asia/Tbilisi)(Asia/Tbilisi)<br>(GMT+04:00) Armenia Standard Time (Asia/Yerevan)(Asia/Yerevan)<br>(GMT+03:00) East Africa Time (Africa/Nairobi)(Africa/Nairobi)<br>(GMT+03:00) Arabian Standard Time (Asia/Baghdad)(Asia/Baghdad)<br>(GMT+03:00) Eastern European Summer Time (Asia/Beirut)(Asia/Beirut)<br>(GMT+03:00) Israel Daylight Time (Asia/Jerusalem)(Asia/Jerusalem)<br>(GMT+03:00) Arabian Standard Time (Asia/Kuwait)(Asia/Kuwait)<br>(GMT+03:00) Arabian Standard Time (Asia/Riyadh)(Asia/Riyadh)<br>(GMT+03:00) Eastern European Summer Time (Europe/Athens)(Europe/Athens)<br>(GMT+03:00) Eastern European Summer Time (Europe/Bucharest)(Europe/Bucharest)<br>(GMT+03:00) Eastern European Summer Time (Europe/Helsinki)(Europe/Helsinki)<br>(GMT+03:00) Eastern European Standard Time (Europe/Istanbul)(Europe/Istanbul)<br>(GMT+03:00) Moscow Standard Time (Europe/Minsk)(Europe/Minsk)<br>(GMT+03:00) Moscow Standard Time (Europe/Moscow)(Europe/Moscow)<br>(GMT+02:00) Eastern European Standard Time (Africa/Cairo)(Africa/Cairo)<br>(GMT+02:00) South Africa Standard Time (Africa/Johannesburg)(Africa/Johannesburg)<br>(GMT+02:00) Central European Summer Time (Europe/Amsterdam)(Europe/Amsterdam)<br>(GMT+02:00) Central European Summer Time (Europe/Berlin)(Europe/Berlin)<br>(GMT+02:00) Central European Summer Time (Europe/Brussels)(Europe/Brussels)<br>(GMT+02:00) Central European Summer Time (Europe/Paris)(Europe/Paris)<br>(GMT+02:00) Central European Summer Time (Europe/Prague)(Europe/Prague)<br>(GMT+02:00) Central European Summer Time (Europe/Rome)(Europe/Rome)<br>(GMT+01:00) Central European Standard Time (Africa/Algiers)(Africa/Algiers)<br>(GMT+01:00) Western European Summer Time (Africa/Casablanca)(Africa/Casablanca)<br>(GMT+01:00) Irish Standard Time (Europe/Dublin)(Europe/Dublin)<br>(GMT+01:00) Western European Summer Time (Europe/Lisbon)(Europe/Lisbon)<br>(GMT+01:00) British Summer Time (Europe/London)(Europe/London)<br>(GMT+00:00) East Greenland Summer Time (America/Scoresbysund)(America/Scoresbysund)<br>(GMT+00:00) Azores Summer Time (Atlantic/Azores)(Atlantic/Azores)<br>(GMT+00:00) Greenwich Mean Time (GMT)(GMT)<br>(GMT-01:00) Cape Verde Standard Time (Atlantic/Cape_Verde)(Atlantic/Cape_Verde)<br>(GMT-02:00) South Georgia Time (Atlantic/South_Georgia)(Atlantic/South_Georgia)<br>(GMT-02:30) Newfoundland Daylight Time (America/St_Johns)(America/St_Johns)<br>(GMT-03:00) Argentina Standard Time (America/Argentina/Buenos_Aires)(America/Argentina/Buenos_Aires)<br>(GMT-03:00) Atlantic Daylight Time (America/Halifax)(America/Halifax)<br>(GMT-03:00) Brasilia Standard Time (America/Sao_Paulo)(America/Sao_Paulo)<br>(GMT-03:00) Atlantic Daylight Time (Atlantic/Bermuda)(Atlantic/Bermuda)<br>(GMT-04:00) Venezuela Time (America/Caracas)(America/Caracas)<br>(GMT-04:00) Eastern Daylight Time (America/Indiana/Indianapolis)(America/Indiana/Indianapolis)<br>(GMT-04:00) Eastern Daylight Time (America/New_York)(America/New_York)<br>(GMT-04:00) Atlantic Standard Time (America/Puerto_Rico)(America/Puerto_Rico)<br>(GMT-04:00) Chile Standard Time (America/Santiago)(America/Santiago)<br>(GMT-05:00) Colombia Standard Time (America/Bogota)(America/Bogota)<br>(GMT-05:00) Central Daylight Time (America/Chicago)(America/Chicago)<br>(GMT-05:00) Peru Standard Time (America/Lima)(America/Lima)<br>(GMT-05:00) Central Daylight Time (America/Mexico_City)(America/Mexico_City)<br>(GMT-05:00) Eastern Standard Time (America/Panama)(America/Panama)<br>(GMT-06:00) Mountain Daylight Time (America/Denver)(America/Denver)<br>(GMT-06:00) Central Standard Time (America/El_Salvador)(America/El_Salvador)<br>(GMT-06:00) Mexican Pacific Daylight Time (America/Mazatlan)(America/Mazatlan)<br>(GMT-07:00) Pacific Daylight Time (America/Los_Angeles)(America/Los_Angeles)<br>(GMT-07:00) Mountain Standard Time (America/Phoenix)(America/Phoenix)<br>(GMT-07:00) Pacific Daylight Time (America/Tijuana)(America/Tijuana)<br>(GMT-08:00) Alaska Daylight Time (America/Anchorage)(America/Anchorage)<br>(GMT-08:00) Pitcairn Time (Pacific/Pitcairn)(Pacific/Pitcairn)<br>(GMT-09:00) Hawaii-Aleutian Daylight Time (America/Adak)(America/Adak)<br>(GMT-09:00) Gambier Time (Pacific/Gambier)(Pacific/Gambier)<br>(GMT-09:30) Marquesas Time (Pacific/Marquesas)(Pacific/Marquesas)<br>(GMT-10:00) Hawaii-Aleutian Standard Time (Pacific/Honolulu)(Pacific/Honolulu)<br>(GMT-11:00) Niue Time (Pacific/Niue)(Pacific/Niue)<br>(GMT-11:00) Samoa Standard Time (Pacific/Pago_Pago)(Pacific/Pago_Pago) |
|Recurrence Type|RecurrenceType|picklist | 40 | Recurs Daily(RecursDaily)<br>Recurs Every Weekday(RecursEveryWeekday)<br>Recurs Monthly(RecursMonthly)<br>Recurs Monthly Nth(RecursMonthlyNth)<br>Recurs Weekly(RecursWeekly)<br>Recurs Yearly(RecursYearly)<br>Recurs Yearly Nth(RecursYearlyNth) |
|Recurrence Interval|RecurrenceInterval|int | 9 | |
|Recurrence Day of Week Mask|RecurrenceDayOfWeekMask|int | 9 | |
|Recurrence Day of Month|RecurrenceDayOfMonth|int | 9 | |
|Recurrence Instance|RecurrenceInstance|picklist | 40 | 1st(First)<br>2nd(Second)<br>3rd(Third)<br>4th(Fourth)<br>last(Last) |
|Recurrence Month of Year|RecurrenceMonthOfYear|picklist | 40 | January(January)<br>February(February)<br>March(March)<br>April(April)<br>May(May)<br>June(June)<br>July(July)<br>August(August)<br>September(September)<br>October(October)<br>November(November)<br>December(December) |
|Repeat This Task|RecurrenceRegeneratedType|picklist | 40 | After due date(RecurrenceRegenerateAfterDueDate)<br>After date completed(RecurrenceRegenerateAfterToday)<br>(Task Closed)(RecurrenceRegenerated) |
|Task Subtype|TaskSubtype|picklist | 40 | Task(Task)<br>Email(Email)<br>List Email(ListEmail)<br>Cadence(Cadence)<br>Call(Call) |
|Billable|litify_pm__Billable__c|boolean | | |
|Default Matter Task|litify_pm__Default_Matter_Task__c|reference | 18 | |
|Document Link|litify_pm__Document_Link__c|url | | |
|Estimated Duration|litify_pm__Estimated_Duration__c|double | 16.2 | |
|Estimated Expense Cost|litify_pm__Estimated_Expense_Cost__c|double | 18.0 | |
|Estimated Time Value|litify_pm__Estimated_Time_Value__c|double | 18.0 | |
|Matter Stage Activity|litify_pm__Matter_Stage_Activity__c|reference | 18 | |
|Associated Object Name|litify_pm__AssociatedObjectName__c|string | 255 | |
|Completed Date|litify_pm__Completed_Date__c|datetime | | |
|Assignee Name|litify_pm__AssigneeName__c|string | 1300 | |
|Do Not Recalculate|litify_pm__CalendarRulesDoNotRecalculate__c|boolean | | |
|Calendar Rules Jurisdiction System ID|litify_pm__CalendarRulesJurisdictionSystemID__c|string | 32 | |
|Calendar Rules Parent System ID|litify_pm__CalendarRulesParentSystemID__c|string | 32 | |
|Calendar Rules System ID|litify_pm__CalendarRulesSystemID__c|string | 32 | |
|Calendar Rules Trigger|litify_pm__CalendarRulesTrigger__c|reference | 18 | |
|Change Reason|litify_pm__ChangeReason__c|textarea | 255 | |
|Default Matter Task Type|litify_pm__DefaultMatterTaskType__c|string | 1300 | |
|Event Change Log|litify_pm__EventLogJunction__c|reference | 18 | |
|Matter Stage|litify_pm__MatterStage__c|string | 1300 | |
|Original Date|litify_pm__OriginalDate__c|datetime | | |
|Parent|litify_pm__Parent__c|boolean | | |
|User Role Related Junction|litify_pm__UserRoleRelatedJunction__c|string | 1300 | |
|Do Not Recalculate Due Date|litify_pm__DueDateDoNotRecalculate__c|boolean | | |
|Event Type|litify_pm__Event_Type__c|picklist | 255 | Client Meeting(Client Meeting)<br>Deposition(Deposition)<br>Hearing(Hearing)<br>Mediation(Mediation) |
|Matter|litify_pm__Matter__c|reference | 18 | |
|In Task Set|litify_pm__In_Task_Set__c|boolean | | |
|Color Icon|litify_pm__lit_Color_Icon__c|string | 1300 | |
|Appointment Holder|Appointment_Holder__c|reference | 18 | |
|Status|Status__c|picklist | 255 | Cancelled(Cancelled)<br>Confirmed(Confirmed)<br>Credit(Credit)<br>Done(Done)<br>No Show(No Show)<br>Open(Open)<br>Postponed(Postponed)<br>Rescheduled(Rescheduled) |
|Parent Task Id|litify_pm__Parent_Task_Id__c|string | 255 | |
|Color|litify_pm__lit_Color__c|picklist | 255 | Red(red)<br>Orange(orange)<br>Green(green)<br>Blue(blue)<br>Purple(purple)<br>Gray(gray) | 

 ## Relationships 

| Name | Child Object | Field |
| --- | --- | --- |
|AttachedContentDocuments|AttachedContentDocument|LinkedEntityId|
|AttachedContentNotes|AttachedContentNote|LinkedEntityId|
|Attachments|Attachment|ParentId|
|CombinedAttachments|CombinedAttachment|ParentId|
|ContentDocumentLinks|ContentDocumentLink|LinkedEntityId|
|null|ContentVersion|FirstPublishLocationId|
|null|EmailMessage|ActivityId|
|null|EmailStatus|TaskId|
|FeedSubscriptionsForEntity|EntitySubscription|ParentId|
|null|FeedComment|ParentId|
|null|FeedItem|ParentId|
|null|FlowRecordRelation|RelatedRecordId|
|RecurringTasks|Task|RecurrenceActivityId|
|null|TaskChangeEvent|RecurrenceActivityId|
|Feeds|TaskFeed|ParentId|
|TopicAssignments|TopicAssignment|EntityId|