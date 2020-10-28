import * as fs from "fs";
import * as ProgressBar from "progress";
import { getConfigFileFromS3 } from "../utils/aws/sns.utils";
import { processBody } from "../modules/startIntake/constructors";

function setVariables() {
  process.env.cryptoKey =
    "38a9a3021cf13eb23a6445d411aeb68cabe555950b4b23c69c2dbaa15c8d3589";
  process.env.emailBucket = "clientcare.pgmbm.com";
  process.env.failedEmail = "yvilela@mggestoes.com.br";
  process.env.iv = "3fe0436b6f5231540d2b1dc468d96838";
  process.env.mongoUrl =
    "mongodb://microservices:hFKVUxrHtQ7tcgJt@34.207.118.67:27017/production";
  process.env.resources = "resources.pgmbm.com";
  process.env.stage = "Production";
}

async function main(
  jsonPath: string,
  dataAttribute: string,
  resourcesFolderAttribute: string
) {
  setVariables();

  // Read data
  console.log(`Reading json`);
  const toCreate: any[] = JSON.parse(
    fs.readFileSync(jsonPath).toString("utf8")
  );
  console.log(`Found ${toCreate.length} entries`);

  // Init general variables
  const modules = [
    "createIntakeFromRaw",
    "createQuestionnaireAnswer",
    "createSurveyAnswer",
    "generateSurveyLink",
    "sendEmail",
  ];
  const loadedHeaders: { [resourcesFolder: string]: any } = {};
  const bar = new ProgressBar(":bar:eta", toCreate.length);
  const success = [];
  const failed = [];

  for (let i in toCreate) {
    const cur = toCreate[i];
    try {
      // Init variables to process current
      const data = cur[dataAttribute];
      const resourcesFolder = cur[resourcesFolderAttribute];
      if (!loadedHeaders[resourcesFolder]) {
        console.log(`Loading headers for ${resourcesFolder}`);
        loadedHeaders[resourcesFolder] = await getConfigFileFromS3(
          resourcesFolder,
          "headers.json"
        );
      }
      const headers = loadedHeaders[resourcesFolder];

      // Try to process
      const response = await processBody(
        {
          data,
          resourcesFolder,
          headers,
          modules,
        },
        "json"
      );

      // If succeded, push to success
      if (response.statusCode == 200) {
        console.log(`\n\n\nSuccessfully processed ${response.body}\n\n\n`);
        success.push(response.body);
      }
      // Otherwise, push to failed
      else {
        console.log(`\n\n\nFailed ${response.body}\n\n\n`);
        failed.push({
          data: cur,
          error: response.body,
        });
      }
    } catch (error) {
      console.log(`\n\n\nFailed ${error}\n\n\n`);
      failed.push({
        data: cur,
        error,
      });
    }

    bar.tick();
  }

  console.log(`Writing success`);
  fs.writeFileSync(`data/successfullyCreated.json`, JSON.stringify(success));

  console.log(`Writing fail`);
  fs.writeFileSync(`data/failedToCreate.json`, JSON.stringify(failed));
}

main(process.argv[2], process.argv[3], process.argv[4]);
