import { APIGatewayProxyHandler } from "aws-lambda";
import { Contact, ContactType } from "../types/contact";
import { ContactModel } from "../models/contact.model";
import { Responses } from "./common/api.response";
import db from "../utils/database/db.model";
import { authorizeIfAny } from "../modules/auth/core";
import litify from "../utils/database/litify.model";

/** @todo validate contact */
export const create: APIGatewayProxyHandler = async (event, _context) => {
  try {
    const authorizationResult = authorizeIfAny(event, [
      "validateAdminToken",
      "validateAgentToken",
    ]);
    if (!authorizationResult.authorized) {
      return Responses._400(`Not allowed to perform this operation.`, 403);
    }

    const contact: Contact = JSON.parse(event.body);

    console.log(`Trying to create ${JSON.stringify(contact)}`);
    const creationResult = await ContactModel.createContactInDb(contact);
    console.log(`Creation result: ${JSON.stringify(creationResult)}`);

    return Responses._200(
      `Success`,
      { insertedId: creationResult.insertedIds[0] },
      201
    );
  } catch (error) {
    console.log(`Internal server error: ${error}`);
    return Responses._500(`Internal server error: ${error}`);
  }
};

/** @todo validate contact */
export const update: APIGatewayProxyHandler = async (event, _context) => {
  try {
    const authorizationResult = authorizeIfAny(event, [
      "validateAdminToken",
      "validateAgentToken",
    ]);
    if (!authorizationResult.authorized) {
      return Responses._400(`Not allowed to perform this operation.`, 403);
    }

    const { id, contact }: { id: string; contact: Contact } = JSON.parse(
      event.body
    );

    console.log(`Trying to update ${id}: ${JSON.stringify(contact)}`);
    const updateResult = await ContactModel.updateContactInDb(id, contact);

    if (updateResult.modifiedCount === 0) {
      console.log(`No contact modified.`);
      return Responses._200(`No contact modified.`, { givenId: id }, 204);
    } else {
      console.log(`Update result: ${JSON.stringify(updateResult)}`);
      return Responses._200(`Success`, { givenId: id });
    }
  } catch (error) {
    console.log(`Internal server error: ${error}`);
    return Responses._500(`Internal server error: ${error}`);
  }
};

export const deleteContact: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  try {
    const authorizationResult = authorizeIfAny(event, [
      "validateAdminToken",
      "validateAgentToken",
    ]);
    if (!authorizationResult.authorized) {
      return Responses._400(`Not allowed to perform this operation.`, 403);
    }

    const id = event.pathParameters.id;

    ContactModel.deleteById(id);

    return Responses._200(`Success`, { deletedId: id });
  } catch (error) {
    console.log(`Internal server error: ${error}`);
    return Responses._500(`Internal server error: ${error}`);
  }
};

/** @todo retrieve from litify */
export const list: APIGatewayProxyHandler = async (event, _context) => {
  return Responses._500("Endpoint in maintance.", 503);

  // try {
  //   const authorizationResult = authorizeIfAny(event, [
  //     "validateAdminToken",
  //     "validateAgentToken",
  //   ]);
  //   if (!authorizationResult.authorized) {
  //     return Responses._400(`Not allowed to perform this operation.`, 403);
  //   }

  //   const query = JSON.parse(event.body);
  //   const fields = event.queryStringParameters;

  //   console.log(
  //     `Running query ${JSON.stringify(query)}, expecting fields: ${fields}`
  //   );
  //   const listedContacts = await ContactModel.listContacts(query, fields);

  //   if (listedContacts.length === 0) {
  //     console.log(`Didn't find any contact with query ${query}`);
  //     return Responses._200(
  //       `Didn't find any contact with query ${query}`,
  //       undefined,
  //       204
  //     );
  //   } else {
  //     console.log(`Found ${listedContacts.length} contacts`);
  //     return Responses._200(`Success`, listedContacts);
  //   }
  // } catch (error) {
  //   console.log(`Internal server error: ${error}`);
  //   return Responses._500(`Internal server error: ${error}`);
  // }
};

export const details: APIGatewayProxyHandler = async (event, _context) => {
  try {
    const authorizationResult = authorizeIfAny(event, [
      "validateAdminToken",
      "validateAgentToken",
    ]);
    if (!authorizationResult.authorized) {
      return Responses._400(`Not allowed to perform this operation.`, 403);
    }

    const clientId = event.queryStringParameters.clientId;
    const email = event.queryStringParameters.email;

    console.log(`Getting details for ${clientId} and ${email}`);
    const detailsFound = await ContactModel.getDetails(clientId, email);

    if (detailsFound.length == 0) {
      console.log(
        `Didn't find any contact with clientId ${clientId} or email ${email}`
      );
      return Responses._200(
        `No contact with clientId ${clientId} or email ${email}`,
        []
      );
    } else {
      console.log(`Found: ${detailsFound.length} contacts`);
      return Responses._200(`Success`, detailsFound);
    }
  } catch (error) {
    console.log(`Internal server error: ${error}`);
    return Responses._500(`Internal server error: ${error}`);
  }
};
