import * as usedFunctions from "../../src/endpoints/jumioAuthentication";
import * as axios from "axios";

const a: any = {};

function setVariables() {
  process.env.jumioUserAgent = "SPG Dev/1.0";
  process.env.jumioRegion = "EU";
  process.env.jumioAuthorization =
    "3703b0b8-84b6-4931-99ea-57ffc11ba6a6:cJeY6ZpffIDYCZjVJKWHW4a2nIbhMTw0";
  process.env.mongoUrl =
    "mongodb://microservices:lLyJv0rxkSm1JoIE@54.221.99.0:27017/microservicesdb";
  process.env.callbackUrl =
    "https://gjf191w7ib.execute-api.us-east-1.amazonaws.com/Development/api/jumioCallback";
}

async function sendRequest() {
  const result = await usedFunctions.authenticateDoc(
    {
      ...a,
      body: JSON.stringify({
        callbackUrl:
          "https://gjf191w7ib.execute-api.us-east-1.amazonaws.com/Development/api/jumioCallback",
      }),
      headers: {
        Authorization: "6a188e85-c84a-4797-ae66-023a72a4bef4",
      },
      httpMethod: "POST",
      isBase64Encoded: false,
      multiValueHeaders: {},
      multiValueQueryStringParameters: {},
      queryStringParameters: {},
      resource: "",
    },
    { ...a },
    (a) => {}
  );

  if (!result) {
    throw new Error("No result?");
  } else {
    return result;
  }
}

async function pollResult(transactionReference: string) {
  const result = await usedFunctions.getAuthenticationResult(
    {
      ...a,
      body: "",
      headers: {},
      httpMethod: "POST",
      isBase64Encoded: false,
      multiValueHeaders: {},
      multiValueQueryStringParameters: {},
      queryStringParameters: { transactionReference },
      resource: "",
    },
    { ...a },
    (a) => {}
  );

  if (!result) {
    throw new Error("No result?");
  }

  console.log(`Pool finished with status ${result.statusCode}`);
  if (result.statusCode != 200) {
    throw new Error(`Error in pool: ${result.body}`);
  }

  const done = JSON.parse(result.body).aditionalInfo.done;
  if (!done) {
    console.log(`Not done yet`);
  } else {
    console.log(`Done!`);
    console.log(result.body);
    process.exit(0);
  }
}

async function main() {
  //Set env variables
  setVariables();

  //Send request
  console.log("Sending request");
  const requestResult = await sendRequest();
  console.log(`Request finished with status ${requestResult.statusCode}`);
  if (requestResult.statusCode != 200) {
    throw new Error(`Error in request: ${requestResult.body}`);
  }
  const resultLink = JSON.parse(requestResult.body).aditionalInfo.link;
  console.log(`Jomio link: ${resultLink}`);
  const transactionReference = JSON.parse(requestResult.body).aditionalInfo
    .transactionReference;

  //Pool for result
  setInterval(() => {
    pollResult(transactionReference);
  }, 10000);
}

main();
