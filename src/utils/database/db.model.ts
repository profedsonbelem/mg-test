import { ConnectionMongo } from "./conn";
import { validateInsertion, validateUpdate } from "./validators";
import { FilterQuery } from "mongodb";

/** @todo create actual valitadion for data */
export default class db {
  static create = async (collection: string, data: any[], validate = true) => {
    if (validate) {
      const isValid = await validateInsertion(data, collection);
      if (!isValid) {
        throw new Error("Invalid data");
      }
    }

    console.log("trying to connect");

    const client = await ConnectionMongo.getConnection();
    if (!client.isConnected()) {
      console.log("Not connected!!");
    }
    console.log("getConnection OK");
    const created = await client
      .db()
      .collection(collection)
      .insertMany(data);

    console.log(`Creation result:`);
    console.log(created);

    return created;
  };

  static retrieve = async <T = any, R = T>(
    collection: string,
    query: any,
    projection?: { [field in keyof R]?: 1 },
    dataMap?: (data: R) => T,
    skip: number = 0,
    limit: number = 0
  ) => {
    try {
      console.log("Calling Retrieve ...");
      const client = await ConnectionMongo.getConnection();
      if (!client.isConnected()) {
        console.log("Not connected!!");
      }
      console.log("query here", query);
      let data: T[];
      if (!dataMap) {
        data = await client
          .db()
          .collection<T>(collection)
          .find(query, { projection })
          .skip(skip)
          .limit(limit)
          .toArray();
      } else {
        data = await client
          .db()
          .collection<R>(collection)
          .find(query, { projection })
          .skip(skip)
          .limit(limit)
          .map(dataMap)
          .toArray();
      }

      console.log("data find", data.length);

      return data;
    } catch (error) {
      throw error;
    }
  };

  static update = async (
    collection: string,
    query: any,
    update: any,
    validate = true,
    upsert = true
  ) => {
    try {
      if (validate) {
        const isValid = await validateUpdate(update, collection);
        if (!isValid) {
          throw new Error("Invalid update");
        }
      }

      const client = await ConnectionMongo.getConnection();
      if (!client.isConnected()) {
        console.log("Not connected!!");
      }

      console.log(`Upsert: ${upsert}`);

      const updated = await client
        .db()
        .collection(collection)
        .updateMany(query, update, { upsert });

      return updated;
    } catch (error) {
      console.log("error static update", error);
      throw error;
    }
  };

  static deleteById = async (collection: string, _id: string) => {
    const client = await ConnectionMongo.getConnection();
    if (!client.isConnected()) {
      console.log("Not connected!!");
    }

    return await client
      .db()
      .collection(collection)
      .deleteOne({ _id });
  };

  static deleteByQuery = async (collection: string, query: any) => {
    const client = await ConnectionMongo.getConnection();
    if (!client.isConnected()) {
      console.log("Not connected!!");
    }

    const deletionResult = await client
      .db()
      .collection(collection)
      .deleteMany(query);

    return deletionResult;
  };

  static count = async (collection: string, query: FilterQuery<any>) => {
    try {
      console.log("Calling Count ...");
      const client = await ConnectionMongo.getConnection();
      if (!client.isConnected()) {
        console.log("Not connected!!");
      }
      console.log("query here", query);
      const data = await client
        .db()
        .collection(collection)
        .countDocuments(query);

      console.log("count", data);

      return data;
    } catch (error) {
      console.log(`Error on count: ${error}`);
      throw error;
    }
  };

  static aggregate = async (collection: string, pipeline: any[]) => {
    try {
      console.log("Calling aggregate");
      const client = await ConnectionMongo.getConnection();
      if (!client.isConnected()) {
        console.log("Not connected!!");
        throw new Error("Client is not connected!");
      }

      console.log(`Pipeline: ${JSON.stringify(pipeline)}`);
      const data = await client
        .db()
        .collection(collection)
        .aggregate(pipeline)
        .toArray();

      return data;
    } catch (error) {
      console.log(`Error on aggregate: ${error}`);
    }
  };
}
