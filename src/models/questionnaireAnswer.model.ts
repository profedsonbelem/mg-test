import { QuestionnaireAnswer, SecureLink } from "../types/questionnaireAnswers";
import { Intake } from "../types/intake";
import { CounterModel } from "./counter.model";
import { createUniqueLinkWithSecurity } from "../utils/auth/token.utils";
import db from "../utils/database/db.model";
import { CLIENT_STATUS } from "../types/status";

/** Static class to work with QuestionnaireAnswers
 */
export class QuestionnaireAnswerModel {
  /**
   * Create one questionnaire answer for the intake
   */
  static async createQuestionnaireAnswer(
    intake: Intake
  ): Promise<QuestionnaireAnswer> {
    const secureLink = createUniqueLinkWithSecurity(intake);
    console.log(`Creating answer with link ${JSON.stringify(secureLink)}`);

    const answer: QuestionnaireAnswer = {
      secureLink,
      statusAsClient: CLIENT_STATUS.Active,
    };

    console.log("Joining link and questionnaire answer");
    const counters = await CounterModel.getCounter("QuestionnaireAnswers");
    answer.refNumber = counters.count;
    await CounterModel.updateCounter("QuestionnaireAnswers");
    answer.surveyId = intake.survey;

    // 2.2.2
    console.log("2.2.2");
    console.log("saving questionnaire answer on db");
    const answerSaved = await QuestionnaireAnswerModel.saveQuestionnaireAnswerOnDB(
      answer
    );
    if (!answerSaved) {
      throw new Error("Answer wasnt saved");
    } else {
      console.log("Answer was saved");
    }

    return answer;
  }

  /**
   * Save the questionnaire answer
   */
  static async saveQuestionnaireAnswerOnDB(
    qa: QuestionnaireAnswer
  ): Promise<boolean> {
    console.log("SAVE QUESTIONNAIRE ANSWER ON DB");
    const creationResult = await db.create("QuestionnaireAnswers", [qa], false);

    return creationResult.insertedCount == 1;
  }
}

// /**
//  * Create unique link with security
//  */
// export function createUniqueLinkWithSecurity(intake: Intake): SecureLink {
//     console.log("CREATE UNIQUE LINK");
//     // console.log('id', objId);

//     let cipher = crypto.createCipheriv(
//         "aes-256-cbc",
//         Buffer.from(key, "hex"),
//         Buffer.from(iv, "hex")
//     );
//     let encrypted = cipher.update(
//         JSON.stringify({ userId: intake._id, userEmail: intake.email })
//     );
//     encrypted = Buffer.concat([encrypted, cipher.final()]);
//     const tk = encrypted.toString("hex");

//     return {
//         _id: intake._id,
//         email: intake.email,
//         token: tk,
//     };
// }
