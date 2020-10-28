import { Intake } from "../../types/intake";
import db from "../../utils/database/db.model";
import { Responses } from "../../endpoints/common/api.response";
import { DenylistModel } from "../../models/denylist.model";
import { State } from "../../types/state";
import { ClaimStatus } from "../../types/migrationDB/claim";
// import { updateVehicleLitify } from "../../utils/litify/vehicle";
import {
  CLIENT_STATUS,
  VEHICLE_STATUS,
  MATTER_STATUS,
} from "../../types/status";
import litify from "../../utils/database/litify.model";
// import { updateMatterLitify } from "../../utils/litify/matter";

const ActivateIntake = async (intake: Intake, intakeId: string) => {
  // Activate intake
  console.log(`Activating client ${JSON.stringify(intake)}`);

  // Remove from denylist
  console.log(`Remove email from denylist`);
  const denyListDeleteResult = await DenylistModel.removeFromList(intake.email);
  console.log(`Deleted email ${intake.email} from denyList`);

  const intakeDeactivateResult = await db.update(
    "Intakes",
    {
      _id: intakeId,
    },
    {
      $set: { statusAsClient: CLIENT_STATUS.Active },
      $addToSet: {
        statusChanges: {
          to: CLIENT_STATUS.Active,
          date: new Date(),
          reason: "Client enabled by endpoint",
        },
      },
    },
    false,
    false
  );
  console.log(`Activated intake ${intakeId}: ${intakeDeactivateResult}`);

  // Activate survey answer
  console.log(`Activating survey answers`);
  const surveyAnswerActivateResult = await db.update(
    "SurveyAnswers",
    {
      userId: intakeId,
    },
    { $set: { statusAsClient: CLIENT_STATUS.Active } },
    false,
    false
  );
  console.log(
    `Activated survey answer with userId ${intakeId}: ${surveyAnswerActivateResult}`
  );

  // Get state for intake
  const [state] = await db.retrieve(
    "States",
    { "intake._id": intakeId },
    { litifyData: 1, "claim._id": 1, claimCollection: 1 }
  );

  // Deactivate claim
  let status: ClaimStatus = "ACTIVE";
  if (!!state.claim && !!state.claim._id && !!state.claimCollection) {
    await db.update(
      state.claimCollection,
      { _id: state.claim._id },
      { $set: { status } },
      false
    );
  }

  // Deactivate in litify
  let vStatus: VEHICLE_STATUS = "Open";
  if (!!state.litifyData && !!state.litifyData.vehicleId) {
    await litify.update("Vehicle__c", {
      Id: state.litifyData.vehicleId,
      Vehicle_Status__c: vStatus,
    });
  }
  let mStatus: MATTER_STATUS = "Open";
  if (!!state.litifyData && !!state.litifyData.matterId) {
    await litify.update("litify_pm__Matter__c", {
      Id: state.litifyData.matterId,
      litify_pm__Status__c: mStatus,
    });
  }

  // Activate questionnaire answer
  console.log(`Activating questionnaire answers`);
  const questionnaireAnswerActivateResult = await db.update(
    "QuestionnaireAnswers",
    {
      "secureLink._id": intakeId,
    },
    { $set: { statusAsClient: CLIENT_STATUS.Active } },
    false,
    false
  );

  console.log(
    `Activated questionnaire answers with secureLink._id ${intakeId}: ${questionnaireAnswerActivateResult}`
  );

  // Activate state
  console.log(`Activating states`);
  const stateActivateResult = await db.update(
    "States",
    {
      "intake._id": intakeId,
    },
    { $set: { statusAsClient: CLIENT_STATUS.Active } },
    false,
    false
  );
  console.log(
    `Activated state with intake._id ${intakeId} : ${stateActivateResult}`
  );
  return Responses._200(`Success`, {
    denyListDeleteResult,
    surveyAnswerActivateResult,
    questionnaireAnswerActivateResult,
    stateActivateResult,
  });
};

export default ActivateIntake;
