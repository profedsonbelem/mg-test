import * as la from "s3-list-all-objects";
import { S3 } from "aws-sdk";
import { State } from "../types/state";
import { ObjectId } from "mongodb";
import { getXMLFromEmail } from "../utils/email/email.utils";
import * as modules from "../modules/startIntake/modules";
import * as ProgressBar from "progress";
import { getS3Object } from "../utils/aws/s3.utils";
import { toCSV } from "../utils/sheets/csv";
import * as fs from "fs";

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

function getSurvey(emailBody: string) {
  const regex = new RegExp("(?<=(Survey-Name:)).*", "g");
  const survey = emailBody.match(regex)[0];
  if (!survey) {
    throw new Error("Missing survey");
  } else {
    return survey.trim();
  }
}

function initStateFromEmailContent(emailContent: string): State {
  const state = new State();
  state._id = new ObjectId().toHexString();
  state.emailXML = getXMLFromEmail(emailContent);
  state.resourcesFolder = getSurvey(emailContent);
  state.steps = ["State created from emailContent"];

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
    const firstState = initStateFromEmailContent(emailContent);
    console.log(`State emailXML: ${firstState.emailXML}`);

    //getHeaders
    const withHeaders = await modules.getHeaders(firstState);

    //createIntake
    const withIntake = await modules.createIntake(withHeaders);

    console.log(`Steps: ${withIntake.steps}`);
    if (withIntake.steps.includes("Email sent")) {
      console.log("Email was sent");
      return { sent: true, email: withIntake.intake.email };
    } else {
      console.log("Email wasn't sent");
      //Execute missing modules
      return { sent: false, email: withIntake.intake.email };
    }
  } catch (error) {
    console.log(`Error processing ${emailFile.key}`);
    console.log(`Error: ${error}`);

    return { sent: false, key: emailFile.key };
  }
}

async function main(subject: string = "") {
  //Set variables
  setVariables();

  const bucket = "clientcare.pgmbm.com";

  const subjectRegex = new RegExp(subject);
  console.log(`Get from ${subjectRegex}`);
  //Get emails received between the given dates
  const emails: any = {};
  (await listAll(bucket, ``))
    .filter((file) => {
      return subjectRegex.test(file.Key);
    })
    .forEach((file) => {
      const email = file.Key.split("/")[4];
      console.log(email);
      emails[email] = true;
    });

  console.log("Getting email");
  const emailsReceived = Object.keys(emails).map((key) => {
    return { email: key };
  });

  console.log("writing");
  fs.writeFileSync("data/sent.csv", toCSV(emailsReceived));
}

main(process.argv[2]);
