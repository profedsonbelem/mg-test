/** @interface Task (labeled as Task)
 * Check Task.md for fields labels and relationship info.
 */
export interface Task {
	Id: string; // Max length: 18
	WhatId?: any; // Check Account,Asset,AssetRelationship,Campaign,Case,Co_counse__c,Contract,Document_Menagement__c,ListEmail,Opportunity,Order,Product2,Solution,Vehicle__c,litify_docs__Input_Option__c,litify_docs__Input__c,litify_docs__Node__c,litify_docs__Packet__c,litify_docs__Rule__c,litify_docs__Template__c,litify_pm__CalendarRulesTrigger__c,litify_pm__Damage__c,litify_pm__Injury__c,litify_pm__Insurance__c,litify_pm__Intake__c,litify_pm__LitifyDoc__c,litify_pm__Matter__c,litify_pm__Negotiation__c,litify_pm__Pain_Level__c,litify_pm__Referral_Transaction__c,litify_pm__Referral__c,litify_pm__Request__c,litify_pm__Role__c,litify_pm__Source__c,litify_pm__Treatment__c relationship What.
	Subject?: any; // Check .md for details.
	ActivityDate?: string; // YYYY-MM-DD
	Status: StatusType;
	Priority: PriorityType;
	IsHighPriority: boolean;
	OwnerId: any; // Check User relationship Owner.
	Description?: string; // Max length: 32000 notes
	IsDeleted: boolean;
	AccountId?: any; // Check Account relationship Account.
	IsClosed: boolean;
	CreatedDate: Date;
	CreatedById: any; // Check User relationship CreatedBy.
	LastModifiedDate: Date;
	LastModifiedById: any; // Check User relationship LastModifiedBy.
	SystemModstamp: Date;
	IsArchived: boolean;
	CallDurationInSeconds?: number; // Max length: 8
	CallType?: CallTypeType;
	CallDisposition?: string; // Max length: 255
	CallObject?: string; // Max length: 255
	ReminderDateTime?: Date;
	IsReminderSet: boolean;
	RecurrenceActivityId?: any; // Check Task relationship null.
	IsRecurrence: boolean;
	RecurrenceStartDateOnly?: string; // YYYY-MM-DD
	RecurrenceEndDateOnly?: string; // YYYY-MM-DD
	RecurrenceTimeZoneSidKey?: RecurrenceTimeZoneSidKeyType;
	RecurrenceType?: RecurrenceTypeType;
	RecurrenceInterval?: number; // Max length: 9
	RecurrenceDayOfWeekMask?: number; // Max length: 9
	RecurrenceDayOfMonth?: number; // Max length: 9
	RecurrenceInstance?: RecurrenceInstanceType;
	RecurrenceMonthOfYear?: RecurrenceMonthOfYearType;
	RecurrenceRegeneratedType?: RecurrenceRegeneratedTypeType;
	TaskSubtype?: TaskSubtypeType;
	litify_pm__Billable__c: boolean;
	litify_pm__Default_Matter_Task__c?: any; // Check litify_pm__Default_Matter_Task__c relationship litify_pm__Default_Matter_Task__r.
	litify_pm__Document_Link__c?: any; // Check .md for details.
	litify_pm__Estimated_Duration__c?: number; // Max length: 16.2
	litify_pm__Estimated_Expense_Cost__c?: number; // Max length: 18.0
	litify_pm__Estimated_Time_Value__c?: number; // Max length: 18.0
	litify_pm__Matter_Stage_Activity__c?: any; // Check litify_pm__Matter_Stage_Activity__c relationship litify_pm__Matter_Stage_Activity__r.
	litify_pm__AssociatedObjectName__c?: string; // Max length: 255
	litify_pm__Completed_Date__c?: Date;
	litify_pm__AssigneeName__c?: string; // Max length: 1300
	litify_pm__CalendarRulesDoNotRecalculate__c: boolean;
	litify_pm__CalendarRulesJurisdictionSystemID__c?: string; // Max length: 32
	litify_pm__CalendarRulesParentSystemID__c?: string; // Max length: 32
	litify_pm__CalendarRulesSystemID__c?: string; // Max length: 32
	litify_pm__CalendarRulesTrigger__c?: any; // Check litify_pm__CalendarRulesTrigger__c relationship litify_pm__CalendarRulesTrigger__r.
	litify_pm__ChangeReason__c?: string; // Max length: 255
	litify_pm__DefaultMatterTaskType__c?: string; // Max length: 1300
	litify_pm__EventLogJunction__c?: any; // Check litify_pm__EventLogJunction__c relationship litify_pm__EventLogJunction__r.
	litify_pm__MatterStage__c?: string; // Max length: 1300
	litify_pm__OriginalDate__c?: Date;
	litify_pm__Parent__c: boolean;
	litify_pm__UserRoleRelatedJunction__c?: string; // Max length: 1300
	litify_pm__DueDateDoNotRecalculate__c: boolean;
	litify_pm__Event_Type__c?: litify_pm__Event_Type__cType;
	litify_pm__Matter__c?: any; // Check litify_pm__Matter__c relationship litify_pm__Matter__r.
	litify_pm__In_Task_Set__c: boolean;
	litify_pm__lit_Color_Icon__c?: string; // Max length: 1300
	Appointment_Holder__c?: any; // Check Appointment_Holder__c relationship Appointment_Holder__r.
	Status__c?: Status__cType;
	litify_pm__Parent_Task_Id__c?: string; // Max length: 255
	litify_pm__lit_Color__c?: litify_pm__lit_Color__cType;
}

export type StatusType =
	| "Not Started"
	| "In Progress"
	| "Completed"
	| "Waiting on someone else"
	| "Deferred"
	| "Discontinued";

export type PriorityType = "High" | "Normal" | "Low";

export type CallTypeType = "Internal" | "Inbound" | "Outbound";

export type RecurrenceTimeZoneSidKeyType =
	| "Pacific/Kiritimati"
	| "Pacific/Enderbury"
	| "Pacific/Tongatapu"
	| "Pacific/Chatham"
	| "Asia/Kamchatka"
	| "Pacific/Auckland"
	| "Pacific/Fiji"
	| "Pacific/Guadalcanal"
	| "Pacific/Norfolk"
	| "Australia/Lord_Howe"
	| "Australia/Brisbane"
	| "Australia/Sydney"
	| "Australia/Adelaide"
	| "Australia/Darwin"
	| "Asia/Seoul"
	| "Asia/Tokyo"
	| "Asia/Hong_Kong"
	| "Asia/Kuala_Lumpur"
	| "Asia/Manila"
	| "Asia/Shanghai"
	| "Asia/Singapore"
	| "Asia/Taipei"
	| "Australia/Perth"
	| "Asia/Bangkok"
	| "Asia/Ho_Chi_Minh"
	| "Asia/Jakarta"
	| "Asia/Rangoon"
	| "Asia/Dhaka"
	| "Asia/Kathmandu"
	| "Asia/Colombo"
	| "Asia/Kolkata"
	| "Asia/Karachi"
	| "Asia/Tashkent"
	| "Asia/Yekaterinburg"
	| "Asia/Kabul"
	| "Asia/Tehran"
	| "Asia/Baku"
	| "Asia/Dubai"
	| "Asia/Tbilisi"
	| "Asia/Yerevan"
	| "Africa/Nairobi"
	| "Asia/Baghdad"
	| "Asia/Beirut"
	| "Asia/Jerusalem"
	| "Asia/Kuwait"
	| "Asia/Riyadh"
	| "Europe/Athens"
	| "Europe/Bucharest"
	| "Europe/Helsinki"
	| "Europe/Istanbul"
	| "Europe/Minsk"
	| "Europe/Moscow"
	| "Africa/Cairo"
	| "Africa/Johannesburg"
	| "Europe/Amsterdam"
	| "Europe/Berlin"
	| "Europe/Brussels"
	| "Europe/Paris"
	| "Europe/Prague"
	| "Europe/Rome"
	| "Africa/Algiers"
	| "Africa/Casablanca"
	| "Europe/Dublin"
	| "Europe/Lisbon"
	| "Europe/London"
	| "America/Scoresbysund"
	| "Atlantic/Azores"
	| "GMT"
	| "Atlantic/Cape_Verde"
	| "Atlantic/South_Georgia"
	| "America/St_Johns"
	| "America/Argentina/Buenos_Aires"
	| "America/Halifax"
	| "America/Sao_Paulo"
	| "Atlantic/Bermuda"
	| "America/Caracas"
	| "America/Indiana/Indianapolis"
	| "America/New_York"
	| "America/Puerto_Rico"
	| "America/Santiago"
	| "America/Bogota"
	| "America/Chicago"
	| "America/Lima"
	| "America/Mexico_City"
	| "America/Panama"
	| "America/Denver"
	| "America/El_Salvador"
	| "America/Mazatlan"
	| "America/Los_Angeles"
	| "America/Phoenix"
	| "America/Tijuana"
	| "America/Anchorage"
	| "Pacific/Pitcairn"
	| "America/Adak"
	| "Pacific/Gambier"
	| "Pacific/Marquesas"
	| "Pacific/Honolulu"
	| "Pacific/Niue"
	| "Pacific/Pago_Pago";

export type RecurrenceTypeType =
	| "RecursDaily"
	| "RecursEveryWeekday"
	| "RecursMonthly"
	| "RecursMonthlyNth"
	| "RecursWeekly"
	| "RecursYearly"
	| "RecursYearlyNth";

export type RecurrenceInstanceType =
	| "First"
	| "Second"
	| "Third"
	| "Fourth"
	| "Last";

export type RecurrenceMonthOfYearType =
	| "January"
	| "February"
	| "March"
	| "April"
	| "May"
	| "June"
	| "July"
	| "August"
	| "September"
	| "October"
	| "November"
	| "December";

export type RecurrenceRegeneratedTypeType =
	| "RecurrenceRegenerateAfterDueDate"
	| "RecurrenceRegenerateAfterToday"
	| "RecurrenceRegenerated";

export type TaskSubtypeType =
	| "Task"
	| "Email"
	| "ListEmail"
	| "Cadence"
	| "Call";

export type litify_pm__Event_Type__cType =
	| "Client Meeting"
	| "Deposition"
	| "Hearing"
	| "Mediation";

export type Status__cType =
	| "Cancelled"
	| "Confirmed"
	| "Credit"
	| "Done"
	| "No Show"
	| "Open"
	| "Postponed"
	| "Rescheduled";

export type litify_pm__lit_Color__cType =
	| "red"
	| "orange"
	| "green"
	| "blue"
	| "purple"
	| "gray";
