import db from "../utils/database/db.model";
import { toCSV } from "../utils/sheets/csv";
import * as fs from "fs";
import { mapAttributes } from "../utils/misc/object.utils";
import { ConnectionMongo } from "../utils/database/conn";
import { getFullDate } from "../utils/misc/date.utils";
import { CLIENT_STATUS } from "../types/status";

const formated: { [_id: string]: any } = {};

async function main(envVariablesFile: string, questionnaireId: string) {
  //Adjust environment varibles
  const envVariables = JSON.parse(
    fs.readFileSync(envVariablesFile).toString("utf8")
  );
  process.env = { ...process.env, ...envVariables };

  //Get data
  const query = {
    questionnaireId: questionnaireId,
  };
  console.log(`Query: ${JSON.stringify(query)}`);
  const data = await db.retrieve(
    "SurveyAnswers",
    query,
    {
      "answers.personal_first_name.answer": 1,
      "answers.personal_surname.answer": 1,
      "answers.contact_email.answer": 1,
      "answers.contact_phone.answer": 1,
      "answers.vehicle_original_registration_number.answer": 1,
      "answers.vehicle_current_registration_number.answer": 1,
      userId: 1,
      end: 1,
    },
    (data) => {
      return mapAttributes(
        data,
        {
          "answers.personal_first_name.answer": "firstName",
          "answers.personal_surname.answer": "lastName",
          "answers.contact_email.answer": "email",
          "answers.contact_phone.answer": "phone",
          "answers.vehicle_original_registration_number.answer": "originalVRN",
          "answers.vehicle_current_registration_number.answer": "currentVRN",
          end: "finished",
          userId: "intakeId",
        },
        { defaultValues: { finished: false } }
      );
    }
  );
  console.log(`Got ${data.length} entries`);

  try {
    // To csv
    console.log("Parsing");
    const csv = toCSV(Object.values(data));
    fs.writeFileSync(
      `data/${questionnaireId}-${getFullDate(new Date()).replace(
        /\//g,
        "-"
      )}.csv`,
      csv
    );

    console.log("done");
    await ConnectionMongo.closeConnection();
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

main(process.argv[2], process.argv[3]);
