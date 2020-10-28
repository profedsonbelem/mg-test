import { APIGatewayProxyHandler } from "aws-lambda";
import { EmailEventData, EmailData } from "../types/email";
import { processEmailRequest } from "../utils/email/send";
import { Responses } from "./common/api.response";
import { authorizeAdminToken } from "./common/auth";

/** @todo return all fail emails at once */
export const sendMail: APIGatewayProxyHandler = async (event, _context) => {
  const authorizationResult = authorizeAdminToken(event);
  if (!authorizationResult.authorized) {
    return Responses._400(`Not allowed to perform this operation.`, 403);
  }
  // console.log();

  const eventData: EmailEventData = JSON.parse(event.body);
  let success: { email: string; status: string; date: number }[] = [];
  let fail: { email: string; status: string; date: number }[] = [];

  for (let i = 0; i < eventData.data.length; i++) {
    const em = eventData.data[i];
    const emR: EmailData = {
      data: em,
      from: eventData.from,
      html: eventData.html,
      subject: eventData.subject,
      attachments: eventData.attachments,
      bcc: eventData.bcc,
    };
    console.log(i, emR);
    try {
      const sts: string = await processEmailRequest(emR, true);
      success.push({
        email: em.email,
        status: sts,
        date: new Date().getTime(),
      });
      console.log({
        email: em.email,
        status: sts,
        date: new Date().getTime(),
      });
    } catch (error) {
      console.log(`Error sending to ${em.email}: ${error}`);
      fail.push({
        email: em.email,
        status: `Error on send: ${error}`,
        date: new Date().getTime(),
      });
    }
  }

  if (fail.length === 0) {
    return Responses._200(
      "Full Emails result. (Object type -> { email: string; status: string; date: number(milis) }[])",
      { statusCode: 200, result: success }
    );
  } else {
    return Responses._200(
      "Partial Emails result. (Object type -> { email: string; status: string; date: number(milis) }[])",
      { statusCode: 206, result: success, fail },
      206
    );
  }
};
