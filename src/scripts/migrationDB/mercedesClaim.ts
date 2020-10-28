// import { MercedesClaim } from "../../types/migrationDB/mercedesClaim";
// import { ClaimStatus } from "../../types/migrationDB/claim";
// import { CounterModel } from "../../models/counter.model";
// import { DataClient } from "../../types/migrationDB/dataClient";

// export default async function createMercedesClaim(
//   dataClient: DataClient,
//   clientId: string,
//   j: number,
//   lastModified: Date
// ): Promise<MercedesClaim> {
//   /** Generate _id */
//   const counter = await CounterModel.getCounter("MercedesClaim");
//   const tag = "MERC-0000000";
//   const strCounter = "" + counter.count;
//   const _id = tag.substr(0, tag.length - strCounter.length) + strCounter;

//   await CounterModel.updateCounter("MercedesClaim");

//   let status: ClaimStatus;
//   /** pegar do survey */
//   switch (dataClient.SurveyAnswers[j].statusAsClient) {
//     case 0:
//       status = "ACTIVE";
//       break;
//     case 1:
//       status = "REQUESTED_CANCELLATION";
//       break;
//     case 2:
//       status = "CANCELLED";
//       break;
//     default:
//       status = "ACTIVE";
//   }

//   return {
//     litifyId: null,
//     _id,
//     clientId,
//     claimTypeId: "test-merc",
//     status,
//     lastModified,
//     personal_details_text: dataClient.SurveyAnswers[j].answers
//       .personal_details_text
//       ? dataClient.SurveyAnswers[j].answers.personal_details_text.answer || null
//       : null,
//     personal_first_name: dataClient.first_name || null,
//     personal_surname: dataClient.surname || null,
//     contact_email: dataClient.email,
//     contact_phone: dataClient.phone || null,
//     personal_title: dataClient.SurveyAnswers[j].answers.personal_title
//       ? dataClient.SurveyAnswers[j].answers.personal_title.answer || null
//       : null,
//     personal_date_of_birth: dataClient.SurveyAnswers[j].answers
//       .personal_date_of_birth
//       ? dataClient.SurveyAnswers[j].answers.personal_date_of_birth.answer ||
//         null
//       : null,
//     personal_limited_business: dataClient.SurveyAnswers[j].answers
//       .personal_limited_business
//       ? dataClient.SurveyAnswers[j].answers.personal_limited_business.answer ||
//         null
//       : null,
//     personal_business_name: dataClient.SurveyAnswers[j].answers
//       .personal_business_name
//       ? dataClient.SurveyAnswers[j].answers.personal_business_name.answer ||
//         null
//       : null,
//     personal_company_role: dataClient.SurveyAnswers[j].answers
//       .personal_company_role
//       ? dataClient.SurveyAnswers[j].answers.personal_company_role.answer || null
//       : null,
//     vehicle_original_registration_number: dataClient.SurveyAnswers[j].answers
//       .vehicle_original_registration_number
//       ? dataClient.SurveyAnswers[j].answers.vehicle_original_registration_number
//           .answer || null
//       : null,
//     vehicle_current_registration_number: dataClient.SurveyAnswers[j].answers
//       .vehicle_current_registration_number
//       ? dataClient.SurveyAnswers[j].answers.vehicle_current_registration_number
//           .answer || null
//       : null,
//     is_this_the_correct_vehicle_yes_or_no: dataClient.SurveyAnswers[j].answers
//       .is_this_the_correct_vehicle_yes_or_no
//       ? dataClient.SurveyAnswers[j].answers
//           .is_this_the_correct_vehicle_yes_or_no.answer || null
//       : null,
//     vehicle_letter_received: dataClient.SurveyAnswers[j].answers
//       .vehicle_letter_received
//       ? dataClient.SurveyAnswers[j].answers.vehicle_letter_received.answer ||
//         null
//       : null,
//     vehicle_still_own: dataClient.SurveyAnswers[j].answers.vehicle_still_own
//       ? dataClient.SurveyAnswers[j].answers.vehicle_still_own.answer || null
//       : null,
//     vehicle_disposition_mileage: dataClient.SurveyAnswers[j].answers
//       .vehicle_disposition_mileage
//       ? dataClient.SurveyAnswers[j].answers.vehicle_disposition_mileage
//           .answer || null
//       : null,
//     vehicle_purchase_method: dataClient.SurveyAnswers[j].answers
//       .vehicle_purchase_method
//       ? dataClient.SurveyAnswers[j].answers.vehicle_purchase_method.answer ||
//         null
//       : null,
//     vehicle_purchased_outright_payment: dataClient.SurveyAnswers[j].answers
//       .vehicle_purchased_outright_payment
//       ? dataClient.SurveyAnswers[j].answers.vehicle_purchased_outright_payment
//           .answer || null
//       : null,
//     vehicle_financed_payment: dataClient.SurveyAnswers[j].answers
//       .vehicle_financed_payment
//       ? dataClient.SurveyAnswers[j].answers.vehicle_financed_payment.answer ||
//         null
//       : null,
//     vehicle_total_price: dataClient.SurveyAnswers[j].answers.vehicle_total_price
//       ? dataClient.SurveyAnswers[j].answers.vehicle_total_price.answer || null
//       : null,
//     vehicle_part_exchanged_yes_or_no: dataClient.SurveyAnswers[j].answers
//       .vehicle_part_exchanged_yes_or_no
//       ? dataClient.SurveyAnswers[j].answers.vehicle_part_exchanged_yes_or_no
//           .answer || null
//       : null,
//     vehicle_part_exchanged_value: dataClient.SurveyAnswers[j].answers
//       .vehicle_part_exchanged_value
//       ? dataClient.SurveyAnswers[j].answers.vehicle_part_exchanged_value
//           .answer || null
//       : null,
//     vehicle_purchased_new_or_second_hand: dataClient.SurveyAnswers[j].answers
//       .vehicle_purchased_new_or_second_hand
//       ? dataClient.SurveyAnswers[j].answers.vehicle_purchased_new_or_second_hand
//           .answer || null
//       : null,
//     vehicle_second_hand_mileage: dataClient.SurveyAnswers[j].answers
//       .vehicle_second_hand_mileage
//       ? dataClient.SurveyAnswers[j].answers.vehicle_second_hand_mileage
//           .answer || null
//       : null,
//     vehicle_vendor_type: dataClient.SurveyAnswers[j].answers.vehicle_vendor_type
//       ? dataClient.SurveyAnswers[j].answers.vehicle_vendor_type.answer || null
//       : null,
//     vehicle_dealership_name_other: dataClient.SurveyAnswers[j].answers
//       .vehicle_dealership_name_other
//       ? dataClient.SurveyAnswers[j].answers.vehicle_dealership_name_other
//           .answer || null
//       : null,
//     vehicle_finance_agreement_date: dataClient.SurveyAnswers[j].answers
//       .vehicle_finance_agreement_date
//       ? dataClient.SurveyAnswers[j].answers.vehicle_finance_agreement_date
//           .answer || null
//       : null,
//     who_was_financial_creditor: dataClient.SurveyAnswers[j].answers
//       .who_was_financial_creditor
//       ? dataClient.SurveyAnswers[j].answers.who_was_financial_creditor.answer ||
//         null
//       : null,
//     vehicle_other_aquiring_method: dataClient.SurveyAnswers[j].answers
//       .vehicle_other_aquiring_method
//       ? dataClient.SurveyAnswers[j].answers.vehicle_other_aquiring_method
//           .answer || null
//       : null,
//     vehicle_type_of_agreement: dataClient.SurveyAnswers[j].answers
//       .vehicle_type_of_agreement
//       ? dataClient.SurveyAnswers[j].answers.vehicle_type_of_agreement.answer ||
//         null
//       : null,
//     vehicle_financed_deposit_yes_or_no: dataClient.SurveyAnswers[j].answers
//       .vehicle_financed_deposit_yes_or_no
//       ? dataClient.SurveyAnswers[j].answers.vehicle_financed_deposit_yes_or_no
//           .answer || null
//       : null,
//     pay_your_deposit_credit_card: dataClient.SurveyAnswers[j].answers
//       .pay_your_deposit_credit_card
//       ? dataClient.SurveyAnswers[j].answers.pay_your_deposit_credit_card
//           .answer || null
//       : null,
//     your_credit_card_provider: dataClient.SurveyAnswers[j].answers
//       .your_credit_card_provider
//       ? dataClient.SurveyAnswers[j].answers.your_credit_card_provider.answer ||
//         null
//       : null,
//     sale_disposition_mileage: dataClient.SurveyAnswers[j].answers
//       .sale_disposition_mileage
//       ? dataClient.SurveyAnswers[j].answers.sale_disposition_mileage.answer ||
//         null
//       : null,
//     sale_disposition_motivation: dataClient.SurveyAnswers[j].answers
//       .sale_disposition_motivation
//       ? dataClient.SurveyAnswers[j].answers.sale_disposition_motivation.answer
//       : null,
//     sale_disposition_part_exchanged_value: dataClient.SurveyAnswers[j].answers
//       .sale_disposition_part_exchanged_value
//       ? dataClient.SurveyAnswers[j].answers
//           .sale_disposition_part_exchanged_value.answer || null
//       : null,
//     sale_disposition_part_exchanged_purchaser_nature: dataClient.SurveyAnswers[
//       j
//     ].answers.sale_disposition_part_exchanged_purchaser_nature
//       ? dataClient.SurveyAnswers[j].answers
//           .sale_disposition_part_exchanged_purchaser_nature.answer || null
//       : null,
//     sale_disposition_balance_to_be_paid_yes_or_no: dataClient.SurveyAnswers[j]
//       .answers.ssale_disposition_balance_to_be_paid_yes_or_no
//       ? dataClient.SurveyAnswers[j].answers
//           .ssale_disposition_balance_to_be_paid_yes_or_no.answer || null
//       : null,
//     sale_disposition_balance_to_be_paid_price_received_value: dataClient
//       .SurveyAnswers[j].answers
//       .sale_disposition_balance_to_be_paid_price_received_value
//       ? dataClient.SurveyAnswers[j].answers
//           .sale_disposition_balance_to_be_paid_price_received_value.answer ||
//         null
//       : null,
//     address_contact_house_name_number: dataClient.SurveyAnswers[j].answers
//       .address_contact_house_name_number
//       ? dataClient.SurveyAnswers[j].answers.address_contact_house_name_number
//           .answer || null
//       : null,
//     address_contact_street: dataClient.SurveyAnswers[j].answers
//       .address_contact_street
//       ? dataClient.SurveyAnswers[j].answers.address_contact_street.answer ||
//         null
//       : null,
//     address_contact_county: dataClient.SurveyAnswers[j].answers
//       .address_contact_county
//       ? dataClient.SurveyAnswers[j].answers.address_contact_county.answer ||
//         null
//       : null,
//     address_contact_town: dataClient.SurveyAnswers[j].answers
//       .address_contact_town
//       ? dataClient.SurveyAnswers[j].answers.address_contact_town.answer || null
//       : null,
//     address_contact_postcode: dataClient.SurveyAnswers[j].answers
//       .address_contact_postcode
//       ? dataClient.SurveyAnswers[j].answers.address_contact_postcode.answer ||
//         null
//       : null,
//     address_additionalInfo: dataClient.SurveyAnswers[j].answers
//       .address_additionalInfo
//       ? dataClient.SurveyAnswers[j].answers.address_additionalInfo.answer ||
//         null
//       : null,
//   };
// }
