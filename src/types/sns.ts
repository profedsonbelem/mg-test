export interface EventPublishMessage {
  eventType: string;
  mail: MailObject;
  // bounce?: BounceObject;
  // complaint?: any;
  // delivery?: any;
  // send?: any;
  // reject?: any;
  // open?: any;
  // click?: any;
  // rendering?: any;
  // failure?: any;
  // deliveryDelay?: any;
}

export interface BounceEventMessage extends EventPublishMessage {
  eventType: "Bounce";
  bounce: BounceObject;
}

export interface ComplaintEventMessage extends EventPublishMessage {
  eventType: "Complaint";
  complaint: ComplaintObject;
}

export interface RejectEventMessage extends EventPublishMessage {
  eventType: "Reject";
  reject: { reason: "Bad content" };
}

export interface BounceObject {
  bounceType: string;
  bounceSubType: string;
  bouncedRecipients: {
    email: string;
    action?: string;
    status?: string;
    diagnosticCode?: string;
  }[];
  timestamp: string;
  feedbackId: string;
  reportingMTA?: string;
}

export interface UndeterminedBounceObject extends BounceObject {
  bounceType: "Undetermined";
  bounceSubType: "Undetermined";
}

export interface PermanentBounceObject extends BounceObject {
  bounceType: "Permanent";
  bounceSubType:
    | "General"
    | "NoEmail"
    | "Suppressed"
    | "OnAccountSuppressionList";
}

export interface TransientBounceObject extends BounceObject {
  bounceType: "Transient";
  bounceSubType:
    | "General"
    | "MailboxFull"
    | "MessageTooLarge"
    | "ContentRejected"
    | "AttachmentRejected";
}

export interface ComplaintObject {
  complainedRecipients: { emailAddress: string }[];
  timestamp: string;
  feedbackId: string;
  complaintSubType?: "OnAccountSuppressionList";
  userAgent: string;
  complaintFeedbackType?:
    | "abuse"
    | "auth-failure"
    | "fraud"
    | "not-spam"
    | "other"
    | "virus";
  arrivalDate: string;
}

export type MailObject = {
  timestamp: string;
  source: string;
  messageId: string;
  sourceArn: string;
  sendingAccountId: string;
  destination: [string];
  headersTruncated: boolean;
  headers: { name: string; value: string }[];
  commonHeaders: {
    returnPath: string;
    from: string[];
    date: string;
    to: string[];
    messageId: string;
    subject: string;
  };
};
