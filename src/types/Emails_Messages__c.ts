/** @constant salesforceName Type name in salesforce */
 export const salesforceName = "Emails_Messages__c";

/** @constant allFields All fields, comma separated.
 * As salesforce doesn't support 'SELECT *', use 'SELECT `${allFields}`' 
 */
 export const allFields = "Id, OwnerId, IsDeleted, Name, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, LastViewedDate, LastReferencedDate, From_Address__c, Has_Attachment__c, Html_Body__c, Incoming__c, RelatedParty__c, Subject__c, Text_Body__c, To_Address__c";

/** @interface Emails_Messages__c (labeled as Email Messages)
 * Check Emails_Messages__c.md for fields labels and relationship info.
 */
export interface Emails_Messages__c {
/** Max length: 18. */
	Id?: string;
/** Check Group,User relationship Owner. */
	OwnerId?: any;
	IsDeleted?: boolean;
/** Max length: 80 */
	Name?: string;
	CreatedDate?: Date;
/** Check User relationship CreatedBy. */
	CreatedById?: any;
	LastModifiedDate?: Date;
/** Check User relationship LastModifiedBy. */
	LastModifiedById?: any;
	SystemModstamp?: Date;
/** YYYY-MM-DD */
	LastActivityDate?: string;
	LastViewedDate?: Date;
	LastReferencedDate?: Date;
/** Email. Max length: 80. */
	From_Address__c?: string;
	Has_Attachment__c?: boolean;
/** Max length: 32768. */
	Html_Body__c?: string;
	Incoming__c?: boolean;
/** Check Account relationship RelatedParty__r. */
	RelatedParty__c?: any;
/** Max length: 255 */
	Subject__c?: string;
/** Max length: 32768. */
	Text_Body__c?: string;
/** Max length: 255 */
	To_Address__c?: string;
}