import { State } from "../types/state";
import db from "../utils/database/db.model";
import { toCSV } from "../utils/sheets/csv";
import * as fs from "fs";
import { SurveyAnswer } from "../types/surveyAnswer";
import { mapAttributes } from "../utils/misc/object.utils";
import { ConnectionMongo } from "../utils/database/conn";
import { normalizeString } from "../utils/misc/string.utils";
import * as ProgressBar from "progress";
import { QuestionnaireAnswer } from "../types/questionnaireAnswers";
import { getS3Object } from "../utils/aws/s3.utils";
import { Survey } from "../types/survey";
import { getFullDate } from "../utils/misc/date.utils";
import * as xlsx from "@sheet/core";

const formated: { [_id: string]: any } = {};

async function main(envVariablesFile: string) {
  //Adjust environment varibles
  const envVariables = JSON.parse(
    fs.readFileSync(envVariablesFile).toString("utf8")
  );
  process.env = { ...process.env, ...envVariables };

  //Get data
  const query = { questionnaireId: "easyjet" };
  console.log(`Query: ${JSON.stringify(query)}`);
  const data = await db.retrieve(
    "SurveyAnswers",
    query
    // {
    //   "answers.personal_first_name.answer": 1,
    //   "answers.personal_surname.answer": 1,
    //   "answers.contact_email.answer": 1,
    //   "answers.contact_phone.answer": 1,
    //   "answers.vehicle_original_registration_number.answer": 1,
    //   "answers.vehicle_current_registration_number.answer": 1,
    //   userId: 1,
    //   end: 1,
    // },
    // (data) => {
    //   return mapAttributes(
    //     data,
    //     {
    //       "answers.personal_first_name.answer": "firstName",
    //       "answers.personal_surname.answer": "lastName",
    //       "answers.contact_email.answer": "email",
    //       "answers.contact_phone.answer": "phone",
    //       "answers.vehicle_original_registration_number.answer": "originalVRN",
    //       "answers.vehicle_current_registration_number.answer": "currentVRN",
    //       end: "finished",
    //       userId: "intakeId",
    //     },
    //     { defaultValues: { finished: false } }
    //   );
    // }
  );
  console.log(`Got ${data.length} entries`);

  const ids: string[] = [];
  for (let d of data) {
    try {
      // const f: any = {
      //   _id: d._id,
      //   userId: d.userId,
      // };
      // for (let ans in d.answers) {
      //   f[ans] = d.answers[ans].answer;
      // }
      ids.push(d.userId);
      formated[d.userId] = {};

      // formated[d.userId] = f;
    } catch (error) {
      console.log(d._id);
    }
  }

  const qas = await db.retrieve<QuestionnaireAnswer>(
    "QuestionnaireAnswers",
    { "secureLink._id": { $in: ids } },
    { secureLink: 1 }
  );
  for (let qa of qas) {
    formated[qa.secureLink._id].link =
      "http://questionnaire.pgmbm.com/survey?token=" + qa.secureLink.token;
    formated[qa.secureLink._id].email = qa.secureLink.email;
  }
  const intakes = await db.retrieve(
    "Intakes",
    { _id: { $in: ids } },
    { lang: 1 }
  );
  for (let inta of intakes) {
    formated[inta._id].lang = inta.lang || "";
  }

  try {
    // To csv
    console.log("Parsing");
    // const csv = toCSV(Object.values(data));
    // fs.writeFileSync(
    //   `data/mercedes-${getFullDate(new Date()).replace(/\//g, "-")}.csv`,
    //   csv
    // );

    fs.writeFileSync(
      "data/easyjet-2020-10-14.csv",
      await getAnswersInFormat(data, "csv", "easyjet.json")
    );
    console.log("done");
    await ConnectionMongo.closeConnection();
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

async function getAnswersInFormat(
  data: SurveyAnswer[],
  format: string,
  questionnaireId?: string
) {
  console.log("Extracting answers");
  const questionHeader = await getQuestionHeaders(questionnaireId);
  const relevantData: any[] = data.map((answer) => {
    return surveyAnswerToRow(answer, questionHeader);
  });
  switch (format) {
    case "csv": {
      // To csv
      console.log("Parsing");
      return toCSV(relevantData);
    }

    case "xlsx": {
      // console.log(JSON.stringify(relevantData[13]));
      const workSheet = xlsx.utils.json_to_sheet(relevantData);

      // Get the header range
      let range = xlsx.utils.decode_range(workSheet["!ref"]);
      range.s.r = 0;
      range.e.r = 0;

      // Apply style to headers
      xlsx.utils.sheet_set_range_style(workSheet, range, {
        bold: true,
      });

      // Freeze headers
      workSheet["!freeze"] = "A2";

      const workBook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workBook, workSheet);

      return xlsx.write(workBook, { cellStyles: true, type: "buffer" });
    }

    default: {
      throw new Error(`Unsuported format ${format}`);
    }
  }
}

function surveyAnswerToRow(
  surveyAnswer: SurveyAnswer,
  questionHeader?: { text: string; id: string }[]
) {
  const row: any = {
    survey: surveyAnswer._id,
    intake: surveyAnswer.userId,
    finished: "" + !!surveyAnswer.end,
    questionnaireId: surveyAnswer.questionnaireId,
    link: formated[surveyAnswer.userId].link,
    language: formated[surveyAnswer.userId].lang,
    email: formated[surveyAnswer.userId].email,
  };

  if (!!questionHeader) {
    for (let i in questionHeader) {
      const questionId = questionHeader[i].id;
      const questionText = questionHeader[i].text;
      if (!surveyAnswer.answers[questionId]) {
        // console.log(`No ${id} in ${surveyAnswer.answers}`);
      } else {
        if (!!surveyAnswer.answers[questionId].answer) {
          if (["address_complete"].includes(questionId)) {
            try {
              const parsedAddress = JSON.parse(
                surveyAnswer.answers[questionId].answer
              );
              for (let att in parsedAddress) {
                const attribute = "(" + att + ")" + questionText;
                // console.log("att", attribute);
                row[attribute] = parsedAddress[att];
              }
            } catch (error) {
              console.log(
                "Error parsing:",
                surveyAnswer.answers[questionId].answer
              );
            }
          } else {
            row[questionText] = surveyAnswer.answers[questionId].answer;
          }
        }
      }
    }
  } else {
    for (let id in surveyAnswer.answers) {
      if (!surveyAnswer.answers[id]) {
        // console.log(`No ${id} in ${surveyAnswer.answers}`);
      } else {
        row[id] = surveyAnswer.answers[id].answer;
      }
    }
  }

  return row;
}

async function getQuestionHeaders(questionnaireId?: string) {
  if (!!questionnaireId) {
    try {
      //Load questionnaire from s3
      const bucket = process.env.questionnaireBucket;
      const questionnaireFile = await getS3Object(bucket, questionnaireId);
      if (!questionnaireFile.Body) {
        console.log("File without body");
      } else {
        const questionnaire: Survey = JSON.parse(
          questionnaireFile.Body.toString("utf8")
        );

        //Get questions in order
        return getQuestionsInOrder(questionnaire);
      }
    } catch (error) {
      console.log(`Error in get questionnaire: ${error}`);
    }
  } else {
    console.log("No questionnaire given");
    return;
  }
}

function getQuestionsInOrder(questionnaire: Survey) {
  let currentPageName = questionnaire.startPage;
  const questions: { text: string; id: string }[] = [];

  while (!!currentPageName) {
    //Get questions in the current page
    const currentPage = questionnaire.pages[currentPageName];
    const currentPageQuestions = currentPage.questions;

    for (let i in currentPageQuestions) {
      const currentQuestion = currentPageQuestions[i];
      if (currentQuestion.type == "EXPLANATION") {
        //Wont save explanation
      } else {
        questions.push({
          text: currentQuestion.text,
          id: currentQuestion.id,
        });
      }
    }

    currentPageName = currentPage.nextPage;
  }

  return questions;
}

main(process.argv[2]);
