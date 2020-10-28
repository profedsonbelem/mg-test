import * as modules from "../../src/modules/startIntake/modules";
import * as fs from "fs";
import { State } from "../../src/types/state";

function loadExampleState(): State {
  return JSON.parse(
    fs
      .readFileSync("tests/endpoints/examples/exampleState.json")
      .toString("utf8")
  );
}

function setVariables() {
  process.env.mongoUrl = "mongodb://localhost:27017/test";
  process.env.failedEmail = "yvilela@mggestoes.com.br";
  process.env.resources = "test-resources.pgmbm.com";
  process.env.emailBucket = "test-clientcare.pgmbm.com";
  process.env.cryptoKey =
    "801e06323323ffce486c5912dddd6fc6a1931aff63aad5d1cf59af89577ab7ba";
  process.env.iv = "c811cd45b27b59a9d1dc476c14a57309";
  process.env.stage = "Development";
  process.env.litifyAPIUrl =
    "https://pgmbm.secure.force.com/api/services/apexrest/litify_pm/api/v1/intake/create";
}

async function testExtractInfoFromRecord() {
  const state = loadExampleState();

  //Test required resources
  const record = state.record;
  delete state.record;
  const resourcesFolder = state.resourcesFolder;
  // delete state.resourcesFolder;
  try {
    await modules.extractInfoFromRecord(state);
    console.log("ok");
  } catch (error) {
    console.log(error);
  }
}

async function testCreateIntakeFromRaw() {}

async function testGetHeaders() {}

async function testCreateIntake() {}

async function testValidateIntake() {}

async function testCreateQuestionnaireAnswer() {}

async function testCreateSurveyAnswer() {}

async function testSendEmail() {}

async function testSendSMS() {}

async function testSendToLitify() {
  const state = loadExampleState();
  setVariables();

  try {
    await modules.sendToLitify(state);
    console.log("ok");
  } catch (error) {
    console.log(error);
  }
}

testSendToLitify();
