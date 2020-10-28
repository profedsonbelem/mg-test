import { SNSEventRecord } from "aws-lambda";
import { Intake } from "./intake";
import { QuestionnaireAnswer } from "./questionnaireAnswers";
import { SurveyAnswer } from "./surveyAnswer";
import { CLIENT_STATUS } from "./status";
import { Client } from "./migrationDB/client";
import { Claim } from "./migrationDB/claim";

/** @todo create type for litify data
 * @todo create type for headers
 */
export class State {
  _id: string;
  createdBy?: string;
  resourcesFolder?: string;
  attachmentSubfolder?: string;
  record?: SNSEventRecord;
  rawIntake?: any;
  emailXML?: string;
  headers?: { [name: string]: any };
  intake?: Intake;
  questionnaireAnswers?: QuestionnaireAnswer;
  surveyAnswers?: SurveyAnswer;
  SMSTemplate?: string;
  surveyLink?: string;
  steps: string[];
  litifyData?: {
    accountId?: string;
    matterId?: string;
    vehicleId?: string;
    intakeId?: string;
  };
  statusAsClient?: CLIENT_STATUS;
  client?: Client;
  claim?: Claim;
  claimCollection?: string;
  messageId?: string;
}

export type StateChanger = (currentState: State) => Promise<State>;
