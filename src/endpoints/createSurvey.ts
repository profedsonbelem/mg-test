import { APIGatewayProxyHandler } from "aws-lambda";
import { Responses } from "./common/api.response";
import { Survey } from "../types/survey";
import { putObjectOnS3 } from "../utils/aws/s3.utils";
import { SES } from "aws-sdk";
import { createRecipientRule } from "../utils/aws/ses.utils";
import {
  getDefaultConfigurations,
  getDefaultTemplates,
} from "../modules/createSurvey/utils/defaults";
import { authorizeAdminToken } from "./common/auth";

export type CreateSurveyBody = {
  survey: Survey;
  name: string;
};

export const createSurvey: APIGatewayProxyHandler = async (event, _context) => {
  try {
    //Auth
    const authorizationResult = authorizeAdminToken(event);
    if (!authorizationResult.authorized) {
      return Responses._400(`Not allowed to perform this operation.`, 403);
    }

    // Get data
    const body: CreateSurveyBody = JSON.parse(event.body);
    const survey = body.survey;
    const name = body.name;

    // Create SES receipt rule
    await createIntakeRule(name);

    // Create folders in resources bucket
    await createResources(name);

    // Create survey json in questionnaires bucket
    await createSurveyJSON(survey, name);

    return Responses._200(`${name} created`);
  } catch (error) {
    console.log(`Internal server error: ${error}`);
    return Responses._500(`Internal server error: ${error}`);
  }
};

async function createSurveyJSON(survey: Survey, name: string) {
  const questionnaireBucket = process.env.questionnaireBucket;

  console.log(`Trying to put ${name}.json in ${questionnaireBucket}`);
  const putObjectResult = await putObjectOnS3(
    JSON.stringify(survey),
    questionnaireBucket,
    `${name}.json`
  );

  console.log(
    `Put ${name}.json in ${questionnaireBucket} (${putObjectResult.ETag})`
  );
}

async function createIntakeRule(surveyName: string) {
  const actions: SES.ReceiptActionsList = [
    {
      AddHeaderAction: {
        HeaderName: `Survey-Name`,
        HeaderValue: `${surveyName}`,
      },
    },
    {
      SNSAction: {
        TopicArn:
          process.env.stage === "Production"
            ? "arn:aws:sns:us-east-1:533094768615:production-bot"
            : "arn:aws:sns:us-east-1:533094768615:test-bot",
      },
    },
  ];

  if (process.env.stage === "Production") {
    const BucketName = "spg-intake-data";

    actions.push({
      S3Action: {
        BucketName,
        ObjectKeyPrefix: `_EMAILS/${surveyName}_bot.pgmbm.com`,
      },
    });
  }

  console.log(`Trying to create receipt rule ${surveyName} in INBOUND_MAIL`);
  console.log(`Actions: ${JSON.stringify(actions)}`);
  const createRuleResponse = await createRecipientRule(
    "INBOUND_MAIL",
    surveyName,
    [`${surveyName}@bot.pgmbm.com`],
    actions
  );
  console.log(`Create receipt rule response: ${createRuleResponse}`);
}

async function createResources(name: string) {
  const resourcesBucket = process.env.resources;

  // Create configurations
  const configurations = getDefaultConfigurations(name);
  console.log("Create configurations");
  for (let file in configurations) {
    console.log(`Creating configuration file ${file}`);
    const putObjectResult = await putObjectOnS3(
      JSON.stringify(configurations[file]),
      resourcesBucket,
      `${name}/configurations/${file}`
    );
    console.log(`Put ${name} in ${resourcesBucket} (${putObjectResult.ETag})`);
  }

  // Create templates
  const templates = getDefaultTemplates();
  console.log("Create templates");
  for (let file in templates) {
    console.log(`Creating template file ${file}`);
    const putObjectResult = await putObjectOnS3(
      JSON.stringify(templates[file]),
      resourcesBucket,
      `${name}/templates/${file}`
    );
    console.log(`Put ${name} in ${resourcesBucket} (${putObjectResult.ETag})`);
  }
}
