import * as fs from "fs";
import { readCSV } from "../utils/sheets/csv";
import { SESV2 } from "aws-sdk";

/** @todo divide emails in batches */
async function main(
  envVariablesFile: string,
  emailsPath: string,
  emailHeader: string = "email"
) {
  //Adjust environment varibles
  const envVariables = JSON.parse(
    fs.readFileSync(envVariablesFile).toString("utf8")
  );
  process.env = { ...process.env, ...envVariables };

  //Load email list
  const emailsList = await readCSV(emailsPath);

  //Remove from suppresed list
  const ses = new SESV2({ region: "us-east-1" });
  const failed: { email: string; error: any }[] = [];
  for (let i in emailsList) {
    const item = emailsList[i];
    const email = item[emailHeader];
    if (!email) {
      console.log(`No email`);
    }

    console.log(`Removing ${email} from list`);

    try {
      const response = await ses
        .deleteSuppressedDestination({
          EmailAddress: email,
        })
        .promise();

      if (!!response.$response.error) {
        console.log(`Error removing ${email}: ${response.$response.error}`);
        failed.push({ email, error: response.$response.error });
      } else {
        console.log(`Removed ${email}`);
      }
    } catch (error) {
      console.log(`Error removing ${email}: ${error}`);
      failed.push({ email, error });
    }
  }

  fs.writeFileSync(`data/failedToDeSupressK.json`, JSON.stringify(failed));
  console.log(`Done. Failed ${failed.length} entries`);
}

main(process.argv[2], process.argv[3], process.argv[4]);
