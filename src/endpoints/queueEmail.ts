import { authorizeAdminToken } from "./common/auth";
import { Responses } from "./common/api.response";
import { EmailEventData } from "../types/email";
import { APIGatewayProxyHandler } from "aws-lambda";
import { addEmailToQueue } from "../modules/utils/addEmailToQueue";
import * as EmailValidator from "email-validator";

export const queueEmail: APIGatewayProxyHandler = async (event, _context) => {
  const authorizationResult = authorizeAdminToken(event);
  if (!authorizationResult.authorized) {
    return Responses._400(`Not allowed to perform this operation.`, 403);
  }

  if (!event.body) {
    return Responses._400(`Body is empty.`);
  }

  const eventData: EmailEventData = JSON.parse(event.body);

  if (!EmailValidator.validate(eventData.from)) {
    return Responses._400(`${eventData.from} is not a valid e-mail`);
  }

  const success: { email: string; status: string; date: number }[] = [];
  const fail: { email: string; status: string; date: number }[] = [];
  const error: { email: string; status: string; date: number }[] = [];

  let log: string | Error;
  for (let i = 0; i < eventData.data.length; i++) {
    if (!EmailValidator.validate(eventData.data[i].email)) {
      log = new Error(`${eventData.data[i].email} is invalid`);
    } else {
      log = await addEmailToQueue(eventData, eventData.data[i]);
    }

    if (
      log instanceof Error &&
      (log.message === `${eventData.data[i].email} on deny list` ||
        log.message === `${eventData.data[i].email} is invalid`)
    ) {
      fail.push({
        email: eventData.data[i].email,
        status: log.message,
        date: new Date().getTime(),
      });
    } else if (log instanceof Error) {
      error.push({
        email: eventData.data[i].email,
        status: log.message,
        date: new Date().getTime(),
      });
    } else {
      success.push({
        email: eventData.data[i].email,
        status: log,
        date: new Date().getTime(),
      });
    }
  }

  if (fail.length === 0 && error.length === 0) {
    return Responses._200("All the Emails sent to queue.", {
      success,
      fail,
      error,
    });
  } else if ((fail.length > 0 || error.length > 0) && success.length > 0) {
    return Responses._200(
      "Partial Emails sent to queue.",
      {
        success,
        fail,
        error,
      },
      206
    );
  } else if (success.length === 0 && (fail.length > 0 || error.length > 0)) {
    return Responses._400("Failed to send all the Emails to queue", 400, {
      success,
      fail,
      error,
    });
  } else {
    return Responses._500("Internal Server Error");
  }
};
