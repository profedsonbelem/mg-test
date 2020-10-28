/** @constant salesforceName Type name in salesforce */
 export const salesforceName = "Call_Register__c";

/** @constant allFields All fields, comma separated.
 * As salesforce doesn't support 'SELECT *', use 'SELECT `${allFields}`' 
 */
 export const allFields = "Id, OwnerId, IsDeleted, Name, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, LastViewedDate, LastReferencedDate, Phoned_to__c, Subject__c, Notes__c, Start_Time__c, End_Time__c, Party__c";

/** @interface Call_Register__c (labeled as Call Register)
 * Check Call_Register__c.md for fields labels and relationship info.
 */
export interface Call_Register__c {
	Id?: string; // Max length: 18
	OwnerId?: any; // Check Group,User relationship Owner.
	IsDeleted?: boolean;
	Name?: string; // Max length: 80
	CreatedDate?: Date;
	CreatedById?: any; // Check User relationship CreatedBy.
	LastModifiedDate?: Date;
	LastModifiedById?: any; // Check User relationship LastModifiedBy.
	SystemModstamp?: Date;
	LastActivityDate?: string; // YYYY-MM-DD
	LastViewedDate?: Date;
	LastReferencedDate?: Date;
	Phoned_to__c?: string; // Phone. Max length: 40
	Subject__c?: string; // Max length: 200
	Notes__c?: string; // Max length: 32768
	Start_Time__c?: Date;
	End_Time__c?: Date;
	Party__c?: string; // Max length: 200
}