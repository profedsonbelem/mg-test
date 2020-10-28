import { APIGatewayProxyHandler } from "aws-lambda";
import { Responses } from "./common/api.response";
import db from "../utils/database/db.model";
import { qualifyQuery } from "../utils/database/validators";
import { authorizeAdminToken, authorizeAdminOrJWT } from "./common/auth";

export { create, retrieve, retrieveById, update, deleteById, count };

const create: APIGatewayProxyHandler = async (event, _context) => {
  //Auth
  const authorizationResult = authorizeAdminToken(event);
  if (!authorizationResult.authorized) {
    return Responses._400(`Not allowed to perform this operation.`, 403);
  }

  console.log("[ENDPOINT crud] - create");
  let collection = event.pathParameters.collection;
  let data = JSON.parse(event.body);
  console.log(data);
  if (!Array.isArray(data)) {
    data = [data];
  }

  try {
    const created = await db.create(collection, data);

    return Responses._200(
      `${collection} created`,
      { insertedId: created.insertedIds },
      201
    );
  } catch (error) {
    console.log("ERROR - ", error);
    return Responses._500(`Mongo error. See logs for details: ${error}`);
  }
};

/** @todo implement projection */
const retrieve: APIGatewayProxyHandler = async (event, _context) => {
  //Auth
  const authorizationResult = authorizeAdminOrJWT(event);
  if (!authorizationResult.authorized) {
    return Responses._400(`Not allowed to perform this operation.`, 403);
  }

  let collection = event.pathParameters.collection;
  const query = JSON.parse(event.body || "{}");
  console.log("query", query);

  try {
    const qualifiedQuery = qualifyQuery(
      query,
      collection,
      authorizationResult.info
    );
    console.log(`Qualified query: ${JSON.stringify(qualifiedQuery)}`);
    const data = await db.retrieve(collection, qualifiedQuery);

    if (!data) {
      return Responses._400(`${collection} not found`, 404);
    } else {
      return Responses._200("Success", {
        data: JSON.stringify(data),
      });
    }
  } catch (error) {
    console.log(JSON.stringify(error));
    return Responses._500(`Mongo error. See logs for details: ${error}`);
  }
};

const retrieveById: APIGatewayProxyHandler = async (event, _context) => {
  //Auth
  const authorizationResult = authorizeAdminOrJWT(event);
  if (!authorizationResult.authorized) {
    return Responses._400(`Not allowed to perform this operation.`, 403);
  }

  let collection = event.pathParameters.collection;
  const _id = event.pathParameters._id;

  console.log("collec retrieve by id", collection);
  console.log("_id retrieve by id", _id);

  try {
    const qualifiedQuery = qualifyQuery(
      { _id },
      collection,
      authorizationResult.info
    );
    console.log(`Qualified query: ${JSON.stringify(qualifiedQuery)}`);
    const data = await db.retrieve(collection, qualifiedQuery);

    if (!data) {
      return Responses._200(
        `${collection} not found`,
        { requestedId: _id },
        204
      );
    } else {
      return Responses._200("Success", {
        data: JSON.stringify(data),
      });
    }
  } catch (error) {
    console.log("error retrieveById", JSON.stringify(error));
    return Responses._500(`Mongo error. See logs for details: ${error}`);
  }
};

const update: APIGatewayProxyHandler = async (event, _context) => {
  //Auth
  const authorizationResult = authorizeAdminOrJWT(event);
  if (!authorizationResult.authorized) {
    return Responses._400(`Not allowed to perform this operation.`, 403);
  }

  let collection = event.pathParameters.collection;
  const body = JSON.parse(event.body);
  const query = body.query || {};
  const update = body.update;

  console.log("collection", collection);
  console.log("query", query);
  console.log("update", update);

  try {
    const qualifiedQuery = qualifyQuery(
      query,
      collection,
      authorizationResult.info
    );
    console.log(`Qualified query: ${JSON.stringify(qualifiedQuery)}`);
    const updated = await db.update(collection, qualifiedQuery, update);

    return Responses._200("Questionnaire updated", {
      nUpdateds: updated.result.nModified,
    });
  } catch (error) {
    console.log(JSON.stringify(error));
    return Responses._500(`Mongo error. See logs for details: ${error}`);
  }
};

const deleteById: APIGatewayProxyHandler = async (event, _context) => {
  //Auth
  const authorizationResult = authorizeAdminToken(event);
  if (!authorizationResult.authorized) {
    return Responses._400(`Not allowed to perform this operation.`, 403);
  }

  let collection = event.pathParameters.collection;
  const _id = event.pathParameters._id;

  try {
    await db.deleteById(collection, _id);

    return Responses._200(`${collection} deleted`, {
      deletedId: _id,
    });
  } catch (error) {
    console.log(JSON.stringify(error));
    return Responses._500(`Mongo error. See logs for details: ${error}`);
  }
};

const count: APIGatewayProxyHandler = async (event, _context) => {
  //Auth
  const authorizationResult = authorizeAdminToken(event);
  if (!authorizationResult.authorized) {
    return Responses._400(`Not allowed to perform this operation.`, 403);
  }

  let collection = event.pathParameters.collection;
  const query = JSON.parse(event.body);
  console.log("query", query);

  try {
    const data = await db.count(collection, query);

    if (!data) {
      return Responses._400(`${collection} not found`, 404);
    } else {
      return Responses._200("Success", {
        count: data,
      });
    }
  } catch (error) {
    console.log(JSON.stringify(error));
    return Responses._500(`Mongo error. See logs for details: ${error}`);
  }
};
