import { SNSEventRecord } from "aws-lambda";
import { StateModel } from "../../models/state.model";
import { executeSteps } from "./core";
import { Responses } from "../../endpoints/common/api.response";
import { IntakeModel } from "../../models/intake.model";
import {
  getSurveyFromRecord,
  getConfigFileFromS3,
} from "../../utils/aws/sns.utils";

export async function processRecord(record: SNSEventRecord) {
  let firstState = await StateModel.initStateFromRecord(record);
  const modulesName: string[] = await getModulesFromRecord(record);

  const finalState = await executeSteps(firstState, modulesName);

  console.log(`Final state: ${JSON.stringify(finalState)}`);

  return finalState;
}

export async function processBody(body: any, originLambda: string) {
  //Get resources
  const resourcesFolder = body.resourcesFolder;
  const intakeData = body.data;
  const headers = body.headers;
  if (!resourcesFolder || !intakeData) {
    console.log(`Missing info: ${JSON.stringify(body)}`);
    return Responses._400(`Missing resources folder or intake data ${body}`);
  }

  //Validate intake data
  console.log("Validating intake data");
  const isValid = await IntakeModel.validateIntake(intakeData);
  if (!isValid.valid) {
    console.log(`Invalid intake ${intakeData}: ${isValid.reason}`);
    return Responses._400(`Invalid intake ${intakeData}: ${isValid.reason}`);
  }

  //Get modules
  const modules = await getModulesFromSurvey(body);

  //Execute modules
  try {
    console.log("Creating state");
    const firstState = await StateModel.initStateFromRawIntake(
      intakeData,
      resourcesFolder,
      originLambda,
      headers
    );

    console.log(`Executing modules: ${JSON.stringify(modules)}`);
    const finalState = await executeSteps(firstState, modules);

    return Responses._200("Success", {
      token: finalState.questionnaireAnswers.secureLink.token,
      link: finalState.surveyLink,
      intakeId: finalState.intake._id,
      surveyId: finalState.surveyAnswers._id,
    });
  } catch (error) {
    if (error.status) {
      console.log(`Error: ${JSON.stringify(error)}`);
      return Responses._400(error.message, error.status, error.aditionalInfo);
    } else {
      console.log(error);
      return Responses._500(`Internal server error: ${error}`);
    }
  }
}

async function getModulesFromRecord(record: SNSEventRecord) {
  console.log(`Loading modules`);
  const survey = getSurveyFromRecord(record);
  return await getConfigFileFromS3(survey, "modules.json");
}

async function getModulesFromSurvey(body: any) {
  console.log(`Loading modules`);
  //return await getConfigFileFromS3(survey, "modules.json");
  return (
    body.modules || [
      "getHeaders",
      "createIntakeFromRaw",
      "createQuestionnaireAnswer",
      "createSurveyAnswer",
      "addClient",
      "addClaim",
      "sendAccountToLitify",
      "createIntakeAndMatterInLitify",
      "updateMatterInLitify",
      "sendVehicleToLitify",
      "generateSurveyLink",
    ]
  );
}
