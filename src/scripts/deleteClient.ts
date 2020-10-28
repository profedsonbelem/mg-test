import * as fs from "fs";
import db from "../utils/database/db.model";

function setVariables() {
  process.env.mongoUrl =
    "mongodb://microservices:hFKVUxrHtQ7tcgJt@34.207.118.67:27017/production";
  process.env.failedEmail = "yvilela@mggestoes.com.br";
  process.env.resources = "resources.pgmbm.com";
  process.env.emailBucket = "clientcare.pgmbm.com";
  process.env.cryptoKey =
    "38a9a3021cf13eb23a6445d411aeb68cabe555950b4b23c69c2dbaa15c8d3589";
  process.env.iv = "3fe0436b6f5231540d2b1dc468d96838";
  process.env.stage = "Development";
}

async function main(path: string) {
  setVariables();

  // Load intake ids
  console.log(`Loading intake ids`);
  const intakeIds: string[] = JSON.parse(
    fs.readFileSync(path).toString("utf8")
  );
  console.log(`Loaded ${intakeIds.length} intake ids`);
  const intakeDeleteResult = await db.deleteByQuery("Intakes", {
    _id: { $in: intakeIds },
  });
  console.log(`Deleted ${intakeDeleteResult} intakes`);

  // Load survey answer ids
  console.log(`Deleting survey answers`);
  const surveyAnswerDeleteResult = await db.deleteByQuery("SurveyAnswers", {
    userId: { $in: intakeIds },
  });
  console.log(`Deleted ${surveyAnswerDeleteResult} survey answers`);

  // Load questionnaire answer ids
  console.log(`Deleting questionnaire answers`);
  const questionnaireAnswerDeleteResult = await db.deleteByQuery(
    "QuestionnaireAnswers",
    {
      "secureLink._id": { $in: intakeIds },
    }
  );
  console.log(
    `Deleted ${questionnaireAnswerDeleteResult} questionnaire answers`
  );

  // Load state ids
  console.log(`Deleting states`);
  const stateDeleteResult = await db.deleteByQuery("States", {
    "intake._id": { $in: intakeIds },
  });
  console.log(`Deleted ${stateDeleteResult} states`);
}

main(process.argv[2]);
