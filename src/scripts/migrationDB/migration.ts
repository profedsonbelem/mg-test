import { Client } from "../../types/migrationDB/client";
import db from "../../utils/database/db.model";
import * as fs from "fs";
import { MercedesClaim } from "../../types/migrationDB/mercedesClaim";
import { exit } from "process";
import { normalizeString } from "../../utils/misc/string.utils";
import { ClientModel } from "../../models/migration/client";
import { DataClient } from "../../types/migrationDB/dataClient";
import { ClaimModel } from "../../models/migration/claims";
import { Claim } from "../../types/migrationDB/claim";
import { executeSteps } from "../../modules/startIntake/core";
import { State } from "../../types/state";
import { toCSV } from "../../utils/sheets/csv";
import * as ProgressBar from "progress";
import { ObjectId } from "mongodb";
import { Json } from "aws-sdk/clients/marketplacecatalog";
import { sleep } from "../../utils/misc/time.utils";

export default async function migration(dataPath: string) {
  // buscar todos os intakes
  // buscar todos os survey answers
  // const total = await db.count("Intakes", {
  // 	survey: "mercedes",
  // });

  if (!dataPath) {
    throw new Error("data is empty");
  }

  // fs.readFileSync(data).toString("utf8")

  const dataClient: DataClient[] = JSON.parse(
    fs.readFileSync(dataPath).toString("utf8")
  );
  // const batches = total / batchSize;
  // for (let i = batch; i < batches; i++) {
  //   console.log(`\n\n\n\nLoading ${i} of ${batches}`);
  //   const dataClient: DataClient[] = await db
  //     .aggregate("Intakes", [
  //       {
  //         $match: {
  //           survey: "mercedes",
  //         },
  //       },
  //       { $skip: i * batchSize },
  //       { $limit: batchSize },
  //       {
  //         $lookup: {
  //           from: "SurveyAnswers",
  //           localField: "_id",
  //           foreignField: "userId",
  //           as: "SurveyAnswers",
  //         },
  //       },
  //     ])
  //     .catch((err) => {
  //       throw new Error(err);
  //     });

  const failedPairs: {
    intake: string;
    survey: string;
    reason: any;
    sReason: string;
  }[] = [];
  const bar = new ProgressBar(":bar:eta", dataClient.length);

  for (let data of dataClient) {
    for (let survey of data.SurveyAnswers) {
      console.log(`\n\n\n\n\n\n\nProcessing ${survey._id}`);
      if (
        survey.questionnaireId !== "mercedes" &&
        survey.questionnaireId !== "test-mercedes"
      ) {
        console.log(`Skiping ${data._id}`);
        failedPairs.push({
          intake: data._id,
          survey: survey._id,
          reason: `Invalid quest ${survey.questionnaireId}`,
          sReason: `Invalid quest ${survey.questionnaireId}`,
        });
        continue;
      }

      let [state] = await db.retrieve<State>("States", {
        "intake._id": data._id,
        "surveyAnswers._id": survey._id,
      });
      if (!state) {
        console.log("No state");
        const [questAnswers] = await db.retrieve("QuestionnaireAnswers", {
          "secureLink._id": data._id,
        });
        state = {
          _id: new ObjectId().toHexString(),
          intake: data,
          surveyAnswers: survey,
          questionnaireAnswers: questAnswers,
          steps: ["Created in migration script"],
        };
      } else {
        state.intake = data;
        state.surveyAnswers = survey;
      }
      try {
        await executeSteps(
          state,
          [
            "addClient",
            "addClaim",
            "sendAccountToLitify",
            "createIntakeAndMatterInLitify",
            "updateMatterInLitify",
            "sendVehicleToLitify",
          ],
          false
        );
      } catch (error) {
        console.log(error);
        failedPairs.push({
          intake: data._id,
          survey: survey._id,
          reason: error,
          sReason: `${error}`,
        });
      }
      bar.tick();
    }

    // console.log(`Writing error ${i} of ${batches}`);
    fs.writeFileSync(
      dataPath.replace(".json", "-fail.csv"),
      toCSV(failedPairs)
    );
  }

  console.log("Done.");
}

async function main(envVariablesFile: string) {
  const envVariables = JSON.parse(
    fs.readFileSync(envVariablesFile).toString("utf8")
  );
  process.env = {
    ...process.env,
    ...envVariables,
  };

  for (let i = 25; i < 649; i++) {
    console.log(`Will process ~/small-services/batches/data${i}.json`);
    await sleep(5000, true);
    await migration(`~/small-services/batches/data${i}.json`);
    console.log(`Processed ~/small-services/batches/data${i}.json`);
    await sleep(5000, true);
  }
}

const batch = Number.parseInt(process.argv[3]);
main(process.argv[2]);
