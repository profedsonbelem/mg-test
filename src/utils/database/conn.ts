import { MongoClient } from "mongodb";
import { Connection } from "jsforce";
import db from "./db.model";

/** @todo properly properly instantiate and connect */
export class ConnectionMongo {
  private static connection: MongoClient;

  private static async createInstance() {
    try {
      // Connection settings
      const url = process.env.mongoUrl;

      // Create a new MongoClient
      ConnectionMongo.connection = new MongoClient(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      // Use connect method to connect to the Server
      console.log("Connecting to client");
      return ConnectionMongo.connection.connect();
    } catch (error) {
      throw error;
    }
  }

  /** Get a connected mongo client */
  static async getConnection() {
    if (!ConnectionMongo.connection) {
      console.log("Creating instance");
      await ConnectionMongo.createInstance();
    } else {
      console.log("Instace exists");
    }

    if (!ConnectionMongo.connection.isConnected()) {
      console.log("Not connected! Recreating instance");
      await ConnectionMongo.createInstance();
    } else {
      console.log("Is connected");
    }

    return ConnectionMongo.connection;
  }

  static async closeConnection() {
    if (!ConnectionMongo.connection) {
      console.log("No connection");
    } else {
      await ConnectionMongo.connection.close();
    }
  }
}

export class ConnectionLitify {
  private static connection: Connection;

  private static async createInstance() {
    try {
      const [token] = await db.retrieve<{
        accessToken: string;
        refreshToken: string;
      }>("Tokens", { _id: "Litify" });

      // Create a new LitifyClient
      ConnectionLitify.connection = new Connection({
        oauth2: {
          clientId: process.env.litifyClientId,
          clientSecret: process.env.litifyClientSecret,
          redirectUri: process.env.litifyRedirectUri,
        },
        instanceUrl: process.env.litifyInstanceUrl,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      });

      ConnectionLitify.connection.on("refresh", async function(
        accessToken,
        res
      ) {
        console.log("Refreshing token");
        await db.update(
          "Tokens",
          { _id: "Litify" },
          { $set: { accessToken } },
          false
        );
      });

      console.log(`Token: ${ConnectionLitify.connection.accessToken}`);
      console.log(ConnectionLitify.connection);
    } catch (error) {
      throw error;
    }
  }

  /** Get a connected litify client
   * @todo Connect only once
   */
  static async getConnection() {
    if (!ConnectionLitify.connection) {
      console.log("Creating instance");
      await ConnectionLitify.createInstance();
    } else {
      console.log("Instance exists");
    }

    return ConnectionLitify.connection;
  }
}
