import * as fs from "fs";
import { DenylistModel } from "../models/denylist.model";
import { resendEmail } from "../endpoints/resendEmail";

async function main(envVariablesFile: string) {
  //Adjust environment varibles
  const envVariables = JSON.parse(
    fs.readFileSync(envVariablesFile).toString("utf8")
  );
  process.env = { ...process.env, ...envVariables };

  //Load denylist
  const currentList = await DenylistModel.getDetailedList();

  //Add entries with email addresses to denylist
  const reinserted = currentList.filter((item) => {
    return item.email.includes("@");
  });

  const results = await Promise.all(
    reinserted.map(async (item) => {
      for (let i in item.reason) {
        const reason = item.reason[i];
        await DenylistModel.addToList(item.email, reason);
      }
    })
  );

  console.log(`Done. Updated ${results.length} entries`);
}

main(process.argv[2]);
