import { CLIENT_STATUS } from "./status";

export class Intake {
  _id: string;
  status: INTAKE_STATUS;
  email: string;
  //resourcesFolder?: string;
  claim_type?: string;
  campaign_source?: string;
  date_time?: string;
  first_name?: string;
  surname?: string;
  phone?: string;

  created_at: Date;
  modified_at: Date;
  steps: Step[];
  refNumber?: number;
  survey?: string;
  statusAsClient: CLIENT_STATUS;
  statusChanges: { to: CLIENT_STATUS; date: Date; reason?: string }[];
  proclaimRef?: string;
}

export class Step {
  message: string;
  date: Date;
}

export enum INTAKE_STATUS {
  RECEIVED,
  EMAIL_PARSED,
  XML_PARSED,
  VALIDATED,
  CREATED_ON_DB,
  ANSWER_CREATED,
  LINK_CREATED,
  LINK_SENT,
  INVALID,
}

export async function validateIntake(data: any[]) {
  return !!data;
}

export function validateIntakeUpdate(update: any) {
  return !!update;
}
