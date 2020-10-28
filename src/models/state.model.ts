import { State } from "../types/state";
import { ObjectId } from "mongodb";
import { SNSEventRecord } from "aws-lambda";
import db from "../utils/database/db.model";
import { getSurveyFromRecord } from "../utils/aws/sns.utils";
import { stat } from "fs";
import { CLIENT_STATUS } from "../types/status";

export class StateModel {
  /**
   * Update the given state in the database and return it.
   * Create a new state if that one isn't in the database yet.
   */
  static async updateState(state: State): Promise<State> {
    if (!state._id) {
      state._id = new ObjectId().toHexString();
    }
    console.log(`Updating the state ${state._id}`);

    await db.update("States", { _id: state._id }, { $set: state }, false);

    return state;
  }

  static async retrieveState(stateId: string): Promise<State | undefined> {
    const result = await db.retrieve<State>("States", { _id: stateId });

    return result[0];
  }

  static initStateFromRecord(record: SNSEventRecord): Promise<State> {
    const state = new State();
    state._id = new ObjectId().toHexString();
    state.record = record;
    state.steps = ["State created from record"];
    const resourcesFolder = getSurveyFromRecord(record);
    state.resourcesFolder = resourcesFolder;
    state.createdBy = "email";
    state.statusAsClient = CLIENT_STATUS.Active;
    const parsedMessage = JSON.parse(record.Sns.Message);
    state.messageId = !!parsedMessage.mail
      ? parsedMessage.mail.messageId
      : undefined;

    return StateModel.updateState(state);
  }

  static initStateFromRawIntake(
    rawIntake: any,
    resourcesFolder: string,
    originLambda: string,
    headers?: any
  ): Promise<State> {
    const state = new State();
    state._id = new ObjectId().toHexString();
    state.rawIntake = { ...rawIntake, received_at: new Date() };
    state.resourcesFolder = resourcesFolder;
    state.steps = ["State created from raw intake"];
    state.headers = headers;
    state.createdBy = originLambda;
    state.statusAsClient = CLIENT_STATUS.Active;

    return StateModel.updateState(state);
  }
}
