import { ConnectionLitify } from "../../utils/database/conn";
import { Vehicle__c as Vehicle } from "../../types/Vehicle__c";
import { Matter } from "../../types/matter";
import { Account } from "../../types/Account";

export async function getVehicleFromMatter(matterID: string) {
  const conn = await ConnectionLitify.getConnection();
  const getVehicle = {
    Pay_deposit_using_credit_card__c: 1, //ok
    Credit_card_provider__c: 1,
    Is_this_the_correct_vehicle__c: 1,
    Vehicle_Letter_Recieved__c: 1,
    Original_Vehicle_Registration__c: 1,
    Current_Vehicle_Registration__c: 1,
    Still_owns_vehicle__c: 1,
    Vehicle_Mileage__c: 1,
    How_was_the_vehicle_purchased__c: 1,
    Vehicle_Purchased_Outright_Payment__c: 1,
    Vehicle_Financed_Payment__c: 1,
    Buying_Price__c: 1,
    Buying_Currency__c: 1,
    Was_the_vehicle_part_exchanged__c: 1,
    Value_Part_Exchanged__c: 1,
    New_or_Secondhand__c: 1,
    Secondhand_mileage__c: 1,
    Vendor__c: 1,
    vehicle_dealership_name_other__c: 1,
    Date_of_Finance_Agreement__c: 1,
    Who_was_the_financial_creditor__c: 1,
    vehicle_other_aquiring_method__c: 1,
    Types_of_Agreement__c: 1,
    vehicle_financed_deposit_yes_or_no__c: 1,
    Mileage_at_Date_of_Sale_or_Disposition__c: 1,
    Sales_Disposition_Motivation__c: 1,
    sale_disposition_part_exchanged_value__c: 1,
    If_sold_nature_of_the_purchaser__c: 1,
    If_sold_is_there_an_outstanding_balance__c: 1,
    sale_disposition_balance_to_be_paid_pric__c: 1,
  };
  return conn
    .sobject("Vehicle__c")
    .find<Vehicle>({ Vehicle__c: matterID }, getVehicle)
    .execute({}, (err: Error, records) => {
      if (err) {
        return err;
      }
      return records;
    });
}

export async function getIDandStatusVehicleFromMatter(matterID: string) {
  const conn = await ConnectionLitify.getConnection();
  const getVehicle = {
    Id: 1,
    Vehicle_Status__c: 1,
  };
  return conn
    .sobject("Vehicle__c")
    .find<Vehicle>({ Vehicle__c: matterID }, getVehicle)
    .execute({}, (err: Error, records) => {
      if (err) {
        return err;
      }
      return records;
    });
}

export async function getMatterFromMatterID(matterID: string) {
  const conn = await ConnectionLitify.getConnection();
  const getMatter = {
    Personal_limited_business__c: 1,
    Personal_company_role__c: 1,
    Personal_Business_Name__c: 1,
    litify_pm__Client__c: 1,
  };
  return conn
    .sobject("litify_pm__Matter__c")
    .find<Matter>({ Id: matterID }, getMatter)
    .execute({}, (err: Error, records) => {
      if (err) {
        return err;
      }
      return records;
    });
}

export async function getAccountFromMatter(litify_pm__Client__c: string) {
  const conn = await ConnectionLitify.getConnection();
  const getAccount = {
    litify_pm__Email__c: 1,
    litify_pm__Phone_Mobile__c: 1,
    BillingStreet: 1,
    BillingCountry: 1,
    BillingCity: 1,
    BillingPostalCode: 1,
    litify_pm__Date_of_birth__c: 1,
    litify_pm__First_Name__c: 1,
    litify_pm__Last_Name__c: 1,
    litify_pm__Salutation__c: 1,
  };
  return conn
    .sobject("Account")
    .find<Account>({ Id: litify_pm__Client__c }, getAccount)
    .execute({}, (err: Error, records) => {
      if (err) {
        return err;
      }
      return records;
    });
}
