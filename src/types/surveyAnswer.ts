import { CLIENT_STATUS } from "./status";

export class SurveyAnswer {
  _id: string;
  userId: string;
  questionnaireId: string;
  dateStart: Date;
  end: boolean;
  nextQuestion?: string;
  answers: { [id: string]: Answer };
  ip?: string;
  browser?: string;
  fingerprint?: string;
  statusAsClient: CLIENT_STATUS;
}

export class Answer {
  id?: Date;
  answer: any;
  questionId: string;
  isFile: boolean;
  fileSaved?: boolean;
  additionalInfo?: any;
  files?: any[];
}

export function validateSurveyAnswer(data: any[]) {
  return !!data;
}

export function validateSurveyAnswerUpdate(update: any) {
  return !!update;
}
