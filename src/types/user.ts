import { ObjectId } from "aws-sdk/clients/codecommit";

export interface User {
  _id: ObjectId;
  permissions: { [collection: string]: { [operation: string]: boolean } };
  token?: string;
}
