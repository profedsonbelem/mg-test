export function getDefaultConfigurations(name: string) {
  const headers: any = {
    Survey: name,
    "Email-Sender": `${name}@pgmbm.com`,
    "Resources-Folder": name,
    "Quest-Link":
      process.env.stage === "Production"
        ? "http://questionnaire.pgmbm.com"
        : "http://test-questionnaire.pgmbm.com",
    "Email-Subject": `Your ${name} Claim`,
  };

  const intakeToLitifyMap: any = {
    map: {},
    defaultValues: {},
  };

  const intakeToSurveyMaps: any = {
    answerMap: {},
    additionalInfoMap: {},
  };

  const modules: string[] = [
    "extractInfoFromRecord",
    "createIntake",
    "validateIntake",
    "createQuestionnaireAnswer",
    "createSurveyAnswer",
    "generateSurveyLink",
    "sendEmail",
  ];

  return {
    "headers.json": headers,
    "intakeToLitifyMap.json": intakeToLitifyMap,
    "intakeToSurveyMaps.json": intakeToSurveyMaps,
    "modules.json": modules,
  };
}

export function getDefaultTemplates() {
  const email: string = `<div><p><a href={{link}}>[Click here to submit your claim]</a></p></div>`;

  const templateMap: any = {
    surveyLink: "link",
  };

  return {
    "email.html": email,
    "templateMap.json": templateMap,
  };
}
