import * as fs from "fs";

export function loadEnvVariables(envPath: string) {
  const envVariables = JSON.parse(fs.readFileSync(envPath).toString("utf8"));
  process.env = { ...process.env, ...envVariables };
}
