import axios from "axios";
import { loadEnvVariables } from "./utils";
import * as qs from "querystring";
import db from "../utils/database/db.model";
import { ConnectionMongo } from "../utils/database/conn";

async function main(envPath: string, code: string) {
  loadEnvVariables(envPath);
  const body = {
    grant_type: "authorization_code",
    client_id: process.env.litifyClientId,
    client_secret: process.env.litifyClientSecret,
    redirect_uri: process.env.litifyRedirectUri,
    code,
  };
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const url = process.env.litifyRedirectUri.replace("callback", "token");
  const res = await axios
    .post(url, qs.stringify(body), { headers })
    .then(async (res) => {
      console.log(
        `New tokens: ${res.data.access_token} and ${res.data.refresh_token}`
      );
      const result = await db.update(
        "Tokens",
        { _id: "Litify" },
        {
          $set: {
            accessToken: res.data.access_token,
            refreshToken: res.data.refresh_token,
          },
        },
        false
      );

      console.log(result);

      ConnectionMongo.closeConnection();
    })
    .catch((err) => {
      console.log(err);
    });
}

main(process.argv[2], process.argv[3]);
