import * as fs from "fs";
import { INTAKE_STATUS, Intake } from "../../src/types/intake";
import { IntakeModel } from "../../src/models/intake.model";
import { IntakeErrorModel } from "../../src/models/intakeError.model";
import { QuestionnaireAnswerModel } from "../../src/models/questionnaireAnswer.model";
import { SNSEventRecord } from "aws-lambda";
import {
  loadEmailTemplate,
  sendEmergencyEmail,
  getXMLFromEmail,
} from "../../src/utils/email/email.utils";
import { createUniqueLinkWithSecurity } from "../../src/utils/auth/token.utils";
import { parseXML } from "../../src/utils/misc/xml.utils";
import { processRecord } from "../../src/modules/startIntake/constructors";
import { startFromData } from "../../src/endpoints/startIntake";
import { CLIENT_STATUS } from "../../src/types/status";

// 01 parseEmail(): string {}

// 02 parseXML(body: string): Intake {}

// 03 validateIntake(intake: Intake): Promise<boolean> {}

// 04 saveIntakeOnDB(intake: Intake): Promise<boolean> {}

// 05 createQuestionnaireAnswer(intake: Intake): QuestionnaireAnswer {}

// 06 createUniqueLinkWithSecurity(): SecureLink {}

// 07 saveQuestionnaireAnswerOnDB() {}

// 08 sendEmailWithTemplate(template:string,data:any) {}

// 09 updateIntake(intake: Intake) {}

// 10 sendEmergencyEmail(data: any) {}

// 11 sendToFailed() {}

// 12 loadEmailTemplate(): string {}

async function test122() {
  // const res = loadEmailTemplate(
  //     {
  //         _id: "5ea708412487214724245381",
  //         created_at: new Date(),
  //         email: "jmalheiros@spglaw.com.br",
  //         modified_at: new Date(),
  //         status: INTAKE_STATUS.LINK_SENT,
  //         steps: [],
  //     },
  //     {
  //         secureLink: {
  //             _id: "5ea71298e7cbe02c90adcc11",
  //             email: "jmalheiros@spglaw.com.br",
  //             token:
  //                 "823c866cc2f9b16f2367910a9aceded9ad20839d152b415e5c39cb523b92909080f129e279f19be214561014db69059e0fe7d9fd816e0aad60ae859de472340b",
  //         },
  //     },
  //     "abc",
  //     "mercedes"
  // );
  // console.log(res);
}

async function test11() {
  IntakeErrorModel.sendToFailed(
    {
      _id: "5ea708412487214724245381",
      created_at: new Date(),
      email: "jmalheiros@spglaw.com.br",
      modified_at: new Date(),
      status: INTAKE_STATUS.LINK_SENT,
      steps: [],
      statusAsClient: CLIENT_STATUS.Active,
      statusChanges: [],
    },
    {
      secureLink: {
        _id: "5ea71298e7cbe02c90adcc11",
        email: "jmalheiros@spglaw.com.br",
        token:
          "823c866cc2f9b16f2367910a9aceded9ad20839d152b415e5c39cb523b92909080f129e279f19be214561014db69059e0fe7d9fd816e0aad60ae859de472340b",
      },
      statusAsClient: CLIENT_STATUS.Active,
    },
    "Teste 1",
    "Error duplicated"
  );
}

async function test10() {
  try {
    const ret = await sendEmergencyEmail("test", "jmalheiros@spglaw.com.br");
    console.log(ret);
  } catch (error) {
    console.log("erro", error);
  }
}

async function test09() {
  try {
    const ret = await IntakeModel.updateIntake(
      "5ea708412487214724245381",
      INTAKE_STATUS.XML_PARSED,
      { date: new Date(), message: "test" }
    );
    console.log(ret);
  } catch (error) {
    console.log("erro", error);
  }
}

// async function test08() {
//   try {
//     const ret = await sendEmailWithTemplate(`<h1>Teste template for email</h1>`);
//     console.log(ret);
//   } catch (error) {
//     console.log('erro', error);
//   }
// }

async function test07() {
  console.log("test 7");
  console.log("trying to save");

  const ret = await QuestionnaireAnswerModel.saveQuestionnaireAnswerOnDB({
    secureLink: {
      _id: "5ea71298e7cbe02c90adcc11",
      email: "jmalheiros@spglaw.com.br",
      token:
        "823c866cc2f9b16f2367910a9aceded9ad20839d152b415e5c39cb523b92909080f129e279f19be214561014db69059e0fe7d9fd816e0aad60ae859de472340b",
    },
    statusAsClient: CLIENT_STATUS.Active,
  });
}

async function test06() {
  console.log("test 6");

  const ret = await createUniqueLinkWithSecurity({
    _id: "5ea708412487214724245381",
    created_at: new Date(),
    email: "jmalheiros@spglaw.com.br",
    modified_at: new Date(),
    status: INTAKE_STATUS.CREATED_ON_DB,
    steps: [],
    statusAsClient: CLIENT_STATUS.Active,
    statusChanges: [],
  });

  console.log(ret);
}

async function test05() {
  const ret = await QuestionnaireAnswerModel.createQuestionnaireAnswer({
    _id: "5ea708412487214724245381",
    created_at: new Date(),
    email: "jmalheiros@spglaw.com.br",
    modified_at: new Date(),
    status: INTAKE_STATUS.CREATED_ON_DB,
    steps: [],
    statusAsClient: CLIENT_STATUS.Active,
    statusChanges: [],
  });

  console.log(ret);
}

async function test04() {
  console.log("trying to save");
  const res = await IntakeModel.saveIntakeOnDB({
    _id: "5ea708412487214724245381",
    created_at: new Date(),
    email: "jmalheiros@spglaw.com.br",
    modified_at: new Date(),
    status: INTAKE_STATUS.LINK_SENT,
    steps: [],
    statusAsClient: CLIENT_STATUS.Active,
    statusChanges: [],
  });

  console.log(res);
}

async function test0102() {
  const email = fs.readFileSync("./tests/endpoints/email.eml").toString();
  console.log(email);
  const xml = getXMLFromEmail(email);
  console.log(xml);

  const json = await parseXML(xml);
  console.log("PARSED", json);
}

/** @todo fix */
async function testHandleRecord(record?: SNSEventRecord) {
  console.log("Not working");
  process.exit(0);
  if (!record) {
    record = JSON.parse(
      fs
        .readFileSync("./tests/endpoints/examples/exampleRecord.json")
        .toString()
    );
  }
  console.log(`Example record: ${JSON.stringify(record)}`);

  // const result = handleRecord(record);

  // console.log(`Result: ${JSON.stringify(result)}`);

  // return result;
}

/** @todo fix */
async function testHandleIntake(answersXML?: string, headers?: any) {
  console.log("Not working");
  process.exit(0);
  if (!answersXML) {
    answersXML = fs
      .readFileSync("./tests/endpoints/examples/exampleAnswersXML.txt")
      .toString();
  }
  console.log(`Example answersXML: ${answersXML}`);

  if (!headers) {
    headers = JSON.parse(
      fs
        .readFileSync("./tests/endpoints/examples/exampleHeaders.json")
        .toString()
    );
  }
  console.log(`Example headers: ${JSON.stringify(headers)}`);

  // const result = await handleIntake(answersXML, headers);

  // console.log(`Result: ${JSON.stringify(result)}`);
}

/** @todo fix */
async function testHandleAnswers(intake?: Intake) {
  console.log("Not working");
  process.exit(0);
  if (!intake) {
    intake = JSON.parse(
      fs
        .readFileSync("./tests/endpoints/examples/exampleIntake.json")
        .toString()
    );
  }
  console.log(`Example answersXML: ${intake}`);

  // const result = await handleAnswers(intake);

  // console.log(`Result: ${JSON.stringify(result)}`);
}

async function testDoSteps(record?: SNSEventRecord) {
  if (!record) {
    record = JSON.parse(
      fs
        .readFileSync("./tests/endpoints/examples/exampleEasyJetRecord.json")
        .toString()
    );
  }
  console.log(`Example record: ${JSON.stringify(record)}`);

  const result = await processRecord(record);

  console.log(`Result: ${JSON.stringify(result)}`);

  return result;
}

async function testCreateIntakeFromData() {
  const data = {
    email: "yvilela@mggestoes.com.br",
    name: "Yuri G",
  };
  const a: any = {};

  const survey = "airlines";
  const result = await startFromData(
    {
      ...a,
      body: JSON.stringify({ data, resourcesFolder: survey }),
      pathParameters: {},
      headers: {},
      httpMethod: "POST",
      path: "/Counters",
      isBase64Encoded: false,
      multiValueHeaders: {},
      multiValueQueryStringParameters: {},
      queryStringParameters: {},
      resource: "",
    },
    { ...a },
    (a) => {}
  );

  console.log("Done");
}

async function main() {
  console.log("Running test");
  process.env.mongoUrl =
    "mongodb://microservices:lLyJv0rxkSm1JoIE@54.221.99.0/microservicesdb";
  process.env.failedEmail = "yvilela@mggestoes.com.br";
  process.env.resources = "test-resources.pgmbm.com";
  process.env.emailBucket = "test-clientcare.pgmbm.com";
  process.env.cryptoKey =
    "801e06323323ffce486c5912dddd6fc6a1931aff63aad5d1cf59af89577ab7ba";
  process.env.iv = "c811cd45b27b59a9d1dc476c14a57309";
  process.env.stage = "Development";
  testDoSteps();
}

main();
