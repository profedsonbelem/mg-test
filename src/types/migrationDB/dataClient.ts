import { Intake } from "../intake";
import { SurveyAnswer } from "../surveyAnswer";

export interface DataClient extends Intake {
  SurveyAnswers: SurveyAnswer[];
}
