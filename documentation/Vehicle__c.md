#Vehicle__c 

 ## Fields 

| Label | API Name | Type | Length | Possible Choices |
| --- | --- | --- | --- | --- |
|Record ID|Id|id | 18 | |
|Deleted|IsDeleted|boolean | | |
|Vehicle Name|Name|string | 80 | |
|Record Type ID|RecordTypeId|reference | 18 | |
|Created Date|CreatedDate|datetime | | |
|Created By ID|CreatedById|reference | 18 | |
|Last Modified Date|LastModifiedDate|datetime | | |
|Last Modified By ID|LastModifiedById|reference | 18 | |
|System Modstamp|SystemModstamp|datetime | | |
|Last Activity Date|LastActivityDate|date | | |
|Last Viewed Date|LastViewedDate|datetime | | |
|Last Referenced Date|LastReferencedDate|datetime | | |
|Claimant|Claimant__c|reference | 18 | |
|Vehicle Manufacturer|Manufacturer__c|picklist | 255 | Audi(Audi)<br>BMW(BMW)<br>Buick(Buick)<br>Cadillac(Cadillac)<br>Chevrolet(Chevrolet)<br>Chrysler(Chrysler)<br>Dodge(Dodge)<br>Ferrari(Ferrari)<br>Ford(Ford)<br>GM(GM)<br>GEM(GEM)<br>GMC(GMC)<br>Honda(Honda)<br>Hummer(Hummer)<br>Hyundai(Hyundai)<br>Infiniti(Infiniti)<br>Isuzu(Isuzu)<br>Jaguar(Jaguar)<br>Jeep(Jeep)<br>Kia(Kia)<br>Lamborghini(Lamborghini)<br>Land Rover(Land Rover)<br>Lexus(Lexus)<br>Lincoln(Lincoln)<br>Lotus(Lotus)<br>Mazda(Mazda)<br>Mercedes-Benz(Mercedes-Benz)<br>Mercury(Mercury)<br>Mitsubishi(Mitsubishi)<br>Nissan(Nissan)<br>Oldsmobile(Oldsmobile)<br>Peugeot(Peugeot)<br>Pontiac(Pontiac)<br>Porsche(Porsche)<br>Regal(Regal)<br>Saab(Saab)<br>Saturn(Saturn)<br>Subaru(Subaru)<br>Suzuki(Suzuki)<br>Toyota(Toyota)<br>Volkswagen(Volkswagen)<br>Volvo(Volvo) |
|Vehicle Model|Vehicle_Model__c|picklist | 255 | Volkswagen Arteon(Volkswagen Arteon)<br>Volkswagen Arteon 4motion(Volkswagen Arteon 4motion)<br>Volkswagen Atlas(Volkswagen Atlas)<br>Volkswagen Atlas 4motion(Volkswagen Atlas 4motion)<br>Volkswagen Atlas Cross Sport(Volkswagen Atlas Cross Sport)<br>Volkswagen Atlas Cross Sport 4motion(Volkswagen Atlas Cross Sport 4motion)<br>Volkswagen Beetle(Volkswagen Beetle)<br>Volkswagen Beetle Convertible(Volkswagen Beetle Convertible)<br>Volkswagen Beetle Dune(Volkswagen Beetle Dune)<br>Volkswagen Beetle Dune Convertible(Volkswagen Beetle Dune Convertible)<br>Volkswagen Cabrio(Volkswagen Cabrio)<br>Volkswagen Cabriolet(Volkswagen Cabriolet)<br>Volkswagen CC(Volkswagen CC)<br>Volkswagen CC 4motion(Volkswagen CC 4motion)<br>Volkswagen Corrado(Volkswagen Corrado)<br>Volkswagen Corrado SLC(Volkswagen Corrado SLC)<br>Volkswagen e-Golf(Volkswagen e-Golf)<br>Volkswagen Eos(Volkswagen Eos)<br>Volkswagen Eurovan(Volkswagen Eurovan)<br>Volkswagen Eurovan Camper(Volkswagen Eurovan Camper)<br>Volkswagen Fox(Volkswagen Fox)<br>Volkswagen Fox GL Wagon(Volkswagen Fox GL Wagon)<br>Volkswagen Fox Wagon(Volkswagen Fox Wagon)<br>Volkswagen Golf(Volkswagen Golf)<br>Volkswagen Golf/GTI(Volkswagen Golf/GTI)<br>Volkswagen Golf Alltrack(Volkswagen Golf Alltrack)<br>Volkswagen Golf III(Volkswagen Golf III)<br>Volkswagen Golf III / GTI(Volkswagen Golf III / GTI)<br>Volkswagen Golf R(Volkswagen Golf R)<br>Volkswagen Golf SportWagen(Volkswagen Golf SportWagen)<br>Volkswagen Golf SportWagen 4motion(Volkswagen Golf SportWagen 4motion)<br>Volkswagen GTI(Volkswagen GTI)<br>Volkswagen GTI/Golf GT(Volkswagen GTI/Golf GT)<br>Volkswagen GTI 16v(Volkswagen GTI 16v)<br>Volkswagen GTI VR6(Volkswagen GTI VR6)<br>Volkswagen Jetta(Volkswagen Jetta)<br>Volkswagen Jetta GLI(Volkswagen Jetta GLI)<br>Volkswagen Jetta GLI/Wolfsburg Edition(Volkswagen Jetta GLI/Wolfsburg Edition)<br>Volkswagen Jetta GLI 16v(Volkswagen Jetta GLI 16v)<br>Volkswagen Jetta GLX(Volkswagen Jetta GLX)<br>Volkswagen Jetta Hybrid(Volkswagen Jetta Hybrid)<br>Volkswagen Jetta III(Volkswagen Jetta III)<br>Volkswagen Jetta III GLX(Volkswagen Jetta III GLX)<br>Volkswagen Jetta SportWagen(Volkswagen Jetta SportWagen)<br>Volkswagen Jetta Wagon(Volkswagen Jetta Wagon)<br>Volkswagen New Beetle(Volkswagen New Beetle)<br>Volkswagen New Beetle Convertible(Volkswagen New Beetle Convertible)<br>Volkswagen New Golf(Volkswagen New Golf)<br>Volkswagen New GTI(Volkswagen New GTI)<br>Volkswagen New Jetta(Volkswagen New Jetta)<br>Volkswagen Passat(Volkswagen Passat)<br>Volkswagen Passat 4motion(Volkswagen Passat 4motion)<br>Volkswagen Passat Syncro(Volkswagen Passat Syncro)<br>Volkswagen Passat Wagon(Volkswagen Passat Wagon)<br>Volkswagen Passat Wagon 4motion(Volkswagen Passat Wagon 4motion)<br>Volkswagen Passat Wagon Syncro(Volkswagen Passat Wagon Syncro)<br>Volkswagen Phaeton(Volkswagen Phaeton)<br>Volkswagen Quantum(Volkswagen Quantum)<br>Volkswagen Quantum Syncro Wagon(Volkswagen Quantum Syncro Wagon)<br>Volkswagen Quantum Wagon(Volkswagen Quantum Wagon)<br>Volkswagen R32(Volkswagen R32)<br>Volkswagen Rabbit(Volkswagen Rabbit)<br>Volkswagen Rabbit Convertible(Volkswagen Rabbit Convertible)<br>Volkswagen Routan(Volkswagen Routan)<br>Volkswagen Routan FWD(Volkswagen Routan FWD)<br>Volkswagen Scirocco(Volkswagen Scirocco)<br>Volkswagen Scirocco 16v(Volkswagen Scirocco 16v)<br>Volkswagen Tiguan(Volkswagen Tiguan)<br>Volkswagen Tiguan 4motion(Volkswagen Tiguan 4motion)<br>Volkswagen Tiguan Limited(Volkswagen Tiguan Limited)<br>Volkswagen Tiguan Limited 4motion(Volkswagen Tiguan Limited 4motion)<br>Volkswagen Touareg(Volkswagen Touareg)<br>Volkswagen Touareg Hybrid(Volkswagen Touareg Hybrid)<br>Volkswagen Vanagon/Camper 2WD(Volkswagen Vanagon/Camper 2WD)<br>Volkswagen Vanagon 2WD(Volkswagen Vanagon 2WD)<br>Volkswagen Vanagon Syncro 4WD(Volkswagen Vanagon Syncro 4WD)<br>GLA 250 4MATIC SUV(GLA 250 4MATIC SUV)<br>GLB 250 4MATIC SUV(GLB 250 4MATIC SUV)<br>GLC 300 4MATIC SUV(GLC 300 4MATIC SUV)<br>GLCe 300 4MATIC(GLCe 300 4MATIC)<br>AMG GLC 43 4MATIC SUV(AMG GLC 43 4MATIC SUV)<br>AMG GLC 63 S 4MATIC+ SUV(AMG GLC 63 S 4MATIC+ SUV)<br>GLC 300 4MATIC Coupe(GLC 300 4MATIC Coupe)<br>AMG GLC 43 4MATIC Coupe(AMG GLC 43 4MATIC Coupe)<br>AMG GLC 63 S 4MATIC+ Coupe(AMG GLC 63 S 4MATIC+ Coupe)<br>GLE 350 4MATIC SUV(GLE 350 4MATIC SUV)<br>GLE 450 4MATIC SUV(GLE 450 4MATIC SUV)<br>AMG GLE 53 4MATIC+ SUV(AMG GLE 53 4MATIC+ SUV)<br>AMG GLE 43 4MATIC Coupe(AMG GLE 43 4MATIC Coupe)<br>AMG GLE 63 S 4MATIC Coupe(AMG GLE 63 S 4MATIC Coupe)<br>GLS 450 4MATIC SUV(GLS 450 4MATIC SUV)<br>GLS 580 4MATIC SUV(GLS 580 4MATIC SUV)<br>G 550 SUV(G 550 SUV)<br>AMG G 63 SUV(AMG G 63 SUV)<br>A 250 4MATIC Hatch(A 250 4MATIC Hatch)<br>AMG A 35 4MATIC Hatch(AMG A 35 4MATIC Hatch)<br>A 220 4MATIC Sedan(A 220 4MATIC Sedan)<br>AMG A 35 4MATIC Sedan(AMG A 35 4MATIC Sedan)<br>C 300 4MATIC Sedan(C 300 4MATIC Sedan)<br>AMG C 43 4MATIC Sedan(AMG C 43 4MATIC Sedan)<br>AMG C 63 Sedan(AMG C 63 Sedan)<br>AMG C 63 S Sedan(AMG C 63 S Sedan)<br>E 350 4MATIC Sedan(E 350 4MATIC Sedan)<br>E 450 4MATIC Sedan(E 450 4MATIC Sedan)<br>AMG E 53 4MATIC + Sedan(AMG E 53 4MATIC + Sedan)<br>AMG E 63 S 4MATIC+ Sedan(AMG E 63 S 4MATIC+ Sedan)<br>S 450 4MATIC Sedan (Short Wheelbase)(S 450 4MATIC Sedan (Short Wheelbase))<br>S 560 4MATIC Sedan (Short Wheelbase)(S 560 4MATIC Sedan (Short Wheelbase))<br>S 560 4MATIC Sedan (Long Wheelbase)(S 560 4MATIC Sedan (Long Wheelbase))<br>S 560e Sedan (Long Wheelbase)(S 560e Sedan (Long Wheelbase))<br>AMG S 63 4MATIC+ Sedan(AMG S 63 4MATIC+ Sedan)<br>AMG S 65 Sedan(AMG S 65 Sedan)<br>Mercedes-Maybach S 560 4MATIC Sedan(Mercedes-Maybach S 560 4MATIC Sedan)<br>Mercedes-Maybach S 650 Sedan(Mercedes-Maybach S 650 Sedan)<br>C 300 4MATIC Wagon(C 300 4MATIC Wagon)<br>AMG C 43 4MATIC Wagon(AMG C 43 4MATIC Wagon)<br>E 450 4MATIC Wagon(E 450 4MATIC Wagon)<br>AMG E 53 4MATIC+ Wagon(AMG E 53 4MATIC+ Wagon)<br>AMG E 63 S 4MATIC Wagon(AMG E 63 S 4MATIC Wagon)<br>CLA 250 4MATIC Coupe(CLA 250 4MATIC Coupe)<br>AMG CLA 35 Coupe(AMG CLA 35 Coupe)<br>AMG CLA 45 Coupe(AMG CLA 45 Coupe)<br>C 300 4MATIC Coupe(C 300 4MATIC Coupe)<br>AMG C 43 4MATIC Coupe(AMG C 43 4MATIC Coupe)<br>AMG C 63 S Coupe(AMG C 63 S Coupe)<br>E 450 4MATIC Coupe(E 450 4MATIC Coupe)<br>AMG E 53 4MATIC+ Coupe(AMG E 53 4MATIC+ Coupe)<br>CLS 450 4MATIC Coupe(CLS 450 4MATIC Coupe)<br>AMG CLS 53 4MATIC+ Coupe(AMG CLS 53 4MATIC+ Coupe)<br>S 560 4MATIC Coupe(S 560 4MATIC Coupe)<br>AMG S 63 4MATIC+ Coupe(AMG S 63 4MATIC+ Coupe)<br>AMG GT 53 4MATIC+ 4-Door Coupe(AMG GT 53 4MATIC+ 4-Door Coupe)<br>AMG GT 63 4MATIC+ 4-Door Coupe(AMG GT 63 4MATIC+ 4-Door Coupe)<br>AMG GT 63 S 4MATIC+ 4-Door Coupe(AMG GT 63 S 4MATIC+ 4-Door Coupe)<br>AMG GT C Coupe(AMG GT C Coupe)<br>AMG GT R Coupe(AMG GT R Coupe)<br>C 300 4MATIC Cabriolet(C 300 4MATIC Cabriolet)<br>AMG C 43 4MATIC Cabriolet(AMG C 43 4MATIC Cabriolet)<br>AMG C 63 S Cabriolet(AMG C 63 S Cabriolet)<br>E 450 4MATIC Cabriolet(E 450 4MATIC Cabriolet)<br>AMG E 53 4MATIC+ Cabriolet(AMG E 53 4MATIC+ Cabriolet)<br>S 560 Cabriolet(S 560 Cabriolet)<br>AMG S 63 4MATIC+ Cabriolet(AMG S 63 4MATIC+ Cabriolet)<br>SLC 300 Roadster(SLC 300 Roadster)<br>AMG SLC 43 Roadster(AMG SLC 43 Roadster)<br>SL 450 Roadster(SL 450 Roadster)<br>SL 550 Roadster(SL 550 Roadster)<br>Mercedes-AMG GT C Roadster(Mercedes-AMG GT C Roadster)<br>GLC 350e 4MATIC(GLC 350e 4MATIC) |
|VIN Number|VIN_Number__c|string | 17 | |
|Original Vehicle Registration|Original_Vehicle_Registration__c|string | 255 | |
|Registered From|Registered_From__c|date | | |
|Registered To|Registered_To__c|date | | |
|Claimant Capacity|Claimant_Capacity__c|picklist | 255 | 1(1)<br>2(2)<br>3(3) |
|Claimant's Role|Claimant_s_Role__c|string | 20 | |
|Causes of Action|Causes_of_Action__c|multipicklist | 4099 | Deceit Claim (Sections E+J)(Deceit Claim (Sections E+J))<br>Deceit Claim (Sections J)(Deceit Claim (Sections J))<br>Stat Duty (Section K)(Stat Duty (Section K))<br>Contract Claim (Section L)(Contract Claim (Section L))<br>CPUT claim (Section M)(CPUT claim (Section M))<br>CCA (Section N)(CCA (Section N)) |
|Finance Agreement Provided?|Finance_Agreement_Provided__c|boolean | | |
|Date of Purchase|Date_of_Purchase__c|date | | |
|Date of Agreement|Date_of_Agreement__c|date | | |
|Payment Made After 1/10/2014?|Payment_Made_After_1_10_2014__c|boolean | | |
|Amount Financed?|Amount_Financed__c|currency | 16.2 | |
|Authorised Dealership|Authorised_Dealership__c|string | 255 | |
|Technical Measures Applied?|Technical_Measures_Applied__c|picklist | 255 | Yes(Yes)<br>No(No) |
|Vehicle in Claimant's Possession?|Vehicle_in_Claimant_s_Possession__c|picklist | 255 | Yes(Yes)<br>No(No) |
|Vehicle Mileage|Vehicle_Mileage__c|double | 10.0 | |
|Claims for Alleged Loss|Claims_for_Alleged_Loss__c|multipicklist | 4099 | Reduction in value(Reduction in value)<br>Additional fuel costs(Additional fuel costs)<br>Additional running costs(Additional running costs)<br>Distress(Distress) |
|Price Paid|Price_Paid__c|date | | |
|Part Exchange?|Part_Exchange__c|picklist | 255 | Yes(Yes)<br>No(No) |
|Value of part Exchange|Value_of_part_Exchange__c|date | | |
|How was the vehicle purchased?|How_was_the_vehicle_purchased__c|picklist | 255 | Purchased Outright(Purchased Outright)<br>Financed(Financed)<br>Other(Other) |
|Secondhand mileage|Secondhand_mileage__c|double | 10.0 | |
|Vendor|Vendor__c|picklist | 255 | Dealership(Dealership)<br>Private Seller(Private Seller)<br>Auction(Auction)<br>Other(Other) |
|Vendor Details|Vendor_Details__c|textarea | 255 | |
|vehicle_dealership_name_other|vehicle_dealership_name_other__c|string | 255 | |
|Dealer Trading Name|Dealer_Trading_Name__c|string | 255 | |
|Finance/Leasing Agreement on File?|Finance_Leasing_Agreement_on_File__c|boolean | | |
|Date of Finance Agreement|Date_of_Finance_Agreement__c|date | | |
|Creditor|Creditor__c|reference | 18 | |
|Type of Agreement|Type_of_Agreement__c|picklist | 255 | Hire Purchase(Hire Purchase)<br>PCP (Personal Contract Purchase)(PCP (Personal Contract Purchase))<br>PCH (Personal Contract Hire)(PCH (Personal Contract Hire))<br>Other(Other) |
|Deposits/Contributions/Discounts|Deposits_Contributions_Discounts__c|multipicklist | 4099 | Deposits(Deposits)<br>Contributions(Contributions)<br>Discounts(Discounts) |
|Total Value|Total_Value__c|currency | 16.2 | |
|Date Technical Measures Applied|Date_Technical_Measures_Applied__c|date | | |
|Name of Garage|Name_of_Garage__c|textarea | 255 | |
|Engine Modified?|Engine_Modified__c|picklist | 255 | Yes(Yes)<br>No(No) |
|Vehicle Chipturned?|Vehicle_Chipturned__c|picklist | 255 | Yes(Yes)<br>No(No) |
|Date of sale or disposition|Date_of_sale_or_disposition__c|date | | |
|Mileage at Date of Sale or Disposition|Mileage_at_Date_of_Sale_or_Disposition__c|double | 10.0 | |
|Why is vehicle no longer in possession?|Why_is_vehicle_no_longer_in_possession__c|picklist | 255 | 3(3)<br>Part Exchanged(Part Exchanged)<br>Sold(Sold)<br>Written off(Written off)<br>Repossessed(Repossessed)<br>Gifted(Gifted)<br>Other(Other) |
|Purchase Price|Selling_Price__c|currency | 16.2 | |
|Was the vehicle part exchanged?|Was_the_vehicle_part_exchanged__c|picklist | 255 | Yes(Yes)<br>No(No) |
|Value of Part Exchanged|Value_of_Part_Exchanged__c|currency | 16.2 | |
|Nature of Purchaser|Nature_of_Purchaser__c|picklist | 255 | 1(1)<br>2(2)<br>3(3) |
|Insurance Payment|Insurance_Payment__c|currency | 16.2 | |
|No Longer in Possession Reason|No_Longer_in_Possession_Reason__c|textarea | 255 | |
|Related Matter|Vehicle__c|reference | 18 | |
|Is this the correct vehicle?|Is_this_the_correct_vehicle__c|picklist | 255 | Yes(Yes)<br>No(No) |
|Vehicle Letter Received?|Vehicle_Letter_Recieved__c|picklist | 255 | Yes(Yes)<br>No(No) |
|Still owns vehicle|Still_owns_vehicle__c|picklist | 255 | Yes(Yes)<br>No(No) |
|Vehicle Purchased Outright Payment|Vehicle_Purchased_Outright_Payment__c|picklist | 255 | Personal Bank Loan(Personal Bank Loan)<br>Cash/Direct Debit(Cash/Direct Debit) |
|Vehicle Financed Payment|Vehicle_Financed_Payment__c|picklist | 255 | Financed through Dealership(Financed through Dealership)<br>Financed through employer via Salary Sacrifice(Financed through employer via Salary Sacrifice)<br>Other(Other) |
|Purchase Currency|Sale_Currency__c|string | 200 | |
|New or Secondhand?|New_or_Secondhand__c|picklist | 255 | New(New)<br>Second Hand(Second Hand) |
|Who was the financial creditor?|Who_was_the_financial_creditor__c|picklist | 255 | Mercedes Benz Financial Services UK Limited(Mercedes Benz Financial Services UK Limited)<br>Other(Other) |
|Did you pay any deposits/contributions?|Did_you_pay_any_deposits_contributions__c|picklist | 255 | Yes(Yes)<br>No(No) |
|Amount used for part exchange|Amount_used_for_part_exchange__c|currency | 16.2 | |
|If sold, nature of the purchaser|If_sold_nature_of_the_purchaser__c|picklist | 255 | Dealership(Dealership)<br>Private Seller(Private Seller)<br>Auction(Auction)<br>Other(Other) |
|If sold, is there an outstanding balance|If_sold_is_there_an_outstanding_balance__c|picklist | 255 | Yes(Yes)<br>No(No) |
|If other, name of financial creditor|If_other_name_of_financial_creditor__c|string | 255 | |
|Approved Dealer|Approved_Dealer__c|string | 255 | |
|details_of_finance_text|details_of_finance_text__c|string | 255 | |
|vehicle_finance_agreement_date|vehicle_finance_agreement_date__c|date | | |
|who_was_financial_creditor|who_was_financial_creditor__c|string | 255 | |
|vehicle_other_aquiring_method|vehicle_other_aquiring_method__c|string | 255 | |
|vehicle_type_of_agreement|vehicle_type_of_agreement__c|string | 255 | |
|hire_purchase_explanation|hire_purchase_explanation__c|string | 255 | |
|vehicle_financed_deposit_yes_or_no|vehicle_financed_deposit_yes_or_no__c|picklist | 255 | Yes(Yes)<br>No(No) |
|Current Vehicle Registration|Current_Vehicle_Registration__c|string | 255 | |
|details_of_sale_or_disposition_text|details_of_sale_or_disposition_text__c|string | 255 | |
|sale_disposition_mileage|sale_disposition_mileage__c|double | 16.2 | |
|sale_disposition_motivation|sale_disposition_motivation__c|string | 255 | |
|sale_disposition_part_exchanged_value|sale_disposition_part_exchanged_value__c|currency | 16.2 | |
|sale_disposition_part_exchanged_purchase|sale_disposition_part_exchanged_purchase__c|string | 255 | |
|sale_disposition_balance_to_be_paid_yes_|sale_disposition_balance_to_be_paid_yes__c|picklist | 255 | Yes(Yes)<br>No(No) |
|sale_disposition_balance_to_be_paid_pric|sale_disposition_balance_to_be_paid_pric__c|currency | 16.2 | |
|QuestionnaireId|QuestionnaireId__c|string | 25 | |
|Vehicle text|Vehicle_text__c|textarea | 255 | |
|Are you claiming as a limited company?|Are_you_claiming_as_a_limited_company__c|picklist | 255 | Yes(Yes)<br>No(No) |
|Vehicle Status|Vehicle_Status__c|picklist | 255 | Open(Open)<br>Requested Closure(Requested Closure)<br>Closed(Closed) |
|Pay deposit using credit card|Pay_deposit_using_credit_card__c|picklist | 255 | Yes(Yes)<br>No(No) |
|Credit card provider|Credit_card_provider__c|string | 200 | |
|Business Name|Business_Name__c|string | 200 | |
|Type of Agreement_|Types_of_Agreement__c|picklist | 255 | Hire Purchase(Hire Purchase)<br>PCP (Personal Contract Purchase)(PCP (Personal Contract Purchase))<br>PCH (Personal Contract Hire)(PCH (Personal Contract Hire))<br>Lease(Lease)<br>Other(Other) |
|Sale Disposition Motivation_|Sales_Disposition_Motivation__c|picklist | 255 | Part Exchanged(Part Exchanged)<br>Sold(Sold)<br>Written off(Written off)<br>Repossessed(Repossessed)<br>Gifted(Gifted)<br>Other(Other) |
|Value Part Exchanged|Value_Part_Exchanged__c|string | 200 | |
|Buying Price|Buying_Price__c|currency | 16.2 | |
|Buying Currency|Buying_Currency__c|string | 10 | | 

 ## Relationships 

| Name | Child Object | Field |
| --- | --- | --- |
|ActivityHistories|ActivityHistory|WhatId|
|AttachedContentDocuments|AttachedContentDocument|LinkedEntityId|
|AttachedContentNotes|AttachedContentNote|LinkedEntityId|
|Attachments|Attachment|ParentId|
|RecordAssociatedGroups|CollaborationGroupRecord|RecordId|
|CombinedAttachments|CombinedAttachment|ParentId|
|null|ContentDistribution|RelatedRecordId|
|ContentDocumentLinks|ContentDocumentLink|LinkedEntityId|
|null|ContentVersion|FirstPublishLocationId|
|Emails|EmailMessage|RelatedToId|
|FeedSubscriptionsForEntity|EntitySubscription|ParentId|
|Events|Event|WhatId|
|null|EventChangeEvent|WhatId|
|null|EventRelationChangeEvent|RelationId|
|null|FeedComment|ParentId|
|null|FeedItem|ParentId|
|null|FlowRecordRelation|RelatedRecordId|
|Notes|Note|ParentId|
|NotesAndAttachments|NoteAndAttachment|ParentId|
|OpenActivities|OpenActivity|WhatId|
|ProcessInstances|ProcessInstance|TargetObjectId|
|ProcessSteps|ProcessInstanceHistory|TargetObjectId|
|RecordActions|RecordAction|RecordId|
|Tasks|Task|WhatId|
|null|TaskChangeEvent|WhatId|
|TopicAssignments|TopicAssignment|EntityId|
|Histories|Vehicle__History|ParentId|