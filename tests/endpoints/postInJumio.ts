import { postInJumio } from "../../src/modules/jumio/jumio";

async function main(token: string) {
  process.env.callbackUrl =
    "https://gjf191w7ib.execute-api.us-east-1.amazonaws.com/Development/api/jumioCallback";
  process.env.jumioUserAgent = "SPG Dev/1.0";
  process.env.jumioRegion = "EU";
  process.env.jumioAuthorization =
    "3703b0b8-84b6-4931-99ea-57ffc11ba6a6:cJeY6ZpffIDYCZjVJKWHW4a2nIbhMTw0";

  const response = await postInJumio(token);

  console.log(`Response: ${JSON.stringify(response)}`);
}

main(process.argv[2]);
