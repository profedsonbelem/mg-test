import { SNSEventRecord, SNSEvent } from "aws-lambda";
import { getS3Object } from "./s3.utils";
import { SNS } from "aws-sdk";
import { Intake } from "../../types/intake";
import { SNSMessageContent } from "../../types/email";
import { MailObject } from "../../types/sns";

/**
 * Parses and return the event record content
 * @param record The SNS event record
 * @returns {any} The record content as json
 */
export function getRecordContent(record: SNSEventRecord): any {
  return JSON.parse(record.Sns.Message).content;
}

/**
 * Parses and return the event record header
 * @param record The SNS event record
 * @returns {any} The record header as json
 * @deprecated Use getConfigFileFromS3 instead
 */
export function getRecordHeader(record: SNSEventRecord): any {
  process.emitWarning(
    `getRecordHeader() will soon stop working,
    please use getRecordHeaderFromS3() 
    and update your sns headers`,
    "Deprecation Warning"
  );
  const parsedMessage = JSON.parse(record.Sns.Message);

  if (!parsedMessage.mail || !parsedMessage.mail.headers) {
    console.log("Missing mail or mail.headers");
    return;
  }

  const headers: { name: string; value: string }[] = parsedMessage.mail.headers;

  const headerAsJson: { [key: string]: string } = {};
  for (let i in headers) {
    headerAsJson[headers[i].name] = headers[i].value;
  }

  return headerAsJson;
}

export function getSurveyFromRecord(record: SNSEventRecord) {
  const parsedMessage = JSON.parse(record.Sns.Message);

  if (!parsedMessage.mail || !parsedMessage.mail.headers) {
    console.log("Missing mail or mail.headers");
    return;
  }

  const snsHeaders: { name: string; value: string }[] =
    parsedMessage.mail.headers;
  //Use resources bucket
  const survey = snsHeaders.find((header) => {
    return header.name == "Survey-Name";
  });

  if (!survey) {
    return;
  } else {
    return survey.value;
  }
}

/**
 * Parses and return a configuration file. Configurations file must be uf8 encoded json.
 * @param resourcesFolder The survey name (folder within s3 resources)
 * @param fileName The key of the file in the record header
 * @returns {any} The record header as json
 *
 * @todo move this to s3.utils
 */
export async function getConfigFileFromS3(
  resourcesFolder: string,
  fileName: string
): Promise<any> {
  if (!resourcesFolder) {
    console.log("Missing survey name!");
    return {};
  }

  try {
    const resourcesBucket = process.env.resources;
    const configFile = await getS3Object(
      resourcesBucket,
      `${resourcesFolder}/configurations/${fileName}`
    );
    if (!configFile.Body) {
      console.log("Configuration file without body");
      return {};
    }

    const parsedFile = JSON.parse(configFile.Body.toString("utf8"));

    console.log(`Loaded configuration: ${JSON.stringify(parsedFile)}`);

    return parsedFile;
  } catch (error) {
    console.log(`Error loading config file: ${error}`);
    return {};
  }
}

export async function publishInSNSTopic(TopicArn: string, Message: string) {
  const sns = new SNS({
    apiVersion: "2010-03-31",
    region: "us-east-1",
  });

  console.log(`Publishing ${Message} in ${TopicArn}`);
  try {
    const publishResult = await sns.publish({ Message, TopicArn }).promise();
    console.log(`MessageId: ${publishResult.MessageId}`);
  } catch (error) {
    console.log(`Couldn't publish`);
    console.log(error);
  }
}

export function getHeaderInfo(mail: MailObject, desiredHeaders: string[]) {
  const info: { [header: string]: string } = {};
  for (let i in mail.headers) {
    const value = mail.headers[i];
    if (desiredHeaders.includes(value.name)) {
      info[value.name] = value.value;
    }
  }

  return info;
}
