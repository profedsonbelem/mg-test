import { SurveyAnswer } from "../../types/surveyAnswer";
import { ClaimModel } from "../../models/migration/claims";
import { mapClaimToVehicle } from "./mapClaimToVehicle";

export const saToVehicle = (sa: SurveyAnswer) => {
  const updatedClaim = ClaimModel.extractFromSurveyAnswers(sa);

  return mapClaimToVehicle(updatedClaim);
};
