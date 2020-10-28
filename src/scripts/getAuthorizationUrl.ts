import { OAuth2 } from "jsforce";
import * as fs from "fs";

async function main(envVariablesFile: string) {
  //Adjust environment varibles
  const envVariables = JSON.parse(
    fs.readFileSync(envVariablesFile).toString("utf8")
  );
  process.env = { ...process.env, ...envVariables };

  const oauth = new OAuth2({
    clientId: process.env.litifyClientId,
    clientSecret: process.env.litifyClientSecret,
    redirectUri: process.env.litifyRedirectUri,
    loginUrl: process.env.litifyInstanceUrl,
  });

  const authLink = oauth.getAuthorizationUrl({
    scope: "full refresh_token offline_access",
  });

  console.log(`Auth link: ${authLink}`);
}

main(process.argv[2]);
