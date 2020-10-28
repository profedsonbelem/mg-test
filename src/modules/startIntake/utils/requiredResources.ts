/** @todo look for specific attributes */
export const requiredResources: { [moduleName: string]: string[] } = {
  extractInfoFromRecord: ["record", "resourcesFolder"],
  createIntakeFromRaw: ["rawIntake", "headers"],
  getHeaders: ["resourcesFolder"],
  createIntake: ["emailXML", "headers"],
  validateIntake: ["intake"],
  createQuestionnaireAnswer: ["intake"],
  createSurveyAnswer: ["intake", "resourcesFolder"],
  sendEmail: ["intake", "questionnaireAnswers", "headers", "resourcesFolder"],
  sendSMS: ["intake", "resourcesFolder"],
  sendToLitify: ["intake", "resourcesFolder"],
  sendAccountToLitify: ["client"],
  sendMatterToLitify: [],
  sendVehicleToLitify: [
    "litifyData.accountId",
    "litifyData.matterId",
    "client",
    "claim",
    "claimCollection",
  ],
  sendIntakeToLitify: ["litifyData.accountId", "litifyData.matterId"],
  generateSurveyLink: ["headers", "questionnaireAnswers"],
  addClient: ["intake"],
  addClaim: ["surveyAnswers", "client"],
  updateClient: ["client", "surveyAnswers"],
  updateClaim: ["claim", "surveyAnswers"],
  updateAccountInLitify: ["client", "litifyData.accountId"],
  updateMatterInLitify: ["litifyData.matterId", "surveyAnswers"],
  updateVehicleInLitify: ["claim", "litifyData.vehicleId"],
  createIntakeAndMatterInLitify: [
    "litifyData.accountId",
    "surveyAnswers.questionnaireId",
  ],
};
