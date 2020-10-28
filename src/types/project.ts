export class Project {
  id: string;
  name: string;
  welcomeEmailTemplate: {
    body: string;
    subject: string;
    attachmentsS3: string[];
    linkToQuestionnaireHost: string;
  };
}
