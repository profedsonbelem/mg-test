import { applyMaps } from "../misc/object.utils";
import { Vehicle__c as Vehicle } from "../../types/Vehicle__c";
import { Answer } from "../../types/surveyAnswer";
import * as moment from "moment";

const map: { [att: string]: (vehicle: Vehicle) => Answer } = {
  pay_your_deposit_credit_card: (vehicle) => {
    if (!vehicle.Pay_deposit_using_credit_card__c) {
      return undefined;
    }

    return {
      answer: vehicle.Pay_deposit_using_credit_card__c === "Yes",
      questionId: "pay_your_deposit_credit_card",
      isFile: false,
    };
  },
  your_credit_card_provider: (vehicle) => {
    if (!vehicle.Credit_card_provider__c) {
      return undefined;
    }

    return {
      answer: vehicle.Credit_card_provider__c,
      questionId: "your_credit_card_provider",
      isFile: false,
    };
  },
  is_this_the_correct_vehicle_yes_or_no: (vehicle) => {
    if (!vehicle.Is_this_the_correct_vehicle__c) {
      return undefined;
    }

    return {
      answer: vehicle.Is_this_the_correct_vehicle__c === "Yes",
      questionId: "is_this_the_correct_vehicle_yes_or_no",
      isFile: false,
    };
  },
  vehicle_letter_received: (vehicle) => {
    if (!vehicle.Vehicle_Letter_Recieved__c) {
      return undefined;
    }

    return {
      answer: vehicle.Vehicle_Letter_Recieved__c === "Yes",
      questionId: "vehicle_letter_received",
      isFile: false,
    };
  },
  vehicle_original_registration_number: (vehicle) => {
    if (!vehicle.Original_Vehicle_Registration__c) {
      return undefined;
    }

    return {
      answer: vehicle.Original_Vehicle_Registration__c,
      questionId: "vehicle_original_registration_number",
      isFile: false,
      additionalInfo: {},
    };
  },
  vehicle_current_registration_number: (vehicle) => {
    if (!vehicle.Current_Vehicle_Registration__c) {
      return undefined;
    }

    return {
      answer: vehicle.Current_Vehicle_Registration__c,
      questionId: "vehicle_current_registration_number",
      isFile: false,
    };
  },
  vehicle_still_own: (vehicle) => {
    if (!vehicle.Still_owns_vehicle__c) {
      return undefined;
    }

    return {
      answer: vehicle.Still_owns_vehicle__c === "Yes",
      questionId: "vehicle_still_own",
      isFile: false,
    };
  },
  vehicle_disposition_mileage: (vehicle) => {
    if (!vehicle.Vehicle_Mileage__c) {
      return undefined;
    }

    return {
      answer: vehicle.Vehicle_Mileage__c,
      questionId: "vehicle_disposition_mileage",
      isFile: false,
    };
  },
  vehicle_purchase_method: (vehicle) => {
    if (!vehicle.How_was_the_vehicle_purchased__c) {
      return undefined;
    }

    let saAnswer: string;
    let litifyVehiclePurchased = vehicle.How_was_the_vehicle_purchased__c;
    switch (litifyVehiclePurchased) {
      case "Purchased Outright": {
        saAnswer = "purchased_outright";
        break;
      }
      case "Financed": {
        saAnswer = "financed";
        break;
      }
      case "Other": {
        saAnswer = "other";
        break;
      }
      default: {
        saAnswer = "other";
      }
    }

    if (!saAnswer) {
      return undefined;
    }

    return {
      answer: saAnswer,
      questionId: "vehicle_purchase_method",
      isFile: false,
    };
  },
  vehicle_purchased_outright_payment: (vehicle) => {
    if (!vehicle.Vehicle_Purchased_Outright_Payment__c) {
      return undefined;
    }

    let saAnswer: string;
    let litifyVehiclePurchasedOut =
      vehicle.Vehicle_Purchased_Outright_Payment__c;
    switch (litifyVehiclePurchasedOut) {
      case "Personal Bank Loan": {
        saAnswer = "personal_bank_loan";
        break;
      }
      case "Cash/Direct Debit": {
        saAnswer = "cash_or_direct_debit";
        break;
      }
      default: {
        // Nothing
      }
    }

    if (!saAnswer) {
      return undefined;
    }

    return {
      answer: saAnswer,
      questionId: "vehicle_purchased_outright_payment",
      isFile: false,
    };
  },
  vehicle_financed_payment: (vehicle) => {
    if (!vehicle.Vehicle_Financed_Payment__c) {
      return undefined;
    }

    let saAnswer: string;
    let litifyVehicleFinanced = vehicle.Vehicle_Financed_Payment__c;
    switch (litifyVehicleFinanced) {
      case "Financed through Dealership": {
        saAnswer = "financed_through_dealership";
        break;
      }
      case "Financed through employer via Salary Sacrifice": {
        saAnswer = "financed_through_employer";
        break;
      }
      case "Other": {
        saAnswer = "other";
        break;
      }
      default: {
        //
      }
    }

    if (!saAnswer) {
      return undefined;
    }

    return {
      answer: saAnswer,
      questionId: "vehicle_financed_payment",
      isFile: false,
    };
  },
  vehicle_total_price: (vehicle) => {
    if (!vehicle.Buying_Price__c || !vehicle.Buying_Currency__c) {
      return undefined;
    }

    return {
      answer: `${vehicle.Buying_Currency__c} ${vehicle.Buying_Price__c}`,
      questionId: "vehicle_total_price",
      isFile: false,
    };
  },
  vehicle_part_exchanged_yes_or_no: (vehicle) => {
    if (!vehicle.Was_the_vehicle_part_exchanged__c) {
      return undefined;
    }

    let saAnswer: boolean;
    let litifyVehiclePartExchanged = vehicle.Was_the_vehicle_part_exchanged__c;
    switch (litifyVehiclePartExchanged) {
      case "Yes": {
        saAnswer = true;
        break;
      }
      case "No": {
        saAnswer = false;
        break;
      }
      default: {
        // Nothing
      }
    }

    if (!saAnswer) {
      return undefined;
    }

    return {
      answer: saAnswer,
      questionId: "vehicle_part_exchanged_yes_or_no",
      isFile: false,
    };
  },
  vehicle_part_exchanged_value: (vehicle) => {
    if (!vehicle.Value_Part_Exchanged__c) {
      return undefined;
    }

    return {
      answer: vehicle.Value_Part_Exchanged__c,
      questionId: "vehicle_part_exchanged_value",
      isFile: false,
    };
  },
  vehicle_purchased_new_or_second_hand: (vehicle) => {
    if (!vehicle.New_or_Secondhand__c) {
      return undefined;
    }

    let saAnswer: string;
    let newOrSecond = vehicle.New_or_Secondhand__c;
    switch (newOrSecond) {
      case "New": {
        saAnswer = "new";
        break;
      }
      case "Second Hand": {
        saAnswer = "second_hand";
        break;
      }
      default: {
        // Nothing
      }
    }

    if (!saAnswer) {
      return undefined;
    }

    return {
      answer: saAnswer,
      questionId: "vehicle_purchased_new_or_second_hand",
      isFile: false,
    };
  },
  vehicle_second_hand_mileage: (vehicle) => {
    if (!vehicle.Secondhand_mileage__c) {
      return undefined;
    }

    return {
      answer: vehicle.Secondhand_mileage__c,
      questionId: "vehicle_second_hand_mileage",
      isFile: false,
    };
  },
  vehicle_vendor_type: (vehicle) => {
    if (!vehicle.Vendor__c) {
      return undefined;
    }

    let saAnswer: string;
    let vendor = vehicle.Vendor__c;
    switch (vendor) {
      case "Dealership": {
        saAnswer = "dealership";
        break;
      }
      case "Private Seller": {
        saAnswer = "private_seller";
        break;
      }
      case "Auction": {
        saAnswer = "auction";
        break;
      }
      case "Other": {
        saAnswer = "other";
        break;
      }
      default: {
        saAnswer = "other";
      }
    }

    if (!saAnswer) {
      return undefined;
    }

    return {
      answer: saAnswer,
      questionId: "vehicle_vendor_type",
      isFile: false,
    };
  },
  vehicle_dealership_name_other: (vehicle) => {
    if (!vehicle.vehicle_dealership_name_other__c) {
      return undefined;
    }

    return {
      answer: vehicle.vehicle_dealership_name_other__c,
      questionId: "vehicle_dealership_name_other",
      isFile: false,
    };
  },
  vehicle_finance_agreement_date: (vehicle) => {
    if (!vehicle.Date_of_Finance_Agreement__c) {
      return undefined;
    }

    console.log("Doing date");
    const date = moment(vehicle.Date_of_Finance_Agreement__c)
      .utc()
      .format("DD/MM/YYYY");
    console.log(date);
    return {
      answer: date,
      questionId: "vehicle_finance_agreement_date",
      isFile: false,
    };
  },
  who_was_financial_creditor: (vehicle) => {
    if (!vehicle.Who_was_the_financial_creditor__c) {
      return undefined;
    }

    let saAnswer: string;
    let financialCred = vehicle.Who_was_the_financial_creditor__c;
    switch (financialCred) {
      case "Mercedes Benz Financial Services UK Limited": {
        saAnswer = "mercedes-benz";
        break;
      }
      case "Other": {
        saAnswer = "other";
        break;
      }
      default: {
        saAnswer = "other";
      }
    }

    if (!saAnswer) {
      return undefined;
    }

    return {
      answer: saAnswer,
      questionId: "who_was_financial_creditor",
      isFile: false,
    };
  },
  vehicle_other_aquiring_method: (vehicle) => {
    if (!vehicle.vehicle_other_aquiring_method__c) {
      return undefined;
    }

    return {
      answer: vehicle.vehicle_other_aquiring_method__c,
      questionId: "vehicle_other_aquiring_method",
      isFile: false,
    };
  },
  vehicle_type_of_agreement: (vehicle) => {
    if (!vehicle.Types_of_Agreement__c) {
      return undefined;
    }

    let saAnswer: string;
    let financialCred = vehicle.Types_of_Agreement__c;
    switch (financialCred) {
      case "Hire Purchase": {
        saAnswer = "hire_purchase";
        break;
      }
      case "PCP (Personal Contract Purchase)": {
        saAnswer = "pcp";
        break;
      }
      case "PCH (Personal Contract Hire)": {
        saAnswer = "pch";
        break;
      }
      case "Lease": {
        saAnswer = "lease";
        break;
      }
      case "Other": {
        saAnswer = "other";
        break;
      }
      default: {
        saAnswer = "other";
      }
    }

    if (!saAnswer) {
      return undefined;
    }

    return {
      answer: saAnswer,
      questionId: "vehicle_type_of_agreement",
      isFile: false,
    };
  },
  vehicle_financed_deposit_yes_or_no: (vehicle) => {
    if (!vehicle.vehicle_financed_deposit_yes_or_no__c) {
      return undefined;
    }

    let saAnswer: boolean;
    let vehicleFinancedDeposit = vehicle.vehicle_financed_deposit_yes_or_no__c;
    switch (vehicleFinancedDeposit) {
      case "Yes": {
        saAnswer = true;
        break;
      }
      case "No": {
        saAnswer = false;
        break;
      }
      default: {
        // Nothing
      }
    }

    if (!saAnswer) {
      return undefined;
    }

    return {
      answer: saAnswer,
      questionId: "vehicle_financed_deposit_yes_or_no",
      isFile: false,
    };
  },
  sale_disposition_mileage: (vehicle) => {
    if (!vehicle.Mileage_at_Date_of_Sale_or_Disposition__c) {
      return undefined;
    }

    return {
      answer: vehicle.Mileage_at_Date_of_Sale_or_Disposition__c,
      questionId: "sale_disposition_mileage",
      isFile: false,
    };
  },
  sale_disposition_motivation: (vehicle) => {
    if (!vehicle.Sales_Disposition_Motivation__c) {
      return undefined;
    }

    let saAnswer: string;
    let saleDispositionMotivation = vehicle.Sales_Disposition_Motivation__c;
    switch (saleDispositionMotivation) {
      case "Part Exchanged": {
        saAnswer = "part_exchanged";
        break;
      }
      case "Sold": {
        saAnswer = "sold";
        break;
      }
      case "Written off": {
        saAnswer = "written_off";
        break;
      }
      case "Repossessed": {
        saAnswer = "repossessed";
        break;
      }
      case "Gifted": {
        saAnswer = "gifted";
        break;
      }
      case "Other": {
        saAnswer = "other";
        break;
      }
      default: {
        saAnswer = "other";
      }
    }

    if (!saAnswer) {
      return undefined;
    }

    return {
      answer: saAnswer,
      questionId: "sale_disposition_motivation",
      isFile: false,
    };
  },
  sale_disposition_part_exchanged_value: (vehicle) => {
    if (!vehicle.sale_disposition_part_exchanged_value__c) {
      return undefined;
    }

    return {
      answer: vehicle.sale_disposition_part_exchanged_value__c,
      questionId: "sale_disposition_part_exchanged_value",
      isFile: false,
    };
  },
  sale_disposition_part_exchanged_purchaser_nature: (vehicle) => {
    if (!vehicle.If_sold_nature_of_the_purchaser__c) {
      return undefined;
    }

    let saAnswer: string;
    let saleDispositionPartExchangedPurchase =
      vehicle.If_sold_nature_of_the_purchaser__c;
    switch (saleDispositionPartExchangedPurchase) {
      case "Dealership": {
        saAnswer = "dealership";
        break;
      }
      case "Private Seller": {
        saAnswer = "private_seller";
        break;
      }
      case "Auction": {
        saAnswer = "auction";
        break;
      }
      case "Other": {
        saAnswer = "other";
        break;
      }
      default: {
        saAnswer = "other";
      }
    }

    if (!saAnswer) {
      return undefined;
    }

    return {
      answer: saAnswer,
      questionId: "sale_disposition_part_exchanged_purchaser_nature",
      isFile: false,
    };
  },
  sale_disposition_balance_to_be_paid_yes_or_no: (vehicle) => {
    if (!vehicle.If_sold_is_there_an_outstanding_balance__c) {
      return undefined;
    }

    let saAnswer: boolean;
    let saleDispositiomBalanceToBePaid =
      vehicle.If_sold_is_there_an_outstanding_balance__c;
    switch (saleDispositiomBalanceToBePaid) {
      case "Yes": {
        saAnswer = true;
        break;
      }
      case "No": {
        saAnswer = false;
        break;
      }
      default: {
        // Nothing
      }
    }

    if (!saAnswer) {
      return undefined;
    }

    return {
      answer: saAnswer,
      questionId: "sale_disposition_balance_to_be_paid_yes_or_no",
      isFile: false,
    };
  },
  sale_disposition_balance_to_be_paid_price_received_value: (vehicle) => {
    if (!vehicle.sale_disposition_balance_to_be_paid_pric__c) {
      return undefined;
    }

    return {
      answer: vehicle.sale_disposition_balance_to_be_paid_pric__c,
      questionId: "sale_disposition_balance_to_be_paid_price_received_value",
      isFile: false,
    };
  },
};
export const vehicleToSuveyAnswer = (vehicle: Vehicle) => {
  return applyMaps<Vehicle>(vehicle, map);
};
