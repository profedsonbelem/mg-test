import { SQS } from "aws-sdk";
import { EmailEventData, EmailParamsType } from "../../types/email";
import { DenylistModel } from "../../models/denylist.model";
import { ContactModel } from "../../models/contact.model";
import { putObjectOnS3 } from "../../utils/aws/s3.utils";

// a function that takes an email to one single person and add to the email queue
export async function addEmailToQueue(
  eventData: EmailEventData,
  data: EmailParamsType
): Promise<string | Error> {
  // verify if the email is in the deny list. if it is, returns the error telling that.
  // but, if not, starts the routine to save on DB and queue
  const onDenyList = await DenylistModel.isEmailOnList(data.email);

  if (!onDenyList) {
    // if there is no problem with the email adress, create the contact to store the email
    const contact = ContactModel.createEmailContact({
      attachments: eventData.attachments,
      data: data,
      from: eventData.from,
      html: eventData.html,
      subject: eventData.subject,
      bcc: eventData.bcc,
    });
    const bucket = process.env.attachmentsBucket;

    if (contact) {
      // save the attachements using S3,
      if (!!eventData.attachments) {
        for (let i = 0; i < eventData.attachments.length; i++) {
          try {
            await putObjectOnS3(
              new Buffer(
                eventData.attachments[i].data.split(";base64,").pop(),
                "base64"
              ),
              bucket,
              `${contact._id}/${eventData.attachments[i].name}`,
              "base64"
            );
          } catch (error) {
            return new Error(
              `${eventData.attachments[i].name} failed to send to S3`
            );
          }
        }
      }
      // store on DB and, if it is ok, try to send for SQS to put in the queue.
      return ContactModel.createContactInDb(contact)
        .then(async () => {
          try {
            await sendMessageToSQS(contact._id);
            return `${contact._id}`;
          } catch (error) {
            console.log(`*****error: ${error}`);
            return new Error(`${contact._id} failed to send to queue`);
          }
        })
        .catch(() => {
          return new Error(`${contact.emailTo} failed to save on DB`);
        });
    } else {
      return new Error(`${data.email} failed to create contact`);
    }
  } else {
    return new Error(`${data.email} on deny list`);
  }
}

/** @todo move this to utils/sqs.utils.ts (receive queueurl as param and arbitrary message) */
export async function sendMessageToSQS(contactId: any) {
  const sqs = new SQS({ region: "us-east-1" });
  const QueueUrl = process.env.queueURL;

  return new Promise((res, rej) => {
    const params = {
      MessageBody: contactId,
      QueueUrl,
    };
    sqs.sendMessage(params, function(err, _data) {
      if (err) {
        console.log(`*****Err: ${err}`);
        rej(err);
      } else {
        res(`${params.MessageBody}`);
      }
    });
  });
}
