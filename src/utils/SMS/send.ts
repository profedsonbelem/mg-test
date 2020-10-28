import { SNS } from "aws-sdk";
import { ContactModel } from "../../models/contact.model";
const sns = new SNS({
  apiVersion: "2010-03-31",
  region: "us-east-1",
});

export async function processSMSRequest(
  phone: string,
  message: string,
  subject: string,
  sender?: string
) {
  // Get default sender, if one isn't given
  if (!sender) {
    sender = await getSender();
  }
  console.log(`Sender: ${sender}`);

  await canReceive(phone);

  console.log(`Sending ${message} to ${phone}`);
  const params: SNS.PublishInput = {
    Message: message,
    MessageAttributes: !!sender
      ? {
          "AWS.SNS.SMS.SenderID": {
            DataType: "String",
            StringValue: sender,
          },
        }
      : undefined,
    PhoneNumber: phone,
    Subject: subject,
  };

  try {
    const publishTextPromise = await sns.publish(params).promise();

    if (publishTextPromise.$response.error) {
      console.log(
        `Error sending message ${message} to phone ${phone}: ${publishTextPromise.$response.error}`
      );
      throw new Error(
        `Error sending message ${message} to phone ${phone}: ${publishTextPromise.$response.error}`
      );
    }

    console.log("SMS OK", publishTextPromise.MessageId);

    console.log(`Creating contact log`);
    publishTextPromise.MessageId;
    const contact = ContactModel.createSMSContact({
      sender: sender || "Default SMS sender",
      message,
      receiver: phone,
      subject: subject,
    });

    const creationResult = await ContactModel.createContactInDb(contact);

    console.log(
      `Created contact ${JSON.stringify(creationResult.insertedIds)}`
    );

    return creationResult;
  } catch (err) {
    console.log("SMS FAILED", err + "\n" + JSON.stringify(err.stack));
    console.error(err, err.stack);
  }
}

async function getSender() {
  console.log("Getting sender");
  const smsAttributes = await sns
    .getSMSAttributes({
      attributes: ["DefaultSenderID"],
    })
    .promise();

  if (smsAttributes.$response.error) {
    console.log(`Error on getting sender id: ${smsAttributes.$response.error}`);
    throw new Error(
      `Error on getting sender id: ${smsAttributes.$response.error}`
    );
  }

  return smsAttributes.attributes["DefaultSenderID"];
}

async function canReceive(phone: string) {
  const optedOut = await sns
    .checkIfPhoneNumberIsOptedOut({
      phoneNumber: phone,
    })
    .promise();

  if (optedOut.$response.error) {
    console.log(`Error on opted out checking: ${optedOut.$response.error}`);
    throw new Error(`Error on opted out checking: ${optedOut.$response.error}`);
  }

  if (optedOut.isOptedOut) {
    console.log(`Phone ${phone} opted out`);
    throw new Error(`Phone ${phone} opted out`);
  }
}
