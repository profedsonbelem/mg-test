import * as fs from "fs";
import db from "../../utils/database/db.model";
import { ContactType } from "../../types/contact";
import * as ProgressBar from "progress";
import { ContactModel } from "../../models/contact.model";
import { toCSV } from "../../utils/sheets/csv";
import { questionInt } from "readline-sync";
import { exit } from "process";
import { ConnectionMongo } from "../../utils/database/conn";
import { sendToLitify } from "../../modules/litify/sendContactTolitify";

async function exportBatch(first: number, batchSize: number) {
  const contacts = await db.retrieve(
    "Contacts",
    { type: { $in: [ContactType.email, ContactType.call] } },
    undefined,
    undefined,
    first,
    batchSize
  );
  const failed: { _id: string; error: any; errorS: string }[] = [];

  const bar = new ProgressBar(":bar:eta", contacts.length);
  for (let contact of contacts) {
    try {
      if (contact.litifyId) {
        console.log("Already in litify");
      } else {
        console.log("Trying to create in litify");
        const litifyId = await sendToLitify(contact);
        contact.litifyId = litifyId;
        console.log(`Created with litifyId: ${litifyId}`);
        await db.update(
          "Contacts",
          { _id: contact._id },
          { $set: litifyId },
          false,
          false
        );
      }
    } catch (error) {
      failed.push({
        _id: contact._id,
        error,
        errorS: JSON.stringify(error),
      });
    }
    bar.tick();
  }

  fs.writeFileSync(`contactFails_${first}.csv`, toCSV(failed));
}

async function main(
  envPath: string,
  Last: string,
  Salt: string,
  Pause: string
) {
  const envVariables = JSON.parse(fs.readFileSync(envPath).toString("utf8"));
  process.env = { ...process.env, ...envVariables };

  const totalContacts = await db.count("Contacts", {
    type: { $in: [ContactType.email, ContactType.call] },
  });
  console.log(`Importing ${totalContacts} contacts`);
  let last = Number(Last);
  const salt = Number(Salt);
  let pause = Number(Pause);
  let processed = 0;

  while (pause > 0) {
    for (let batches = 0; batches < pause; batches++) {
      if (last > totalContacts) {
        console.log("No more contacts to be exported");
        process.exit(0);
      }

      await exportBatch(last, salt);
      last += salt;
      processed++;
    }

    const newPause = questionInt(
      `\n\nMigration Paused, ${processed} contacts processed of ${totalContacts} in DB. \nType how many batches you want until the next Pause: `
    );
    if (newPause < 0) {
      exit(0);
    }
    pause = newPause;
  }

  await ConnectionMongo.closeConnection();
}

main(process.argv[2], process.argv[3], process.argv[4], process.argv[5]);
