import { SES, SESV2 } from "aws-sdk";

/** @todo get topic arn and bucketname from env */
export async function createRecipientRule(
  ruleSetName: string,
  surveyName: string,
  Recipients: SES.RecipientsList,
  Actions: SES.ReceiptActionsList
): Promise<SES.CreateReceiptRuleResponse> {
  const ses = new SES({ apiVersion: "v4" });

  return new Promise((res, rej) =>
    ses.createReceiptRule(
      {
        RuleSetName: ruleSetName,
        Rule: {
          Name: surveyName,
          Enabled: true,
          Recipients,
          Actions,
        },
      },
      (err, data) => {
        if (err) {
          console.log(`Error on createIntakeRule: ${err}`);
          rej(err);
        }

        res(data);
      }
    )
  );
}

export async function removeFromSuppressionList(
  email: string
): Promise<boolean> {
  const ses = new SESV2({ apiVersion: "v4", region: "us-east-1" });

  return new Promise((res) => {
    ses.deleteSuppressedDestination({ EmailAddress: email }, (err, data) => {
      if (!!err) {
        console.log(`Couldn't remove from supression list: ${err}`);
        res(false);
      } else {
        console.log(`Removed ${email} from list`);
        res(true);
      }
    });
  });
}
