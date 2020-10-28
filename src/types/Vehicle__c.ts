/** @constant salesforceName Type name in salesforce */
export const salesforceName = "Vehicle__c";

/** @constant allFields All fields, comma separated.
 * As salesforce doesn't support 'SELECT *', use 'SELECT `${allFields}`'
 */
export const allFields =
  "Id, IsDeleted, Name, RecordTypeId, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, LastViewedDate, LastReferencedDate, Claimant__c, Manufacturer__c, Vehicle_Model__c, VIN_Number__c, Original_Vehicle_Registration__c, Registered_From__c, Registered_To__c, Claimant_Capacity__c, Claimant_s_Role__c, Causes_of_Action__c, Finance_Agreement_Provided__c, Date_of_Purchase__c, Date_of_Agreement__c, Payment_Made_After_1_10_2014__c, Amount_Financed__c, Authorised_Dealership__c, Technical_Measures_Applied__c, Vehicle_in_Claimant_s_Possession__c, Vehicle_Mileage__c, Claims_for_Alleged_Loss__c, Price_Paid__c, Part_Exchange__c, Value_of_part_Exchange__c, How_was_the_vehicle_purchased__c, Secondhand_mileage__c, Vendor__c, Vendor_Details__c, vehicle_dealership_name_other__c, Dealer_Trading_Name__c, Finance_Leasing_Agreement_on_File__c, Date_of_Finance_Agreement__c, Creditor__c, Type_of_Agreement__c, Deposits_Contributions_Discounts__c, Total_Value__c, Date_Technical_Measures_Applied__c, Name_of_Garage__c, Engine_Modified__c, Vehicle_Chipturned__c, Date_of_sale_or_disposition__c, Mileage_at_Date_of_Sale_or_Disposition__c, Why_is_vehicle_no_longer_in_possession__c, Selling_Price__c, Was_the_vehicle_part_exchanged__c, Value_of_Part_Exchanged__c, Nature_of_Purchaser__c, Insurance_Payment__c, No_Longer_in_Possession_Reason__c, Vehicle__c, Is_this_the_correct_vehicle__c, Vehicle_Letter_Recieved__c, Still_owns_vehicle__c, Vehicle_Purchased_Outright_Payment__c, Vehicle_Financed_Payment__c, Sale_Currency__c, New_or_Secondhand__c, Who_was_the_financial_creditor__c, Did_you_pay_any_deposits_contributions__c, Amount_used_for_part_exchange__c, If_sold_nature_of_the_purchaser__c, If_sold_is_there_an_outstanding_balance__c, If_other_name_of_financial_creditor__c, Approved_Dealer__c, details_of_finance_text__c, vehicle_finance_agreement_date__c, who_was_financial_creditor__c, vehicle_other_aquiring_method__c, vehicle_type_of_agreement__c, hire_purchase_explanation__c, vehicle_financed_deposit_yes_or_no__c, Current_Vehicle_Registration__c, details_of_sale_or_disposition_text__c, sale_disposition_mileage__c, sale_disposition_motivation__c, sale_disposition_part_exchanged_value__c, sale_disposition_part_exchanged_purchase__c, sale_disposition_balance_to_be_paid_yes__c, sale_disposition_balance_to_be_paid_pric__c, QuestionnaireId__c, Vehicle_text__c, Are_you_claiming_as_a_limited_company__c, Vehicle_Status__c, Pay_deposit_using_credit_card__c, Credit_card_provider__c, Business_Name__c, Types_of_Agreement__c, Sales_Disposition_Motivation__c, Value_Part_Exchanged__c, Buying_Price__c, Buying_Currency__c";

/** @interface Vehicle__c (labeled as Vehicle)
 * Check Vehicle__c.md for fields labels and relationship info.
 */
export interface Vehicle__c {
  /** Max length: 18. */
  Id?: string;
  IsDeleted?: boolean;
  /** Max length: 80 */
  Name?: string;
  /** Check RecordType relationship RecordType. */
  RecordTypeId?: any;
  CreatedDate?: Date;
  /** Check User relationship CreatedBy. */
  CreatedById?: any;
  LastModifiedDate?: Date;
  /** Check User relationship LastModifiedBy. */
  LastModifiedById?: any;
  SystemModstamp?: Date;
  /** YYYY-MM-DD */
  LastActivityDate?: string;
  LastViewedDate?: Date;
  LastReferencedDate?: Date;
  /** Check Account relationship Claimant__r. */
  Claimant__c?: any;
  Manufacturer__c?: Manufacturer__cType;
  Vehicle_Model__c?: Vehicle_Model__cType;
  /** Max length: 17 */
  VIN_Number__c?: string;
  /** Max length: 255 */
  Original_Vehicle_Registration__c?: string;
  /** YYYY-MM-DD */
  Registered_From__c?: string;
  /** YYYY-MM-DD */
  Registered_To__c?: string;
  Claimant_Capacity__c?: Claimant_Capacity__cType;
  /** Max length: 20 */
  Claimant_s_Role__c?: string;
  Causes_of_Action__c?: Causes_of_Action__cType[];
  Finance_Agreement_Provided__c?: boolean;
  /** YYYY-MM-DD */
  Date_of_Purchase__c?: string;
  /** YYYY-MM-DD */
  Date_of_Agreement__c?: string;
  Payment_Made_After_1_10_2014__c?: boolean;
  /** Max length: 16.2. */
  Amount_Financed__c?: number;
  /** Max length: 255 */
  Authorised_Dealership__c?: string;
  Technical_Measures_Applied__c?: Technical_Measures_Applied__cType;
  Vehicle_in_Claimant_s_Possession__c?: Vehicle_in_Claimant_s_Possession__cType;
  /** Max length: 10.0. */
  Vehicle_Mileage__c?: number;
  Claims_for_Alleged_Loss__c?: Claims_for_Alleged_Loss__cType[];
  /** YYYY-MM-DD */
  Price_Paid__c?: string;
  Part_Exchange__c?: Part_Exchange__cType;
  /** YYYY-MM-DD */
  Value_of_part_Exchange__c?: string;
  How_was_the_vehicle_purchased__c?: How_was_the_vehicle_purchased__cType;
  /** Max length: 10.0. */
  Secondhand_mileage__c?: number;
  Vendor__c?: Vendor__cType;
  /** Max length: 255. */
  Vendor_Details__c?: string;
  /** Max length: 255 */
  vehicle_dealership_name_other__c?: string;
  /** Max length: 255 */
  Dealer_Trading_Name__c?: string;
  Finance_Leasing_Agreement_on_File__c?: boolean;
  /** YYYY-MM-DD */
  Date_of_Finance_Agreement__c?: string;
  /** Check Account relationship Creditor__r. */
  Creditor__c?: any;
  Type_of_Agreement__c?: Type_of_Agreement__cType;
  Deposits_Contributions_Discounts__c?: Deposits_Contributions_Discounts__cType[];
  /** Max length: 16.2. */
  Total_Value__c?: number;
  /** YYYY-MM-DD */
  Date_Technical_Measures_Applied__c?: string;
  /** Max length: 255. */
  Name_of_Garage__c?: string;
  Engine_Modified__c?: Engine_Modified__cType;
  Vehicle_Chipturned__c?: Vehicle_Chipturned__cType;
  /** YYYY-MM-DD */
  Date_of_sale_or_disposition__c?: string;
  /** Max length: 10.0. */
  Mileage_at_Date_of_Sale_or_Disposition__c?: number;
  Why_is_vehicle_no_longer_in_possession__c?: Why_is_vehicle_no_longer_in_possession__cType;
  /** Max length: 16.2. */
  // Selling_Price__c?: number;
  Was_the_vehicle_part_exchanged__c?: Was_the_vehicle_part_exchanged__cType;
  /** Max length: 16.2. */
  Value_of_Part_Exchanged__c?: number;
  Nature_of_Purchaser__c?: Nature_of_Purchaser__cType;
  /** Max length: 16.2. */
  Insurance_Payment__c?: number;
  /** Max length: 255. */
  No_Longer_in_Possession_Reason__c?: string;
  /** Check litify_pm__Matter__c relationship Vehicle__r. */
  Vehicle__c?: any;
  Is_this_the_correct_vehicle__c?: Is_this_the_correct_vehicle__cType;
  Vehicle_Letter_Recieved__c?: Vehicle_Letter_Recieved__cType;
  Still_owns_vehicle__c?: Still_owns_vehicle__cType;
  Vehicle_Purchased_Outright_Payment__c?: Vehicle_Purchased_Outright_Payment__cType;
  Vehicle_Financed_Payment__c?: Vehicle_Financed_Payment__cType;
  /** Max length: 200 */
  // Sale_Currency__c?: string;
  New_or_Secondhand__c?: New_or_Secondhand__cType;
  Who_was_the_financial_creditor__c?: Who_was_the_financial_creditor__cType;
  Did_you_pay_any_deposits_contributions__c?: Did_you_pay_any_deposits_contributions__cType;
  /** Max length: 16.2. */
  Amount_used_for_part_exchange__c?: number;
  If_sold_nature_of_the_purchaser__c?: If_sold_nature_of_the_purchaser__cType;
  If_sold_is_there_an_outstanding_balance__c?: If_sold_is_there_an_outstanding_balance__cType;
  /** Max length: 255 */
  If_other_name_of_financial_creditor__c?: string;
  /** Max length: 255 */
  Approved_Dealer__c?: string;
  /** Max length: 255 */
  details_of_finance_text__c?: string;
  /** YYYY-MM-DD */
  vehicle_finance_agreement_date__c?: string;
  /** Max length: 255 */
  who_was_financial_creditor__c?: string;
  /** Max length: 255 */
  vehicle_other_aquiring_method__c?: string;
  /** Max length: 255 */
  vehicle_type_of_agreement__c?: string;
  /** Max length: 255 */
  hire_purchase_explanation__c?: string;
  vehicle_financed_deposit_yes_or_no__c?: vehicle_financed_deposit_yes_or_no__cType;
  /** Max length: 255 */
  Current_Vehicle_Registration__c?: string;
  /** Max length: 255 */
  details_of_sale_or_disposition_text__c?: string;
  /** Max length: 16.2. */
  sale_disposition_mileage__c?: number;
  /** Max length: 255 */
  sale_disposition_motivation__c?: string;
  /** Max length: 16.2. */
  sale_disposition_part_exchanged_value__c?: number;
  /** Max length: 255 */
  sale_disposition_part_exchanged_purchase__c?: string;
  sale_disposition_balance_to_be_paid_yes__c?: sale_disposition_balance_to_be_paid_yes__cType;
  /** Max length: 16.2. */
  sale_disposition_balance_to_be_paid_pric__c?: number;
  /** Max length: 25 */
  QuestionnaireId__c?: string;
  /** Max length: 255. */
  Vehicle_text__c?: string;
  Are_you_claiming_as_a_limited_company__c?: Are_you_claiming_as_a_limited_company__cType;
  Vehicle_Status__c?: Vehicle_Status__cType;
  Pay_deposit_using_credit_card__c?: Pay_deposit_using_credit_card__cType;
  /** Max length: 200 */
  Credit_card_provider__c?: string;
  /** Max length: 200 */
  Business_Name__c?: string;
  Types_of_Agreement__c?: Types_of_Agreement__cType;
  Sales_Disposition_Motivation__c?: Sales_Disposition_Motivation__cType;
  /** Max length: 200 */
  Value_Part_Exchanged__c?: string;
  /** Max length: 16.2. */
  Buying_Price__c?: number;
  /** Max length: 10 */
  Buying_Currency__c?: string;
}

export type Manufacturer__cType =
  | "Audi"
  | "BMW"
  | "Buick"
  | "Cadillac"
  | "Chevrolet"
  | "Chrysler"
  | "Dodge"
  | "Ferrari"
  | "Ford"
  | "GM"
  | "GEM"
  | "GMC"
  | "Honda"
  | "Hummer"
  | "Hyundai"
  | "Infiniti"
  | "Isuzu"
  | "Jaguar"
  | "Jeep"
  | "Kia"
  | "Lamborghini"
  | "Land Rover"
  | "Lexus"
  | "Lincoln"
  | "Lotus"
  | "Mazda"
  | "Mercedes-Benz"
  | "Mercury"
  | "Mitsubishi"
  | "Nissan"
  | "Oldsmobile"
  | "Peugeot"
  | "Pontiac"
  | "Porsche"
  | "Regal"
  | "Saab"
  | "Saturn"
  | "Subaru"
  | "Suzuki"
  | "Toyota"
  | "Volkswagen"
  | "Volvo";

export type Vehicle_Model__cType =
  | "Volkswagen Arteon"
  | "Volkswagen Arteon 4motion"
  | "Volkswagen Atlas"
  | "Volkswagen Atlas 4motion"
  | "Volkswagen Atlas Cross Sport"
  | "Volkswagen Atlas Cross Sport 4motion"
  | "Volkswagen Beetle"
  | "Volkswagen Beetle Convertible"
  | "Volkswagen Beetle Dune"
  | "Volkswagen Beetle Dune Convertible"
  | "Volkswagen Cabrio"
  | "Volkswagen Cabriolet"
  | "Volkswagen CC"
  | "Volkswagen CC 4motion"
  | "Volkswagen Corrado"
  | "Volkswagen Corrado SLC"
  | "Volkswagen e-Golf"
  | "Volkswagen Eos"
  | "Volkswagen Eurovan"
  | "Volkswagen Eurovan Camper"
  | "Volkswagen Fox"
  | "Volkswagen Fox GL Wagon"
  | "Volkswagen Fox Wagon"
  | "Volkswagen Golf"
  | "Volkswagen Golf/GTI"
  | "Volkswagen Golf Alltrack"
  | "Volkswagen Golf III"
  | "Volkswagen Golf III / GTI"
  | "Volkswagen Golf R"
  | "Volkswagen Golf SportWagen"
  | "Volkswagen Golf SportWagen 4motion"
  | "Volkswagen GTI"
  | "Volkswagen GTI/Golf GT"
  | "Volkswagen GTI 16v"
  | "Volkswagen GTI VR6"
  | "Volkswagen Jetta"
  | "Volkswagen Jetta GLI"
  | "Volkswagen Jetta GLI/Wolfsburg Edition"
  | "Volkswagen Jetta GLI 16v"
  | "Volkswagen Jetta GLX"
  | "Volkswagen Jetta Hybrid"
  | "Volkswagen Jetta III"
  | "Volkswagen Jetta III GLX"
  | "Volkswagen Jetta SportWagen"
  | "Volkswagen Jetta Wagon"
  | "Volkswagen New Beetle"
  | "Volkswagen New Beetle Convertible"
  | "Volkswagen New Golf"
  | "Volkswagen New GTI"
  | "Volkswagen New Jetta"
  | "Volkswagen Passat"
  | "Volkswagen Passat 4motion"
  | "Volkswagen Passat Syncro"
  | "Volkswagen Passat Wagon"
  | "Volkswagen Passat Wagon 4motion"
  | "Volkswagen Passat Wagon Syncro"
  | "Volkswagen Phaeton"
  | "Volkswagen Quantum"
  | "Volkswagen Quantum Syncro Wagon"
  | "Volkswagen Quantum Wagon"
  | "Volkswagen R32"
  | "Volkswagen Rabbit"
  | "Volkswagen Rabbit Convertible"
  | "Volkswagen Routan"
  | "Volkswagen Routan FWD"
  | "Volkswagen Scirocco"
  | "Volkswagen Scirocco 16v"
  | "Volkswagen Tiguan"
  | "Volkswagen Tiguan 4motion"
  | "Volkswagen Tiguan Limited"
  | "Volkswagen Tiguan Limited 4motion"
  | "Volkswagen Touareg"
  | "Volkswagen Touareg Hybrid"
  | "Volkswagen Vanagon/Camper 2WD"
  | "Volkswagen Vanagon 2WD"
  | "Volkswagen Vanagon Syncro 4WD"
  | "GLA 250 4MATIC SUV"
  | "GLB 250 4MATIC SUV"
  | "GLC 300 4MATIC SUV"
  | "GLCe 300 4MATIC"
  | "AMG GLC 43 4MATIC SUV"
  | "AMG GLC 63 S 4MATIC+ SUV"
  | "GLC 300 4MATIC Coupe"
  | "AMG GLC 43 4MATIC Coupe"
  | "AMG GLC 63 S 4MATIC+ Coupe"
  | "GLE 350 4MATIC SUV"
  | "GLE 450 4MATIC SUV"
  | "AMG GLE 53 4MATIC+ SUV"
  | "AMG GLE 43 4MATIC Coupe"
  | "AMG GLE 63 S 4MATIC Coupe"
  | "GLS 450 4MATIC SUV"
  | "GLS 580 4MATIC SUV"
  | "G 550 SUV"
  | "AMG G 63 SUV"
  | "A 250 4MATIC Hatch"
  | "AMG A 35 4MATIC Hatch"
  | "A 220 4MATIC Sedan"
  | "AMG A 35 4MATIC Sedan"
  | "C 300 4MATIC Sedan"
  | "AMG C 43 4MATIC Sedan"
  | "AMG C 63 Sedan"
  | "AMG C 63 S Sedan"
  | "E 350 4MATIC Sedan"
  | "E 450 4MATIC Sedan"
  | "AMG E 53 4MATIC + Sedan"
  | "AMG E 63 S 4MATIC+ Sedan"
  | "S 450 4MATIC Sedan (Short Wheelbase)"
  | "S 560 4MATIC Sedan (Short Wheelbase)"
  | "S 560 4MATIC Sedan (Long Wheelbase)"
  | "S 560e Sedan (Long Wheelbase)"
  | "AMG S 63 4MATIC+ Sedan"
  | "AMG S 65 Sedan"
  | "Mercedes-Maybach S 560 4MATIC Sedan"
  | "Mercedes-Maybach S 650 Sedan"
  | "C 300 4MATIC Wagon"
  | "AMG C 43 4MATIC Wagon"
  | "E 450 4MATIC Wagon"
  | "AMG E 53 4MATIC+ Wagon"
  | "AMG E 63 S 4MATIC Wagon"
  | "CLA 250 4MATIC Coupe"
  | "AMG CLA 35 Coupe"
  | "AMG CLA 45 Coupe"
  | "C 300 4MATIC Coupe"
  | "AMG C 43 4MATIC Coupe"
  | "AMG C 63 S Coupe"
  | "E 450 4MATIC Coupe"
  | "AMG E 53 4MATIC+ Coupe"
  | "CLS 450 4MATIC Coupe"
  | "AMG CLS 53 4MATIC+ Coupe"
  | "S 560 4MATIC Coupe"
  | "AMG S 63 4MATIC+ Coupe"
  | "AMG GT 53 4MATIC+ 4-Door Coupe"
  | "AMG GT 63 4MATIC+ 4-Door Coupe"
  | "AMG GT 63 S 4MATIC+ 4-Door Coupe"
  | "AMG GT C Coupe"
  | "AMG GT R Coupe"
  | "C 300 4MATIC Cabriolet"
  | "AMG C 43 4MATIC Cabriolet"
  | "AMG C 63 S Cabriolet"
  | "E 450 4MATIC Cabriolet"
  | "AMG E 53 4MATIC+ Cabriolet"
  | "S 560 Cabriolet"
  | "AMG S 63 4MATIC+ Cabriolet"
  | "SLC 300 Roadster"
  | "AMG SLC 43 Roadster"
  | "SL 450 Roadster"
  | "SL 550 Roadster"
  | "Mercedes-AMG GT C Roadster"
  | "GLC 350e 4MATIC";

export type Claimant_Capacity__cType = "1" | "2" | "3";

export type Causes_of_Action__cType =
  | "Deceit Claim (Sections E+J)"
  | "Deceit Claim (Sections J)"
  | "Stat Duty (Section K)"
  | "Contract Claim (Section L)"
  | "CPUT claim (Section M)"
  | "CCA (Section N)";

export type Technical_Measures_Applied__cType = "Yes" | "No";

export type Vehicle_in_Claimant_s_Possession__cType = "Yes" | "No";

export type Claims_for_Alleged_Loss__cType =
  | "Reduction in value"
  | "Additional fuel costs"
  | "Additional running costs"
  | "Distress";

export type Part_Exchange__cType = "Yes" | "No";

export type How_was_the_vehicle_purchased__cType =
  | "Purchased Outright"
  | "Financed"
  | "Other";

export type Vendor__cType =
  | "Dealership"
  | "Private Seller"
  | "Auction"
  | "Other";

export type Type_of_Agreement__cType =
  | "Hire Purchase"
  | "PCP (Personal Contract Purchase)"
  | "PCH (Personal Contract Hire)"
  | "Other";

export type Deposits_Contributions_Discounts__cType =
  | "Deposits"
  | "Contributions"
  | "Discounts";

export type Engine_Modified__cType = "Yes" | "No";

export type Vehicle_Chipturned__cType = "Yes" | "No";

export type Why_is_vehicle_no_longer_in_possession__cType =
  | "3"
  | "Part Exchanged"
  | "Sold"
  | "Written off"
  | "Repossessed"
  | "Gifted"
  | "Other";

export type Was_the_vehicle_part_exchanged__cType = "Yes" | "No";

export type Nature_of_Purchaser__cType = "1" | "2" | "3";

export type Is_this_the_correct_vehicle__cType = "Yes" | "No";

export type Vehicle_Letter_Recieved__cType = "Yes" | "No";

export type Still_owns_vehicle__cType = "Yes" | "No";

export type Vehicle_Purchased_Outright_Payment__cType =
  | "Personal Bank Loan"
  | "Cash/Direct Debit";

export type Vehicle_Financed_Payment__cType =
  | "Financed through Dealership"
  | "Financed through employer via Salary Sacrifice"
  | "Other";

export type New_or_Secondhand__cType = "New" | "Second Hand";

export type Who_was_the_financial_creditor__cType =
  | "Mercedes Benz Financial Services UK Limited"
  | "Other";

export type Did_you_pay_any_deposits_contributions__cType = "Yes" | "No";

export type If_sold_nature_of_the_purchaser__cType =
  | "Dealership"
  | "Private Seller"
  | "Auction"
  | "Other";

export type If_sold_is_there_an_outstanding_balance__cType = "Yes" | "No";

export type vehicle_financed_deposit_yes_or_no__cType = "Yes" | "No";

export type sale_disposition_balance_to_be_paid_yes__cType = "Yes" | "No";

export type Are_you_claiming_as_a_limited_company__cType = "Yes" | "No";

export type Vehicle_Status__cType = "Open" | "Requested Closure" | "Closed";

export type Pay_deposit_using_credit_card__cType = "Yes" | "No";

export type Types_of_Agreement__cType =
  | "Hire Purchase"
  | "PCP (Personal Contract Purchase)"
  | "PCH (Personal Contract Hire)"
  | "Lease"
  | "Other";

export type Sales_Disposition_Motivation__cType =
  | "Part Exchanged"
  | "Sold"
  | "Written off"
  | "Repossessed"
  | "Gifted"
  | "Other";
