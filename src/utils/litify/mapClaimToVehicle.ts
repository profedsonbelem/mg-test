import { MercedesClaim } from "../../types/migrationDB/mercedesClaim";
import { applyMaps } from "../misc/object.utils";
import { Vehicle__c as Vehicle } from "../../types/Vehicle__c";
// import * as moment from "moment";

const map: { [att in keyof Vehicle]?: (claim: MercedesClaim) => any } = {
  Pay_deposit_using_credit_card__c: (claim) => {
    if (claim.pay_your_deposit_credit_card === true) return "Yes";
    else if (claim.pay_your_deposit_credit_card === false) return "No";
    else return undefined;
  },
  Credit_card_provider__c: (claim) => claim.your_credit_card_provider,
  Buying_Price__c: (claim: MercedesClaim) => {
    if (!claim.vehicle_total_price) {
      return undefined;
    }

    const value = claim.vehicle_total_price.split(" ")[1];

    if (!!value) {
      return value.replace(/[^0-9\.]/g, "");
    } else {
      return undefined;
    }
  },
  Buying_Currency__c: (claim: MercedesClaim) => {
    if (!claim.vehicle_total_price) {
      return undefined;
    }

    const currency = claim.vehicle_total_price.split(" ")[0];

    return currency;
  },
  Vehicle_Mileage__c: (claim: MercedesClaim) =>
    claim.vehicle_disposition_mileage,
  Value_of_Part_Exchanged__c: (claim: MercedesClaim) => {
    if (!claim.vehicle_part_exchanged_value) {
      return undefined;
    }

    const value = claim.vehicle_part_exchanged_value.replace(/[^0-9\.]/g, "");

    const dotSplit = value.split(".");

    if (dotSplit.length > 2) {
      console.log(
        `This would throw an error in litify (too many .): ${value} (${claim.vehicle_part_exchanged_value})`
      );
      return undefined;
    }
    if (!!dotSplit[0] && dotSplit[0].length > 16) {
      console.log(
        `This would throw an error in litify (too many algarisms before .): ${value} (${claim.vehicle_part_exchanged_value})`
      );
      return undefined;
    }

    if (!!dotSplit[1] && dotSplit[1].length > 2) {
      console.log(
        `This would throw an error in litify (too many algarisms after .): ${value} (${claim.vehicle_part_exchanged_value})`
      );
      return undefined;
    }

    return value;
  },
  Value_Part_Exchanged__c: (claim: MercedesClaim) => {
    if (!claim.vehicle_part_exchanged_value) {
      return undefined;
    }

    return claim.vehicle_part_exchanged_value;
  },
  Secondhand_mileage__c: (claim: MercedesClaim) =>
    claim.vehicle_second_hand_mileage,
  vehicle_finance_agreement_date__c: (claim: MercedesClaim) => {
    try {
      const [dd, mm, yyyy] = claim.vehicle_finance_agreement_date.split("/");

      const date = new Date(`${yyyy}-${mm}-${dd}`);

      if (date instanceof Date && !isNaN(<any>date)) {
        return date;
      } else {
        return undefined;
      }
    } catch (error) {
      return undefined;
    }
  },
  sale_disposition_mileage__c: (claim: MercedesClaim) =>
    claim.sale_disposition_mileage,
  sale_disposition_part_exchanged_value__c: (claim: MercedesClaim) => {
    if (!claim.sale_disposition_part_exchanged_value) {
      return undefined;
    }

    return claim.sale_disposition_part_exchanged_value.replace(/[^0-9\.]/g, "");
  },
  sale_disposition_balance_to_be_paid_pric__c: (claim: MercedesClaim) => {
    if (!claim.sale_disposition_balance_to_be_paid_price_received_value) {
      return undefined;
    }

    return claim.sale_disposition_balance_to_be_paid_price_received_value.replace(
      /[^0-9\.]/g,
      ""
    );
  },
  Original_Vehicle_Registration__c: (claim: MercedesClaim) =>
    claim.vehicle_original_registration_number,
  Current_Vehicle_Registration__c: (claim: MercedesClaim) =>
    claim.vehicle_current_registration_number,
  Vehicle_Financed_Payment__c: (claim: MercedesClaim) => {
    if (claim.vehicle_financed_payment === "financed_through_dealership")
      return "Financed through Dealership";
    else if (claim.vehicle_financed_payment === "financed_through_employer")
      return "Financed through employer via Salary Sacrifice";
    else if (claim.vehicle_financed_payment === "other") return "Other";
    else return undefined;
  },
  Vehicle_Letter_Recieved__c: (claim: MercedesClaim) => {
    if (claim.vehicle_letter_received === true) return "Yes";
    else if (claim.vehicle_letter_received === false) return "No";
    else return undefined;
  },
  Still_owns_vehicle__c: (claim: MercedesClaim) => {
    if (claim.vehicle_still_own === true) return "Yes";
    else if (claim.vehicle_still_own === false) return "No";
    else return undefined;
  },
  Vendor__c: (claim: MercedesClaim) => {
    if (claim.vehicle_vendor_type === "dealership") return "Dealership";
    else if (claim.vehicle_vendor_type === "private_seller")
      return "Private Seller";
    else if (claim.vehicle_vendor_type === "auction") return "Auction";
    else if (claim.vehicle_vendor_type === "other") return "Other";
    else return undefined;
  },
  How_was_the_vehicle_purchased__c: (claim: MercedesClaim) => {
    if (claim.vehicle_purchase_method === "purchased_outright")
      return "Purchased Outright";
    else if (claim.vehicle_purchase_method === "financed") return "Financed";
    else if (claim.vehicle_purchase_method === "other") return "Other";
    else return undefined;
  },
  Was_the_vehicle_part_exchanged__c: (claim: MercedesClaim) => {
    if (claim.vehicle_part_exchanged_yes_or_no === true) return "Yes";
    else if (claim.vehicle_part_exchanged_yes_or_no === false) return "No";
    else return undefined;
  },
  New_or_Secondhand__c: (claim: MercedesClaim) => {
    if (claim.vehicle_purchased_new_or_second_hand === "new") return "New";
    else if (claim.vehicle_purchased_new_or_second_hand === "second_hand")
      return "Second Hand";
    else return undefined;
  },
  Vehicle_Purchased_Outright_Payment__c: (claim: MercedesClaim) => {
    if (claim.vehicle_purchased_outright_payment === "personal_bank_loan")
      return "Personal Bank Loan";
    else if (
      claim.vehicle_purchased_outright_payment === "cash_or_direct_debit"
    )
      return "Cash/Direct Debit";
    else return undefined;
  },
  vehicle_dealership_name_other__c: (claim: MercedesClaim) =>
    claim.vehicle_dealership_name_other,
  who_was_financial_creditor__c: (claim: MercedesClaim) => {
    if (claim.who_was_financial_creditor === "mercedes-benz")
      return "Mercedes Benz Financial Services UK Limited";
    else if (claim.who_was_financial_creditor === "other") return "Other";
    else return undefined;
  },
  vehicle_other_aquiring_method__c: (claim: MercedesClaim) =>
    claim.vehicle_other_aquiring_method,
  vehicle_type_of_agreement__c: (claim: MercedesClaim) => {
    if (claim.vehicle_type_of_agreement === "hire_purchase")
      return "Hire Purchase";
    else if (claim.vehicle_type_of_agreement === "pcp")
      return "PCP (Personal Contract Purchase)";
    else if (claim.vehicle_type_of_agreement === "pch")
      return "PCH (Personal Contract Hire)";
    else if (claim.vehicle_type_of_agreement === "lease") return "Lease";
    else if (claim.vehicle_type_of_agreement === "other") return "Other";
    else return undefined;
  },
  vehicle_financed_deposit_yes_or_no__c: (claim: MercedesClaim) => {
    if (claim.vehicle_financed_deposit_yes_or_no === true) return "Yes";
    else if (claim.vehicle_financed_deposit_yes_or_no === false) return "No";
    else return undefined;
  },
  Sales_Disposition_Motivation__c: (claim: MercedesClaim) => {
    if (claim.sale_disposition_motivation === "part_exchanged")
      return "Part Exchanged";
    else if (claim.sale_disposition_motivation === "sold") return "Sold";
    else if (claim.sale_disposition_motivation === "written_off")
      return "Written off";
    else if (claim.sale_disposition_motivation === "repossessed")
      return "Repossessed";
    else if (claim.sale_disposition_motivation === "gifted") return "Gifted";
    else if (claim.sale_disposition_motivation === "other") return "Other";
    else return undefined;
  },
  sale_disposition_part_exchanged_purchase__c: (claim: MercedesClaim) => {
    if (claim.sale_disposition_part_exchanged_purchaser_nature === "dealership")
      return "Dealership";
    else if (
      claim.sale_disposition_part_exchanged_purchaser_nature ===
      "private_seller"
    )
      return "Private Seller";
    else if (
      claim.sale_disposition_part_exchanged_purchaser_nature === "auction"
    )
      return "Auction";
    else if (claim.sale_disposition_part_exchanged_purchaser_nature === "other")
      return "Other";
    else return undefined;
  },
  sale_disposition_balance_to_be_paid_yes__c: (claim: MercedesClaim) => {
    if (claim.sale_disposition_balance_to_be_paid_yes_or_no === true)
      return "Yes";
    else if (claim.sale_disposition_balance_to_be_paid_yes_or_no === false)
      return "No";
    else return undefined;
  },
  Vehicle_Model__c: (claim: MercedesClaim) => claim.vehicle_model,
  Manufacturer__c: (claim: MercedesClaim) => claim.vehicle_manufacturer,
  VIN_Number__c: (claim: MercedesClaim) => claim.vin,
  Is_this_the_correct_vehicle__c: (claim: MercedesClaim) => {
    if (claim.is_this_the_correct_vehicle_yes_or_no === true) return "Yes";
    else if (claim.is_this_the_correct_vehicle_yes_or_no === false) return "No";
    else return undefined;
  },
  // Claimant_s_Role__c: (claim: MercedesClaim) => claim.personal_company_role,
  // Business_Name__c: (claim: MercedesClaim) => claim.personal_business_name,
  Date_of_Finance_Agreement__c: (claim: MercedesClaim) => {
    try {
      const [dd, mm, yyyy] = claim.vehicle_finance_agreement_date.split("/");

      const date = new Date(`${yyyy}-${mm}-${dd}`);

      if (date instanceof Date && !isNaN(<any>date)) {
        return date;
      } else {
        return undefined;
      }
    } catch (error) {
      return undefined;
    }
    return undefined;
  },
  Who_was_the_financial_creditor__c: (claim: MercedesClaim) => {
    if (claim.who_was_financial_creditor === "mercedes-benz")
      return "Mercedes Benz Financial Services UK Limited";
    else if (claim.who_was_financial_creditor === "other") return "Other";
    else return undefined;
  },
  Did_you_pay_any_deposits_contributions__c: (claim: MercedesClaim) => {
    if (claim.vehicle_financed_deposit_yes_or_no === true) return "Yes";
    else if (claim.vehicle_financed_deposit_yes_or_no === false) return "No";
    else return undefined;
  },
  Types_of_Agreement__c: (claim: MercedesClaim) => {
    if (claim.vehicle_type_of_agreement === "hire_purchase")
      return "Hire Purchase";
    else if (claim.vehicle_type_of_agreement === "pcp")
      return "PCP (Personal Contract Purchase)";
    else if (claim.vehicle_type_of_agreement === "pch")
      return "PCH (Personal Contract Hire)";
    else if (claim.vehicle_type_of_agreement === "lease") return "Lease";
    else if (claim.vehicle_type_of_agreement === "other") return "Other";
    else return undefined;
  },
  Mileage_at_Date_of_Sale_or_Disposition__c: (claim: MercedesClaim) =>
    claim.sale_disposition_mileage,
  // Why_is_vehicle_no_longer_in_possession__c: (claim: MercedesClaim) => {
  //   if (claim.sale_disposition_motivation === "part_exchanged")
  //     return "Part Exchanged";
  //   else if (claim.sale_disposition_motivation === "sold") return "Sold";
  //   else if (claim.sale_disposition_motivation === "written_off")
  //     return "Written off";
  //   else if (claim.sale_disposition_motivation === "repossessed")
  //     return "Repossessed";
  //   else if (claim.sale_disposition_motivation === "gifted") return "Gifted";
  //   else if (claim.sale_disposition_motivation === "other") return "Other";
  //   else return undefined;
  // },
  Amount_used_for_part_exchange__c: (claim: MercedesClaim) => {
    if (!claim.vehicle_part_exchanged_value) {
      return undefined;
    }

    return claim.vehicle_part_exchanged_value.replace(/[^0-9\.]/g, "");
  },
  If_sold_nature_of_the_purchaser__c: (claim: MercedesClaim) => {
    if (claim.sale_disposition_part_exchanged_purchaser_nature === "dealership")
      return "Dealership";
    else if (
      claim.sale_disposition_part_exchanged_purchaser_nature ===
      "private_seller"
    )
      return "Private Seller";
    else if (
      claim.sale_disposition_part_exchanged_purchaser_nature === "auction"
    )
      return "Auction";
    else if (claim.sale_disposition_part_exchanged_purchaser_nature === "other")
      return "Other";
    else return undefined;
  },
  If_sold_is_there_an_outstanding_balance__c: (claim: MercedesClaim) => {
    if (claim.sale_disposition_balance_to_be_paid_yes_or_no === true)
      return "Yes";
    else if (claim.sale_disposition_balance_to_be_paid_yes_or_no === false)
      return "No";
    else return undefined;
  },
  Vehicle_Status__c: (claim: MercedesClaim) => {
    if (claim.status === "ACTIVE") return "Open";
    else if (claim.status === "REQUESTED_CANCELLATION")
      return "Requested Closure";
    else if (claim.status === "CANCELLED") return "Closed";
    else return undefined;
  },
};
export const mapClaimToVehicle = (claim: MercedesClaim) => {
  return applyMaps<MercedesClaim>(claim, map);
};
