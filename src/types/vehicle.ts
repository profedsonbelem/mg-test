import { StringFilter } from "aws-sdk/clients/securityhub";
import { VEHICLE_STATUS } from "./status";

export interface Vehic {
  Id?: string;
  Claimant__c?: string;
  Vehicle__c?: string;
  Are_you_claiming_as_a_limited_company__c?: string;
  Selling_Price__c?: number;
  Sale_Currency__c?: string;
  Vehicle_Mileage__c?: number;
  Value_of_Part_Exchanged__c?: number;
  Secondhand_mileage__c?: number;
  vehicle_finance_agreement_date__c?: Date;
  sale_disposition_mileage__c?: number;
  sale_disposition_part_exchanged_value__c?: number;
  sale_disposition_balance_to_be_paid_pric__c?: number;
  Vehicle_text__c?: string;
  Original_Vehicle_Registration__c?: string;
  Current_Vehicle_Registration__c?: string;
  Vehicle_Financed_Payment__c?: string;
  Vehicle_Letter_Recieved__c?: string;
  Still_owns_vehicle__c?: string;
  Vendor__c?: string;
  How_was_the_vehicle_purchased__c?: string;
  Was_the_vehicle_part_exchanged__c?: string;
  New_or_Secondhand__c?: string;
  Vehicle_Purchased_Outright_Payment__c?: string;
  Authorised_Dealership__c?: string;
  vehicle_dealership_name_other__c?: string;
  details_of_finance_text__c?: string;
  who_was_financial_creditor__c?: string;
  vehicle_other_aquiring_method__c?: string;
  vehicle_type_of_agreement__c?: string;
  hire_purchase_explanation__c?: string;
  vehicle_financed_deposit_yes_or_no__c?: string;
  details_of_sale_or_disposition_text__c?: string;
  Sales_Disposition_Motivation__c?: string;
  sale_disposition_part_exchanged_purchase__c?: string;
  sale_disposition_balance_to_be_paid_yes__c?: string;
  Vehicle_Model__c?: string;
  Manufacturer__c?: string;
  VIN_Number__c?: string;
  Is_this_the_correct_vehicle__c?: string;
  Claimant_s_Role__c?: string;
  Business_Name__c?: string;
  Date_of_Finance_Agreement__c?: Date;
  Who_was_the_financial_creditor__c?: string;
  Did_you_pay_any_deposits_contributions__c?: string;
  Types_of_Agreement__c?: string;
  Mileage_at_Date_of_Sale_or_Disposition__c?: number;
  Why_is_vehicle_no_longer_in_possession__c?: string;
  Amount_used_for_part_exchange__c?: number;
  If_sold_nature_of_the_purchaser__c?: string;
  If_sold_is_there_an_outstanding_balance__c?: string;
  Vehicle_Status__c: VEHICLE_STATUS;
  Pay_deposit_using_credit_card__c?: string;
  Credit_card_provider__c?: string;
  Value_Part_Exchanged__c?: string;
}
