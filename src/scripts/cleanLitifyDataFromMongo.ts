import * as fs from "fs";
import db from "../utils/database/db.model";
import { ConnectionMongo } from "../utils/database/conn";

async function main(envFile: string) {
  //Adjust environment varibles
  const envVariables = JSON.parse(fs.readFileSync(envFile).toString("utf8"));
  process.env = { ...process.env, ...envVariables };

  const claimCollections = await db.aggregate("States", [
    { $match: { claimCollection: { $exists: true } } },
    { $group: { _id: "$claimCollection" } },
  ]);

  for (let col of claimCollections) {
    await db.update(col._id, {}, { $set: { litifyId: undefined } }, false);
  }

  //Clean client
  await db.update("Clients", {}, { $set: { litifyId: undefined } }, false);

  await db.update(
    "States",
    { litifyData: { $exists: true } },
    { $set: { litifyData: undefined } },
    false
  );

  await db.update(
    "Contacts",
    {},
    { $set: { litifyId: undefined, accountId: undefined } },
    false,
    false
  );

  await ConnectionMongo.closeConnection();
}

main(process.argv[2]);
