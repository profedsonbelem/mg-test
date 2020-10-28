import { Intake } from "../types/intake";
import { QuestionnaireAnswer } from "../types/questionnaireAnswers";
import { ObjectId } from "mongodb";
import { IntakeError } from "../types/intakeError";
import db from "../utils/database/db.model";

export class IntakeErrorModel {
  static async sendToFailed(
    intake: Intake,
    qA: QuestionnaireAnswer,
    step: string,
    msg?: string
  ) {
    console.log("SENDING TO FAILED");
    const pF: IntakeError = {
      _id: new ObjectId().toHexString(),
      date: new Date(),
      stepFailed: step,
    };

    if (intake) {
      pF.intake = intake;
    }
    if (qA) {
      pF.questionnaireAnswers = qA;
    }
    if (msg) {
      pF.msg = msg;
    }
    console.log("process error to db", pF);
    const creationResult = await db.create("IntakeError", [pF], false);

    return creationResult.insertedCount == 0;
  }
}
