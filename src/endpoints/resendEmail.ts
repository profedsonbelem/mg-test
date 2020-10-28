import { APIGatewayProxyHandler } from "aws-lambda";
import db from "../utils/database/db.model";
import { processEmailRequest } from "../utils/email/send";
import { State } from "../types/state";
import { render } from "mustache";
import { mapAttributes } from "../utils/misc/object.utils";
import { Responses } from "./common/api.response";
import { Response } from "aws-sdk";
import { authorizeAdminToken } from "./common/auth";

type ResendEmailBody = {
  query: any;
  emailTemplate: {
    from: string;
    template: string;
    subject: string;
    templateMap: { [attInState: string]: string };
    attachments?: { name: string; data: string }[];
  };
};

/** @todo send attachments */
export const resendEmail: APIGatewayProxyHandler = async (event, _context) => {
  const authorizationResult = authorizeAdminToken(event);
  if (!authorizationResult.authorized) {
    return Responses._400(`Not allowed to perform this operation.`, 403);
  }

  try {
    const body: ResendEmailBody = JSON.parse(event.body);

    console.log(`Running ${JSON.stringify(body.query)}`);
    const states = await db.retrieve<State>("States", body.query);
    console.log(`Got ${states.length} states`);

    const succedded: string[] = [];
    const failed: { email: string; error: string }[] = [];
    await Promise.all(
      states.map(async (state) => {
        try {
          console.log(`Processing state ${state._id}`);
          const templateAttributes = mapAttributes(
            state,
            body.emailTemplate.templateMap
          );

          await processEmailRequest({
            attachments: body.emailTemplate.attachments || [],
            data: { email: state.intake.email },
            from: body.emailTemplate.from,
            html: render(body.emailTemplate.template, templateAttributes),
            subject: body.emailTemplate.subject,
          });
          succedded.push(state.intake.email);

          return true;
        } catch (error) {
          console.log(`Failed to send ${state.intake.email}: ${error}`);
          failed.push({ email: state.intake.email, error: `${error}` });

          return false;
        }
      })
    );

    if (failed.length > 0) {
      return Responses._200(`Partially sended`, { succedded, failed }, 207);
    }

    return Responses._200(`Sent ${states.length} emails`, succedded);
  } catch (error) {
    return Responses._500(`Internal server error: ${error}`);
  }
};
