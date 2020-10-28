# Start Intake Process

Currently, there are two main endpoints to start a intake process: **emailLead**, triggered by a SNS notification, and **api/createIntake**, triggered by a http request. The lambdas that handle those processes are **emailLead** (currently, using emailLeadV2) and **createIntakeFromData**, respectively, and its partiticularities will be discussed in the [Intake Endpoints](##intake-endpoints) section.

Both lambdas use State changing modules, meaning that they will execute a series of modules that receive and return a State object. Those objects are saved in our databse and if a given State is modified the modification will be applied to its db copy. The available modules are described in the section [Modules](##modules)

## Expected resources

In order to perform correctely, some elements are expected to exist in the execution environment. Note that those resources aren't required for all the modules.

### Environment Variables

The following environment variables may be required in the modules:

- **cryptoKey:** Key to be used to encrypt/decrypt the user token. Note that a token can only be decrypted using the same key as in its encryption.
- **emailBucket:** The s3 bucket to store the emails sent in the process.
- **failedEmail:** The email address to be reached in case of fail during the process.
- **iv:** IV to be used to encrypt/decrypt the user token. Note that a token can only be decrypted using the same IV as in its encryption.
- **litifyAPIUrl:** The url of the litify intakes api in salesforce.
- **mongoUrl:** The url for the mongo connection. This url follow the pattern:

  mongodb://user:password@ip:port/database

- **resources:** The s3 bucket with the attachments, templates and configurations files. [See "S3 Files" Section](###s3-files)
- **stage:** The development stage. Affects the [failure behaviour](##failure)

### S3 Files

In order to process a State with a given _resourcesFolder_, the following files may be expected to exist within the _resources_ bucket:

    resources/resourcesFolder/
        |
        |-- configuration/
        |   |-- intakeToSurveyMaps.json
        |   |-- headers.json
        |   |-- modules.json
        |
        |-- templates/
        |   |-- email.html
        |   |-- email[*].html
        |   |-- sms.txt
        |   |-- subjects.json
        |
        |-- contracts/
        |   |-- default/
        |   |-- *

- **default:** The files within this folder will be sent as email attachments in the _sendEmail_ module if no other instruction is given. Check the [sendEmail](##modules) description for more details.
- **email.html:** Document with the html to be used as the body of the email sent in the _sendEmail_ module if no other instruction is given. Check the [sendEmail](##modules) description for more details.
- **headers.json:** Document listing the State headers. The headers will be further discussed in the next section, [State headers](###state-headers).
- **intakeToSurveyMaps.json:** Document describing how to map the attributes from an Intake to a SurveyAnswers. The following maps will be used if given:
  - **additionalInfoMap:** Attributes to be setted as the additionalInfo of an Answer.
  - **answerMap:** Attributes to be setted as the answer of an Answer.
- **modules.json:** Document listing the modules to be executed. A full list modules can be found in the section [Modules](##modules).
- **sms.txt:** Document with the text to be sent in the _sendSMS_ module.
- **subjects.json:** Document with the subjects to be used in the [sendEmail](##modules) module.

### State headers

The following attributes may be expected to exist in the State headers:

- **Attachment-Subfolder:** The attribute within the intake data that gives the subfolder in [contracts](###s3-files) that contains the attachments to be sent in the _sendEmail_ module.
- **Email-Sender:** The sender of any email sent in during the process.
- **Email-Subject:** The subject of the email sent in the _sendEmail_ module.
- **Quest-Link:** The prefix of the link to be used in order to access the full questionnaire.
- **Survey:** The survey that State belongs to. This information essential in order to load the right questionnaire for the client. It's setted as the State's intake.survey, questionnaireAnswers.surveyId and surveyAnswers.questionnaireId.

### State record

The following data is expected to exist in the State record:

- **emailXML:** Within the record.Sns.Message.content, is expected to exist xml data to be parsed into a Intake. This data is expected to be contained within the tag \<xml> of \<SPG>.
- **resourcesFolder:** Within the record.Sns.Message.mail, is expected to exist the header "Survey-Name" with the resourcesFolder for that State. Mail headers can be added as an action in the [Email-Receiving Process](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/receiving-email-concepts.html) of SES.

## Setting up the Environment

Although you may not need all the resources for the modules you desire to run, it's highly recommendable that you ?

- **Set the environment variables:** In order to set a environment variable to be used in a serverless application, one must declare it on the yml file and pass its value as an argument on deploy.

```yml
# In the serverless.yml file
custom:
  mongoUrl: ${opt:mongoUrl}

---
provider:
  environment:
    mongoUrl: ${self:custom.mongoUrl}
```

```sh
#In terminal
serverless deploy --mongoUrl mongodb://user:password@ip:port/database
```

- **Create the S3 resources bucket and folders:** Upload the necessary files to your resources bucket. Remember that the files are expected in to be named **exactly** as described in the [S3 Files](###s3-files) section.

- **Subscribe emailLead to a SNS topic:** For information on how to subscribe a lambda function to a SNS topic, check this [tutorial](https://docs.aws.amazon.com/sns/latest/dg/sns-lambda-as-subscriber.html).

- **Configure a SES rule:** Configure a receiving rule that add the "Survey-Name" header and publish in the former SNS topic. Check [AWS tutorials](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/receiving-email-concepts.html) on SES email receiving for more information.

- **Other AWS configurations:** In order to run properly, it may be necessary to do further configurations within the AWS environment. Here are some tutorials that may be helpful.
  - [Allowing remote connection to your mongodb within EC2](https://ianlondon.github.io/blog/mongodb-auth/)
  - [Allowing lambda functions to access](https://aws.amazon.com/premiumsupport/knowledge-center/lambda-execution-role-s3-bucket/)

## Creating a State

An State object have the following structure:

```ts
class State {
  _id: string;
  resourcesFolder: string;
  record?: SNSEventRecord;
  rawIntake?: any;
  emailXML?: string;
  headers: { [name: string]: string };
  intake: Intake;
  questionnaireAnswers: QuestionnaireAnswer;
  surveyAnswers: SurveyAnswer;
  SMSTemplate: string;
  steps: string[];
}
```

In order to create a instance of that object, the following functions may be invoked:

- **initStateFromRecord:** Creates a State instance from a given SNS record. It's expected that the record contains a mail.header named "Survey-Name" with the resourcesFolder for that state. Set the State's record as the one given and its resourcesFolder as the one in the record.

- **initStateFromRawIntake:** Creates a State instance from a given rawIntake. A resourcesFolder for that State must also be passed as a argument, since that attribute may not be retrievable from the rawIntake. Set the State's rawIntake and resourcesFolder as the one given.

## Intake Endpoints

**Note:** It's important to keep in mind that regardless of the order or how many times those endpoints are requested, the same intake data won't trigger multiple intake processes. This means that the questionnaire links obtained in each of the processes must be the same, if the intake data is the same.

### emailLeadV2

This lambda is a **SNSHandler**, meaning that in order to perform correctly, it must receive as argument one **SNSEvent**. This can be achieved by subscribing it to a SNS topic.

As this function receives a SNSEvent, it's natural that it creates the State's using the [initStateFromRecord](##creating-a-state) function. Therefore, regardless of the modules you wish to execute, this endpoint expects all the records in that event to have resourcesFolder in the mail.headers "Survey-Name".

The modules executed in this process are loaded from the S3 file [modules.json](###s3-files), so before using this lambda, you must create this configuration file within the resources folder.

Since this is a SNSHandler, no value is returned at the end of its execution.

### createIntakeFromData

This lambda is an **APIGatewayProxyHandler**, meaning that in order to perform correctly, it must receive as argument one **APIGatewayProxyEvent**. This will naturally happen when a http request is made to the endpoint **api/createIntake**.

That endpoint expects a POST request and, within the function, its body must follow the structure:

```ts
{
    data: any,
    resourcesFolder: string,
    modules?: string[]
}
```

The State for this executed will be created by the [initStateFromRawIntake](##creating-a-state) function, using the data attribute as the rawIntake and the resourcesFolder, naturally, as the resourcesFolder.

The idea of this endpoint is to create a SurveyAnswer for the given intake and return its questionnaire token. Therefore, if the modules argument isn't given in the request body, this lambda will execute the following modules:

- getHeaders
- createIntakeFromRaw
- createQuestionnaireAnswer
- createSurveyAnswer
- generateSurveyLink

On a successful execution, this lambda will respond with a 200 status code, a success message and the resulting state's QuestionnaireAnswer.secureLink.token as aditionalInfo.token.

## Modules

| Name                      | Require (State)                                                    | Require (S3)              | Require (Environment)                       | Set                   |
| ------------------------- | ------------------------------------------------------------------ | ------------------------- | ------------------------------------------- | --------------------- |
| extractInfoFromRecord     | record <br> resourcesFolder                                        | headers.json              | resources                                   | emailXML <br> headers |
| getHeaders                | resourcesFolder                                                    | headers.json              | resources                                   | headers               |
| createIntakeFromRaw       | rawIntake <br> headers                                             |                           | mongoUrl                                    | intake                |
| createIntake              | emailXML <br> headers <br>                                         |                           | mongoUrl                                    | intake                |
| validateIntake            | intake                                                             |                           |                                             |                       |
| createQuestionnaireAnswer | intake                                                             |                           | mongoUrl <br> cryptoKey <br> iv             | questionnaireAnswers  |
| createSurveyAnswer        | intake <br> resourcesFolder                                        | intakeToSurveyMap.json    | mongoUrl <br> resources                     | surveyAnswers         |
| sendEmail                 | intake <br> questionnaireAnswers <br> headers <br> resourcesFolder | email.html <br> contracts | emailBucket <br> senderEmail <br> resources |                       |
| sendSMS                   | intake <br> resourcesFolder                                        | sms.txt                   | mongoUrl <br> resources                     | SMSTemplate           |
| sendToLitify              | intake                                                             |                           | litifyAPIUrl                                |                       |

- **extractInfoFromRecord:** Get the emailXML from the record and the headers from the S3 file headers.json.
- **getHeaders:** Get the headers from the S3 file headers.json.
- **createIntakeFromRaw:** Create the State's intake using the rawIntake and the _Survey_ attribute in headers.
- **createIntake:** Create a new intake by parsing the emailXML and the _Survey_ attribute in headers.
- **validateIntake:** Validate the intake.
- **createQuestionnaireAnswer:** Create a questionnaire answers for the intake. The questionnaire token and secure link is created in this step.
- **createSurveyAnswer:** Create a survey answer for the intake. Uses the S3 file intakeToSurveyMaps.json.
- **sendEmail:** Send an email using the S3 file email.html as body and the files in S3 folder contratcts/default as attachments. If a [Attachment-Subfolder](###state-headers) is given _and_ that attribute exists in the intake, will use the template email[Attachment-Subfolder].html instead, if it exists, and send the files in that subfolder of contracts, given that the folder isn't empty. In that case, the default attachments will be sent. The subject of the email will be value of the key Attachment-Subfolder in subjects.json or the value of Email-Subject in headers.json, if the first doesn't exist.
- **sendSMS:** Send a SMS using the S3 file sms.txt as the message text.
- **sendToLifiy:** Send the intake data to be treated in the salesforce litify module.

## Failure

Whenever a module execution fails, the **processFail** function is called.

- In the production stage, this function:
  - Send an email comunication the failure to the to [failedEmail](###environment-variables)
  - Publish in the intake-process-error sns topic
  - Save the intake data in the database
- In the development stage, this function:
  - Log the error

If the module was executed by the [createIntakeFromData](##intake-endpoints) process, the endpoint will respond with a 500 status, informing the full error.

When the failure rate of this process is above a certain threshold for a given time, a cloudwatch alarm will notify the developers.

The known error causes are:

| Module         | Error Reason                              | Error Message                                               |
| -------------- | ----------------------------------------- | ----------------------------------------------------------- |
| validateIntake | [Intake is invalid](###intake-validation) | Intake is invalid                                           |
| **All**        | State doesn't have the required resources | Missing required attributes [missingAttributes] in [module] |

### Intake Validation

An intake is valid if:

- **intake.email** exists

## Examples

### createIntakeFromData Request Body

```json
{
  "data": {
    "id": "35163886",
    "name": "Y Vil",
    "email": "yvilela@mggestoes.com.br",
    "phone": "31999017259",
    "address": "asdf",
    "accept": "Submit",
    "created": "2020-05-04",
    "survey": "test-airline"
  },
  "resourcesFolder": "airlines"
}
```

### emailLeadV2 Email Body

```xml
<xml>
    <id>35163886</id>
    <name>Y Vil</name>
    <email>yvilela@mggestoes.com.br</email>
    <phone>31999017259</phone>
    <address>asdf</address>
    <accept>Submit</accept>
    <created>2020-05-04</created>
    <survey>test-airline</survey>
</xml>
```
