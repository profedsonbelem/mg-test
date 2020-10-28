import { ObjectId } from "mongodb";
import { SurveyAnswer } from "../types/surveyAnswer";
import { State } from "../types/state";
import db from "../utils/database/db.model";
import { getConfigFileFromS3 } from "../utils/aws/sns.utils";
import { CLIENT_STATUS } from "../types/status";

/** Static class to work with survey answers*/
export class SurveyAnswersModel {
  /** Create a survey answer for the state */
  static async createSurveyAnswer(state: State): Promise<SurveyAnswer> {
    const survey = await intakeToSurveyAnswer(state);

    console.log(`Created survey: ${JSON.stringify(survey)}`);

    await db.update(
      "SurveyAnswers",
      { _id: survey._id },
      { $set: survey },
      false
    );

    return survey;
  }
}

function newSurveyAnswerForIntake(intake: any, _id?: string) {
  if (!_id) {
    _id = new ObjectId().toHexString();
  }

  return {
    _id,
    userId: intake._id,
    answers: {},
    end: null,
    dateStart: new Date(),
    nextQuestion: null,
    questionnaireId: intake.survey,
    statusAsClient: CLIENT_STATUS.Active,
  };
}

export interface IntakeToSurveyMaps {
  answerMap?: { [attInIntake: string]: string };
  additionalInfoMap?: { [attInIntake: string]: string };
}

/** @todo move this to utils/misc/intake.utils */
async function intakeToSurveyAnswer(state: State) {
  const surveyId = state.surveyAnswers ? state.surveyAnswers._id : undefined;
  const survey: SurveyAnswer = newSurveyAnswerForIntake(state.intake, surveyId);
  const idDate = new Date();

  //Get intake to survey maps
  const resourcesFolder = state.resourcesFolder;
  const intakeToSurveyMaps: IntakeToSurveyMaps = await getConfigFileFromS3(
    resourcesFolder,
    "intakeToSurveyMaps.json"
  );
  const answerMap = intakeToSurveyMaps.answerMap || {};
  const additionalInfoMap = intakeToSurveyMaps.additionalInfoMap || {};

  //Copy answers from intake
  const intake = state.intake;
  for (let attInIntake in answerMap) {
    const attInSurvey = answerMap[attInIntake];
    console.log(`Att ${attInIntake}: ${intake[attInIntake]}`);

    if (!!intake[attInIntake]) {
      survey.answers[attInSurvey] = {
        id: idDate,
        answer: intake[attInIntake],
        questionId: attInSurvey,
        isFile: false,
      };
    }
  }

  //Copy additional info from intake
  for (let attInIntake in additionalInfoMap) {
    const attInSurvey = additionalInfoMap[attInIntake];

    if (!!intake[attInIntake]) {
      survey.answers[attInSurvey] = {
        id: idDate,
        answer: "",
        questionId: attInSurvey,
        isFile: false,
        additionalInfo: intake[attInIntake],
      };
    }
  }

  return survey;
}
