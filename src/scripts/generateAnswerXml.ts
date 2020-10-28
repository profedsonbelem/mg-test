import { loadEnvVariables } from "./utils";
import db from "../utils/database/db.model";
import * as parser from "js2xmlparser";
import { writeFileSync, readFileSync } from "fs";
import { SurveyAnswer, Answer } from "../types/surveyAnswer";
import { Survey } from "../types/survey";
import { getS3Object } from "../utils/aws/s3.utils";
import { Question } from "../types/question";
import { State } from "../types/state";
import { Intake } from "../types/intake";
import { getOnlyAttributes } from "../utils/misc/object.utils";
import { ConnectionMongo } from "../utils/database/conn";

async function main(
  envPath: string,
  surveyAnswersId: string,
  intakeFields?: string,
  rootTag: string = "xml"
) {
  loadEnvVariables(envPath);

  // Load survey answers
  const [surveyAnswer] = await db.retrieve<SurveyAnswer>("SurveyAnswers", {
    _id: surveyAnswersId,
  });

  // Load questionnaire
  const survey: Survey = await getS3Object(
    process.env.questionnaireBucket,
    `${surveyAnswer.questionnaireId}.json`
  ).then((file) => {
    return JSON.parse(file.Body.toString("utf8"));
  });
  const questions: { [id: string]: Question } = {};
  for (let pageId in survey.pages) {
    const page = survey.pages[pageId];
    for (let question of page.questions) {
      questions[question.id] = question;
    }
  }

  // Create json with formated answers
  let answersJson: any = extractAnswers(surveyAnswer, questions);

  // Add other variables to json
  if (intakeFields) {
    const [intake] = await db.retrieve<Intake>("Intakes", {
      _id: surveyAnswer.userId,
    });
    const intakeInfo = getOnlyAttributes(intake, intakeFields.split(","));

    answersJson = { answers: answersJson, intakeInfo };
  }

  // Parse to xml
  const xml = parser.parse(rootTag, answersJson, {
    replaceInvalidChars: true,
  });

  // Write xml
  writeFileSync(`data/${surveyAnswersId}.xml`, xml);

  console.log(`Written to data/${surveyAnswersId}.xml`);

  await ConnectionMongo.closeConnection();
}

function extractAnswers(
  surveyAnswer: SurveyAnswer,
  questions: { [id: string]: Question }
) {
  const result: any = {};
  for (let id in surveyAnswer.answers) {
    const answer = surveyAnswer.answers[id];

    const formatedAnswer = formatAnswer(answer, questions[id]);
    if (formatedAnswer != undefined) {
      result[id] = formatedAnswer;
    }
  }

  return result;
}

function formatAnswer(answer: Answer, question: Question) {
  switch (question.type) {
    case "ADDRESS": {
      if (!answer.answer) {
        return undefined;
      } else {
        return JSON.parse(answer.answer);
      }
    }
    case "MULTIM": {
      if (!answer.answer) {
        return undefined;
      } else {
        return (<string>answer.answer).split(";");
      }
    }
    default: {
      return answer.answer;
    }
  }
}

main(process.argv[2], process.argv[3], process.argv[4], process.argv[5]);
