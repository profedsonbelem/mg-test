import { S3 } from "aws-sdk";
import { State } from "../types/state";
import { ObjectId } from "mongodb";
import { getXMLFromEmail } from "../utils/email/email.utils";
import { executeSteps } from "../modules/startIntake/core";
import { getS3Object } from "../utils/aws/s3.utils";
import * as modules from "../modules/startIntake/modules";
import * as ProgressBar from "progress";
import * as la from "s3-list-all-objects";
import { parseXML } from "../utils/misc/xml.utils";
import * as fs from "fs";

let bar: ProgressBar;
const failed: string[] = [];

async function listAll(
  bucket: string,
  prefix?: string
): Promise<S3.ObjectList> {
  return new Promise((res, rej) => {
    la({ bucket, prefix }, function(err, data) {
      if (err) {
        rej(err);
        return;
      }
      console.log(`Listed ${data.length} files`);
      res(data);
    });
  });
}

async function getEmailsBetweenDates(
  bucket: string,
  startAt: Date,
  stopAt: Date,
  prefix?: string
) {
  console.log(`Listing from ${bucket}(prefix ${prefix})`);

  const keys: string[] = await listAll(bucket, prefix).then((list) => {
    console.log(`Done listing`);
    console.log(`Filtering`);
    return list
      .filter((obj) => {
        return obj.LastModified > startAt && obj.LastModified < stopAt;
      })
      .map((obj) => {
        return obj.Key;
      });
  });

  console.log(`${keys.length} after filter`);

  return keys;
}

function getSurvey(emailBody: string) {
  try {
    const regex = new RegExp("(?<=(Survey-Name:)).*", "g");
    const survey = emailBody.match(regex)[0];
    if (!survey) {
      console.log(`No survey in ${emailBody}`);
      throw new Error("Missing survey");
    } else {
      return survey.trim();
    }
  } catch (error) {
    console.log(`No survey in ${emailBody}`);
    throw new Error("Missing survey");
  }
}

function setVariables() {
  process.env.mongoUrl =
    "mongodb://microservices:hFKVUxrHtQ7tcgJt@34.207.118.67:27017/production";
  process.env.failedEmail = "yvilela@mggestoes.com.br";
  process.env.resources = "resources.pgmbm.com";
  process.env.emailBucket = "clientcare.pgmbm.com";
  process.env.cryptoKey =
    "38a9a3021cf13eb23a6445d411aeb68cabe555950b4b23c69c2dbaa15c8d3589";
  process.env.iv = "3fe0436b6f5231540d2b1dc468d96838";
  process.env.stage = "Development";
}

async function initStateFromEmailContent(emailContent: string): Promise<State> {
  const state = new State();
  state._id = new ObjectId().toHexString();
  state.emailXML = getXMLFromEmail(emailContent);
  state.resourcesFolder = getSurvey(emailContent);
  state.steps = ["State created from emailContent"];
  state.rawIntake = await parseXML(state.emailXML);

  return state;
}

async function processOne(emailFile: {
  key: string;
  file: S3.GetObjectOutput;
}) {
  try {
    console.log(`Processing ${emailFile.key}`);

    //Init state from email content
    const emailContent = emailFile.file.Body.toString("utf8");
    const firstState = await initStateFromEmailContent(emailContent);
    console.log(`State emailXML: ${firstState.emailXML}`);

    //getHeaders
    const withHeaders = await modules.getHeaders(firstState);

    //createIntake
    const withIntake = await modules.createIntakeFromRaw(withHeaders);

    console.log(`Steps: ${withIntake.steps}`);
    if (withIntake.steps.includes("Email sent")) {
      console.log("Email was sent");
    } else {
      console.log("Email wasn't sent");
      //Execute missing modules
      const modulesName = [
        "validateIntake",
        "createQuestionnaireAnswer",
        "createSurveyAnswer",
        "generateSurveyLink",
        "sendEmail",
      ];

      const finalState = await executeSteps(withIntake, modulesName);
    }
    console.log(`Finished ${emailFile.key}`);
  } catch (error) {
    console.log(`Error processing ${emailFile.key}`);
    console.log(`Error: ${error}`);
  }
}

async function extractXmlAndIntake(key: string) {
  try {
    const bucket = "spg-intake-data";
    // console.log(`Extracting info from ${key}`);
    const emailFile = { key, file: await getS3Object(bucket, key) };
    const emailContent = emailFile.file.Body.toString("utf8");

    const generatedState = await initStateFromEmailContent(emailContent);

    bar.tick();
    return generatedState;
  } catch (error) {
    failed.push(key);

    bar.tick();
    return undefined;
  }
}

/** Reprocess all the emailLead calls that fail between startAt and stopAt
 * @todo use clientcara bucket structure to improve listing
 */
async function main(startAt: Date, stopAt: Date) {
  // Set variables
  setVariables();

  // List received emails
  console.log(`Listing received from ${startAt} to ${stopAt}`);
  const emailsReceived = await getEmailsBetweenDates(
    "spg-intake-data",
    startAt,
    stopAt,
    "_EMAILS"
  );

  // Create state to that data
  console.log(`Generating states`);
  bar = new ProgressBar(":bar:eta", emailsReceived.length);
  const generatedStates = await Promise.all(
    emailsReceived.map(extractXmlAndIntake)
  );

  // List sent emails
  console.log(`Listing sent from ${startAt} to ${stopAt}`);
  const sentEmails = await getEmailsBetweenDates(
    process.env.emailBucket,
    startAt,
    stopAt
  );

  // Extract email addresses
  console.log(`Extracting email addresses from sent emails`);
  bar = new ProgressBar(":bar:eta", sentEmails.length);
  const onlyEmails: { [email: string]: boolean } = {};
  for (let i in sentEmails) {
    const email = sentEmails[i].split("/")[4];
    onlyEmails[email] = true;
    bar.tick();
  }

  // Filtering states that weren't sent
  console.log(`Filtering states that weren't sent`);
  bar = new ProgressBar(":bar:eta", generatedStates.length);
  const notSent = generatedStates.filter((state) => {
    bar.tick();
    return !!state && !onlyEmails[state.rawIntake.email];
  });

  console.log(
    `Received: ${emailsReceived.length} \t Not sent ${notSent.length}`
  );

  // Save generated states to be sent
  console.log(`Writing not sent`);
  fs.writeFileSync(`data/statesNotSentNew.json`, JSON.stringify(notSent));

  // Save failed
  console.log(`Writing failed to process`);
  fs.writeFileSync(`data/failedToProcessNew.json`, JSON.stringify(failed));

  // const bucket = "spg-intake-data";
  // const bar = new ProgressBar(":bar:eta", emailsReceived.length);
  // for (let i = 0; i < emailsReceived.length; i++) {
  //     const key = emailsReceived[i];
  //     console.log(`Processing ${key}`);
  //     const emailFile = { key, file: await getS3Object(bucket, key) };
  //     await processOne(emailFile);
  //     console.log("\n\n\n\n\n\n\n\n\n\n\n");

  //     bar.tick();
  // }
  console.log("DONNEEEE");
}

main(new Date(process.argv[2]), new Date(process.argv[3]));
