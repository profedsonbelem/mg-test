import { ObjectId } from "mongodb";

import { Intake } from "../types/intake";
import db from "../utils/database/db.model";
import { CounterModel } from "./counter.model";
import { DenylistModel } from "./denylist.model";
import { CLIENT_STATUS } from "../types/status";
import * as EmailValidator from "email-validator";
import { parseXML } from "../utils/misc/xml.utils";
import { getOnlyAttributes } from "../utils/misc/object.utils";

/** Static class to work with intakes*/
export class IntakeModel {
  /**
   * Create intake for survey
   * @param intakeData The with the Intake data as xml string or the data itself
   * @param survey The intake's survey
   * @todo check by unique properties OR by the entire intake (currently doing both)
   */
  static async createIntake(
    intakeData: string | any,
    survey: string,
    uniqueProperties?: string[]
  ): Promise<Intake> {
    let intake: Intake;
    if (typeof intakeData == "string") {
      console.log(`intakeXML: ${intakeData}`);
      intake = await parseXML(intakeData);
      console.log("XML parsed", intake);
    } else {
      console.log(`intakeData: ${intakeData}`);
      intake = intakeData;
    }
    intake.survey = survey;
    console.log("Parsed intake and added survey");

    const isValid = await this.validateIntake(intake);
    if (!isValid.valid) {
      throw new Error(`Invalid intake: ${isValid.reason}`);
    }

    console.log(`Check for duplicates using map: ${!!uniqueProperties}`);
    if (!!uniqueProperties) {
      const query = getOnlyAttributes(intake, uniqueProperties);

      const existentIntake = await db.retrieve<Intake>("Intakes", query, {
        _id: 1,
      });
      if (existentIntake.length != 0) {
        console.log(
          `An intake with the attributes ${JSON.stringify(
            uniqueProperties
          )} already exists`
        );
        throw {
          message: `An intake with the attributes ${JSON.stringify(
            uniqueProperties
          )} already exists`,
          aditionalInfo: { dupsCount: existentIntake.length },
          status: 409,
        };
      } else {
        console.log("No intake with that data");
      }
    }

    console.log("Checking existence");
    const existentIntake = await db.retrieve<Intake>("Intakes", {
      ...intake,
    });
    if (existentIntake.length != 0) {
      console.log("Intake with that data already exist");
      return existentIntake[0];
    } else {
      console.log("No intake with that data");
    }

    intake.steps = [];
    intake._id = createIdForReceiver(survey);
    intake.status = INTAKE_STATUS.XML_PARSED;
    intake.steps.push({
      date: new Date(),
      message: "Parsing XML",
    });
    const counters = await CounterModel.getCounter("Intakes");
    intake.refNumber = counters.count;
    await CounterModel.updateCounter("Intakes");
    intake.statusAsClient = CLIENT_STATUS.Active;
    intake.created_at = new Date();

    // 2.1
    console.log("2.1");
    console.log("Saving on database");
    const didSaveOnDB = await IntakeModel.saveIntakeOnDB(intake);
    console.log("didSaveOnDB", didSaveOnDB);
    if (!didSaveOnDB) {
      throw new Error("Intake wasnt saved");
    } else {
      console.log("Intake was saved");
    }

    return intake;
  }

  /**
   * Checks if the intake is valid
   */
  static async validateIntake(
    intake: Intake
  ): Promise<{ valid: boolean; reason?: string }> {
    if (!intake.email) {
      console.log("Invalid intake: intake without email");
      return { valid: false, reason: "Invalid intake: intake without email" };
    }

    const isValid = EmailValidator.validate(intake.email);
    if (!isValid) {
      console.log(`Invalid intake: ${intake.email} isn't a valid email`);
      return {
        valid: false,
        reason: `Invalid intake: ${intake.email} isn't a valid email`,
      };
    }

    const isInDenylist = await DenylistModel.isEmailOnList(intake.email);
    if (isInDenylist) {
      console.log(`${intake.email} in the denylist`);
      const denyListDeleteResult = await DenylistModel.removeFromList(
        intake.email
      );
      console.log(
        `${intake.email} was removed from the denylist`,
        denyListDeleteResult
      );
    }

    return { valid: true };
  }

  /**
   * Save the intake on mongodb
   */
  static async saveIntakeOnDB(intake: Intake): Promise<boolean> {
    console.log("SAVE INTAKE ON DB");
    const creationResult = await db.create("Intakes", [intake], false);

    return creationResult.insertedCount == 1;
  }

  /**
   * Update the intake on mongodb
   */
  static async updateIntake(
    _id: string,
    status: INTAKE_STATUS,
    step: Step
  ): Promise<boolean> {
    console.log(`Update intake ${_id}: ${JSON.stringify({ status, step })}`);
    const updateResult = await db.update(
      "Intakes",
      { _id },
      { $set: { status }, $addToSet: { steps: step } },
      false
    );

    return updateResult.modifiedCount == 1;
  }
}

function createIdForReceiver(receiver: string) {
  return new ObjectId().toHexString();
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
