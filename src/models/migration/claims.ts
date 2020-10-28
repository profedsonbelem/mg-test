import { SurveyAnswer } from "../../types/surveyAnswer";
import { CounterModel } from "../counter.model";
import { ClaimStatus, Claim } from "../../types/migrationDB/claim";
import { mapAttributes, applyMaps } from "../../utils/misc/object.utils";

interface ClaimMigrationConfig {
  questId: string;
  tagPrefix: string;
  dbCollection: string;
  saMap: { [attributeInSA: string]: string };
  saFunctions: { [attributeInClaim: string]: (sa: SurveyAnswer) => any };
}

const migrationMaps: { [questId: string]: ClaimMigrationConfig } = {
  "test-mercedes": {
    questId: "test-mercedes",
    dbCollection: "MercedesClaim",
    tagPrefix: "MERC",
    saMap: {
      "answers.personal_details_text.answer": "personal_details_text",
      "answers.personal_limited_business.answer": "personal_limited_business",
      "answers.personal_business_name.answer": "personal_business_name",
      "answers.personal_company_role.answer": "personal_company_role",
      "answers.vehicle_original_registration_number.answer":
        "vehicle_original_registration_number",
      "answers.vehicle_current_registration_number.answer":
        "vehicle_current_registration_number",
      "answers.is_this_the_correct_vehicle_yes_or_no.answer":
        "is_this_the_correct_vehicle_yes_or_no",
      "answers.vehicle_letter_received.answer": "vehicle_letter_received",
      "answers.vehicle_still_own.answer": "vehicle_still_own",
      "answers.vehicle_disposition_mileage.answer":
        "vehicle_disposition_mileage",
      "answers.vehicle_purchase_method.answer": "vehicle_purchase_method",
      "answers.vehicle_purchased_outright_payment.answer":
        "vehicle_purchased_outright_payment",
      "answers.vehicle_financed_payment.answer": "vehicle_financed_payment",
      "answers.vehicle_total_price.answer": "vehicle_total_price",
      "answers.vehicle_part_exchanged_yes_or_no.answer":
        "vehicle_part_exchanged_yes_or_no",
      "answers.vehicle_part_exchanged_value.answer":
        "vehicle_part_exchanged_value",
      "answers.vehicle_purchased_new_or_second_hand.answer":
        "vehicle_purchased_new_or_second_hand",
      "answers.vehicle_second_hand_mileage.answer":
        "vehicle_second_hand_mileage",
      "answers.vehicle_vendor_type.answer": "vehicle_vendor_type",
      "answers.vehicle_dealership_name_other.answer":
        "vehicle_dealership_name_other",
      "answers.vehicle_finance_agreement_date.answer":
        "vehicle_finance_agreement_date",
      "answers.who_was_financial_creditor.answer": "who_was_financial_creditor",
      "answers.vehicle_other_aquiring_method.answer":
        "vehicle_other_aquiring_method",
      "answers.vehicle_type_of_agreement.answer": "vehicle_type_of_agreement",
      "answers.vehicle_financed_deposit_yes_or_no.answer":
        "vehicle_financed_deposit_yes_or_no",
      "answers.pay_your_deposit_credit_card.answer":
        "pay_your_deposit_credit_card",
      "answers.your_credit_card_provider.answer": "your_credit_card_provider",
      "answers.sale_disposition_mileage.answer": "sale_disposition_mileage",
      "answers.sale_disposition_motivation.answer":
        "sale_disposition_motivation",
      "answers.sale_disposition_part_exchanged_value.answer":
        "sale_disposition_part_exchanged_value",
      "answers.sale_disposition_part_exchanged_purchaser_nature.answer":
        "sale_disposition_part_exchanged_purchaser_nature",
      "answers.sale_disposition_balance_to_be_paid_yes_or_no.answer":
        "sale_disposition_balance_to_be_paid_yes_or_no",
      "answers.sale_disposition_balance_to_be_paid_price_received_value.answer":
        "sale_disposition_balance_to_be_paid_price_received_value",
    },
    saFunctions: {
      vehicle_manufacturer: (sa) => {
        if (!sa.answers.vehicle_original_registration_number) {
          return undefined;
        }

        try {
          const vehicleData = JSON.parse(
            sa.answers.vehicle_original_registration_number.additionalInfo
          );
          return vehicleData.APIData.VehicleRegistration.Make;
        } catch (error) {
          return undefined;
        }
      },
      vehicle_model: (sa) => {
        if (!sa.answers.vehicle_original_registration_number) {
          return undefined;
        }

        try {
          const vehicleData = JSON.parse(
            sa.answers.vehicle_original_registration_number.additionalInfo
          );
          return vehicleData.APIData.VehicleRegistration.Model;
        } catch (error) {
          return undefined;
        }
      },
      vin: (sa) => {
        if (!sa.answers.vehicle_original_registration_number) {
          return undefined;
        }

        try {
          const vehicleData = JSON.parse(
            sa.answers.vehicle_original_registration_number.additionalInfo
          );
          const vin = vehicleData.APIData.VehicleRegistration.Vin;

          if (vin.length === 17) {
            return vin;
          } else {
            return undefined;
          }
        } catch (error) {
          return undefined;
        }
      },
    },
  },
  mercedes: {
    questId: "mercedes",
    dbCollection: "MercedesClaim",
    tagPrefix: "MERC",
    saMap: {
      "answers.personal_details_text.answer": "personal_details_text",
      "answers.personal_limited_business.answer": "personal_limited_business",
      "answers.personal_business_name.answer": "personal_business_name",
      "answers.personal_company_role.answer": "personal_company_role",
      "answers.vehicle_original_registration_number.answer":
        "vehicle_original_registration_number",
      "answers.vehicle_current_registration_number.answer":
        "vehicle_current_registration_number",
      "answers.is_this_the_correct_vehicle_yes_or_no.answer":
        "is_this_the_correct_vehicle_yes_or_no",
      "answers.vehicle_letter_received.answer": "vehicle_letter_received",
      "answers.vehicle_still_own.answer": "vehicle_still_own",
      "answers.vehicle_disposition_mileage.answer":
        "vehicle_disposition_mileage",
      "answers.vehicle_purchase_method.answer": "vehicle_purchase_method",
      "answers.vehicle_purchased_outright_payment.answer":
        "vehicle_purchased_outright_payment",
      "answers.vehicle_financed_payment.answer": "vehicle_financed_payment",
      "answers.vehicle_total_price.answer": "vehicle_total_price",
      "answers.vehicle_part_exchanged_yes_or_no.answer":
        "vehicle_part_exchanged_yes_or_no",
      "answers.vehicle_part_exchanged_value.answer":
        "vehicle_part_exchanged_value",
      "answers.vehicle_purchased_new_or_second_hand.answer":
        "vehicle_purchased_new_or_second_hand",
      "answers.vehicle_second_hand_mileage.answer":
        "vehicle_second_hand_mileage",
      "answers.vehicle_vendor_type.answer": "vehicle_vendor_type",
      "answers.vehicle_dealership_name_other.answer":
        "vehicle_dealership_name_other",
      "answers.vehicle_finance_agreement_date.answer":
        "vehicle_finance_agreement_date",
      "answers.who_was_financial_creditor.answer": "who_was_financial_creditor",
      "answers.vehicle_other_aquiring_method.answer":
        "vehicle_other_aquiring_method",
      "answers.vehicle_type_of_agreement.answer": "vehicle_type_of_agreement",
      "answers.vehicle_financed_deposit_yes_or_no.answer":
        "vehicle_financed_deposit_yes_or_no",
      "answers.pay_your_deposit_credit_card.answer":
        "pay_your_deposit_credit_card",
      "answers.your_credit_card_provider.answer": "your_credit_card_provider",
      "answers.sale_disposition_mileage.answer": "sale_disposition_mileage",
      "answers.sale_disposition_motivation.answer":
        "sale_disposition_motivation",
      "answers.sale_disposition_part_exchanged_value.answer":
        "sale_disposition_part_exchanged_value",
      "answers.sale_disposition_part_exchanged_purchaser_nature.answer":
        "sale_disposition_part_exchanged_purchaser_nature",
      "answers.sale_disposition_balance_to_be_paid_yes_or_no.answer":
        "sale_disposition_balance_to_be_paid_yes_or_no",
      "answers.sale_disposition_balance_to_be_paid_price_received_value.answer":
        "sale_disposition_balance_to_be_paid_price_received_value",
    },
    saFunctions: {
      vehicle_manufacturer: (sa) => {
        if (!sa.answers.vehicle_original_registration_number) {
          return undefined;
        }

        try {
          const vehicleData = JSON.parse(
            sa.answers.vehicle_original_registration_number.additionalInfo
          );
          return vehicleData.APIData.VehicleRegistration.Make;
        } catch (error) {
          return undefined;
        }
      },
      vehicle_model: (sa) => {
        if (!sa.answers.vehicle_original_registration_number) {
          return undefined;
        }

        try {
          const vehicleData = JSON.parse(
            sa.answers.vehicle_original_registration_number.additionalInfo
          );
          return vehicleData.APIData.VehicleRegistration.Model;
        } catch (error) {
          return undefined;
        }
      },
      vin: (sa) => {
        if (!sa.answers.vehicle_original_registration_number) {
          return undefined;
        }

        try {
          const vehicleData = JSON.parse(
            sa.answers.vehicle_original_registration_number.additionalInfo
          );
          const vin = vehicleData.APIData.VehicleRegistration.Vin;

          if (vin.length === 17) {
            return vin;
          } else {
            return undefined;
          }
        } catch (error) {
          return undefined;
        }
      },
      status: (sa) => {
        if (!sa.statusAsClient) {
          return "ACTIVE";
        }

        switch (sa.statusAsClient) {
          case 0:
            return "ACTIVE";
            break;
          case 1:
            return "REQUESTED_CANCELLATION";
            break;
          case 2:
            return "CANCELLED";
            break;
          default:
            return "ACTIVE";
        }
      },
    },
  },
};

export class ClaimModel {
  static async createClaim(
    questId: string,
    sa: SurveyAnswer,
    clientId: string,
    lastModified: Date
  ): Promise<{ collection: string; claim: Claim }> {
    const config = migrationMaps[questId];
    if (!config) {
      throw { Message: "Invalid quest id" };
    }

    /** Generate _id */
    const counter = await CounterModel.getCounter(config.dbCollection);
    await CounterModel.updateCounter(config.dbCollection);
    const tag = `${config.tagPrefix}-0000000`;
    const strCounter = "" + counter.count;
    const _id = tag.substr(0, tag.length - strCounter.length) + strCounter;

    let status: ClaimStatus;
    /** pegar do survey */
    switch (sa.statusAsClient) {
      case 0:
        status = "ACTIVE";
        break;
      case 1:
        status = "REQUESTED_CANCELLATION";
        break;
      case 2:
        status = "CANCELLED";
        break;
      default:
        status = "ACTIVE";
    }

    return {
      collection: config.dbCollection,
      claim: {
        _id,
        claimTypeId: questId,
        clientId,
        lastModified,
        litifyId: undefined,
        status,
        ...mapAttributes(sa, config.saMap),
        ...applyMaps<SurveyAnswer>(sa, config.saFunctions),
      },
    };
  }

  static extractFromSurveyAnswers(surveyAnswers: SurveyAnswer) {
    const map = migrationMaps[surveyAnswers.questionnaireId];
    if (!map) {
      return undefined;
    }

    const simpleAttributes = mapAttributes(surveyAnswers, map.saMap);
    const otherAttributes = applyMaps<SurveyAnswer>(
      surveyAnswers,
      map.saFunctions
    );

    return { ...simpleAttributes, ...otherAttributes };
  }
}
