import { SurveyAnswer } from "../../types/surveyAnswer";
import { ClientModel } from "../../models/migration/client";
import { mapClientToAccount } from "./mapClientToAccount";

export const saToAccount = (sa: SurveyAnswer) => {
  const updatedClient = ClientModel.getSurveyAnswersInfo(sa);

  return mapClientToAccount(updatedClient);
};
