import db from "../utils/database/db.model";
import * as fs from "fs";
import { toCSV } from "../utils/sheets/csv";
import * as ProgressBar from "progress";
import { ConnectionMongo } from "../utils/database/conn";
import { Intake } from "../types/intake";
import { QuestionnaireAnswer } from "../types/questionnaireAnswers";
import { SurveyAnswer } from "../types/surveyAnswer";

async function main(
  envVariablesFile: string,
  survey?: string,
  prefix = "http://questionnaire.pgmbm.com"
) {
  const envVariables = JSON.parse(
    fs.readFileSync(envVariablesFile).toString("utf8")
  );
  process.env = {
    ...process.env,
    ...envVariables,
  };

  let query = {};
  if (!!survey) {
    query = {
      questionnaireId: survey,
      // $or: [{ statusAsClient: { $exists: false } }, { statusAsClient: 0 }],
      // end: { $ne: true },
    };
  }

  console.log(`Query: ${query}`);
  const intakeIds = await db.retrieve<string, SurveyAnswer>(
    "SurveyAnswers",
    query,
    { userId: 1 },
    (d) => {
      return d.userId;
    }
  );
  const QAs = await db.retrieve<QuestionnaireAnswer>(
    "QuestionnaireAnswers",
    {
      "secureLink._id": { $in: intakeIds },
    },
    { secureLink: 1 }
  );

  console.log(`Find: ${QAs.length} QAs`);
  const bar = new ProgressBar(":bar:eta", QAs.length);
  const linkWithEmail: { email: string; link: string }[] = [];
  for (let qa of QAs) {
    linkWithEmail.push({
      email: qa.secureLink.email,
      link: `${prefix}/survey?token=${qa.secureLink.token}`,
    });

    bar.tick();
  }

  console.log(`Writing`);
  fs.writeFileSync("data/links.csv", toCSV(linkWithEmail));
  console.log("Done");
  await ConnectionMongo.closeConnection();
}

main(process.argv[2], process.argv[3]);
