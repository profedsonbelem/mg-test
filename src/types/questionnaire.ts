import { Question } from "./question";

/** @deprecated Use survey instead */
export interface Questionnaire {
  _id: string;
  name: string;
  groups: string[];
  firstQuestion: string;
  questions: { [name: string]: Question };
}

export function validateQuestionnaire(data: any[]) {
  return !!data;
}

export function validateQuestionnaireUpdate(update: any) {
  return !!update;
}
