import * as fs from "fs";
import { readCSV, toCSV } from "../utils/sheets/csv";
import { mapAttributes } from "../utils/misc/object.utils";
import * as ProgressBar from "progress";
import { processBody } from "../modules/startIntake/constructors";
import { ConnectionMongo } from "../utils/database/conn";
import { loadEnvVariables } from "./utils";
import { sleep } from "../utils/misc/time.utils";
import axios from "axios";

interface Arguments {
  envPath: string;
  csvPath: string;
  resourcesFolder: string;
  rowToIntake?: { [column: string]: string };
  modules?: string[];
  headers?: { [att: string]: any };
}

function getArguments(argumentsPath: string): Arguments {
  const args = JSON.parse(fs.readFileSync(argumentsPath).toString("utf8"));

  if (!args.csvPath || !args.resourcesFolder) {
    throw new Error("Missing required arg. Check the documentation");
  } else {
    return {
      envPath: args.envPath,
      csvPath: args.csvPath,
      resourcesFolder: args.resourcesFolder,
      rowToIntake: args.rowToIntake,
      modules: args.modules,
      headers: args.headers,
    };
  }
}

/** @todo implement endpoint to receive csv and do that */
/** @todo implement ways to reprocess the ones that failed */
async function main(
  argumentsPath: string,
  successPath = "success.csv",
  failPath = "fail.csv"
) {
  const args = getArguments(argumentsPath);
  console.log(`Executing with args ${JSON.stringify(args)}`);
  await sleep(5000);

  loadEnvVariables(args.envPath);

  const csvData = await readCSV(args.csvPath);
  console.log(`Data in csv: ${csvData.length} entries`);

  let dataAsIntake: any;
  if (!!args.rowToIntake) {
    dataAsIntake = csvData.map((row) => {
      return mapAttributes(row, args.rowToIntake);
    });
  } else {
    dataAsIntake = csvData;
  }

  console.log(`Data as intake: ${JSON.stringify(dataAsIntake)}`);

  console.log("Reading modules");
  const modules = args.modules;

  const bar = new ProgressBar(":bar :eta", dataAsIntake.length);
  console.log(`Processing intakes`);
  const successData: any[] = [];
  const failData: any[] = [];
  for (let i in dataAsIntake) {
    try {
      const data = dataAsIntake[i];
      // console.log(`Processing ${JSON.stringify(data)}`);
      const res = await axios.post(
        "https://dw9ejawgp5.execute-api.us-east-1.amazonaws.com/Production/intakes/createIntake",
        {
          resourcesFolder: args.resourcesFolder,
          modules,
          data,
          headers: args.headers,
        },
        { headers: { Authorization: "ernj4ZLjhhm2sRxB" } }
      );

      // const res = await processBody(
      //   {
      //     resourcesFolder: args.resourcesFolder,
      //     modules,
      //     data,
      //     headers: args.headers,
      //   },
      //   "script"
      // );

      // console.log(res);

      if (res.status === 200) {
        const body = res.data;
        const info = body.aditionalInfo;
        successData.push({ ...data, ...info });
      } else {
        const body = res.data;
        const error = body.message;
        console.log(`Error: ${error}`);
        failData.push({
          error,
          stringError: JSON.stringify(error),
          index: i,
          ...csvData[i],
        });
      }
    } catch (error) {
      console.log(`Error: ${error}`);
      failData.push({
        error,
        stringError: JSON.stringify(error),
        index: i,
        ...csvData[i],
      });
    }
    bar.tick();

    await sleep(500);
  }

  console.log(
    `Writing success: (${successData.length} of ${dataAsIntake.length})`
  );
  fs.writeFileSync(successPath, toCSV(successData));

  console.log(`Writing fail: (${failData.length} of ${dataAsIntake.length})`);
  fs.writeFileSync(failPath, toCSV(failData));
  // await ConnectionMongo.closeConnection();

  console.log("Done");
}

main(process.argv[2], process.argv[3], process.argv[4]);
