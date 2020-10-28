import { Account } from "../../types/accounts";
import litify from "../database/litify.model";

export async function getAccountByEmailLitify(email: string, token: string) {
  const accounts = await litify.soqlFind<Account>(
    `SELECT Id FROM Account WHERE litify_pm__Email__c='${email.toLowerCase()}'`
  );

  return accounts;
}

export async function getAccountByPGMBMId(pgmbmId: string, token: string) {
  const accounts = await litify.soqlFind<Account>(
    `SELECT Id FROM Account WHERE PGMBM_ID__c='${pgmbmId}'`
  );

  return accounts;
}
