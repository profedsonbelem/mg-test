import { APIGatewayProxyHandler } from "aws-lambda";
import db from "../utils/database/db.model";
import { Responses } from "./common/api.response";
import { processBody } from "../modules/startIntake/constructors";
import { findBestMatch } from "string-similarity";
import { normalizeString } from "../utils/misc/string.utils";
import { CLIENT_STATUS } from "../types/status";
import { mapAttributes } from "../utils/misc/object.utils";
import { statusToString } from "../utils/misc/clientStatus.utils";
import { authorizeAgentToken } from "./common/auth";
import { authorizeIfAny } from "../modules/auth/core";

type QueryResult = {
  answers: {
    personal_first_name?: {
      answer: string;
    };
    personal_surname?: {
      answer: string;
    };
    contact_email?: {
      answer: string;
    };
    vehicle_original_registration_number?: {
      answer: string;
    };
    vehicle_current_registration_number?: {
      answer: string;
    };
  };
  end: boolean;
  userId: string;
  statusAsClient: CLIENT_STATUS;
  questionnaireId: string;
};

type ParsedData = {
  firstName: string;
  surname: string;
  email: string;
  originalPlate: string;
  currentPlate: string;
  end: boolean;
  userId: string;
  status: CLIENT_STATUS;
  questionnaireId: string;
};

export function extractAttribute(
  data: ParsedData,
  attribute: string
): string[] {
  switch (attribute) {
    case "name": {
      return [`${data.firstName} ${data.surname}`];
    }
    case "email": {
      return [data.email.split("@")[0]];
    }
    case "plate": {
      return [data.originalPlate, data.currentPlate];
    }
    default: {
      console.log(`Search by ${attribute} not implemented`);
      throw new Error(`Search by ${attribute} not implemented`);
    }
  }
}

export function extractRelevantData(data: ParsedData) {
  return {
    name: `${data.firstName} ${data.surname}`,
    email: data.email,
    originalPlate: data.originalPlate,
    currentPlate: data.currentPlate,
    completed: !!data.end,
    intakeStatus: statusToString(data.status),
    clientId: data.userId,
  };
}

function calcHigherSimilarity(valueA: string, valueB: string[]) {
  // console.log(`Comparing ${name} and ${JSON.stringify(data)}`);

  const matches = findBestMatch(valueA, valueB);

  return matches.bestMatch.rating;
}

function filterData(
  data: ParsedData[],
  attribute: string,
  value: string,
  threshold: number
) {
  const filteredData: {
    [userId: string]: {
      data: ParsedData;
      similarity: number;
    };
  } = {};

  for (let i in data) {
    const cur = data[i];

    const dataValue = extractAttribute(cur, attribute).map(normalizeString);

    const similarity = calcHigherSimilarity(value, dataValue);
    if (similarity > threshold) {
      console.log(`Match ${JSON.stringify(cur)}`);
      //Add to filteredData
      filteredData[cur.userId] = {
        data: cur,
        similarity,
      };
    } else {
      //Do nothing
      continue;
    }
  }

  return filteredData;
}

/** Returns the query to ensure the search by that attribute is possible */
export function getQuery(attribute: string) {
  // let query: any = {
  //   questionnaireId: { $regex: /mercedes/i },
  // };
  let query: any = {
    questionnaireId: { $ne: null },
  };
  switch (attribute) {
    case "name": {
      query["$or"] = [
        { "answers.personal_first_name": { $exists: true } },
        { "answers.personal_surname": { $exists: true } },
      ];

      break;
    }
    case "email": {
      query["answers.contact_email"] = { $exists: true };

      break;
    }
    case "plate": {
      query["$or"] = [
        { "answers.vehicle_original_registration_number": { $exists: true } },
        { "answers.vehicle_current_registration_number": { $exists: true } },
      ];

      break;
    }
    default: {
      console.log(`Search by ${attribute} not implemented`);
      throw new Error(`Search by ${attribute} not implemented`);
    }
  }

  return query;
}

export function dataMap(result: QueryResult) {
  return mapAttributes(
    result,
    {
      "answers.personal_first_name.answer": "firstName",
      "answers.personal_surname.answer": "surname",
      "answers.contact_email.answer": "email",
      "answers.vehicle_original_registration_number.answer": "originalPlate",
      "answers.vehicle_current_registration_number.answer": "currentPlate",
      end: "end",
      userId: "userId",
      statusAsClient: "status",
      questionnaireId: "questionnaireId",
    },
    {
      keepAttributes: false,
      defaultValues: {
        firstName: "",
        surname: "",
        email: "",
        originalPlate: "",
        currentPlate: "",
        status: CLIENT_STATUS.Active,
      },
    }
  );
}

/** @todo map attributes after search */
async function searchAttribute(
  attribute: string,
  value: string,
  threshold: number
) {
  const query = getQuery(attribute);

  // Get query and projection
  const projection: { [field: string]: 1 } = {
    "answers.personal_first_name.answer": 1,
    "answers.personal_surname.answer": 1,
    "answers.contact_email.answer": 1,
    "answers.vehicle_original_registration_number.answer": 1,
    "answers.vehicle_current_registration_number.answer": 1,
    end: 1,
    userId: 1,
    statusAsClient: 1,
    questionnaireId: 1,
  };

  const data = await db.retrieve<ParsedData, QueryResult>(
    "SurveyAnswers",
    query,
    projection,
    dataMap
  );

  const filtered = filterData(data, attribute, value, threshold);

  return filtered;
}

/** @todo When sorting by email, also check extension */
async function formatResults(filteredData: {
  [userId: string]: { data: ParsedData; similarity: number };
}) {
  //Load QuestionnaireAnswers data
  const questionnaireAnswers: {
    secureLink: { _id: string; token: string };
  }[] = await db.retrieve<any>(
    "QuestionnaireAnswers",
    { "secureLink._id": { $in: Object.keys(filteredData) } },
    { "secureLink._id": 1, "secureLink.token": 1 }
  );

  //Define link prefix
  const linkPrefix =
    process.env.stage === "Production"
      ? "http://questionnaire.pgmbm.com"
      : "http://test-questionnaire.pgmbm.com";

  // Create vector with data, link and similarity
  const results: {
    similarity: number;
    link: string;
    name: string;
    email: string;
    originalPlate: string;
    currentPlate: string;
    completed: boolean;
    intakeStatus: string;
    clientId: string;
  }[] = [];
  for (let i in questionnaireAnswers) {
    const cur = questionnaireAnswers[i];
    const curData = filteredData[cur.secureLink._id];

    const clientData = {
      ...extractRelevantData(curData.data),
      similarity: curData.similarity,
      link: `${linkPrefix}/survey?token=${cur.secureLink.token}`,
    };
    results.push(clientData);
  }

  return results.sort((a, b) => {
    return b.similarity - a.similarity;
  });
}

/** @todo use authorizer */
export const searchClient: APIGatewayProxyHandler = async (event, _context) => {
  const authorizationResult = authorizeIfAny(event, [
    "validateAdminToken",
    "validateAgentToken",
  ]);
  if (!authorizationResult.authorized) {
    return Responses._400(`Not allowed to perform this operation.`, 403);
  }

  try {
    const value = event.queryStringParameters.value;
    const threshold = Number.parseFloat(
      event.queryStringParameters.threshold || "0.4"
    );
    const attribute = event.queryStringParameters.attribute || "name";

    let normalizedValue = normalizeString(value);
    if (attribute === "email") {
      normalizedValue = normalizedValue.split("@")[0];
    }
    console.log(`Searching for ${attribute} ${value} (${normalizedValue})`);

    const surveyAnswers = await searchAttribute(
      attribute,
      normalizedValue,
      threshold
    );

    const results = await formatResults(surveyAnswers);

    return Responses._200("Query result", results);
  } catch (error) {
    console.log(`Internal server error: ${error}`);
    return Responses._500(`Internal server error: ${error}`);
  }
};

/** @todo use authorizer */
export const createNew: APIGatewayProxyHandler = async (
  event,
  _context,
  cb
) => {
  const authorizationResult = authorizeIfAny(event, [
    "validateAdminToken",
    "validateAgentToken",
  ]);
  if (!authorizationResult.authorized) {
    return Responses._400(`Not allowed to perform this operation.`, 403);
  }

  try {
    console.log("Parsing body");
    let body = JSON.parse(event.body);
    body.modules = [
      "createIntakeFromRaw",
      "createQuestionnaireAnswer",
      "createSurveyAnswer",
      "generateSurveyLink",
      "addClient",
      "addClaim",
      "sendAccountToLitify",
      "createIntakeAndMatterInLitify",
      "updateMatterInLitify",
      "sendVehicleToLitify",
      "sendEmail",
    ];

    if (!event.queryStringParameters) {
      event.queryStringParameters = {};
    }

    // const checkingDuplicates = event.queryStringParameters.checkForDuplicates !== "false";
    // console.log(`Will check for duplicates? ${checkingDuplicates}`);
    // const uniqueProperties = checkingDuplicates? ["email", "question_2"] : undefined;

    body.headers =
      process.env.stage === "Development"
        ? {
            Survey: "test-mercedes",
            "Email-Sender": "test-mercedes@pgmbm.com",
            "Resources-Folder": "mercedes",
            "Quest-Link": "http://test-questionnaire.pgmbm.com",
            "Email-Subject": "Your Mercedes-Benz Claim",
            // uniqueProperties,
          }
        : {
            Survey: "mercedes",
            "Email-Sender": "mercedes@pgmbm.com",
            "Resources-Folder": "mercedes",
            "Quest-Link": "http://questionnaire.pgmbm.com",
            "Email-Subject": "Your Mercedes-Benz Claim",
            // uniqueProperties,
          };

    return processBody(body, "agent");
  } catch (error) {
    console.log(`Error ${error}`);
    return Responses._500(`Internal server error: ${error}`);
  }
};
