import { SNSHandler } from "aws-lambda";
import { processRecord } from "../modules/startIntake/constructors";

/** @todo turn this into an endpoint */
export const startFromRecord: SNSHandler = async (event, _context) => {
  console.log("Using emailLeadV2!");

  try {
    for (var i = 0; i < event.Records.length; i++) {
      const record = event.Records[i];
      await processRecord(record);
    }
  } catch (err) {
    console.log(err);
  }
};
