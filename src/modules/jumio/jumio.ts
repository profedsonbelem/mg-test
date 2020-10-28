import { APIGatewayProxyEvent } from "aws-lambda";
import db from "../../utils/database/db.model";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import * as querystring from "querystring";

interface JumioResponse {
  timestamp: string;
  redirectUrl: string;
  transactionReference: string;
}

interface InternalReference {
  customerInternalReference: string;
  userReference: string;
  callbackUrl: string;
}

/** @todo Specify fields */
interface JumioResult {
  [field: string]: any;
}

export interface JumioData {
  jumioResponse: JumioResponse;
  internalReference: InternalReference;
  jumioResult?: JumioResult;
}

/** @todo Understand customerInternalReference and userReference */
export async function postInJumio(userReference: string): Promise<JumioData> {
  const body = {
    customerInternalReference: getInternalReference(),
    userReference,
    callbackUrl: process.env.callbackUrl,
  };
  const headers = {
    Accept: "application/json",
    "Content-Type": " application/json",
    "Content-Length": JSON.stringify(body).length,
    Authorization: getJumioAuthorization(),
    "User-Agent": process.env.jumioUserAgent,
  };

  console.log(`Posting in Jumio: ${JSON.stringify(body)}`);
  console.log(`Using headers ${JSON.stringify(headers)}`);

  return axios
    .post(getRegionUrl(process.env.jumioRegion), body, { headers })
    .then((res) => {
      return { jumioResponse: res.data, internalReference: body };
    });
}

function getInternalReference() {
  return uuidv4();
}

function getJumioAuthorization() {
  return `Basic ${Buffer.from(process.env.jumioAuthorization).toString(
    "base64"
  )}`;
}

function getRegionUrl(region: string) {
  switch (region) {
    case "US": {
      console.log(`Url: https://netverify.com/api/v4/initiate`);
      return "https://netverify.com/api/v4/initiate";
    }
    case "EU": {
      console.log(`Url: https://lon.netverify.com/api/v4/initiate`);
      return "https://lon.netverify.com/api/v4/initiate";
    }
    case "SGP": {
      console.log(`Url: https://core-sgp.jumio.com/api/v4/initiate`);
      return "https://core-sgp.jumio.com/api/v4/initiate";
    }
    default:
      throw new Error(`Invalid Jumio region: ${region}`);
  }
}

/** @todo Develop futher validations */
export async function validateCallback(
  event: APIGatewayProxyEvent
): Promise<boolean> {
  //Validate IP
  const ipIsValid = validateIp(event.requestContext.identity.sourceIp);
  if (!ipIsValid) {
    return false;
  }

  return true;
}

function validateIp(ip: string) {
  console.log(`Receive ip: ${ip}`);
  const whiteList = getRegionWhiteList(process.env.jumioRegion);

  return whiteList.includes(ip);
}

function getRegionWhiteList(region: string) {
  switch (region) {
    case "US": {
      return [
        "34.202.241.227",
        "34.226.103.119",
        "34.226.254.127",
        "52.52.51.178",
        "52.53.95.123",
        "54.67.101.173",
      ];
    }
    case "EU": {
      return [
        "34.253.41.236",
        "35.157.27.193",
        "52.48.0.25",
        "52.57.194.92",
        "52.58.113.86",
        "52.209.180.134",
      ];
    }
    case "SGP": {
      return ["3.0.109.121", "52.76.184.73", "52.77.102.92"];
    }
    default:
      throw new Error(`Invalid Jumio region: ${region}`);
  }
}

export async function parseJumioData(
  event: APIGatewayProxyEvent
): Promise<JumioResult> {
  console.log(`Body: ${event.body}`);
  const parsedData = querystring.parse(event.body);

  return parsedData;
}

export async function savePostData(data: JumioData) {
  await db.create("JumioData", [data], false);
}

export async function updateJumioData(data: JumioResult) {
  await db.update(
    "JumioData",
    { "jumioResponse.transactionReference": data.jumioIdScanReference },
    { $set: { jumioResult: data } },
    false
  );
}

export async function getJumioData(transactionReference: string) {
  const jumioData: JumioData[] = await db.retrieve("JumioData", {
    "jumioResponse.transactionReference": transactionReference,
  });

  if (jumioData.length == 0) {
    throw new Error("Invalid transactionReference!");
  }

  return jumioData[0];
}

/** @todo Implement */
export async function emailJumioData(data: JumioResult) {
  console.log("emailJumioData wasn't implemented yet");
}
