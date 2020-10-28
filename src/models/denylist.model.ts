import * as crypto from "crypto";

import { Intake } from "../types/intake";
import db from "../utils/database/db.model";
import { Denylist } from "../types/denylist";
import { SurveyAnswer } from "../types/surveyAnswer";
import { sendClientAddedDenylist } from "../utils/email/email.utils";
import { CLIENT_STATUS } from "../types/status";

export class DenylistModel {
  static async addToList(email: string, reason?: string) {
    console.log(`Adding ${email} to denylist. Reason: ${reason}`);

    const _id = this.encodeEmail(email);
    const update = !!reason
      ? { $set: { _id }, $addToSet: { reason } }
      : { $set: { _id } };

    const result = await db.update("Denylist", { _id }, update, false);
    const emailResult = await sendClientAddedDenylist(email, reason);
    console.log("Sending email", emailResult);
    console.log(`Update result: ${JSON.stringify(result)}`);
  }

  static async removeFromList(email: string) {
    console.log(`Removing ${email} from denylist.`);

    const _id = this.encodeEmail(email);

    const result = await db.deleteById("Denylist", _id);

    console.log(`Delete result: ${JSON.stringify(result)}`);
  }

  static async getList() {
    const emailList = await db
      .retrieve<Denylist>("Denylist", {}, { _id: 1 })
      .then((list) => {
        return list.map((item) => {
          return item._id;
        });
      });

    return emailList;
  }

  static async getDetailedList() {
    const detailedList = await db
      .retrieve<Denylist>("Denylist", {})
      .then((list) => {
        return list.map((item) => {
          return { email: item._id, reason: item.reason };
        });
      });

    return detailedList;
  }

  static async isEmailOnList(email: string) {
    if (email === process.env.failedEmail) {
      return false;
    }

    const result = await db.retrieve("Denylist", {
      _id: this.encodeEmail(email),
    });

    return result.length > 0;
  }

  static encodeEmail(email: string) {
    const encoder = crypto.createHash("md5");

    const hash = encoder.update(email.toLowerCase(), "utf8");
    return hash.digest("hex");
  }

  static async hasClientActive(email: string) {
    const surveyAnswerResult = await db.retrieve<SurveyAnswer>("Intakes", {
      email: { $regex: email, $options: "i" },
      $or: [
        { statusAsClient: { $exists: false } },
        { statusAsClient: CLIENT_STATUS.Active },
      ],
    });

    console.log(`Got ${surveyAnswerResult.length} entries`);
    let hasStatusClientActive = surveyAnswerResult.length > 0 ? true : false;

    return hasStatusClientActive;
  }
}
