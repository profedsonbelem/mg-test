import * as jwt from "jsonwebtoken";
import * as JwkToPem from "jwk-to-pem";
import { exit } from "process";

const jwk: JwkToPem.JWK[] = [
  {
    e: "AQAB",
    kty: "RSA",
    n:
      "lcjpPS08MkSlOPesc4ZF42pVS_rlwf6V2htL7q0Hy8dDJHwccDP-3AVA-MfKgXubCaKhCe1UthmxYfJF8oMIF6lq0090iXG4ECHGvJEvOpvCaH-JBHoHWYwpx2xcjgtKFikdDgrLB-qXmcQkNenyojFNTl-Mfj3Ui8gG9p9HO1UACqg1oqMJEF_pJIRi7QZy6j-UcWy5IgeENdpekjI-D6mABPoB2PLxXtYllD5_-raXLWROT5AKTHTIm3BPFYL5U6hpA5WsB7TEt4C589kmxqgbxeb9Fbv9mTutoxeSzr4hPmKeYo2tuGSwqffuMW18NbCa8JriUZu3eZxRwdvWAQ",
  },
  {
    e: "AQAB",
    kty: "RSA",
    n:
      "ia7iKljpzqRJ5kmPmoIoCdGsSuVDkZM-m-TEvy1wOYx3uOAiMUyzXRuozjwbvBzmIauAjwvvTF66-OlTgWDByp1vzbc9hk4PUzFVdx_UWXCicoy7kuTfEEQZBiMq2MM5NhVGLbP37RQvuqLZ0ln1ME59wdTDUNuh-cla3o_lockj3thUJGP1LcwWhLWVxQ1jELXDF-HeWBUzTjtyQdk8p3yA032-U3vYLvtq7Cc5Gt9tj9R0IkeSb3jOJ7ooHOpZ0kfVf8kiw3VG9DXPpwfs9akAIM5UAOYl4lL4nKqkCnBUvKrmRFMrSGTsDM9aFXHH5BQPc4QvU-DA9qtjd8m5RQ",
  },
];

export default async function decodeCognitoToken() {
  const token =
    // "eyJraWQiOiJBQ2dYU08rRCtQbW1QcUNCNDBSWlVoWDZJWDlOOUNXREN0eXZoWnc4anJRPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjYTJkYjI3NC1iOWY5LTRiNjYtYTI2YS0wYTQ0MWI2ZmZkNDgiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYWRkcmVzcyI6eyJmb3JtYXR0ZWQiOiJSdWEgU29sZC4gSnVsaW8gVmFzY29uY2Vsb3MgNjUsIFZpbGEgUGluaG8ifSwiYmlydGhkYXRlIjoiMTItMTItMTk5OCIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX0FyTHl2WDVQZCIsInBob25lX251bWJlcl92ZXJpZmllZCI6dHJ1ZSwiY29nbml0bzp1c2VybmFtZSI6ImNhMmRiMjc0LWI5ZjktNGI2Ni1hMjZhLTBhNDQxYjZmZmQ0OCIsImF1ZCI6IjNvZTRhZjRoamY4OXVkbW5qMmQ1MjBiYzNoIiwiZXZlbnRfaWQiOiI4YjE2NDE2Zi03NTZhLTRhNzAtYWUyYi1iMTFjNDkzZjRhOTEiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTYwMTQ3NzA3NCwibmFtZSI6IkNhaW8iLCJwaG9uZV9udW1iZXIiOiIrNTUzMTk5NTgyMjQ5NCIsImV4cCI6MTYwMTY3MzQ4MSwiaWF0IjoxNjAxNjY5ODgxLCJlbWFpbCI6ImNkb21pbmdvc0BtZ2dlc3RvZXMuY29tLmJyIn0.TfF0S8zYnbf4kQeaToeGOLO5WMISq3aWpMrnnQyzUAC6Q0F0gkSp5Y-hSrlNTGos9hEIPLEPiqiBmCI2fHYerLWgmxdg-mSMJCe8d9r3LwKJhJuPy6eb_uj_N4mJ6C5EfrUBc1djDD2jXlgKAxkd-9MbdXeCAsuep4X0UOv_P1GoIbughMXNkeVWoEYzNoiskgk4og4qVGIDVH9UN3q3cezfTJ4txxOAJpFnJLFp00Ch9fB0-y6a1l1sFD7e61SLq1F_rJE3CEXbfk_NmyYVzA4xZm8TAjJ_wJe2ODSosn5N4ceJPNCtel_b4eKnkJ-wFrhHuZ_fuLSe54n27xs5wQ";
    "eyJraWQiOiJBQ2dYU08rRCtQbW1QcUNCNDBSWlVoWDZJWDlOOUNXREN0eXZoWnc4anJRPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjYTJkYjI3NC1iOWY5LTRiNjYtYTI2YS0wYTQ0MWI2ZmZkNDgiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYWRkcmVzcyI6eyJmb3JtYXR0ZWQiOiJSdWEgU29sZC4gSnVsaW8gVmFzY29uY2Vsb3MgNjUsIFZpbGEgUGluaG8ifSwiYmlydGhkYXRlIjoiMTItMTItMTk5OCIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX0FyTHl2WDVQZCIsInBob25lX251bWJlcl92ZXJpZmllZCI6dHJ1ZSwiY29nbml0bzp1c2VybmFtZSI6ImNhMmRiMjc0LWI5ZjktNGI2Ni1hMjZhLTBhNDQxYjZmZmQ0OCIsImF1ZCI6IjNvZTRhZjRoamY4OXVkbW5qMmQ1MjBiYzNoIiwiZXZlbnRfaWQiOiJjNDJjNWRhNi02Yzk0LTQ3MTEtYWY4Yy0xM2NkNzgwOGU3OTYiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTYwMjAwNDYxNywibmFtZSI6IkNhaW8iLCJwaG9uZV9udW1iZXIiOiIrNTUzMTk5NTgyMjQ5NCIsImV4cCI6MTYwMjAwODIxNywiaWF0IjoxNjAyMDA0NjE4LCJlbWFpbCI6ImNkb21pbmdvc0BtZ2dlc3RvZXMuY29tLmJyIn0.Xl5iz_CxPXqPwXC03x85NxGcEz7DxHbKYNyGsn6lTmzgg9QAkrxfrDj3cdK28l8XQimTmFZZWfTDprja2abm9ySfQBItxaCsQELmqqItk8cNznqZv25XLl3XbuJ3na3Tc5_jo-mantFLa6ShuPMXBJMaEHSpCEzxLGDgLMInLlYDg1Ky1wMuYwfA1ygSURdoPNtQNSsOlwIl7OtGRh-gcOwtNHzP7S4liqFY0hW9rSf2KRW4AInl7qCztuQbW8tO8A8EXEIxjgjqmZrn0xZ9_7JgUTJsfXo_MG7osAHwwG5YPylyh4yXWWu1Hu3mRaqPz1_UaDQJDcdOUfBa54yAig";
  jwk.forEach((JWK) => {
    const pem = JwkToPem(JWK);
    jwt.verify(token, pem, { algorithms: ["RS256"] }, function(
      err,
      decodedToken
    ) {
      if (err) {
        console.log(`Error: ${err.message}\n`);
      } else {
        console.log(`Decoded token: ${JSON.stringify(decodedToken)}`);
        exit(0);
      }
    });
  });

  exit(0);
}

decodeCognitoToken();
