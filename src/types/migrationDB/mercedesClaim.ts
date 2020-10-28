import { Claim } from "./claim";

export interface MercedesClaim extends Claim {
  personal_limited_business?: boolean;
  personal_business_name?: string;
  personal_company_role?: "director" | "officer" | "secretary" | "other";
  vehicle_original_registration_number?: string;
  vehicle_current_registration_number?: string;
  is_this_the_correct_vehicle_yes_or_no?: boolean;
  vehicle_letter_received?: boolean;
  vehicle_still_own?: boolean;
  vehicle_disposition_mileage?: Number;
  vehicle_purchase_method?: "purchased_outright" | "financed" | "other";
  vehicle_purchased_outright_payment?:
    | "personal_bank_loan"
    | "cash_or_direct_debit";
  vehicle_financed_payment?:
    | "financed_through_dealership"
    | "financed_through_employer"
    | "other";
  vehicle_total_price?: string;
  vehicle_part_exchanged_yes_or_no?: boolean;
  vehicle_part_exchanged_value?: string;
  vehicle_purchased_new_or_second_hand?: "new" | "second_hand";
  vehicle_second_hand_mileage?: Number;
  vehicle_vendor_type?: "dealership" | "private_seller" | "auction" | "other";
  vehicle_dealership_name_other?: string;
  vehicle_finance_agreement_date?: string;
  who_was_financial_creditor?: "mercedes-benz" | "other";
  vehicle_other_aquiring_method?: string;
  vehicle_type_of_agreement?:
    | "hire_purchase"
    | "pcp"
    | "pch"
    | "lease"
    | "other";
  vehicle_financed_deposit_yes_or_no?: boolean;
  pay_your_deposit_credit_card?: boolean;
  your_credit_card_provider?: string;
  sale_disposition_mileage?: Number;
  sale_disposition_motivation?:
    | "part_exchanged"
    | "sold"
    | "written_off"
    | "repossessed"
    | "gifted"
    | "other";
  sale_disposition_part_exchanged_value?: string;
  sale_disposition_part_exchanged_purchaser_nature?:
    | "dealership"
    | "private_seller"
    | "auction"
    | "other";
  sale_disposition_balance_to_be_paid_yes_or_no?: boolean;
  sale_disposition_balance_to_be_paid_price_received_value?: string;
  address_contact_house_name_number?: string;
  address_contact_street?: string;
  address_contact_county?: string;
  address_contact_town?: string;
  address_contact_postcode?: string;
  address_additionalInfo?: string;
  //Vehicle details
  vehicle_manufacturer?: string;
  vehicle_model?: string;
  vin?: string;
}
