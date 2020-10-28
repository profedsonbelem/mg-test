import * as fs from "fs";
import {
  EventPublishMessage,
  BounceEventMessage,
  ComplaintEventMessage,
  RejectEventMessage,
} from "../../src/types/sns";
import {
  treatBounce,
  treatComplaint,
  treatRejection,
} from "../../src/lambdas/treatSendingError";

async function main(envVariablesFile: string, dataPath: string) {
  //Adjust environment varibles
  const envVariables = JSON.parse(
    fs.readFileSync(envVariablesFile).toString("utf8")
  );
  process.env = { ...process.env, ...envVariables };

  const data: EventPublishMessage = JSON.parse(
    fs.readFileSync(dataPath).toString("utf8")
  );

  switch (data.eventType) {
    case "Bounce": {
      // Treat bounce
      treatBounce(<BounceEventMessage>data);
      break;
    }
    case "Complaint": {
      // Treat complaint
      treatComplaint(<ComplaintEventMessage>data);
      break;
    }
    case "Reject": {
      // Treat reject
      treatRejection(<RejectEventMessage>data);
      break;
    }
    default: {
      console.log(`Can't treat eventType: ${data.eventType}`);
    }
  }
}

main(process.argv[2], process.argv[3]);
