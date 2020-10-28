import { SNSHandler } from "aws-lambda";
import { processRecord } from "../modules/contacts/logEmailProcessor";
import { MailObject } from "../types/sns";

export const logEmailContact: SNSHandler = async (event, _context) => {
  try {
    for (var i = 0; i < event.Records.length; i++) {
      const record = event.Records[i];
      console.log(`Processing record ${i}`);
      console.log(record);
      const parsedContent: S3MessageContent = JSON.parse(record.Sns.Message);
      await processRecord(parsedContent);
    }
  } catch (err) {
    console.log(err);
  }
};

export interface S3MessageContent {
  notificationType: "Received";
  receipt: {
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
      type: "S3";
      topicArn: string;
      bucketName: string;
      objectKeyPrefix: string;
      objectKey: string;
    };
  };
  mail: MailObject;
}
