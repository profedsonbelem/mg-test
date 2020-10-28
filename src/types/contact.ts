import { EmailParamsType } from "./email";

export interface Contact {
  _id: string;
  type: ContactType;
  emailTo?: string; //ok
  emailFrom?: string; // ok
  bcc?: string;
  telTo?: string;
  location?: string;
  subject: string; // ok
  notes: string; // html body
  emailData?: EmailParamsType;
  startTime: Date;
  endTime?: Date;
  contactedByUser: string;
  recordPath?: string;
  creationDate: Date; //ok
  lastModified: Date; // ok
  contactedBySource: string;
  tags: ContactTags[]; // ok
  clientId?: string;
  idSES?: string;
  retried?: boolean;
  error?: string[];
  hasAttachments?: boolean; // ok
  accountId?: string;
  litifyId?: string;
  textEmailBody?: string;
}

export enum ContactType {
  "email",
  "WhatsApp",
  "SMS",
  "call",
  "in_person",
}

export enum ContactTags {
  "Successful",
  "Unsuccessful",
  "Failed contact",
  "Don't contact again",
  "Wrong no/Email",
  "Try at later date",
  "Cancellation",
  "Inbound",
  "Outbound",
  "Call back",
  "Complete",
  "Incomplete",
  "Cancel",
  "Delete",
  "Voicemail",
  "No pick pp",
  "Email",
  "None",
  "Survey Cancel",
  "Make Change",
  "Duplicated",
  "Not Found",
  "Invalid Number",
  "Fake",
  "Deceased",
  "Easyjet",
  "General Inquiries",
}
