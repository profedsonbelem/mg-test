import { Intake } from "./intake";
import { QuestionnaireAnswer } from "./questionnaireAnswers";

export class IntakeError {
  _id: string;
  date: Date;
  intake?: Intake;
  questionnaireAnswers?: QuestionnaireAnswer;
  stepFailed: string;
  msg?: string;
}

export function validateIntakeError(data: any[]) {
  return !!data;
}

export function validateIntakeErrorUpdate(update: any) {
  return !!update;
}
