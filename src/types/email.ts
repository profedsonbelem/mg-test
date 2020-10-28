import { MailObject } from "./sns";

export class EmailEventData {
  data: EmailParamsType[];
  from: string;
  bcc?: string;
  html: string;
  subject: string;
  attachments: {
    data: string;
    name: string;
  }[];
}

export class EmailParamsType extends Object {
  email: string;
}

export class EmailData {
  data: EmailParamsType;
  from: string;
  bcc?: string;
  html: string;
  subject: string;
  attachments: {
    data: string;
    name: string;
  }[];
}

export class SNSMessageContent {
  "notificationType": string;
  "receipt": {
    timestamp: string;
    processingTimeMillis: number;
    recipients: string[];
    spamVerdict?: {
      status: string;
    };
    virusVerdict?: {
      status: string;
    };
    spfVerdict?: {
      status: string;
    };
    dkimVerdict?: {
      status: string;
    };
    action: {
      type: "SNS";
      topicArn: string;
    };
  };
  "mail": MailObject;
  "content": string;
}
