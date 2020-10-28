import axios from "axios";
// import { genSaltSync } from "bcryptjs";

import {
  getRecordContent,
  getConfigFileFromS3,
} from "../../utils/aws/sns.utils";
import {
  getXMLFromEmail,
  loadEmailTemplate,
  loadAttachments,
  loadEmailSubject,
} from "../../utils/email/email.utils";
import {
  getAccountByEmailLitify,
  getAccountByPGMBMId,
} from "../../utils/litify/accounts";
import db from "../../utils/database/db.model";
import { processSMSRequest } from "../../utils/SMS/send";
import { processEmailRequest } from "../../utils/email/send";
import { requiredResources } from "./utils/requiredResources";
import { intakeToLitify } from "../../utils/misc/intake.utils";
import {
  objectHasAttributes,
  mergeObjects,
} from "../../utils/misc/object.utils";
import { getSMSTemplate } from "../../utils/templates/sms.template";
import { Matter } from "../../types/matter";
import { EmailData } from "../../types/email";
import { Vehicle__c as Vehicle } from "../../types/Vehicle__c";
import { Account } from "../../types/accounts";
import { Client } from "../../types/migrationDB/client";
import { StateChanger } from "../../types/state";
import { INTAKE_STATUS } from "../../types/intake";

import { StateModel } from "../../models/state.model";
import { IntakeModel } from "../../models/intake.model";
import { LitifyModel } from "../../models/litify.models";
import { SurveyAnswersModel } from "../../models/surveyAnswer.model";
import { QuestionnaireAnswerModel } from "../../models/questionnaireAnswer.model";
import { ClaimModel } from "../../models/migration/claims";
import { ClientModel } from "../../models/migration/client";
import { normalizeString } from "../../utils/misc/string.utils";
import { mapClaimToVehicle } from "../../utils/litify/mapClaimToVehicle";
import { mapClientToAccount } from "../../utils/litify/mapClientToAccount";
import { CLIENT_STATUS, MATTER_STATUS } from "../../types/status";
import { saToMatter } from "../../utils/litify/mapSAToMatter";
// import { createIntakeLitify } from "../../utils/litify/intakeLitify";
import { litify_pm__Intake__c } from "../../types/litify_pm__Intake__c";
import { Claim } from "../../types/migrationDB/claim";
import litify from "../../utils/database/litify.model";

/** @todo remove headers extraction. User other module instead */
export const extractInfoFromRecord: StateChanger = async (currentState) => {
  const hasResources = objectHasAttributes(
    currentState,
    requiredResources["extractInfoFromRecord"]
  );
  if (!hasResources.hasAttributes) {
    throw new Error(
      `Missing required attributes ${
        hasResources!.missingAttributes
      } in extractInfoFromRecord`
    );
  }

  const emailBody = getRecordContent(currentState.record);
  currentState.emailXML = getXMLFromEmail(emailBody);

  // currentState.resourcesFolder = resourcesFolder;

  const resourcesFolder = currentState.resourcesFolder;
  currentState.headers = await getConfigFileFromS3(
    resourcesFolder,
    "headers.json"
  );

  currentState.steps.push("Record info extracted");

  return StateModel.updateState(currentState);
};

export const createIntakeFromRaw: StateChanger = async (currentState) => {
  const hasResources = objectHasAttributes(
    currentState,
    requiredResources["createIntakeFromRaw"]
  );
  if (!hasResources.hasAttributes) {
    throw new Error(
      `Missing required attributes ${
        hasResources!.missingAttributes
      } in createIntakeFromRaw`
    );
  }

  const intake = await IntakeModel.createIntake(
    currentState.rawIntake,
    currentState.headers.Survey,
    currentState.headers.uniqueProperties
  );

  console.log("Get state with that intake (If exists)");
  const existentState = await db.retrieve("States", {
    "intake._id": intake._id,
  });

  if (existentState.length != 0) {
    console.log("Merging with existent state");
    await db.deleteById("States", currentState._id);
    const newSteps = currentState.steps;
    currentState = mergeObjects(existentState[0], currentState);
    currentState.steps.push(...newSteps, "Merged with existent state");
    console.log(`State after merge: ${JSON.stringify(currentState)}`);
  } else {
    currentState.intake = intake;
    currentState.steps = ["Intake created from rawIntake"];
  }
  return StateModel.updateState(currentState);
};

export const getHeaders: StateChanger = async (currentState) => {
  const hasResources = objectHasAttributes(
    currentState,
    requiredResources["getHeaders"]
  );
  if (!hasResources.hasAttributes) {
    throw new Error(
      `Missing required attributes ${
        hasResources!.missingAttributes
      } in getHeaders`
    );
  }

  const resourcesFolder = currentState.resourcesFolder;
  currentState.headers = await getConfigFileFromS3(
    resourcesFolder,
    "headers.json"
  );

  return StateModel.updateState(currentState);
};

/** @todo change name to "createIntakeFromEmailXml" */
export const createIntake: StateChanger = async (currentState) => {
  const hasResources = objectHasAttributes(
    currentState,
    requiredResources["createIntake"]
  );
  if (!hasResources.hasAttributes) {
    throw new Error(
      `Missing required attributes ${
        hasResources!.missingAttributes
      } in createIntake`
    );
  }

  let step = "Processing intake";

  // 1.3
  console.log("Start! 1.3");
  step = "Creating intake";
  console.log(step);
  currentState.intake = await IntakeModel.createIntake(
    currentState.emailXML,
    currentState.headers.Survey,
    currentState.headers.uniqueProperties
  );
  console.log("atual intake", currentState.intake);
  // currentState.steps.push("Intake created");

  console.log("Get state with that intake (If exists) (To be implemented)");
  const existentState = await db.retrieve("States", {
    "intake._id": currentState.intake._id,
  });
  if (existentState.length != 0) {
    console.log("Merging with existent state");
    await db.deleteById("States", currentState._id);
    const newSteps = currentState.steps;
    currentState = mergeObjects(existentState[0], currentState);
    currentState.steps.push(...newSteps, "Merged with existent state");
    console.log(`State after merge: ${JSON.stringify(currentState)}`);
  } else {
    console.log("New intake");
    currentState.steps.push("Intake created from record");
  }
  return StateModel.updateState(currentState);
};

export const validateIntake: StateChanger = async (currentState) => {
  const hasResources = objectHasAttributes(
    currentState,
    requiredResources["validateIntake"]
  );
  if (!hasResources.hasAttributes) {
    throw new Error(
      `Missing required attributes ${
        hasResources!.missingAttributes
      } in validateIntake`
    );
  }

  // 1.4
  console.log("1.4");
  let step = "Validating intake";
  console.log(step);
  const isIntakeValid = await IntakeModel.validateIntake(currentState.intake);
  console.log("isIntakeValid", JSON.stringify(isIntakeValid));

  if (!isIntakeValid.valid) {
    console.log(
      "Atual intake error",
      currentState.intake,
      isIntakeValid.reason
    );
    throw new Error(`Intake is invalid: ${isIntakeValid.reason}`);
  } else {
    console.log("Intake validated OK");
    await IntakeModel.updateIntake(
      currentState.intake._id,
      INTAKE_STATUS.VALIDATED,
      {
        date: new Date(),
        message: step,
      }
    );
  }
  currentState.steps.push("Intake validated");

  return StateModel.updateState(currentState);
};

export const createQuestionnaireAnswer: StateChanger = async (currentState) => {
  const hasResources = objectHasAttributes(
    currentState,
    requiredResources["createQuestionnaireAnswer"]
  );
  if (!hasResources.hasAttributes) {
    throw new Error(
      `Missing required attributes ${
        hasResources!.missingAttributes
      } in createQuestionnaireAnswer`
    );
  }

  if (!!currentState.questionnaireAnswers) {
    console.log(
      "questionnaireAnswers already exist! Skiping createQuestionnaireAnswer"
    );
    return currentState;
  }

  // 2.2
  console.log("2.2 & 2.2.1");
  let step = "Create questionnaire answer and link";
  currentState.questionnaireAnswers = await QuestionnaireAnswerModel.createQuestionnaireAnswer(
    currentState.intake
  );
  await IntakeModel.updateIntake(
    currentState.intake._id,
    INTAKE_STATUS.ANSWER_CREATED,
    {
      date: new Date(),
      message: step,
    }
  );
  currentState.steps.push("Questionnaire answer created");

  return StateModel.updateState(currentState);
};

export const createSurveyAnswer: StateChanger = async (currentState) => {
  const hasResources = objectHasAttributes(
    currentState,
    requiredResources["createSurveyAnswer"]
  );
  if (!hasResources.hasAttributes) {
    throw new Error(
      `Missing required attributes ${
        hasResources!.missingAttributes
      } in createSurveyAnswer`
    );
  }

  if (!!currentState.surveyAnswers) {
    console.log("surveyAnswers already exist! Skiping createSurveyAnswer");
    return currentState;
  }

  console.log("Creating survey answer");
  currentState.surveyAnswers = await SurveyAnswersModel.createSurveyAnswer(
    currentState
  );
  currentState.steps.push("Survey answer created");

  return StateModel.updateState(currentState);
};

/** @deprecated Loading template in sendEmail function */
export const getEmailTemplate: StateChanger = async (currentState) => {
  process.emitWarning(
    "The function getEmailTemplate is deprecated! Loading template in sendEmail function",
    "Deprecation Warning"
  );

  return currentState;
};

/** @deprecated Loading attachments in sendEmail function */
export const getEmailAttachments: StateChanger = async (currentState) => {
  process.emitWarning(
    "The function getEmailAttachments is deprecated! Loading attachments in sendEmail function",
    "Deprecation Warning"
  );

  return currentState;
};

/** @todo change Attachment-Subfolder to Attachment-Subfolder-Attribute
 * @todo consider loading all info in the same function
 */
export const sendEmail: StateChanger = async (currentState) => {
  const hasResources = objectHasAttributes(
    currentState,
    requiredResources["sendEmail"]
  );
  if (!hasResources.hasAttributes) {
    throw new Error(
      `Missing required attributes ${
        hasResources!.missingAttributes
      } in sendEmail`
    );
  }
  const attachmentSubfolderAtt = currentState.headers["Attachment-Subfolder"];
  const emailResourcesSubfolder = !!attachmentSubfolderAtt
    ? currentState.intake[attachmentSubfolderAtt]
    : undefined;

  console.log(`Attachnets subfolder att: ${attachmentSubfolderAtt}`);
  console.log(`Attachnets subfolder: ${emailResourcesSubfolder}`);

  const subject = await loadEmailSubject(
    currentState.resourcesFolder,
    emailResourcesSubfolder
  );
  console.log(`Loaded subject ${subject}`);

  const emailTemplate = await loadEmailTemplate(
    currentState,
    currentState.resourcesFolder,
    emailResourcesSubfolder
  );
  if (!emailTemplate) {
    console.log("Couldn't send email! Missing template");
    return currentState;
  }

  currentState.steps.push("Email template loaded");

  console.log("Loading email attachments");
  const attachments = await loadAttachments(
    currentState.resourcesFolder,
    emailResourcesSubfolder
  );
  currentState.steps.push("Email attachments loaded");

  const EMAIL_CONFIG: EmailData = {
    from: currentState.headers["Email-Sender"],
    subject: subject || currentState.headers["Email-Subject"],
    data: { email: currentState.intake.email },
    attachments,
    html: emailTemplate,
  };

  console.log("Sending email");
  const x = await processEmailRequest(EMAIL_CONFIG);
  console.log("end", x);
  currentState.steps.push("Email sent");

  return StateModel.updateState(currentState);
};

export const sendSMS: StateChanger = async (currentState) => {
  const hasResources = objectHasAttributes(
    currentState,
    requiredResources["sendSMS"]
  );
  if (!hasResources.hasAttributes) {
    throw new Error(
      `Missing required attributes ${
        hasResources!.missingAttributes
      } in sendSMS`
    );
  }

  console.log("Sending SMS");
  const phone = currentState.intake.phone;
  const message = await getSMSTemplate(currentState.resourcesFolder);
  if (!message || !phone) {
    console.log("Couldn't send sms! Missing message or phone");
    return currentState;
  } else {
    await processSMSRequest(phone, message, "Intake process SMS");
    currentState.SMSTemplate = message;
    currentState.steps.push("SMS sent");
    return StateModel.updateState(currentState);
  }
};

export const sendToLitify: StateChanger = async (currentState) => {
  // console.log("Module deactivated.");
  // return currentState;

  const hasResources = objectHasAttributes(
    currentState,
    requiredResources["sendToLitify"]
  );
  if (!hasResources.hasAttributes) {
    throw new Error(
      `Missing required attributes ${
        hasResources!.missingAttributes
      } in sendToLitify`
    );
  }

  const litifyApiUrl = process.env.litifyAPIUrl;
  const litifyData = await intakeToLitify(
    currentState.intake,
    currentState.resourcesFolder
  );

  console.log(`Posting ${JSON.stringify(litifyData)} to ${litifyApiUrl}`);
  const litifyIds = await axios
    .post(litifyApiUrl, { ...litifyData })
    .then((res) => {
      console.log(`Successfully posted to ${litifyApiUrl}`);
      console.log(`Response: ${JSON.stringify(res.data)}`);

      const litifyIds: { intakeId: string; accountId: string } = {
        intakeId: res.data.intakeId,
        accountId: res.data.accountId,
      };

      return litifyIds;
    })
    .catch((err) => {
      console.log(`Error on litify post ${err}`);
      throw err;
    });

  currentState.steps.push("Posted to litify");
  currentState.litifyData = litifyIds;
  return StateModel.updateState(currentState);
};

export const sendAccountToLitify: StateChanger = async (currentState) => {
  // console.log("Module deactivated.");
  // return currentState;

  if (
    currentState.surveyAnswers.questionnaireId !== "mercedes" &&
    currentState.surveyAnswers.questionnaireId !== "test-mercedes"
  ) {
    console.log("Account was not created, questionnaire is not of Mercedes");
    currentState.steps.push(
      "Account was not created, questionnaire is not of Mercedes"
    );

    return StateModel.updateState(currentState);
  }

  const hasResources = objectHasAttributes(
    currentState,
    requiredResources["sendAccountToLitify"]
  );
  if (!hasResources.hasAttributes) {
    throw new Error(
      `Missing required attributes ${
        hasResources!.missingAttributes
      } in sendAccountToLitify`
    );
  }
  if (!currentState.litifyData) {
    currentState.litifyData = {};
  }

  const token = process.env.AuthorizationLitify;
  let accountId: string;
  if (!!currentState.litifyData && !!currentState.litifyData.accountId) {
    console.log(`Already have litify data`);
    accountId = currentState.litifyData.accountId;
  } else {
    console.log("Looking for pgmbm id");
    let [existentAccount] = await getAccountByPGMBMId(
      currentState.client._id,
      token
    );

    if (!existentAccount) {
      console.log("Looking for email (didn't found by pgmbm id)");
      [existentAccount] = await getAccountByEmailLitify(
        currentState.client.email,
        ""
      );
    }

    if (!!existentAccount) {
      console.log("Account exists in litify");
      accountId = existentAccount.Id;
      currentState.litifyData.accountId = accountId;
    }
  }

  let account: Account = mapClientToAccount(currentState.client);
  if (!!accountId) {
    console.log("accountId already exist");

    account.Id = currentState.litifyData.accountId;
    await litify.update("Account", account);
    // await updateAccountLitify(account, token);
    currentState.steps.push("Account updated in litify");
    await db.update(
      "Clients",
      { _id: currentState.client._id },
      { $set: { litifyId: account.Id } },
      false,
      false
    );

    return StateModel.updateState(currentState);
  } else {
    const partyId = await litify.create("Account", account);
    // const responseCreateAccount = await createAccountLitify(account, token);

    const litifyIds: { accountId: string } = {
      accountId: partyId,
    };
    currentState.steps.push("Account posted to litify");
    currentState.litifyData = { ...currentState.litifyData, ...litifyIds };

    currentState.client.litifyId = litifyIds.accountId;
    await db.update(
      "Clients",
      { _id: currentState.client._id },
      { $set: { litifyId: litifyIds.accountId } },
      false,
      false
    );
    return StateModel.updateState(currentState);
  }
};

/** @deprecated Use createIntakeAndMatterInLitify then updateMatterInLitify instead. */
export const sendMatterToLitify: StateChanger = async (currentState) => {
  process.emitWarning(
    "The function sendMatterToLitify is deprecated! Use createIntakeAndMatterInLitify then updateMatterInLitify instead.",
    "Deprecation Warning"
  );
  return currentState;
};

export const sendVehicleToLitify: StateChanger = async (currentState) => {
  // console.log("Module deactivated.");
  // return currentState;

  if (
    currentState.surveyAnswers.questionnaireId !== "mercedes" &&
    currentState.surveyAnswers.questionnaireId !== "test-mercedes"
  ) {
    console.log("Vehicle was not created, questionnaire is not of Mercedes");
    currentState.steps.push(
      "Vehicle was not created, questionnaire is not of Mercedes"
    );

    return StateModel.updateState(currentState);
  }

  const hasResources = objectHasAttributes(
    currentState,
    requiredResources["sendVehicleToLitify"]
  );
  if (!hasResources.hasAttributes) {
    throw new Error(
      `Missing required attributes ${
        hasResources!.missingAttributes
      } in sendAccountToLitify`
    );
  }

  const token = process.env.AuthorizationLitify;

  let vehicle: Vehicle = mapClaimToVehicle(currentState.claim);

  if (!!currentState.litifyData && !!currentState.litifyData.vehicleId) {
    currentState.steps.push("Vehicle already exist in litify");
    console.log("vehicleId already exist in currentState.litifyData");
    vehicle.Id = currentState.litifyData.vehicleId;
    await litify.update("Vehicle__c", vehicle);
    // await updateVehicleLitify(vehicle, token);

    currentState.claim.litifyId = currentState.litifyData.vehicleId;
    return StateModel.updateState(currentState);
  } else {
    vehicle = {
      ...vehicle,
      ...LitifyModel.initializeVehicle(
        currentState.litifyData.accountId,
        currentState.litifyData.matterId
      ),
    };
    const vehicleId = await litify.create("Vehicle__c", vehicle);

    const litifyIds: {
      accountId: string;
      matterId: string;
      vehicleId: string;
    } = {
      accountId: currentState.litifyData.accountId,
      matterId: currentState.litifyData.matterId,
      vehicleId: vehicleId,
    };
    currentState.steps.push("Vehicle posted to litify");
    currentState.litifyData = { ...currentState.litifyData, ...litifyIds };
    currentState.claim.litifyId = currentState.litifyData.vehicleId;
    await db.update(
      currentState.claimCollection,
      { _id: currentState.claim._id },
      { $set: { litifyId: currentState.litifyData.vehicleId } },
      false,
      false
    );
    return StateModel.updateState(currentState);
  }
};

/** @deprecated Use createIntakeAndMatterInLitify instead. */
export const sendIntakeToLitify: StateChanger = async (currentState) => {
  process.emitWarning(
    "The function sendIntakeToLitify is deprecated! Use createIntakeAndMatterInLitify instead.",
    "Deprecation Warning"
  );
  return currentState;
};

export const updateAccountInLitify: StateChanger = async (currentState) => {
  // console.log("Module deactivated.");
  // return currentState;

  if (
    currentState.surveyAnswers.questionnaireId !== "mercedes" &&
    currentState.surveyAnswers.questionnaireId !== "test-mercedes"
  ) {
    console.log("Account was not updated, questionnaire is not of Mercedes");
    currentState.steps.push(
      "Account was not updated, questionnaire is not of Mercedes"
    );

    return StateModel.updateState(currentState);
  }

  const hasResources = objectHasAttributes(
    currentState,
    requiredResources["updateAccountInLitify"]
  );
  if (!hasResources.hasAttributes) {
    throw new Error(
      `Missing required attributes ${
        hasResources!.missingAttributes
      } in updateAccountInLitify`
    );
  }

  const token = process.env.AuthorizationLitify;

  const account = {
    Id: currentState.litifyData.accountId,
    ...mapClientToAccount(currentState.client),
  };
  await litify.update("Account", account);
  await db.update(
    "Clients",
    { _id: currentState.client._id },
    { $set: { litifyId: account.Id } },
    false,
    false
  );

  return StateModel.updateState(currentState);
};

export const updateMatterInLitify: StateChanger = async (currentState) => {
  // console.log("Module deactivated.");
  // return currentState;

  if (
    currentState.surveyAnswers.questionnaireId !== "mercedes" &&
    currentState.surveyAnswers.questionnaireId !== "test-mercedes"
  ) {
    console.log("Matter was not updated, questionnaire is not of Mercedes");
    currentState.steps.push(
      "Matter was not updated, questionnaire is not of Mercedes"
    );

    return StateModel.updateState(currentState);
  }

  const hasResources = objectHasAttributes(
    currentState,
    requiredResources["updateMatterInLitify"]
  );
  if (!hasResources.hasAttributes) {
    throw new Error(
      `Missing required attributes ${
        hasResources!.missingAttributes
      } in updateMatterInLitify`
    );
  }

  const token = process.env.AuthorizationLitify;
  let status: MATTER_STATUS;
  const statusAsClient = currentState.surveyAnswers.statusAsClient;
  if (statusAsClient === undefined) {
    status = "Open";
  } else {
    switch (statusAsClient) {
      case CLIENT_STATUS.Active: {
        status = "Open";
        break;
      }
      case CLIENT_STATUS["Confirmed Cancelation"]: {
        status = "Closed";
        break;
      }
      case CLIENT_STATUS["Requested Cancelation"]: {
        status = "Requested Closure";
        break;
      }
      default: {
        status = "Open";
        break;
      }
    }
  }

  const matter: Matter = {
    Id: currentState.litifyData.matterId,
    ...saToMatter(currentState.surveyAnswers),
  };
  await litify.update("litify_pm__Matter__c", matter);

  return StateModel.updateState(currentState);
};

export const updateVehicleInLitify: StateChanger = async (currentState) => {
  // console.log("Module deactivated.");
  // return currentState;

  if (
    currentState.surveyAnswers.questionnaireId !== "mercedes" &&
    currentState.surveyAnswers.questionnaireId !== "test-mercedes"
  ) {
    console.log("Vehicle was not updated, questionnaire is not of Mercedes");
    currentState.steps.push(
      "Vehicle was not updated, questionnaire is not of Mercedes"
    );

    return StateModel.updateState(currentState);
  }

  const hasResources = objectHasAttributes(
    currentState,
    requiredResources["updateVehicleInLitify"]
  );
  if (!hasResources.hasAttributes) {
    throw new Error(
      `Missing required attributes ${
        hasResources!.missingAttributes
      } in updateVehicleInLitify`
    );
  }

  const token = process.env.AuthorizationLitify;

  const vehicle = {
    Id: currentState.litifyData.vehicleId,
    ...mapClaimToVehicle(currentState.claim),
  };
  await litify.update("Vehicle__c", vehicle);
  await db.update(
    currentState.claimCollection,
    { _id: currentState.claim._id },
    { $set: { litifyId: vehicle.Id } },
    false,
    false
  );

  return StateModel.updateState(currentState);
};

export const generateSurveyLink: StateChanger = async (currentState) => {
  const hasResources = objectHasAttributes(
    currentState,
    requiredResources["generateSurveyLink"]
  );
  if (!hasResources.hasAttributes) {
    throw new Error(
      `Missing required attributes ${
        hasResources!.missingAttributes
      } in generateSurveyLink`
    );
  }

  const linkPrefix = currentState.headers["Quest-Link"];
  const token = currentState.questionnaireAnswers.secureLink.token;
  const link = `${linkPrefix}/survey?token=${token}`;

  console.log(`Created the link ${link}`);
  currentState.surveyLink = link;

  currentState.steps.push("Created link");
  return StateModel.updateState(currentState);
};

export const addClient: StateChanger = async (currentState) => {
  // console.log("Module deactivated.");
  // return currentState;
  if (
    currentState.surveyAnswers.questionnaireId !== "mercedes" &&
    currentState.surveyAnswers.questionnaireId !== "test-mercedes"
  ) {
    console.log("Client was not created, questionnaire is not of Mercedes");
    currentState.steps.push(
      "Client was not created, questionnaire is not of Mercedes"
    );

    return StateModel.updateState(currentState);
  }

  const hasResources = objectHasAttributes(
    currentState,
    requiredResources["addClient"]
  );

  if (!hasResources.hasAttributes) {
    throw new Error(
      `Missing required attributes ${
        hasResources!.missingAttributes
      } in addClient`
    );
  }
  if (!!currentState.client) {
    console.log(`Client already exists in state`);
    const [client] = await db.retrieve<Client>("Clients", {
      _id: currentState.client._id,
    });
    if (!client) {
      console.log("Client not in db, recreating");
    } else {
      currentState.client = client;
      return StateModel.updateState(currentState);
    }
  }

  if (currentState.intake.email) {
    const normalizedEmail = normalizeString(currentState.intake.email);
    /** usar find no lugar de aggregate */
    const client: Client[] = await db.retrieve("Clients", {
      email: normalizedEmail,
    });

    if (client.length === 0) {
      currentState.client = await ClientModel.createClientFromOldData(
        currentState.intake,
        currentState.surveyAnswers
      );
      await db.create("Clients", [currentState.client], false);
    } else {
      const updatedClient = {
        ...ClientModel.getSurveyAnswersInfo(currentState.surveyAnswers),
      };
      const responseCreateVehicle = await db.update(
        "Clients",
        { _id: client[0]._id },
        { $set: updatedClient },
        false
      );
      const [clientUpdated] = await db.retrieve<Client>("Clients", {
        _id: client[0]._id,
      });
      currentState.client = clientUpdated;
    }

    return StateModel.updateState(currentState);
  }
  throw new Error("Invalid Email");
};

export const addClaim: StateChanger = async (currentState) => {
  // console.log("Module deactivated.");
  // return currentState;
  if (
    currentState.surveyAnswers.questionnaireId !== "mercedes" &&
    currentState.surveyAnswers.questionnaireId !== "test-mercedes"
  ) {
    console.log("Claim was not created, questionnaire is not of Mercedes");
    currentState.steps.push(
      "Claim was not created, questionnaire is not of Mercedes"
    );

    return StateModel.updateState(currentState);
  }

  const hasResources = objectHasAttributes(
    currentState,
    requiredResources["addClaim"]
  );

  if (!hasResources.hasAttributes) {
    throw new Error(
      `Missing required attributes ${
        hasResources!.missingAttributes
      } in addClaim`
    );
  }

  if (!!currentState.claim && !!currentState.claimCollection) {
    console.log(`Claim already exists in state`);

    const [claim] = await db.retrieve<Claim>(currentState.claimCollection, {
      _id: currentState.claim._id,
    });
    if (!claim) {
      console.log("Claim not in db, recreating");
    } else {
      currentState.claim = claim;
      return StateModel.updateState(currentState);
    }
  }

  const lastModified = new Date();

  const claimResult = await ClaimModel.createClaim(
    currentState.surveyAnswers.questionnaireId,
    currentState.surveyAnswers,
    currentState.client._id,
    lastModified
  );
  await db.create(claimResult.collection, [claimResult.claim], false);
  currentState.claim = claimResult.claim;
  currentState.claimCollection = claimResult.collection;

  return StateModel.updateState(currentState);
};

export const updateClient: StateChanger = async (currentState) => {
  // console.log("Module deactivated.");
  // return currentState;
  if (
    currentState.surveyAnswers.questionnaireId !== "mercedes" &&
    currentState.surveyAnswers.questionnaireId !== "test-mercedes"
  ) {
    console.log("Client was not updated, questionnaire is not of Mercedes");
    currentState.steps.push(
      "Client was not updated, questionnaire is not of Mercedes"
    );

    return StateModel.updateState(currentState);
  }

  const hasResources = objectHasAttributes(
    currentState,
    requiredResources["updateClient"]
  );
  if (!hasResources.hasAttributes) {
    throw new Error(
      `Missing required attributes ${
        hasResources!.missingAttributes
      } in updateClient`
    );
  }

  const token = process.env.AuthorizationLitify;

  const client = ClientModel.getSurveyAnswersInfo(currentState.surveyAnswers);
  if (!!client && Object.keys(client).length > 0) {
    const responseCreateVehicle = await db.update(
      "Clients",
      { _id: currentState.client._id },
      { $set: client },
      false
    );

    const [clientUpdated] = await db.retrieve<Client>("Clients", {
      _id: currentState.client._id,
    });
    currentState.client = clientUpdated;
  }
  return StateModel.updateState(currentState);
};

export const updateClaim: StateChanger = async (currentState) => {
  // console.log("Module deactivated.");
  // return currentState;
  if (
    currentState.surveyAnswers.questionnaireId !== "mercedes" &&
    currentState.surveyAnswers.questionnaireId !== "test-mercedes"
  ) {
    console.log("Claim was not updated, questionnaire is not of Mercedes");
    currentState.steps.push(
      "Claim was not updated, questionnaire is not of Mercedes"
    );

    return StateModel.updateState(currentState);
  }

  const hasResources = objectHasAttributes(
    currentState,
    requiredResources["updateClaim"]
  );
  if (!hasResources.hasAttributes) {
    throw new Error(
      `Missing required attributes ${
        hasResources!.missingAttributes
      } in updateClaim`
    );
  }

  const token = process.env.AuthorizationLitify;

  const claim = ClaimModel.extractFromSurveyAnswers(currentState.surveyAnswers);

  // console.log(claim);
  if (!!claim && Object.keys(claim).length > 0) {
    const responseCreateVehicle = await db.update(
      currentState.claimCollection,
      { _id: currentState.claim._id },
      { $set: claim },
      false
    );
    currentState.claim = { ...currentState.claim, ...claim };

    const [claimUpdated] = await db.retrieve<Claim>(
      currentState.claimCollection,
      {
        _id: currentState.claim._id,
      }
    );
    currentState.claim = claimUpdated;
  }

  return StateModel.updateState(currentState);
};

export const createIntakeAndMatterInLitify: StateChanger = async (
  currentState
) => {
  if (
    currentState.surveyAnswers.questionnaireId !== "mercedes" &&
    currentState.surveyAnswers.questionnaireId !== "test-mercedes"
  ) {
    console.log("Intake was not created, questionnaire is not of Mercedes");
    currentState.steps.push(
      "Intake was not created, questionnaire is not of Mercedes"
    );

    return StateModel.updateState(currentState);
  }

  const hasResources = objectHasAttributes(
    currentState,
    requiredResources["createIntakeAndMatterInLitify"]
  );
  if (!hasResources.hasAttributes) {
    throw new Error(
      `Missing required attributes ${
        hasResources!.missingAttributes
      } in createIntakeAndMatterInLitify`
    );
  }

  let intakeId: string;
  if (!!currentState.litifyData && !!currentState.litifyData.intakeId) {
    console.log("intakeId already exist in currentState.litifyData");

    intakeId = currentState.litifyData.intakeId;
    currentState.steps.push("Intake already exist in litify");
  } else {
    let intake: litify_pm__Intake__c = {
      ...LitifyModel.initializeIntake(
        currentState.litifyData.accountId,
        currentState.surveyAnswers.questionnaireId
      ),
    };
    intakeId = await litify.create("litify_pm__Intake__c", intake);
    // const responseCreateIntake = await createIntakeLitify(intake, token);
    currentState.steps.push("Intake and matter posted to litify");
  }

  const intakeFromLitify: litify_pm__Intake__c = await litify.retrieve(
    "litify_pm__Intake__c",
    intakeId
  );

  const litifyIds: {
    accountId: string;
    matterId: string;
    intakeId: string;
    vehicleId: undefined;
  } = {
    accountId: currentState.litifyData.accountId,
    matterId: intakeFromLitify.litify_pm__Matter__c,
    intakeId: intakeId,
    vehicleId: undefined,
  };
  currentState.litifyData = { ...currentState.litifyData, ...litifyIds };

  return StateModel.updateState(currentState);
};

/** @todo change modules implementation to other files and leave one file justo to export them */
