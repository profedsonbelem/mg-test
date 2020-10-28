import { APIGatewayProxyHandler } from "aws-lambda";
import { authorizeAdminToken } from "../common/auth";
import { Responses } from "../common/api.response";
import litify from "../../utils/database/litify.model";

export {
  createOne,
  queryRetrieve,
  soqlRetrieve,
  retrieveOne,
  updateOne,
  deleteOne,
};

const createOne: APIGatewayProxyHandler = async (event, _context) => {
  //Auth
  const authorizationResult = authorizeAdminToken(event);
  if (!authorizationResult.authorized) {
    return Responses._400(`Not allowed to perform this operation.`, 403);
  }

  let resource = event.pathParameters.resource;
  let data = JSON.parse(event.body);

  try {
    const createdId = await litify.create(resource, data);
    const createdObject = await litify.retrieve(resource, createdId);

    return Responses._200(
      `${resource} created: ${createdId}`,
      createdObject,
      201
    );
  } catch (error) {
    console.log("Error on litify create:", error);
    return Responses._500(`Error on litify create: ${error}`);
  }
};

const queryRetrieve: APIGatewayProxyHandler = async (event, _context) => {
  //Auth
  const authorizationResult = authorizeAdminToken(event);
  if (!authorizationResult.authorized) {
    return Responses._400(`Not allowed to perform this operation.`, 403);
  }

  let resource = event.pathParameters.resource;
  const query = JSON.parse(event.body || "{}");
  console.log("query", query);

  try {
    const data = await litify.queryFind(resource, query);

    if (!data || data.length === 0) {
      return Responses._400(`${resource} not found`, 404);
    } else {
      return Responses._200("Success", data);
    }
  } catch (error) {
    console.log(JSON.stringify(error));
    return Responses._500(`Error on litify queryRetrieve: ${error}`);
  }
};

const soqlRetrieve: APIGatewayProxyHandler = async (event, _context) => {
  //Auth
  const authorizationResult = authorizeAdminToken(event);
  if (!authorizationResult.authorized) {
    return Responses._400(`Not allowed to perform this operation.`, 403);
  }

  if (!event.queryStringParameters || !event.queryStringParameters.query) {
    return Responses._400("Bad request: mising query");
  }
  const query = event.queryStringParameters.query;
  console.log("query", query);

  try {
    const data = await litify.soqlFind(query);

    if (!data || data.length === 0) {
      return Responses._400(`Data not found`, 404);
    } else {
      return Responses._200("Success", data);
    }
  } catch (error) {
    console.log(JSON.stringify(error));
    return Responses._500(`Error on litify soqlRetrieve: ${error}`);
  }
};

const retrieveOne: APIGatewayProxyHandler = async (event, _context) => {
  //Auth
  const authorizationResult = authorizeAdminToken(event);
  if (!authorizationResult.authorized) {
    return Responses._400(`Not allowed to perform this operation.`, 403);
  }

  let resource = event.pathParameters.resource;
  const _id = event.pathParameters._id;

  try {
    const data = await litify.retrieve(resource, _id);

    if (!data) {
      return Responses._400(`${resource} not found`, 404);
    } else {
      return Responses._200(`Found ${resource} ${_id}`, data);
    }
  } catch (error) {
    console.log("error retrieveById", JSON.stringify(error));
    return Responses._500(`Error on litify retrieveOne: ${error}`);
  }
};

const updateOne: APIGatewayProxyHandler = async (event, _context) => {
  //Auth
  const authorizationResult = authorizeAdminToken(event);
  if (!authorizationResult.authorized) {
    return Responses._400(`Not allowed to perform this operation.`, 403);
  }

  let resource = event.pathParameters.resource;
  const update = JSON.parse(event.body);

  console.log("resource", resource);
  console.log("update", update);

  try {
    const updatedId = await litify.update(resource, update);
    const updatedObject = await litify.retrieve(resource, updatedId);
    return Responses._200(`${resource} ${updatedId} updated`, updatedObject);
  } catch (error) {
    console.log(JSON.stringify(error));
    return Responses._500(`Error on litify updateOne: ${error}`);
  }
};

const deleteOne: APIGatewayProxyHandler = async (event, _context) => {
  //Auth
  const authorizationResult = authorizeAdminToken(event);
  if (!authorizationResult.authorized) {
    return Responses._400(`Not allowed to perform this operation.`, 403);
  }

  let resource = event.pathParameters.resource;
  const _id = event.pathParameters._id;

  try {
    await litify.delete(resource, _id);

    return Responses._200(`${resource} deleted`);
  } catch (error) {
    console.log(JSON.stringify(error));
    return Responses._500(`Error on litify deleteOne: ${error}`);
  }
};
