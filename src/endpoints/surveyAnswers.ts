import * as xlsx from "@sheet/core";
import { APIGatewayProxyHandler } from "aws-lambda";

import {
  getS3Object,
  putObjectOnS3,
  getS3SignedUrl,
} from "../utils/aws/s3.utils";
import { State } from "../types/state";
import { Survey } from "../types/survey";
import db from "../utils/database/db.model";
import { toCSV } from "../utils/sheets/csv";
import { CLIENT_STATUS } from "../types/status";
import { Responses } from "./common/api.response";
import { executeSteps } from "../modules/startIntake/core";
import { SurveyAnswer, Answer } from "../types/surveyAnswer";
import { authorizeAdminToken, authorizeAdminOrJWT } from "./common/auth";
import { QuestionnaireAnswer } from "../types/questionnaireAnswers";
import { retrieveFromLitify } from "../modules/surveyAnswers/litifyIntegration";
import { Intake } from "../types/intake";

export const getAnswersSheet: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  const authorizationResult = authorizeAdminToken(event);
  if (!authorizationResult.authorized) {
    return Responses._400(`Not allowed to perform this operation.`, 403);
  }

  //Get data
  const fields = event?.multiValueQueryStringParameters?.fields;
  const query = !!event.body ? JSON.parse(event.body) : {};

  let projection: any = {
    userId: 1,
    end: 1,
    questionnaireId: 1,
  };

  if (fields) {
    for (let field of fields) {
      projection[`answers.${field}`] = 1;
    }
  } else {
    projection["answers"] = 1;
  }

  // console.log(`Query: ${JSON.stringify(query)}`);
  const data = await db.retrieve<SurveyAnswer>(
    "SurveyAnswers",
    query,
    projection
  );
  // console.log(`Got ${data.length} entries`);

  if (data.length === 0) {
    return Responses._400("Data from DB is empty");
  }
  const formatedIdToken: { [_id: string]: string } = {};

  const questAnsw = await db.retrieve<QuestionnaireAnswer>(
    "QuestionnaireAnswers",
    {
      "secureLink._id": { $in: data.map(({ userId }) => userId) },
    },
    { secureLink: 1 }
  );

  for (let qa of questAnsw) {
    formatedIdToken[qa.secureLink._id] = qa.secureLink.token;
  }

  if (!event.queryStringParameters) {
    event.queryStringParameters = {};
  }

  //Get output format. csv by default
  const format = event.queryStringParameters.output || "xlsx";

  try {
    //Get answers
    const answersData = await getAnswersInFormat(data, format, formatedIdToken);

    //Upload answers and get s3 url
    const url = await uploadAnswersAndGetURL(answersData, format);

    // console.log("Done");
    return Responses._200("Success", url);
  } catch (error) {
    // console.log(`Error: ${error}`);
    return Responses._500(`Internal server error: ${error}`);
  }
};

async function getAnswersInFormat(
  data: SurveyAnswer[],
  format: string,
  formatedIdToken?: { [_id: string]: string }
) {
  // console.log("Extracting answers");
  let relevantData: any[] = [];
  const questionHeaders: {
    [_id: string]: {
      text: string;
      id: string;
      possibleChoices: { [_id: string]: string };
      type: string;
    }[];
  } = {};
  for (let i = 0; i < data.length; i++) {
    if (questionHeaders[data[i].questionnaireId] === undefined) {
      const questionHeader = await getQuestionHeaders(data[i].questionnaireId);
      if (!!questionHeader && questionHeader.length > 0) {
        questionHeaders[data[i].questionnaireId] = questionHeader;
      } else {
        questionHeaders[data[i].questionnaireId] = null;
      }
    }

    relevantData.push(
      surveyAnswerToRow(
        data[i],
        questionHeaders[data[i].questionnaireId],
        formatedIdToken[data[i].userId]
      )
    );

    /**
     * for britishairways, we need the proclaimRef field, whos is in the intake
     * @todo improve this part of the code, for now is just a "quick fix" to work as we need
     */

    const [intake] = await db.retrieve<Intake>("Intakes", {
      $and: [
        { _id: relevantData[relevantData.length - 1]["intake"] },
        {
          $or: [
            { survey: "test-britishairways" },
            { survey: "britishairways" },
          ],
        },
      ],
    });

    if (intake) {
      relevantData[relevantData.length - 1]["proclaimRef"] =
        intake.proclaimRef || "";
    } else {
      relevantData[relevantData.length - 1]["proclaimRef"] = "";
    }
  }

  console.log(`********${JSON.stringify(relevantData)}`);

  switch (format) {
    case "csv": {
      // To csv
      // console.log("Parsing");
      return toCSV(relevantData);
    }

    case "xlsx": {
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
  questionHeader?: {
    text: string;
    id: string;
    possibleChoices: { [_id: string]: string };
    type: string;
  }[],
  formatedIdToken?: string
) {
  const row: any = {
    survey: surveyAnswer._id,
    intake: surveyAnswer.userId,
    finished: "" + !!surveyAnswer.end,
    questionnaire: surveyAnswer.questionnaireId,
    questionnaireToken: formatedIdToken,
  };
  if (!!questionHeader) {
    for (let i in questionHeader) {
      const questionId = questionHeader[i].id;
      let questionText = questionHeader[i].text;
      // console.log(`${questionId}`);

      if (!surveyAnswer.answers[questionId]) {
        // console.log(`No ${id} in ${surveyAnswer.answers}`);
      } else {
        if (questionText.endsWith("\n")) {
          questionText = questionText.slice(0, -1);
        }
        if (questionHeader[i].type === "ADDRESS") {
          try {
            // console.log(`+++++++++++++${questionId}`);
            const adress = JSON.parse(surveyAnswer.answers[questionId].answer);
            row[`${questionText} (House Number)`] =
              adress["contact_house_name_number"];
            row[`${questionText} (Street)`] = adress["contact_street"];
            row[`${questionText} (county)`] = adress["contact_county"];
            row[`${questionText} (town)`] = adress["contact_town"];
            row[`${questionText} (postcode)`] = adress["contact_postcode"];
          } catch (error) {
            // // console.log(
            // 	`Failed to parse id:${questionHeader[i].id}_type:${questionHeader[i].type}`
            // );
            row[questionText] = surveyAnswer.answers[questionId].answer;
          }
        } else if (
          questionHeader[i].type === "MULTIM" ||
          questionHeader[i].type === "MULTI"
        ) {
          // console.log(`------------------${questionId}`);

          if (questionHeader[i].type === "MULTIM") {
            const options: string[] = (
              surveyAnswer.answers[questionId].answer || ""
            ).split(";");

            let answer = "";
            if (options.length > 0) {
              for (let j = 0; j < options.length; j++) {
                answer += questionHeader[i].possibleChoices[options[j]];
                if (j + 1 < options.length) {
                  answer += "\n";
                }
              }
            }

            row[questionText] = answer;
          } else {
            row[questionText] =
              questionHeader[i].possibleChoices[
                surveyAnswer.answers[questionId].answer || ""
              ];
          }
        } else {
          // console.log(`********${questionId}`);
          row[questionText] = surveyAnswer.answers[questionId].answer;
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
      const questionnaireFile = await getS3Object(
        bucket,
        `${questionnaireId}.json`
      );
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
  const questions: {
    text: string;
    id: string;
    possibleChoices: { [_id: string]: string };
    type: string;
  }[] = [];

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
          possibleChoices: currentQuestion.possibleChoices || null,
          type: currentQuestion.type,
        });
      }
    }

    currentPageName = currentPage.nextPage;
  }

  return questions;
}

async function uploadAnswersAndGetURL(answersData: any, format: string) {
  //Upload to s3
  const bucket = process.env.resources;
  const key = `temp/SURVEY_SHEET_${new Date().getTime()}.${format}`;
  console.log("Uploading to s3");
  const s3Result = await putObjectOnS3(answersData, bucket, key);
  console.log(`Uploaded to ${s3Result.ETag}`);

  //Get signed url
  console.log("Get signed url");
  const url = await getS3SignedUrl(bucket, key, "getObject");
  console.log(`Got url ${url}`);

  //Return s3 link
  return url;
}

export const retrieveSurveyByUserId: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  try {
    const authorizationResult = authorizeAdminOrJWT(event);
    if (!authorizationResult.authorized) {
      return Responses._400(`Not allowed to perform this operation.`, 403);
    }

    //Get data
    const userId = event.pathParameters.userId;
    const query = { userId };
    let data: SurveyAnswer[] = await db.retrieve<SurveyAnswer>(
      "SurveyAnswers",
      query
    );
    let litifyData: {
      answers: { [id: string]: Answer };
      status: CLIENT_STATUS;
    };
    try {
      const [token] = await db.retrieve<string, QuestionnaireAnswer>(
        "QuestionnaireAnswers",
        { "secureLink._id": userId },
        { secureLink: 1 },
        (qa) => {
          return qa.secureLink.token;
        }
      );
      litifyData = await retrieveFromLitify(token);
    } catch (error) {
      console.log(`Error retrieving from litify: ${error}`);
    }

    if (!!data) {
      if (
        authorizationResult.info.allowedAsAdmin ||
        (authorizationResult.info.userId &&
          authorizationResult.info.userId === userId)
      ) {
        if (!!litifyData) {
          for (let i in data) {
            data[i].answers = litifyData.answers;
            data[i].statusAsClient = litifyData.status;
          }
        }
        console.log(`Got ${data.length} entries`);
        return Responses._200("Success", data);
      }

      return Responses._400("You don't have permission.");
    }
    return Responses._400("Data not found", 404);
  } catch (error) {
    console.log(`Error: ${error}`);
    return Responses._500(`Internal server error: ${error}`);
  }
};

export const updateSurveyByQuestionnaireId: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  try {
    const authorizationResult = authorizeAdminOrJWT(event);
    if (!authorizationResult.authorized) {
      return Responses._400(`Not allowed to perform this operation.`, 403);
    }

    //Get data
    const questionnaireId = event.pathParameters.questionnaireId;
    const query = { _id: questionnaireId };
    const [data] = await db.retrieve("SurveyAnswers", query);
    const body = JSON.parse(event.body);
    if (
      !!data &&
      (!body._id || data._id === body._id) &&
      (!body.userId || data.userId === body.userId) &&
      (!body.questionnaireId || data.questionnaireId === body.questionnaireId)
    ) {
      if (
        authorizationResult.info.allowedAsAdmin ||
        (authorizationResult.info.userId &&
          authorizationResult.info.userId === data.userId)
      ) {
        try {
          await updateInLitify(body);
        } catch (error) {
          console.log(`Didnt update in litify: ${error}`);
          if (
            body.questionnaireId === "mercedes" ||
            body.questionnaireId === "test-mercedes"
          ) {
            return Responses._500(`Error updating in litify: ${error}`);
          }
        }

        const surveyAnswerUpdate = await db.update(
          "SurveyAnswers",
          query,
          {
            $set: body,
          },
          false,
          false
        );

        return Responses._200("Success", surveyAnswerUpdate);
      }
      return Responses._400("You don't have permission or user is inactve");
    }
    return Responses._400("Data not found", 404);
  } catch (error) {
    console.log(`Error: ${error}`);
    return Responses._500(`Internal server error: ${error}`);
  }
};

async function updateInLitify(sa: SurveyAnswer) {
  if (
    sa.questionnaireId !== "test-mercedes" &&
    sa.questionnaireId !== "mercedes"
  ) {
    return;
  }

  const [state] = await db.retrieve<State>("States", {
    "surveyAnswers._id": sa._id,
  });

  state.surveyAnswers = sa;
  if (!state.litifyData) {
    state.litifyData = {};
  }
  const steps = [];
  // Upserting Client
  if (!state.client) {
    steps.push("addClient");
  } else {
    steps.push("updateClient");
  }

  // Upserting Claim
  if (!state.claim) {
    steps.push("addClaim");
  } else {
    steps.push("updateClaim");
  }

  // Upserting Account
  if (!state?.litifyData.accountId) {
    steps.push("sendAccountToLitify");
  } else {
    steps.push("updateAccountInLitify");
  }

  // Creating Intake (consequentelly, Matter) and vehicle
  if (!state?.litifyData.intakeId) {
    steps.push("createIntakeAndMatterInLitify");
    steps.push("updateMatterInLitify");
    steps.push("sendVehicleToLitify");
  }

  // Updating Matter and upserting vehicle
  else {
    steps.push("updateMatterInLitify");
    if (!state?.litifyData.vehicleId) {
      steps.push("sendVehicleToLitify");
    } else {
      steps.push("updateVehicleInLitify");
    }
  }

  await executeSteps(state, steps, false);
}
