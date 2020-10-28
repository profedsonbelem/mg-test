import { StateChanger, State } from "../../types/state";
import { publishInSNSTopic } from "../../utils/aws/sns.utils";
import { sendEmergencyEmail } from "../../utils/email/email.utils";
import { IntakeErrorModel } from "../../models/intakeError.model";
import * as emailLeadModules from "./modules";

/** Load the modules by its name */
export async function loadSteps(
  modulesName: string[]
): Promise<StateChanger[]> {
  return modulesName.map((name) => {
    const module = emailLeadModules[name];
    if (!module) {
      throw new Error(`Invalid step name: ${name}`);
    } else {
      return module;
    }
  });
}

/**
 * Execute the given modules in a pre-existing state
 * @param currentState The state to start the execution
 * @param modulesName The name of the modules to be executed, in the order that they must be executed
 * @todo consider check the required resources here
 */
export async function executeSteps(
  currentState: State,
  modulesName: string[],
  processError: boolean = true
) {
  const steps: StateChanger[] = await loadSteps(modulesName);

  for (let i in steps) {
    console.log(`Executing ${modulesName[i]}`);
    try {
      const currentFunction = steps[i];
      currentState = await currentFunction(currentState);
    } catch (error) {
      console.log(`Error on step ${Number.parseInt(i) + 1}`);
      console.log(`Done: ${currentState.steps}`);
      console.log(error);
      if (processError) {
        await processFail(currentState, error);
      }
      throw error;
    }
  }

  return currentState;
}

/** @todo consider creating environment variable to decide when to notify */
export async function processFail(lastState: State, error: string) {
  //Create error message
  const lastStep = lastState.steps.reverse()[0];
  const message =
    `Error processing the State ${lastState._id}\n` +
    `Last step: ${lastStep}\n` +
    `Error: ${error}`;

  //Send emergency email
  const emailSender =
    lastState.headers["Email-Sender"] || "intakefailure@pgmbm.com";
  await sendEmergencyEmail(message, emailSender);
  // await IntakeModel.updateIntake(intake._id, INTAKE_STATUS.INVALID, {
  //     date: new Date(),
  //     message: "ERROR ON:" + step,
  // });

  //Save in database
  await IntakeErrorModel.sendToFailed(
    lastState.intake,
    lastState.questionnaireAnswers,
    lastStep,
    message
  );

  //In dev stage, just log the message
  if (process.env.stage == "Development") {
    console.log(message);
  }
  //In prod, publishes in intake error process topic
  else {
    const topicArn = "arn:aws:sns:us-east-1:533094768615:intake-process-error";
    await publishInSNSTopic(topicArn, message);
  }
}
