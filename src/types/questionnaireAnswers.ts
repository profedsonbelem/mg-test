import { CLIENT_STATUS } from "./status";

export class QuestionnaireAnswer {
  _id?: string;
  surveyId?: string;
  secureLink?: SecureLink;
  refNumber?: number;
  answers?: any[];
  statusAsClient: CLIENT_STATUS;
}

export class SecureLink {
  _id: string;
  email: string;
  token: string;
}

export function validateQuestionnaireAnswers(data: any[]) {
  return !!data;
}

export function validateQuestionnaireAnswersUpdate(update: any) {
  return !!update;
}
