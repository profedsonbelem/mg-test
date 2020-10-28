import {
  CLIENT_STATUS,
  VEHICLE_STATUS,
  MATTER_STATUS,
} from "../../types/status";
import { Intake } from "../../types/intake";
import db from "../../utils/database/db.model";
import { ClaimStatus } from "../../types/migrationDB/claim";
// import { updateMatterLitify } from "../../utils/litify/matter";
import { Responses } from "../../endpoints/common/api.response";
import litify from "../../utils/database/litify.model";
// import { updateVehicleLitify } from "../../utils/litify/vehicle";

function mapActionToState(action: String) {
  switch (action) {
    case "requestCancel": {
      return CLIENT_STATUS["Requested Cancelation"];
    }
    case "confirmCancel": {
      return CLIENT_STATUS["Confirmed Cancelation"];
    }
    default: {
      throw new Error(`Invalid action ${action}`);
    }
  }
}

const DeactivateIntake = async (
  intake: Intake,
  intakeId: string,
  action: string
) => {
  const statusAsClient: CLIENT_STATUS = mapActionToState(action);

  // Deactivate intake
  console.log(`Deactivating client ${JSON.stringify(intake)}`);

  const intakeDeactivateResult = await db.update(
    "Intakes",
    {
      _id: intakeId,
    },
    {
      $set: { statusAsClient },
      $addToSet: {
        statusChanges: {
          to: statusAsClient,
          date: new Date(),
          reason: "Client disabled by endpoint",
        },
      },
    },
    false,
    false
  );
  console.log(`Disabled intake ${intakeId}: ${intakeDeactivateResult}`);

  // Deactivate survey answer
  console.log(`Deactivating survey answers`);
  const surveyAnswerDeactivateResult = await db.update(
    "SurveyAnswers",
    {
      userId: intakeId,
    },
    { $set: { statusAsClient } },
    false,
    false
  );
  console.log(
    `Disabled survey answer with userId ${intakeId}: ${surveyAnswerDeactivateResult}`
  );

  // Get state for intake
  const [state] = await db.retrieve(
    "States",
    { "intake._id": intakeId },
    { litifyData: 1, "claim._id": 1, claimCollection: 1 }
  );

  // Deactivate claim
  let status: ClaimStatus;
  /** pegar do survey */
  switch (statusAsClient) {
    case 0:
      status = "ACTIVE";
      break;
    case 1:
      status = "REQUESTED_CANCELLATION";
      break;
    case 2:
      status = "CANCELLED";
      break;
    default:
      status = "ACTIVE";
  }
  if (!!state.claim && !!state.claim._id && !!state.claimCollection) {
    console.log(`Updating ${state.claimCollection} ${state.claim._id}`);
    await db.update(
      state.claimCollection,
      { _id: state.claim._id },
      { $set: { status } },
      false
    );
  }

  // Deactivate in litify
  let vStatus: VEHICLE_STATUS =
    statusAsClient === CLIENT_STATUS["Confirmed Cancelation"]
      ? "Closed"
      : "Requested Closure";
  if (!!state.litifyData && !!state.litifyData.vehicleId) {
    await litify.update("Vehicle__c", {
      Id: state.litifyData.vehicleId,
      Vehicle_Status__c: vStatus,
    });
  }
  let mStatus: MATTER_STATUS =
    statusAsClient === CLIENT_STATUS["Confirmed Cancelation"]
      ? "Closed"
      : "Requested Closure";
  if (!!state.litifyData && !!state.litifyData.matterId) {
    await litify.update("litify_pm__Matter__c", {
      Id: state.litifyData.matterId,
      litify_pm__Status__c: mStatus,
    });
  }

  // Deactivate questionnaire answer
  console.log(`Deactivating questionnaire answers`);
  const questionnaireAnswerDeactivateResult = await db.update(
    "QuestionnaireAnswers",
    {
      "secureLink._id": intakeId,
    },
    { $set: { statusAsClient } },
    false,
    false
  );

  console.log(
    `Disabled questionnaire answers with secureLink._id ${intakeId}: ${questionnaireAnswerDeactivateResult}`
  );

  // Deactivate state
  console.log(`Deactivating states`);
  const stateDeactivateResult = await db.update(
    "States",
    {
      "intake._id": intakeId,
    },
    { $set: { statusAsClient } },
    false,
    false
  );
  console.log(
    `Disabled state with intake._id ${intakeId} : ${stateDeactivateResult}`
  );

  return Responses._200(`Success`, {
    intakeDeactivateResult,
    surveyAnswerDeactivateResult,
    questionnaireAnswerDeactivateResult,
    stateDeactivateResult,
  });
};

export default DeactivateIntake;
