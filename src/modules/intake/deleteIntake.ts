import { Intake } from "../../types/intake";
import db from "../../utils/database/db.model";
import { DenylistModel } from "../../models/denylist.model";
import { Responses } from "../../endpoints/common/api.response";

const deleteIntake = async (intake: Intake, intakeId: string) => {
  return Responses._400("Endpoint temporarily disabled");
  // // Delete intake
  // console.log(`Deleting client ${JSON.stringify(intake)}`);

  // const intakeDeleteResult = await db.deleteByQuery("Intakes", {
  //   _id: intakeId,
  // });
  // console.log(`Deleted intake ${intakeId}: ${intakeDeleteResult}`);

  // // Delete survey answer
  // console.log(`Deleting survey answers`);
  // const surveyAnswerDeleteResult = await db.deleteByQuery("SurveyAnswers", {
  //   userId: intakeId,
  // });
  // console.log(
  //   `Deleted survey answer with userId ${intakeId}: ${surveyAnswerDeleteResult}`
  // );

  // // Delete questionnaire answer
  // console.log(`Deleting questionnaire answers`);
  // const questionnaireAnswerDeleteResult = await db.deleteByQuery(
  //   "QuestionnaireAnswers",
  //   {
  //     "secureLink._id": intakeId,
  //   }
  // );
  // console.log(
  //   `Deleted questionnaire answers with secureLink._id ${intakeId}: ${questionnaireAnswerDeleteResult}`
  // );

  // // Delete state
  // console.log(`Deleting states`);
  // const stateDeleteResult = await db.deleteByQuery("States", {
  //   "intake._id": intakeId,
  // });
  // console.log(
  //   `Deleted state with intake._id ${intakeId} : ${stateDeleteResult}`
  // );

  // // Add on denylist only if all status of survey answers are cancelled
  // let hasStatusClientActive = await DenylistModel.hasClientActive(intake.email);

  // if (!hasStatusClientActive) {
  //   // Add to denylist
  //   console.log(`Adding email to denylist`);
  //   await DenylistModel.addToList(intake.email, "Client deleted by endpoint");
  // }

  // return Responses._200(`Success`, {
  //   intakeDeleteResult,
  //   surveyAnswerDeleteResult,
  //   questionnaireAnswerDeleteResult,
  //   stateDeleteResult,
  // });
};

export default deleteIntake;
