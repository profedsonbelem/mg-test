import { APIGatewayProxyHandler, AuthResponseContext } from "aws-lambda";

import { S3 } from "aws-sdk";
import { Responses } from "./common/api.response";
import { TokenPayload } from "../types/tokenPayload";
import { authorizeAdminOrJWT } from "./common/auth";

export type GetSignedUrlBody = {
  surveyId: string;
  surveyAnswer: string;
  questionId: string;
  md5: string;
  ext: string;
};

/** @todo change to get general signed url */
export const getSignedUrl: APIGatewayProxyHandler = async (event, _context) => {
  const authorizationResult = authorizeAdminOrJWT(event);
  if (!authorizationResult.authorized) {
    return Responses._400(`Not allowed to perform this operation.`, 403);
  }

  const data: GetSignedUrlBody = JSON.parse(event.body);
  const s3Path = `${process.env.clientDataBucket}/${data.surveyId}/${data.surveyAnswer}/${data.questionId}/${data.md5}.${data.ext}`;

  //Authorize request
  const allowed = authorize(data, authorizationResult.info);
  if (!allowed) {
    return Responses._400(`Not allowed to put in ${s3Path}`, 403);
  }

  try {
    //Get temporary credential
    console.log(`Trying to get signed url`);
    const s3 = new S3({ signatureVersion: "v4", region: "us-east-1" });

    const url = await s3.getSignedUrlPromise("putObject", {
      Bucket: `${process.env.clientDataBucket}`,
      Key: `${data.surveyId}/${data.surveyAnswer}/${data.questionId}/${data.md5}.${data.ext}`,
      Expires: 300,
    }); // tenta

    console.log(`Got url ${url}`);
    return Responses._200(`url created`, { url, s3Path }, 200);
  } catch (error) {
    console.log(`Error: ${error}`);
    return Responses._500(`Error, see logs for more information`);
  }
};

function authorize(data: GetSignedUrlBody, authContext?: AuthResponseContext) {
  if (!authContext) {
    console.log("No auth context");
    return false;
  }

  const targetFolder = data.surveyAnswer;
  const tokenPayload = authContext;

  if (!!tokenPayload.allowedAsAdmin) {
    console.log("Allowed as admin");
    return true;
  }

  return true;
  // const allowedFolder = tokenPayload.userId;

  // console.log(`Allowed if ${allowedFolder} === ${targetFolder}`);
  // return targetFolder === allowedFolder;
}
