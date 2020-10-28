#litify_pm__Matter__c 

 ## Fields 

| Label | API Name | Type | Length | Possible Choices |
| --- | --- | --- | --- | --- |
|Record ID|Id|id | 18 | |
|Owner ID|OwnerId|reference | 18 | |
|Deleted|IsDeleted|boolean | | |
|Matter Name|Name|string | 80 | |
|Record Type ID|RecordTypeId|reference | 18 | |
|Created Date|CreatedDate|datetime | | |
|Created By ID|CreatedById|reference | 18 | |
|Last Modified Date|LastModifiedDate|datetime | | |
|Last Modified By ID|LastModifiedById|reference | 18 | |
|System Modstamp|SystemModstamp|datetime | | |
|Last Activity Date|LastActivityDate|date | | |
|Last Viewed Date|LastViewedDate|datetime | | |
|Last Referenced Date|LastReferencedDate|datetime | | |
|Billable Matter|litify_pm__Billable_Matter__c|boolean | | |
|Billing Type|litify_pm__Billing_Type__c|picklist | 255 | Hourly(Hourly)<br>Flat Rate(Flat Rate)<br>Contingency(Contingency)<br>Alternative Fee Arrangement(Alternative Fee Arrangement) |
|Budget Used|litify_pm__Budget_Used__c|percent | | |
|Budget|litify_pm__Budget__c|currency | 16.2 | |
|Case Type|litify_pm__Case_Type__c|reference | 18 | |
|Client|litify_pm__Client__c|reference | 18 | |
|Estimated Close Date|litify_pm__Close_Date__c|date | | |
|Closed Reason Details|litify_pm__Closed_Reason_Details__c|picklist | 255 | Already represented(Already represented)<br>Case already settled(Case already settled)<br>Client unresponsive(Client unresponsive)<br>Conflict with one or more parties(Conflict with one or more parties)<br>Decided to use other firm(Decided to use other firm)<br>Insufficient coverage(Insufficient coverage)<br>Insufficient damages(Insufficient damages)<br>Limited/No injury(Limited/No injury)<br>Limited/No treatment(Limited/No treatment)<br>No defect(No defect)<br>Questionable/No liability(Questionable/No liability)<br>SOL expired(SOL expired)<br>Wrong location(Wrong location)<br>Other(Other)<br>Favorable(Favorable)<br>Unfavorable(Unfavorable)<br>Partially Favorable(Partially Favorable)<br>With Prejudice(With Prejudice)<br>Without Prejudice(Without Prejudice) |
|Closed Reason|litify_pm__Closed_Reason__c|picklist | 255 | Terminated - Ineligible Client(Terminated - Ineligible Client)<br>Cancellation - Client Requested Cancellation(Cancellation - Client Requested Cancellation)<br>Settlement(Settlement)<br>Decision(Decision)<br>Verdict(Verdict)<br>Referred Out(Referred Out) |
|Contingency Fee Rate (%)|litify_pm__Contingency_Fee_Rate__c|percent | | |
|Description|litify_pm__Description__c|textarea | 131072 | |
|Display Name|litify_pm__Display_Name__c|string | 255 | |
|Gross Attorney Fee|litify_pm__Fee_Amount__c|currency | 16.2 | |
|Gross Recovery|litify_pm__Gross_Recovery__c|currency | 16.2 | |
|Hard Costs|litify_pm__Hard_Costs__c|currency | 16.2 | |
|Hourly Rate|litify_pm__Hourly_Rate__c|currency | 16.2 | |
|Ignore Default Plan|litify_pm__Ignore_Default_Plan__c|boolean | | |
|Incident Date|litify_pm__Incident_date__c|date | | |
|Limitations date satisfied|litify_pm__Limitations_date_satisfied__c|boolean | | |
|Lost Reason|litify_pm__Lost_Reason__c|textarea | 255 | |
|Matter Address 1|litify_pm__Matter_Address_1__c|string | 255 | |
|Matter Address 2|litify_pm__Matter_Address_2__c|string | 255 | |
|Matter City|litify_pm__Matter_City__c|string | 255 | |
|Matter Has Budget|litify_pm__Matter_Has_Budget__c|boolean | | |
|Matter Location|litify_pm__Matter_Location__c|string | 1300 | |
|Matter Plan|litify_pm__Matter_Plan__c|reference | 18 | |
|Matter Postal Code|litify_pm__Matter_Postal_Code__c|string | 255 | |
|Active Stage|litify_pm__Matter_Stage_Activity_Formula__c|string | 1300 | |
|Stage|litify_pm__Matter_Stage_Activity__c|reference | 18 | |
|Matter State|litify_pm__Matter_State__c|picklist | 255 | AK Alaska(AK Alaska)<br>AL Alabama(AL Alabama)<br>AR Arkansas(AR Arkansas)<br>AZ Arizona(AZ Arizona)<br>CA California(CA California)<br>CO Colorado(CO Colorado)<br>CT Connecticut(CT Connecticut)<br>DC District of Columbia(DC District of Columbia)<br>DE Delaware(DE Delaware)<br>FL Florida(FL Florida)<br>GA Georgia(GA Georgia)<br>HI Hawaii(HI Hawaii)<br>IA Iowa(IA Iowa)<br>ID Idaho(ID Idaho)<br>IL Illinois(IL Illinois)<br>IN Indiana(IN Indiana)<br>KS Kansas(KS Kansas)<br>KY Kentucky(KY Kentucky)<br>LA Louisiana(LA Louisiana)<br>MA Massachusetts(MA Massachusetts)<br>MD Maryland(MD Maryland)<br>ME Maine(ME Maine)<br>MI Michigan(MI Michigan)<br>MN Minnesota(MN Minnesota)<br>MO Missouri(MO Missouri)<br>MS Mississippi(MS Mississippi)<br>MT Montana(MT Montana)<br>NC North Carolina(NC North Carolina)<br>ND North Dakota(ND North Dakota)<br>NE Nebraska(NE Nebraska)<br>NH New Hampshire(NH New Hampshire)<br>NJ New Jersey(NJ New Jersey)<br>NM New Mexico(NM New Mexico)<br>NV Nevada(NV Nevada)<br>NY New York(NY New York)<br>OH Ohio(OH Ohio)<br>OK Oklahoma(OK Oklahoma)<br>OR Oregon(OR Oregon)<br>PA Pennsylvania(PA Pennsylvania)<br>RI Rhode Island(RI Rhode Island)<br>SC South Carolina(SC South Carolina)<br>SD South Dakota(SD South Dakota)<br>TN Tennessee(TN Tennessee)<br>TX Texas(TX Texas)<br>UT Utah(UT Utah)<br>VA Virginia(VA Virginia)<br>VT Vermont(VT Vermont)<br>WA Washington(WA Washington)<br>WI Wisconsin(WI Wisconsin)<br>WV West Virginia(WV West Virginia)<br>WY Wyoming(WY Wyoming) |
|Matter|litify_pm__Matter__c|double | 18.0 | |
|Net Recovery|litify_pm__Net_Recovery__c|currency | 16.2 | |
|Notify users when % budget reached|litify_pm__Notify_users_when_budget_reached__c|percent | | |
|Open Date|litify_pm__Open_Date__c|date | | |
|Originating Attorney|litify_pm__Originating_Attorney__c|reference | 18 | |
|Pending Date|litify_pm__Pending_Date__c|date | | |
|Practice Area|litify_pm__Practice_Area2__c|string | 1300 | |
|Primary Intake|litify_pm__Primary_Intake__c|reference | 18 | |
|Principal Attorney|litify_pm__Principal_Attorney__c|reference | 18 | |
|Referral|litify_pm__Referral__c|reference | 18 | |
|Retainer Used %|litify_pm__Retainer_Used__c|percent | | |
|Soft Costs|litify_pm__Soft_Costs__c|currency | 16.2 | |
|Source Type|litify_pm__Source_Type__c|picklist | 255 | Attorney Referral(Attorney Referral)<br>Non-Attorney Referral(Non-Attorney Referral)<br>Event(Event)<br>Advertisement(Advertisement)<br>Other(Other)<br>Internet(Internet) |
|Source|litify_pm__Source__c|reference | 18 | |
|Status|litify_pm__Status__c|picklist | 255 | Open(Open)<br>Closed(Closed)<br>Re Opened(Re_opened)<br>Requested Closure(Requested_Closure) |
|Statute of Limitations|litify_pm__Statute_Of_Limitations__c|date | | |
|Total Amount Billable|litify_pm__Total_Amount_Billable__c|currency | 16.2 | |
|Total Amount Due|litify_pm__Total_Amount_Due__c|currency | 16.2 | |
|Total Matter Value|litify_pm__Total_Matter_Value__c|currency | 16.2 | |
|Total Matter Cost|litify_pm__Total_matter_cost__c|currency | 16.2 | |
|Turn Down Details|litify_pm__Turn_Down_Details__c|textarea | 32768 | |
|Use same client location|litify_pm__Use_same_client_location__c|boolean | | |
|Total Amount Paid|litify_pm__total_amount_paid__c|currency | 16.2 | |
|Total Amount Billed|litify_pm__Total_Amount_Billed__c|currency | 16.2 | |
|Total Amount Expensed Due|litify_pm__Total_Amount_Expensed_Due__c|currency | 16.2 | |
|Total Amount Expensed|litify_pm__Total_Amount_Expensed__c|currency | 16.2 | |
|Total Amount Retained|litify_pm__Total_Amount_Retained__c|currency | 16.2 | |
|Total Amount Time Entries Billed|litify_pm__Total_Amount_Time_Entries_Billed__c|currency | 16.2 | |
|Total Amount Time Entries Due|litify_pm__Total_Amount_Time_Entries_Due__c|currency | 16.2 | |
|Total Amount Time Entries Unpaid|litify_pm__Total_Amount_Time_Entries_Unpaid__c|currency | 16.2 | |
|Total Amount Unbilled Expenses|litify_pm__Total_Amount_Unbilled_Expenses__c|currency | 16.2 | |
|Total Hours|litify_pm__Total_Hours__c|double | 16.2 | |
|Total Amount Time Entries|litify_pm__total_amount_time_entries__c|currency | 16.2 | |
|Last Called At|litify_pm__Last_Called_At__c|datetime | | |
|Last Emailed At|litify_pm__Last_Emailed_At__c|datetime | | |
|Total Calls|litify_pm__Total_Calls__c|double | 18.0 | |
|Total Emails|litify_pm__Total_Emails__c|double | 18.0 | |
|Case Title|litify_pm__Case_Title__c|string | 255 | |
|Closed Date|litify_pm__Closed_Date__c|date | | |
|Court|litify_pm__Court__c|reference | 18 | |
|Matter Team|litify_pm__Default_Matter_Team__c|reference | 18 | |
|Matter Team Modified|litify_pm__Matter_Team_Modified__c|boolean | | |
|Discharge Date|litify_pm__Discharge_Date__c|date | | |
|Docket Number|litify_pm__Docket_Number__c|string | 100 | |
|Fees Due to Others|litify_pm__FeesDueToOthers__c|currency | 16.2 | |
|Filed Date|litify_pm__Filed_Date__c|date | | |
|Moved to Litigation|litify_pm__Moved_to_Litigation__c|date | | |
|Opposing Party|litify_pm__OpposingParty__c|reference | 18 | |
|Pre - Lit Offer Amount|litify_pm__Pre_Lit_Offer_Amount__c|currency | 16.2 | |
|Trial Date|litify_pm__Trial_Date__c|date | | |
|Total Damages|litify_pm__Total_Damages__c|currency | 16.2 | |
|Amount Due to Client|litify_pm__Amount_Due_to_Client__c|currency | 16.2 | |
|Companion|litify_pm__Companion__c|reference | 18 | |
|Net Attorney Fee|litify_pm__Net_Attorney_Fee__c|currency | 16.2 | |
|Exact Source|litify_pm__lit_Exact_Source__c|string | 255 | |
|Matter County|litify_pm__lit_Matter_County__c|string | 255 | |
|Parent Matter|Parent_Matter__c|reference | 18 | |
|12) Como você ficou sabendo do Essure?|X12_Como_voc_ficou_sabendo_do_Essure__c|multipicklist | 4099 | Recomendação médica por médico do SUS(Recomendação médica por médico do SUS)<br>Recomendação médica por médico do conv(Recomendação médica por médico do conv)<br>Propaganda feita em hospital(Propaganda feita em hospital) |
|Statute of Limitations is Manual|litify_pm__Manual_Statute_of_Limitations__c|boolean | | |
|Starting Matter Stage Override|litify_pm__Starting_Matter_Stage_Override__c|reference | 18 | |
|Case Manager|litify_pm__lit_Case_Manager__c|reference | 18 | |
|Matter|litify_pm__lit_Display_Name_Link__c|string | 1300 | |
|My Matter|litify_tso_My_Matter__c|boolean | | |
|Partner Attorney Fee|litify_pm__lit_Partner_Attorney_Fee__c|currency | 10.2 | |
|Referral Partner Fee Percent|litify_pm__lit_Referral_Partner_Fee_Percent__c|percent | | |
|Referral Partner|litify_pm__lit_Referral_Partner__c|reference | 18 | |
|Total Client Payout|litify_pm__lit_Total_Client_Payout__c|currency | 16.2 | |
|Damage Total|litify_pm__lit_Damage_Total__c|currency | 16.2 | |
|Expense Total|litify_pm__lit_Expense_Total__c|currency | 16.2 | |
|Lien Total|litify_pm__lit_Lien_Total__c|double | 16.2 | |
|Vehicle Manufactuer|Client__c|picklist | 255 | Audi(Audi)<br>BMW(BMW)<br>Buick(Buick)<br>Cadillac(Cadillac)<br>Chevrolet(Chevrolet)<br>Chrysler(Chrysler)<br>Dodge(Dodge)<br>Ferrari(Ferrari)<br>Ford(Ford)<br>GM(GM)<br>GEM(GEM)<br>GMC(GMC)<br>Honda(Honda)<br>Hummer(Hummer)<br>Hyundai(Hyundai)<br>Infiniti(Infiniti)<br>Isuzu(Isuzu)<br>Jaguar(Jaguar)<br>Jeep(Jeep)<br>Kia(Kia)<br>Lamborghini(Lamborghini)<br>Land Rover(Land Rover)<br>Lexus(Lexus)<br>Lincoln(Lincoln)<br>Lotus(Lotus)<br>Mazda(Mazda)<br>Mercedes-Benz(Mercedes-Benz)<br>Mercury(Mercury)<br>Mitsubishi(Mitsubishi)<br>Nissan(Nissan)<br>Oldsmobile(Oldsmobile)<br>Peugeot(Peugeot)<br>Pontiac(Pontiac)<br>Porsche(Porsche)<br>Regal(Regal)<br>Saab(Saab)<br>Saturn(Saturn)<br>Subaru(Subaru)<br>Suzuki(Suzuki)<br>Toyota(Toyota)<br>Volkswagen(Volkswagen)<br>Volvo(Volvo) |
|Vehicle Model|Vehicle_Model__c|picklist | 255 | Volkswagen Arteon(Volkswagen Arteon)<br>Volkswagen Arteon 4motion(Volkswagen Arteon 4motion)<br>Volkswagen Atlas(Volkswagen Atlas)<br>Volkswagen Atlas 4motion(Volkswagen Atlas 4motion)<br>Volkswagen Atlas Cross Sport(Volkswagen Atlas Cross Sport)<br>Volkswagen Atlas Cross Sport 4motion(Volkswagen Atlas Cross Sport 4motion)<br>Volkswagen Beetle(Volkswagen Beetle)<br>Volkswagen Beetle Convertible(Volkswagen Beetle Convertible)<br>Volkswagen Beetle Dune(Volkswagen Beetle Dune)<br>Volkswagen Beetle Dune Convertible(Volkswagen Beetle Dune Convertible)<br>Volkswagen Cabrio(Volkswagen Cabrio)<br>Volkswagen Cabriolet(Volkswagen Cabriolet)<br>Volkswagen CC(Volkswagen CC)<br>Volkswagen CC 4motion(Volkswagen CC 4motion)<br>Volkswagen Corrado(Volkswagen Corrado)<br>Volkswagen Corrado SLC(Volkswagen Corrado SLC)<br>Volkswagen e-Golf(Volkswagen e-Golf)<br>Volkswagen Eos(Volkswagen Eos)<br>Volkswagen Eurovan(Volkswagen Eurovan)<br>Volkswagen Eurovan Camper(Volkswagen Eurovan Camper)<br>Volkswagen Fox(Volkswagen Fox)<br>Volkswagen Fox GL Wagon(Volkswagen Fox GL Wagon)<br>Volkswagen Fox Wagon(Volkswagen Fox Wagon)<br>Volkswagen Golf(Volkswagen Golf)<br>Volkswagen Golf/GTI(Volkswagen Golf/GTI)<br>Volkswagen Golf Alltrack(Volkswagen Golf Alltrack)<br>Volkswagen Golf III(Volkswagen Golf III)<br>Volkswagen Golf III / GTI(Volkswagen Golf III / GTI)<br>Volkswagen Golf R(Volkswagen Golf R)<br>Volkswagen Golf SportWagen(Volkswagen Golf SportWagen)<br>Volkswagen Golf SportWagen 4motion(Volkswagen Golf SportWagen 4motion)<br>Volkswagen GTI(Volkswagen GTI)<br>Volkswagen GTI/Golf GT(Volkswagen GTI/Golf GT)<br>Volkswagen GTI 16v(Volkswagen GTI 16v)<br>Volkswagen GTI VR6(Volkswagen GTI VR6)<br>Volkswagen Jetta(Volkswagen Jetta)<br>Volkswagen Jetta GLI(Volkswagen Jetta GLI)<br>Volkswagen Jetta GLI/Wolfsburg Edition(Volkswagen Jetta GLI/Wolfsburg Edition)<br>Volkswagen Jetta GLI 16v(Volkswagen Jetta GLI 16v)<br>Volkswagen Jetta GLX(Volkswagen Jetta GLX)<br>Volkswagen Jetta Hybrid(Volkswagen Jetta Hybrid)<br>Volkswagen Jetta III(Volkswagen Jetta III)<br>Volkswagen Jetta III GLX(Volkswagen Jetta III GLX)<br>Volkswagen Jetta SportWagen(Volkswagen Jetta SportWagen)<br>Volkswagen Jetta Wagon(Volkswagen Jetta Wagon)<br>Volkswagen New Beetle(Volkswagen New Beetle)<br>Volkswagen New Beetle Convertible(Volkswagen New Beetle Convertible)<br>Volkswagen New Golf(Volkswagen New Golf)<br>Volkswagen New GTI(Volkswagen New GTI)<br>Volkswagen New Jetta(Volkswagen New Jetta)<br>Volkswagen Passat(Volkswagen Passat)<br>Volkswagen Passat 4motion(Volkswagen Passat 4motion)<br>Volkswagen Passat Syncro(Volkswagen Passat Syncro)<br>Volkswagen Passat Wagon(Volkswagen Passat Wagon)<br>Volkswagen Passat Wagon 4motion(Volkswagen Passat Wagon 4motion)<br>Volkswagen Passat Wagon Syncro(Volkswagen Passat Wagon Syncro)<br>Volkswagen Phaeton(Volkswagen Phaeton)<br>Volkswagen Quantum(Volkswagen Quantum)<br>Volkswagen Quantum Syncro Wagon(Volkswagen Quantum Syncro Wagon)<br>Volkswagen Quantum Wagon(Volkswagen Quantum Wagon)<br>Volkswagen R32(Volkswagen R32)<br>Volkswagen Rabbit(Volkswagen Rabbit)<br>Volkswagen Rabbit Convertible(Volkswagen Rabbit Convertible)<br>Volkswagen Routan(Volkswagen Routan)<br>Volkswagen Routan FWD(Volkswagen Routan FWD)<br>Volkswagen Scirocco(Volkswagen Scirocco)<br>Volkswagen Scirocco 16v(Volkswagen Scirocco 16v)<br>Volkswagen Tiguan(Volkswagen Tiguan)<br>Volkswagen Tiguan 4motion(Volkswagen Tiguan 4motion)<br>Volkswagen Tiguan Limited(Volkswagen Tiguan Limited)<br>Volkswagen Tiguan Limited 4motion(Volkswagen Tiguan Limited 4motion)<br>Volkswagen Touareg(Volkswagen Touareg)<br>Volkswagen Touareg Hybrid(Volkswagen Touareg Hybrid)<br>Volkswagen Vanagon/Camper 2WD(Volkswagen Vanagon/Camper 2WD)<br>Volkswagen Vanagon 2WD(Volkswagen Vanagon 2WD)<br>Volkswagen Vanagon Syncro 4WD(Volkswagen Vanagon Syncro 4WD)<br>GLA 250 4MATIC SUV(GLA 250 4MATIC SUV)<br>GLB 250 4MATIC SUV(GLB 250 4MATIC SUV)<br>GLC 300 4MATIC SUV(GLC 300 4MATIC SUV)<br>GLCe 300 4MATIC(GLCe 300 4MATIC)<br>AMG GLC 43 4MATIC SUV(AMG GLC 43 4MATIC SUV)<br>AMG GLC 63 S 4MATIC+ SUV(AMG GLC 63 S 4MATIC+ SUV)<br>GLC 300 4MATIC Coupe(GLC 300 4MATIC Coupe)<br>AMG GLC 43 4MATIC Coupe(AMG GLC 43 4MATIC Coupe)<br>AMG GLC 63 S 4MATIC+ Coupe(AMG GLC 63 S 4MATIC+ Coupe)<br>GLE 350 4MATIC SUV(GLE 350 4MATIC SUV)<br>GLE 450 4MATIC SUV(GLE 450 4MATIC SUV)<br>AMG GLE 53 4MATIC+ SUV(AMG GLE 53 4MATIC+ SUV)<br>AMG GLE 43 4MATIC Coupe(AMG GLE 43 4MATIC Coupe)<br>AMG GLE 63 S 4MATIC Coupe(AMG GLE 63 S 4MATIC Coupe)<br>GLS 450 4MATIC SUV(GLS 450 4MATIC SUV)<br>GLS 580 4MATIC SUV(GLS 580 4MATIC SUV)<br>G 550 SUV(G 550 SUV)<br>AMG G 63 SUV(AMG G 63 SUV)<br>A 250 4MATIC Hatch(A 250 4MATIC Hatch)<br>AMG A 35 4MATIC Hatch(AMG A 35 4MATIC Hatch)<br>A 220 4MATIC Sedan(A 220 4MATIC Sedan)<br>AMG A 35 4MATIC Sedan(AMG A 35 4MATIC Sedan)<br>C 300 4MATIC Sedan(C 300 4MATIC Sedan)<br>AMG C 43 4MATIC Sedan(AMG C 43 4MATIC Sedan)<br>AMG C 63 Sedan(AMG C 63 Sedan)<br>AMG C 63 S Sedan(AMG C 63 S Sedan)<br>E 350 4MATIC Sedan(E 350 4MATIC Sedan)<br>E 450 4MATIC Sedan(E 450 4MATIC Sedan)<br>AMG E 53 4MATIC + Sedan(AMG E 53 4MATIC + Sedan)<br>AMG E 63 S 4MATIC+ Sedan(AMG E 63 S 4MATIC+ Sedan)<br>S 450 4MATIC Sedan (Short Wheelbase)(S 450 4MATIC Sedan (Short Wheelbase))<br>S 560 4MATIC Sedan (Short Wheelbase)(S 560 4MATIC Sedan (Short Wheelbase))<br>S 560 4MATIC Sedan (Long Wheelbase)(S 560 4MATIC Sedan (Long Wheelbase))<br>S 560e Sedan (Long Wheelbase)(S 560e Sedan (Long Wheelbase))<br>AMG S 63 4MATIC+ Sedan(AMG S 63 4MATIC+ Sedan)<br>AMG S 65 Sedan(AMG S 65 Sedan)<br>Mercedes-Maybach S 560 4MATIC Sedan(Mercedes-Maybach S 560 4MATIC Sedan)<br>Mercedes-Maybach S 650 Sedan(Mercedes-Maybach S 650 Sedan)<br>C 300 4MATIC Wagon(C 300 4MATIC Wagon)<br>AMG C 43 4MATIC Wagon(AMG C 43 4MATIC Wagon)<br>E 450 4MATIC Wagon(E 450 4MATIC Wagon)<br>AMG E 53 4MATIC+ Wagon(AMG E 53 4MATIC+ Wagon)<br>AMG E 63 S 4MATIC Wagon(AMG E 63 S 4MATIC Wagon)<br>CLA 250 4MATIC Coupe(CLA 250 4MATIC Coupe)<br>AMG CLA 35 Coupe(AMG CLA 35 Coupe)<br>AMG CLA 45 Coupe(AMG CLA 45 Coupe)<br>C 300 4MATIC Coupe(C 300 4MATIC Coupe)<br>AMG C 43 4MATIC Coupe(AMG C 43 4MATIC Coupe)<br>AMG C 63 S Coupe(AMG C 63 S Coupe)<br>E 450 4MATIC Coupe(E 450 4MATIC Coupe)<br>AMG E 53 4MATIC+ Coupe(AMG E 53 4MATIC+ Coupe)<br>CLS 450 4MATIC Coupe(CLS 450 4MATIC Coupe)<br>AMG CLS 53 4MATIC+ Coupe(AMG CLS 53 4MATIC+ Coupe)<br>S 560 4MATIC Coupe(S 560 4MATIC Coupe)<br>AMG S 63 4MATIC+ Coupe(AMG S 63 4MATIC+ Coupe)<br>AMG GT 53 4MATIC+ 4-Door Coupe(AMG GT 53 4MATIC+ 4-Door Coupe)<br>AMG GT 63 4MATIC+ 4-Door Coupe(AMG GT 63 4MATIC+ 4-Door Coupe)<br>AMG GT 63 S 4MATIC+ 4-Door Coupe(AMG GT 63 S 4MATIC+ 4-Door Coupe)<br>AMG GT C Coupe(AMG GT C Coupe)<br>AMG GT R Coupe(AMG GT R Coupe)<br>C 300 4MATIC Cabriolet(C 300 4MATIC Cabriolet)<br>AMG C 43 4MATIC Cabriolet(AMG C 43 4MATIC Cabriolet)<br>AMG C 63 S Cabriolet(AMG C 63 S Cabriolet)<br>E 450 4MATIC Cabriolet(E 450 4MATIC Cabriolet)<br>AMG E 53 4MATIC+ Cabriolet(AMG E 53 4MATIC+ Cabriolet)<br>S 560 Cabriolet(S 560 Cabriolet)<br>AMG S 63 4MATIC+ Cabriolet(AMG S 63 4MATIC+ Cabriolet)<br>SLC 300 Roadster(SLC 300 Roadster)<br>AMG SLC 43 Roadster(AMG SLC 43 Roadster)<br>SL 450 Roadster(SL 450 Roadster)<br>SL 550 Roadster(SL 550 Roadster)<br>Mercedes-AMG GT C Roadster(Mercedes-AMG GT C Roadster)<br>GLC 350e 4MATIC(GLC 350e 4MATIC) |
|VIN Number|VIN_Number__c|string | 17 | |
|Vehicle Registration|Vehicle_Registration__c|string | 255 | |
|Registered From|Registered_From__c|date | | |
|Registered To|Registered_To__c|date | | |
|14) Quais dessas outras formas de esteri|X14_Quais_dessas_outras_formas_de_esteri__c|multipicklist | 4099 | Esterilização por laparoscopia(Esterilização por laparoscopia)<br>Contraceptivos não-cirúrgicos (anticonc(Contraceptivos não-cirúrgicos (anticonc)<br>Laqueadura(Laqueadura) |
|Is the Claimant a business?|Is_the_claimant_a_business__c|picklist | 255 | Yes(Yes)<br>No(No) |
|12.1) Outros|X12_1_Outros__c|string | 255 | |
|Technical Measures applied?|Technical_Measures_applied__c|picklist | 255 | Yes(Yes)<br>No(No) |
|Vehicle still in client's possesion?|Vehicle_still_in_client_s_possesion__c|picklist | 255 | Yes(Yes)<br>No(No) |
|Vehicle Mileage|Vehicle_Mileage__c|double | 18.0 | |
|14.1) Outros|X14_1_Outros__c|string | 255 | |
|Date of Purchase|Date_of_Purchase__c|date | | |
|Price Paid|Price_Paid__c|currency | 16.2 | |
|Part Exchange?|Part_Exchange__c|picklist | 255 | Yes(Yes)<br>No(No) |
|Value of Exchanged Part|Value_of_Exchanged_Part__c|currency | 16.2 | |
|How was the vehicle purchased?|How_was_the_vehicle_purchased__c|picklist | 255 | Dealer(Dealer) |
|Secondhand mileage|Secondhand_mileage__c|double | 18.0 | |
|Vendor|Vendor__c|picklist | 255 | Vendor A(Vendor A)<br>Vendor B(Vendor B)<br>Vendor C(Vendor C) |
|Vendor Details|Vendor_Details__c|textarea | 32768 | |
|Approved Dealer|Approved_Dealer__c|picklist | 255 | Dealer 1(Dealer 1)<br>Dealer 2(Dealer 2)<br>Dealer 3(Dealer 3) |
|Dealer Trading Name|Dealer_Trading_Name__c|textarea | 255 | |
|Finance/Leasing Agreement on File?|Finance_Leasing_Agreement_on_File__c|boolean | | |
|Date of Finance Agreement|Date_of_Finance_Agreement__c|date | | |
|Creditor|Creditor__c|string | 255 | |
|Type of Agreement|Type_of_Agreement__c|picklist | 255 | 1(1)<br>2(2)<br>3(3) |
|Deposits|Deposits__c|boolean | | |
|Contributions|Contributions__c|boolean | | |
|Discounts|Discounts__c|boolean | | |
|Total Value|Total_Value_of_Discounts__c|currency | 16.2 | |
|Date of Technical Measures|Date_of_Technical_Measures__c|date | | |
|Name of Garage|Name_of_Garage__c|string | 255 | |
|Engine Modified?|Engine_Modified__c|picklist | 255 | Yes(Yes)<br>No(No) |
|Vehicle Chipturned?|Vehicle_Chipturned__c|picklist | 255 | Yes(Yes)<br>No(No) |
|Date of Sale or Disposition|Date_of_Sale_or_Disposition__c|date | | |
|Mileage at Sale or Disposition|Mileage_at_Sale_or_Disposition__c|double | 18.0 | |
|Why is vehicle no longer in possession?|Why_is_vehicle_no_longer_in_possession__c|picklist | 255 | A(A)<br>B(B)<br>C(C) |
|Selling Price|Selling_Price__c|string | 200 | |
|Was the vehicle part exchanged?|Was_the_vehicle_part_exchanged__c|picklist | 255 | Yes(Yes)<br>No(No) |
|Value of Part Exchanged|Value_of_Part_Exchanged__c|currency | 16.2 | |
|Nature of the Purchaser|Nature_of_the_Purchaser__c|picklist | 255 | 1(1)<br>2(2)<br>3(3) |
|Insurance Payment|Insurance_Payment__c|currency | 16.2 | |
|No Longer in Possession Reason|No_Longer_in_Possession_Reason__c|textarea | 32768 | |
|When did you put Essure?|When_did_you_put_Essure__c|date | | |
|Essure Removed|Were_you_able_to_remove_it__c|picklist | 255 | Yes(Yes)<br>No(No) |
|Co-Consel in Brasil|Co_Consel_in_Brasil__c|picklist | 255 | Yes(Yes)<br>No(No) |
|Current Co-Counsel|Current_Co_Counsel__c|reference | 18 | |
|ID|ID__c|string | 50 | |
|Proof of residence|Proof_of_residence__c|picklist | 255 | Yes(Yes)<br>No(No) |
|Contract Signed|Contract_Signed__c|picklist | 255 | Yes(Yes)<br>No(No)<br>DISCONTINUANCE(DISCONTINUANCE)<br>DISCONTINUANCE TO BE CONFIRMED(DISCONTINUANCE TO BE CONFIRMED)<br>BREAKUP MESSAGE(BREAKUP MESSAGE) |
|Personal ID|Personal_ID__c|picklist | 255 | Yes(Yes)<br>No(No) |
|Signature Date|Signature_Date__c|date | | |
|Essure Removed|Essure_Removed__c|picklist | 255 | Yes(Yes)<br>No(No) |
|Contract PGMBM signature sent via email|Contract_PGMBM_signature_sent_via_email__c|picklist | 255 | Yes(Yes)<br>No(No) |
|Contract PGMBM Sign. sent via Whatsapp|Contract_PGMBM_Signature_sent_via_Whats__c|picklist | 255 | Yes(Yes)<br>No(No) |
|15) Caso outras formas de esterilização|X15_Caso_outras_formas_de_esteriliza_o__c|multipicklist | 4099 | Ausência de cirurgia(Ausência de cirurgia)<br>Facilidade de implantação(Facilidade de implantação)<br>Preço(Preço) |
|Essure implantation hospital status|Essure_implantation_hospital_status__c|picklist | 255 | SUS(SUS)<br>Hospital/Clínica privada(Hospital/Clínica privada) |
|Essure implementation hospital name|Essure_implementation_hospital_name__c|string | 255 | |
|Essure implantation hospital street name|Essure_implantation_hospital_street_name__c|string | 255 | |
|Essure implantation hospital city|Essure_implantation_hospital_city__c|string | 255 | |
|Intake ID|Intake_ID__c|string | 1300 | |
|Essure was an alternative offered|Essure_was_an_alternative_offered__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|Essure how did you hear about it|Essure_how_did_you_hear_about_it__c|picklist | 255 | Recomendação médica por médico do sus(Recomendação médica por médico do sus)<br>Recomendação médica por médico do convênio ou privado(Recomendação médica por médico do convênio ou privado)<br>Propaganda feita em hospital(Propaganda feita em hospital)<br>Outros(Outros) |
|Essure alternatives offered|Essure_alternatives_offered__c|picklist | 255 | Esterilização por laparoscopia(Esterilização por laparoscopia)<br>Contraceptivos não-cirúrgicos (anticoncepcional, DIU, SIU)(Contraceptivos não-cirúrgicos (anticoncepcional, DIU, SIU))<br>Laqueadura(Laqueadura)<br>Outros(Outros) |
|01) Nome completo|X01_Nome_completo__c|string | 255 | |
|Essure reason not tubal ligation|Essure_reason_not_tubal_ligation__c|textarea | 255 | |
|Essure what made you choose|Essure_what_made_you_opt_for__c|multipicklist | 4099 | Ausência de cirurgia(Ausência de cirurgia)<br>Facilidade de implantação(Facilidade de implantação)<br>Preço(Preço)<br>Outros(Outros) |
|Essure risks informed|Essure_risks_informed__c|multipicklist | 4099 | Risco de necessidade de outra cirurgia(Risco de necessidade de outra cirurgia)<br>Dor pélvica(Dor pélvica)<br>Hemorragia(Hemorragia)<br>Migração do dispositivo (o dispositivo pode sair do lugar)(Migração do dispositivo (o dispositivo pode sair do lugar))<br>Possibilidade de rejeição do dispositivo pelo corpo, exigindo que o dispositivo fosse removido(Possibilidade de rejeição do dispositivo pelo corpo, exigindo que o dispositivo fosse removido)<br>Risco de gravidez indesejada(Risco de gravidez indesejada) |
|Essure general anesthesia|Essure_general_anesthesia__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|Essure has performed prior examination|Essure_has_performed_prior_examination__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|Essure procedures to fix the device|Essure__c|multipicklist | 4099 | Sim(Sim)<br>Não(Não) |
|Essure performe a procedure|Essure_performe_a_proce__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|Essure remove|Essure_remove__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|essure when|essure_when__c|string | 255 | |
|essure when perform|essure_when_perform__c|string | 100 | |
|essure when remove|essure_when_remove__c|multipicklist | 4099 | Nos próximos 20 dias(Nos próximos 20 dias)<br>Nos próximos 2 meses(Nos próximos 2 meses)<br>Nos próximos 6 meses(Nos próximos 6 meses)<br>Não tenho nenhuma data aproximada(Não tenho nenhuma data aproximada) |
|Questionnaire Complete|Questionnaire_Complete__c|boolean | | |
|Client Documents Reviewed|Client_Documents_Reviewed__c|boolean | | |
|essure procedure|essure_procedure__c|string | 255 | |
|essure first procedue|essure_first_procedue__c|string | 255 | |
|essure thru|essure_thru__c|picklist | 255 | SUS(SUS)<br>Particular(Particular) |
|Essure Date of procedure|Essure_Date_of_procedure__c|date | | |
|essure indication|essure_indication__c|picklist | 255 | Eletiva(Urgência)<br>não(não) |
|Essure health insurance|Essure_health_insurance__c|string | 200 | |
|essure tests performed|essure_tests_performed__c|string | 255 | |
|Essure type of hospitalization|Type_of_h__c|picklist | 255 | ambulatorial(ambulatorial)<br>hospitalar(hospitalar)<br>clinico(clinico) |
|essure date of hospitalization|essure_date_of_hospitalization__c|date | | |
|Essure date of medical release|Essure_date_of_medical_release__c|date | | |
|essure complication|essure_complication__c|string | 255 | |
|essure problems solved|essure_problems_solved__c|string | 255 | |
|Essure 1|Essure_1__c|date | | |
|essure 2|essure_2__c|date | | |
|essure 3|essure_3__c|multipicklist | 4099 | Li sobre os sintomas em blogs e/ou outros sites(Li sobre os sintomas em blogs e/ou outros sites)<br>Ouvi pessoas que também tiveram o dispositivo implantado reclamarem dos mesmos sintomas(Ouvi pessoas que também tiveram o dispositivo implantado reclamarem dos mesmos sintomas)<br>Li no site da Bayer sobre o dispositivo(Li no site da Bayer sobre o dispositivo)<br>Meu médico me avisou sobre a possível associação(Meu médico me avisou sobre a possível associação)<br>Outros(Outros) |
|essure 4|essure_4__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|essure 5|essure_5__c|picklist | 255 | sim(sim)<br>não(não) |
|Essure 6|Essure_6__c|date | | |
|essure 7|essure_7__c|picklist | 255 | sim(sim)<br>não(não) |
|Essure 8|Essure_8__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|Essure 9|Essure_9__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|Essure 10|Essure_10__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|essure 11|essure_11__c|date | | |
|essure 12|essure_12__c|multipicklist | 4099 | Dor crônica na pelve, virilha, pernas ou pés(Dor crônica na pelve, virilha, pernas ou pés)<br>Dores de cabeça(Dores de cabeça)<br>Fadiga(Fadiga)<br>Fraqueza muscular(Fraqueza muscular)<br>Inchaço e/ou ganho de peso(Inchaço e/ou ganho de peso)<br>Sangramento anormal (geral)(Sangramento anormal (geral))<br>Mudanças no ciclo menstrual(Mudanças no ciclo menstrual)<br>Cólicas menstruais graves(Cólicas menstruais graves)<br>Migração do dispositivo(Migração do dispositivo)<br>Rejeição/Intolerância ao dispositivo(Rejeição/Intolerância ao dispositivo)<br>Quebra do dispositivo(Quebra do dispositivo)<br>Expulsão do dispositivo Essure(Expulsão do dispositivo Essure)<br>Necessidade de cirurgia(Necessidade de cirurgia)<br>Reação alérgica ou de hipersensibilidade(Reação alérgica ou de hipersensibilidade)<br>Doença/distúrbio autoimune(Doença/distúrbio autoimune)<br>Problemas ou alterações na bexiga ou na urina(Problemas ou alterações na bexiga ou na urina)<br>Dispareunia (relação sexual dolorosa)(Dispareunia (relação sexual dolorosa))<br>Perda de libido ou desejo sexual(Perda de libido ou desejo sexual)<br>Falha na oclusão da trompa de Falópio(Falha na oclusão da trompa de Falópio)<br>Perfuração de trompas de falópio(Perfuração de trompas de falópio)<br>Perfuração do útero(Perfuração do útero)<br>Histerectomia(Histerectomia)<br>Ooforectomia (remoção de ovários)(Ooforectomia (remoção de ovários))<br>Salpingectomia (remoção das trompas de falópio)(Salpingectomia (remoção das trompas de falópio))<br>Perda de cabelo(Perda de cabelo)<br>Problemas hormonais(Problemas hormonais)<br>Depressão(Depressão)<br>Outros problemas psicológicos ou psiquiátricos(Outros problemas psicológicos ou psiquiátricos)<br>Outros(Outros) |
|essure 13|essure_13__c|picklist | 255 | sim(sim)<br>não(não) |
|essure 14|essure_14__c|date | | |
|essure 15|essure_15__c|picklist | 255 | Parto normal a termo(Parto normal a termo)<br>Natimorto(Natimorto)<br>Gravidez ectópica(Gravidez ectópica)<br>Aborto espontâneo(Aborto espontâneo)<br>Outro(Outro) |
|Esure 16|Esure_16__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|essure 17|essure_17__c|string | 255 | |
|essure 18|essure_18__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|essure 19|essure_19__c|textarea | 3000 | |
|essure 16|essure_16__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|Days Since Last Contact|Days_Since_Last_Contact__c|double | 18.0 | |
|Total Time Since Last Contact|Total_Time_Since_Last_Contact__c|string | 1300 | |
|Questionnaire Status|Picklist_Status__c|picklist | 255 | Waiting for questionnaire from client(Waiting for questionnaire from client)<br>Partially complete - missing information(Partially complete - missing information)<br>Complete - requires revision(Complete - requires revision)<br>Complete - Reviewed(Complete - Reviewed) |
|essure 19|essure_20__c|multipicklist | 4099 | Doença inflamatória pélvica(Doença inflamatória pélvica)<br>Cirurgia abdominal(Cirurgia abdominal)<br>Cesárea(Cesárea)<br>Nenhum dos casos acima(Nenhum dos casos acima) |
|essure 21|essure_21__c|textarea | 32768 | |
|Document Status|Document_Status__c|picklist | 255 | No documents from client(No documents from client)<br>Missing documents(Missing documents)<br>Additional documents requested(Additional documents requested)<br>All documents received(All documents received) |
|essure 22|essure_22__c|multipicklist | 4099 | Doença inflamatória pélvica(Doença inflamatória pélvica)<br>Cirurgia abdominal(Cirurgia abdominal)<br>Cesárea(Cesárea)<br>Nenhum dos casos acima(Nenhum dos casos acima) |
|essure 23|essure_23__c|string | 250 | |
|essure 24|essure_24__c|textarea | 32768 | |
|essure 25|essure_25__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|essure 26|essure_26__c|textarea | 32768 | |
|essure 27|essure_27__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|Essure 28|Essure_28__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|Essure 29|Essure_29__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|Essure 30|Essure_30__c|textarea | 32768 | |
|essure 31|essure_31__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|essure 32|essure_32__c|textarea | 32768 | |
|essure 33|essure_33__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|essure 34|essure_34__c|textarea | 32768 | |
|Essure 35|Essure_35__c|textarea | 32768 | |
|essure 36|essure_36__c|textarea | 32768 | |
|essure 37|essure_37__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|Essure 38|Essure_38__c|textarea | 32768 | |
|Essure 39|Essure_39__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|essure 40|essure_40__c|textarea | 32768 | |
|essure 41|essure_41__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|essure 42|essure_42__c|textarea | 32768 | |
|essure 43|essure_43__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|essure 44|essure_44__c|textarea | 32768 | |
|essure 45|essure_45__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|Essure 46|Essure_46__c|textarea | 32768 | |
|Essure 47|Essure_47__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|02) Data de nascimento|X02_Data_de_nascimento__c|date | | |
|03.1) Endereço completo Rua|X03_1_Endere_o_completo_Rua__c|string | 200 | |
|03.2) Endereço completo Número|X03_2_Endere_o_completo_N_mero__c|double | 7.0 | |
|03.3) Endereço completo Complemento|X03_3_Endere_o_completo_Complemento__c|string | 50 | |
|03.4) Endereço completo Bairro|X03_4_Endere_o_completo_Bairro__c|string | 50 | |
|03.5) Endereço completo Cidade|X03_5_Endere_o_completo_Cidade__c|string | 50 | |
|03.6) Endereço completo Estado|X03_6_Endere_o_completo_Estado__c|string | 30 | |
|03.7) Endereço completo País|X03_7_Endere_o_completo_Pa_s__c|string | 40 | |
|03.8) Endereço completo CEP|X03_8_Endere_o_completo_CEP__c|string | 30 | |
|04) Telefone (com DDD)|X04_Telefone_com_DDD__c|string | 255 | |
|05) Email|X05_Email__c|email | 80 | |
|06) Idade|X06_Idade__c|picklist | 255 | Menos de 16 anos(Menos de 16 anos)<br>De 16 a 18 anos(De 16 a 18 anos)<br>De 19 a 25 anos(De 19 a 25 anos)<br>De 26 a 30 anos(De 26 a 30 anos)<br>De 30 a 40 anos(De 30 a 40 anos)<br>Mais de 40 anos(Mais de 40 anos) |
|07) Escolaridade|X07_Escolaridade__c|picklist | 255 | Sem escolaridade(Sem escolaridade)<br>Ensino fundamental (1º grau) incompleto(Ensino fundamental (1º grau) incompleto)<br>Ensino fundamental (1º grau) completo(Ensino fundamental (1º grau) completo)<br>Ensino médio (2º grau) incompleto(Ensino médio (2º grau) incompleto)<br>Ensino médio (2º grau) completo(Ensino médio (2º grau) completo)<br>Superior incompleto(Superior incompleto)<br>Superior completo(Superior completo)<br>Mestrado ou doutorado(Mestrado ou doutorado)<br>Não sei informar(Não sei informar) |
|08) Data do implante|X08_Data_do_implante__c|date | | |
|09)  Onde o procedimento de implante do|X09_Onde_o_procedimento_de_implante_do__c|picklist | 255 | SUS(SUS)<br>Hospital/Clínica privada(Hospital/Clínica privada) |
|10) Nome do hospital/clínica no qual o|X10_Nome_do_hospital_cl_nica_no_qual_o__c|string | 50 | |
|11) Endereço do hospital/clínica no qua|X11_Endere_o_do_hospital_cl_nica_no_qua__c|string | 70 | |
|Data|Data__c|date | | |
|statement_of_truth|statement_of_truth__c|string | 255 | |
|13) Alguma outra forma de esterilização|X13_Alguma_outra_forma_de_esteriliza_o__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|Where did the client come from?|Where_did_the_client_come_from__c|picklist | 255 | Whatsapp(Whatsapp)<br>Website(Website)<br>Form(Form) |
|Co-counsel's Name|Co_counsel_s_Name__c|string | 200 | |
|16) Caso tenha sido discutido sobre o pr|X16_Caso_tenha_sido_discutido_sobre_o_pr__c|textarea | 255 | |
|Co-counsel's OAB|Co_counsel_s_OAB__c|string | 200 | |
|Co-counsel's e-mail|Co_counsel_s_email__c|email | 80 | |
|19) Foi aplicada anestesia geral para re|X19_Foi_aplicada_anestesia_geral_para_re__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|20) Você realizou algum exame três meses|X20_Voc_realizou_algum_exame_tr_s_meses__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|21) Você precisou realizar algum procedi|X21_Voc_precisou_realizar_algum_procedi__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|22) Você realizou alguma cirurgia para r|X22_Voc_realizou_alguma_cirurgia_para_r__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|23) Você tem a intenção de realizar a ci|X23_Voc_tem_a_inten_o_de_realizar_a_ci__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|24) Quando? (caso a resposta 21 seja sim|X24_Quando_caso_a_resposta_21_seja_sim__c|picklist | 255 | Nos próximos 20 dias(Nos próximos 20 dias)<br>Nos próximos 2 meses(Nos próximos 2 meses)<br>Nos próximos 6 meses(Nos próximos 6 meses)<br>Não tenho nenhuma data aproximada(Não tenho nenhuma data aproximada)<br>Outra data (caso a cliente já tenha uma data marcada que não se encaixe nas alternativas anteriores)(Outra data (caso a cliente já tenha uma data marcada que não se encaixe nas alternativas anteriores)) |
|25.1a) Tipo de Procedimento:|X25_1a_Tipo_de_Procedimento__c|string | 255 | |
|25.1b) Realizado via:|X25_1b_Realizado_via__c|picklist | 255 | SUS(SUS)<br>Particular(Particular) |
|25.1c) Data de realização:|X25_1c_Data_de_realiza_o__c|date | | |
|25.1d)  Nome do Hospital:|X25_1d_Nome_do_Hospital__c|string | 255 | |
|25.1e) Plano de saúde:|X25_1e_Plano_de_sa_de__c|string | 255 | |
|25.1f) Tipo de indicação:|X25_1f_Tipo_de_indica_o__c|picklist | 255 | Eletiva(Eletiva)<br>Urgência(Urgência)<br>Emergência(Emergência) |
|25.1g) Exames prévios realizados:|X25_1g_Exames_pr_vios_realizados__c|textarea | 255 | |
|25.1h) Tipo de internação:|X25_1h_Tipo_de_interna_o__c|picklist | 255 | ambulatorial(ambulatorial)<br>hospitalar(hospitalar) |
|25.1i)  Data de internação:|X25_1i_Data_de_interna_o__c|date | | |
|25.1j) Data de alta médica:|X25_1j_Data_de_alta_m_dica__c|date | | |
|25.1l) Complicações:|X25_1l_Complica_es__c|textarea | 255 | |
|26) Após a cirurgia/procedimento para re|X26_Ap_s_a_cirurgia_procedimento_para_re__c|textarea | 255 | |
|27) Após o implante do dispositivo, quan|X27_Ap_s_o_implante_do_dispositivo_quan__c|date | | |
|Co-counsel's Phone|Co_counsel_s_Phone__c|string | 20 | |
|Co-counsel's mobile phone|Co_counsel_s_mobile_phone__c|string | 200 | |
|30) As suas suspeitas de associação do d|X30_As_suas_suspeitas_de_associa_o_do_d__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|31) Se sim, quando?|X31_Se_sim_quando__c|date | | |
|32) Você falou para o seu médico que voc|X32_Voc_falou_para_o_seu_m_dico_que_voc__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|33) Se sim, seu médico confirmou a possi|X33_Se_sim_seu_m_dico_confirmou_a_possi__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|34) Você concorda com o diagnóstico do s|X34_Voc_concorda_com_o_diagn_stico_do_s__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|35) Você gostaria de ser reavaliada?|X35_Voc_gostaria_de_ser_reavaliada__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|36) Por favor forneça a data na qual voc|X36_Por_favor_forne_a_a_data_na_qual_voc__c|date | | |
|Co-counsel's Firm|Co_counsel_s_Firm__c|string | 200 | |
|38) Você teve uma gravidez indesejada ap|X38_Voc_teve_uma_gravidez_indesejada_ap__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|39) Por favor forneça a data na qual voc|X39_Por_favor_forne_a_a_data_na_qual_voc__c|date | | |
|Co-counsel's Office Address|Co_counsel_s_Office_Address__c|textarea | 255 | |
|41) Você teve alguma complicação durante|X41_Voc_teve_alguma_complica_o_durante__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|42) Se sim, por favor nos forneça detalh|X42_Se_sim_por_favor_nos_forne_a_detalh__c|textarea | 255 | |
|43) Você teve alguma complicação no part|X43_Voc_teve_alguma_complica_o_no_part__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|44) Se sim, por favor nos forneça detalh|X44_Se_sim_por_favor_nos_forne_a_detalh__c|textarea | 255 | |
|Co-counsel's e-mail 2|Co_counsel_s_e_mail_2__c|email | 80 | |
|46) Forneça quaisquer detalhes adicionai|X46_Forne_a_quaisquer_detalhes_adicionai__c|textarea | 255 | |
|47) Avalie, de 1 a 10, o quanto sua qual|X47_Avalie_de_1_a_10_o_quanto_sua_qual__c|double | 2.0 | |
|47.1)Você teve problemas conjugais ou fa|X47_1_Voc_teve_problemas_conjugais_ou_fa__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|47.2) Descreva brevemente estes problema|X47_2_Descreva_brevemente_estes_problema__c|textarea | 32768 | |
|48.0) Você teve que ficar sem trabalhar|X48_0_Voc_teve_que_ficar_sem_trabalhar__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|48.1) Você acha que o Essure prejudicou|X48_1_Voc_acha_que_o_Essure_prejudicou__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|Identifying Documents|Identifying_Documents__c|picklist | 255 | Yes(Yes)<br>Pending(Pending)<br>N/A(N/A) |
|48.3)  Outro (campo aberto)|X48_3_Outro_campo_aberto__c|textarea | 255 | |
|48.4) A alteração de função ou capacidad|X48_4_A_altera_o_de_fun_o_ou_capacidad__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|48.5) De quanto? (valor em reais)|X48_5_De_quanto_valor_em_reais__c|currency | 7.2 | |
|Proof of Adress|Proof_of_Adress__c|picklist | 255 | Yes(Yes)<br>Pending(Pending)<br>N/A(N/A) |
|48.7) Isso afetou a sua renda familiar?|X48_7_Isso_afetou_a_sua_renda_familiar__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|48.8) Em quanto, aproximadamente? Uma es|X48_8_Em_quanto_aproximadamente_Uma_es__c|currency | 7.2 | |
|49) Você precisou de assistência com seu|X49_Voc_precisou_de_assist_ncia_com_seu__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|50) Você incorreu em algum custo como re|X50_Voc_incorreu_em_algum_custo_como_re__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|51) Você incorreu em algum custo com com|X51_Voc_incorreu_em_algum_custo_com_com__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|51.1) Se sim, qual a estimativa de gasto|X51_1_Se_sim_qual_a_estimativa_de_gasto__c|currency | 7.2 | |
|52) Você incorreu em algum custo com méd|X52_Voc_incorreu_em_algum_custo_com_m_d__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|52.1) Se sim, qual a estimativa de gasto|X52_1_Se_sim_qual_a_estimativa_de_gasto__c|currency | 7.2 | |
|53) Você incorreu em algum custo com adv|X53_Voc_incorreu_em_algum_custo_com_adv__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|53.1) Se sim, qual a estimativa de gasto|X53_1_Se_sim_qual_a_estimativa_de_gasto__c|currency | 16.2 | |
|54) Você incorreu em algum custo com pro|X54_Voc_incorreu_em_algum_custo_com_pro__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|54.1) Se sim, qual a estimativa de gasto|X54_1_Se_sim_qual_a_estimativa_de_gasto__c|currency | 16.2 | |
|55) Você incorreu em algum custo com fis|X55_Voc_incorreu_em_algum_custo_com_fis__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|55.1) Se sim, qual a estimativa de gasto|X55_1_Se_sim_qual_a_estimativa_de_gasto__c|currency | 16.2 | |
|56) Você incorreu em algum custo com ter|X56_Voc_incorreu_em_algum_custo_com_ter__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|56.1) Se sim, qual a estimativa de gasto|X56_1_Se_sim_qual_a_estimativa_de_gasto__c|currency | 16.2 | |
|57) Você incorreu em algum custo com exa|X57_Voc_incorreu_em_algum_custo_com_exa__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|57.1) Se sim, qual a estimativa de gasto|X57_1_Se_sim_qual_a_estimativa_de_gasto__c|currency | 16.2 | |
|58) Você incorreu em algum custo com enc|X58_Voc_incorreu_em_algum_custo_com_enc__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|58.1) Se sim, qual a estimativa de gasto|X58_1_Se_sim_qual_a_estimativa_de_gasto__c|currency | 16.2 | |
|59) Você incorreu em algum custo com bab|X59_Voc_incorreu_em_algum_custo_com_bab__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|59.1) Se sim, qual a estimativa de gasto|X59_1_Se_sim_qual_a_estimativa_de_gasto__c|currency | 16.2 | |
|60) Você incorreu em algum custo com rec|X60_Voc_incorreu_em_algum_custo_com_rec__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|60.1) Se sim, qual a estimativa de gasto|X60_1_Se_sim_qual_a_estimativa_de_gasto__c|currency | 16.2 | |
|61) Por favor descreva quaisquer outros|X61_Por_favor_descreva_quaisquer_outros__c|textarea | 255 | |
|62) Qual foi o seu gasto total decorrent|X62_Qual_foi_o_seu_gasto_total_decorrent__c|currency | 16.2 | |
|ID da lista|ID_da_lista__c|double | 2.0 | |
|CURRENT PHASE|CURRENT_PHASE__c|picklist | 255 | Client - Complete(Client - Complete)<br>Client - pending documents(Client - pending documents)<br>Discontinued - Confirmed(Discontinued - Confirmed)<br>Discontinued - To be confirmed(Discontinued - To be confirmed)<br>Prospect(Prospect) |
|Contrato assinado|Contrato_assinado__c|picklist | 255 | true(true)<br>false(false) |
|NS_ESSURE|NS_ESSURE__c|picklist | 255 | Yes(Yes)<br>Pending(Pending)<br>N/A(N/A) |
|15.1)Outros|X15_1_Outros__c|string | 255 | |
|17) Você foi informada sobre os seguinte|X17_Voc_foi_informada_sobre_os_seguinte__c|multipicklist | 4099 | Risco de necessidade de outra cirurgia(Risco de necessidade de outra cirurgia)<br>Dor pélvica(Dor pélvica)<br>Hemorragia(Hemorragia)<br>Migração do dispositivo (o dispositivo(Migração do dispositivo (o dispositivo)<br>Possibilidade de rejeição do dispositiv(Possibilidade de rejeição do dispositiv)<br>Risco de gravidez indesejada(Risco de gravidez indesejada)<br>Não fui informada sobre nenhum risco(Não fui informada sobre nenhum risco) |
|17.1)Outros efeitos colaterais|X17_1_Outros_efeitos_colaterais__c|textarea | 255 | |
|18) Quem te informou sobre os riscos do|X18_Quem_te_informou_sobre_os_riscos_do__c|multipicklist | 4099 | Médico ou outro profissional de saúde(Médico ou outro profissional de saúde)<br>Bayer(Bayer)<br>Familiar/Amigo/Conhecido(Familiar/Amigo/Conhecido)<br>Notícias na mídia(Notícias na mídia) |
|18.1)Outros|X18_1_Outros__c|textarea | 255 | |
|28) Quando você associou os seus problem|X28_Quando_voc_associou_os_seus_prob_del__c|date | | |
|29) O que a levou a fazer essa associaçã|X29_O_que_a_levou_a_fazer_essa_associa__c|multipicklist | 4099 | Li sobre os sintomas em blogs e/ou outro(Li sobre os sintomas em blogs e/ou outro)<br>Ouvi pessoas que também tiveram o dispos(Ouvi pessoas que também tiveram o dispos)<br>Li no site da Bayer sobre o dispositivo(Li no site da Bayer sobre o dispositivo)<br>Meu médico me avisou sobre a possível as(Meu médico me avisou sobre a possível as) |
|29.1)Outros|X29_1_Outros__c|textarea | 255 | |
|37) Quais sintomas você apresentou? (Mar|X37_Quais_sintomas_voc_apresentou_Mar__c|multipicklist | 4099 | Dor crônica na pelve, virilha, pernas(Dor crônica na pelve, virilha, pernas)<br>Dores de cabeça(Dores de cabeça)<br>Fadiga(Fadiga)<br>Fraqueza muscular(Fraqueza muscular)<br>Inchaço e/ou ganho de peso(Inchaço e/ou ganho de peso)<br>Sangramento anormal (geral)(Sangramento anormal (geral))<br>Mudanças no ciclo menstrual(Mudanças no ciclo menstrual)<br>Cólicas menstruais graves(Cólicas menstruais graves)<br>Migração do dispositivo(Migração do dispositivo)<br>Rejeição/Intolerância ao dispositivo(Rejeição/Intolerância ao dispositivo)<br>Alergia e reações de sensibilidade ou(Alergia e reações de sensibilidade ou)<br>Quebra do dispositivo(Quebra do dispositivo)<br>Expulsão do dispositivo Essure(Expulsão do dispositivo Essure)<br>Necessidade de cirurgia/procedimento(Necessidade de cirurgia/procedimento)<br>Reação alérgica ou de hipersensibilidade(Reação alérgica ou de hipersensibilidade)<br>Doença/distúrbio autoimune(Doença/distúrbio autoimune)<br>Problemas ou alterações na bexiga ou na(Problemas ou alterações na bexiga ou na)<br>Dispareunia (relação sexual dolorosa)(Dispareunia (relação sexual dolorosa))<br>Perda de libido ou desejo sexual(Perda de libido ou desejo sexual)<br>Falha na oclusão da trompa de Falópio(Falha na oclusão da trompa de Falópio)<br>Perfuração de trompas de falópio(Perfuração de trompas de falópio)<br>Perfuração do útero(Perfuração do útero)<br>Perda de cabelo(Perda de cabelo)<br>Problemas hormonais(Problemas hormonais)<br>Depressão(Depressão) |
|37.1)Outros problemas psicológicos ou ps|X37_1_Outros_problemas_psicol_gicos_ou_p__c|textarea | 255 | |
|37.2)) ❏	Outro (por favor, especifique):|X37_2_Outro_por_favor_especifique__c|textarea | 255 | |
|40) Como a gravidez evoluiu?|X40_Como_a_gravidez_evoluiu__c|multipicklist | 4099 | Parto normal a termo(Parto normal a termo)<br>Natimorto(Natimorto)<br>Gravidez ectópica(Gravidez ectópica)<br>Aborto espontâneo(Aborto espontâneo) |
|40.1)Outro (por favor especifique)|X40_1_Outro_por_favor_especifique__c|textarea | 255 | |
|45) Você tem histórico médico de qualque|X45_Voc_tem_hist_rico_m_dico_de_qualque__c|multipicklist | 4099 | Doença inflamatória pélvica(Doença inflamatória pélvica)<br>Cirurgia abdominal(Cirurgia abdominal)<br>Cesárea(Cesárea)<br>Nenhum dos casos acima(Nenhum dos casos acima) |
|48.2) De que forma?|X48_2_De_que_forma__c|multipicklist | 4099 | ainda não pude voltar a trabalhar(ainda não pude voltar a trabalhar)<br>voltei a trabalhar na mesma função, mas(voltei a trabalhar na mesma função, mas)<br>voltei a trabalhar em outra função(voltei a trabalhar em outra função) |
|48.2.2)Outro|X48_2_2_Outro__c|textarea | 255 | |
|48.6) Pelo seu quadro atual, você acha q|X48_6_Pelo_seu_quadro_atual_voc_acha_q__c|picklist | 255 | Sim(Sim)<br>Não(Não) |
|Important comments|Important_comments__c|textarea | 32768 | |
|INFO_PRE_OP|INFO_PRE_OP__c|picklist | 255 | Yes(Yes)<br>Pending(Pending)<br>N/A(N/A) |
|DEV_PROCEDURE_1,2,3|DEV_PROCEDURE_1_2_3__c|picklist | 255 | Yes(Yes)<br>Pending(Pending)<br>N/A(N/A) |
|DEV_PROC_REQ|DEV_PROC_REQ__c|picklist | 255 | Yes(Yes)<br>Pending(Pending)<br>N/A(N/A) |
|DEV_REMOVE_1,2,3|DEV_REMOVE_1_2_3__c|picklist | 255 | Yes(Yes)<br>Pending(Pending)<br>N/A(N/A) |
|MED_REPORT|MED_REPORT__c|picklist | 255 | Yes(Yes)<br>Pending(Pending)<br>N/A(N/A) |
|INSS|INSS__c|picklist | 255 | Yes(Yes)<br>Pending(Pending)<br>N/A(N/A) |
|PRESCRIPTION_1,2,3|PRESCRIPTION_1_2_3__c|picklist | 255 | Yes(Yes)<br>Pending(Pending)<br>N/A(N/A) |
|DOC_NOTE_1,2,3|DOC_NOTE_1_2_3__c|picklist | 255 | Yes(Yes)<br>Pending(Pending)<br>N/A(N/A) |
|EXAMS_PRE|EXAMS_PRE__c|picklist | 255 | Yes(Yes)<br>Pending(Pending)<br>N/A(N/A) |
|EXAMS_POST|EXAMS_POST__c|picklist | 255 | Yes(Yes)<br>Pending(Pending)<br>N/A(N/A) |
|EXAMS_OTHER|EXAMS_OTHER__c|picklist | 255 | Yes(Yes)<br>Pending(Pending)<br>N/A(N/A) |
|DEV_REM_REQ|DEV_REM_REQ__c|picklist | 255 | Yes(Yes)<br>Pending(Pending)<br>N/A(N/A) |
|MAR_CERTIFICATE|MAR_CERTIFICATE__c|picklist | 255 | Yes(Yes)<br>Pending(Pending)<br>N/A(N/A) |
|BIRTH_CERTIFICATE_1,2,3|BIRTH_CERTIFICATE_1_2_3__c|picklist | 255 | Yes(Yes)<br>Pending(Pending)<br>N/A(N/A) |
|ABORTION_DOCS|ABORTION_DOCS__c|picklist | 255 | Yes(Yes)<br>Pending(Pending)<br>N/A(N/A) |
|PERSONAL_REPORT|PERSONAL_REPORT__c|picklist | 255 | Yes(Yes)<br>Pending(Pending)<br>N/A(N/A) |
|Referrall|Referrall__c|picklist | 255 | Yes(Yes)<br>Pending(Pending)<br>N/A(N/A) |
|MESSAGE_RECORDS|MESSAGE_RECORDS__c|picklist | 255 | Yes(Yes)<br>Pending(Pending)<br>N/A(N/A) |
|IMAGE_RECORDS|IMAGE_RECORDS__c|picklist | 255 | Yes(Yes)<br>Pending(Pending)<br>N/A(N/A) |
|INVOICE_MED_1,2,3|INVOICE_MED_1_2_3__c|picklist | 255 | Yes(Yes)<br>Pending(Pending)<br>N/A(N/A) |
|INVOICE_PRIVATE_1,2,3|INVOICE_PRIVATE_1_2_3__c|picklist | 255 | Yes(Yes)<br>Pending(Pending)<br>N/A(N/A) |
|INVOICE_LAWYER_1,2,3|INVOICE_LAWYER_1_2_3__c|picklist | 255 | Yes(Yes)<br>Pending(Pending)<br>N/A(N/A) |
|INVOICE_PROCEDURE_1,2,3|INVOICE_PROCEDURE_1_2_3__c|picklist | 255 | Yes(Yes)<br>Pending(Pending)<br>N/A(N/A) |
|INVOICE_PHYSIO_1,2,3|INVOICE_PHYSIO_1_2_3__c|picklist | 255 | Yes(Yes)<br>Pending(Pending)<br>N/A(N/A) |
|INVOICE_PSYCH_1,2,3|INVOICE_PSYCH_1_2_3__c|picklist | 255 | Yes(Yes)<br>Pending(Pending)<br>N/A(N/A) |
|INVOICE_EXAM_1,2,3|INVOICE_EXAM_1_2_3__c|picklist | 255 | Yes(Yes)<br>Pending(Pending)<br>N/A(N/A) |
|INVOICE_HEALTH_INSURANCE_1,2,3|INVOICE_HEALTH_INSURANCE_1_2_3__c|picklist | 255 | Yes(Yes)<br>Pending(Pending)<br>N/A(N/A) |
|INVOICE_CARE|INVOICE_CARE__c|picklist | 255 | Yes(Yes)<br>Pending(Pending)<br>N/A(N/A) |
|INVOICE_TRANSPORTATION|INVOICE_TRANSPORTATION__c|picklist | 255 | Yes(Yes)<br>Pending(Pending)<br>N/A(N/A) |
|OTHER_INVOICES|OTHER_INVOICES__c|picklist | 255 | Yes(Yes)<br>Pending(Pending)<br>N/A(N/A) |
|Children Documents|Children_Documents__c|picklist | 255 | Yes(Yes)<br>Pending(Pending)<br>N/A(N/A) |
|Cocounsel|Cocounsel__c|picklist | 255 | Yes(Yes)<br>Pending(Pending)<br>N/A(N/A) |
|Interview|Interview__c|picklist | 255 | Yes(Yes)<br>Pending(Pending)<br>N/A(N/A) |
|OTHER_PROCEDURES|OTHER_PROCEDURES__c|picklist | 255 | Yes(Yes)<br>Pending(Pending)<br>N/A(N/A) |
|CFA Version|CFA_Version__c|string | 100 | |
|Personal limited business|Personal_limited_business__c|picklist | 255 | Yes(Yes)<br>No(No) |
|Personal Business Name|Personal_Business_Name__c|string | 200 | |
|Personal Company Role|Personal_company_role__c|picklist | 255 | Director(Director)<br>Officer(Officer)<br>Secretary(Secretary)<br>Other(Other) |
|Observation|Observation__c|textarea | 32768 | |
|State|State__c|string | 200 | |
|Client's CPF|Client_s_CPF__c|string | 200 | |
|Client's Address|Client_s_Address__c|string | 200 | |
|Client's City|Client_s_City__c|string | 200 | |
|CEP|CEP__c|string | 200 | |
|Medical Report|Medical_Report__c|boolean | | |
|Survey_External_Id|Survey_External_Id__c|string | 200 | |
|lead_source|lead_source__c|picklist | 255 | Social Media (Facebook, Instagram, Twitter, LinkedIn etc)(Social Media (Facebook, Instagram, Twitter, LinkedIn etc))<br>Search engine (Google,Bing etc)(Search engine (Google,Bing etc))<br>Television Ad(Television Ad)<br>Radio Ad(Radio Ad)<br>Other (please specify)(Other (please specify))<br>Word of mouth(Word of mouth) |
|lead_source_other|lead_source_other__c|string | 100 | | 

 ## Relationships 

| Name | Child Object | Field |
| --- | --- | --- |
|ActivityHistories|ActivityHistory|WhatId|
|AttachedContentDocuments|AttachedContentDocument|LinkedEntityId|
|AttachedContentNotes|AttachedContentNote|LinkedEntityId|
|Attachments|Attachment|ParentId|
|Co_counsels_Project__r|Co_counse__c|Matter_p__c|
|RecordAssociatedGroups|CollaborationGroupRecord|RecordId|
|CombinedAttachments|CombinedAttachment|ParentId|
|null|ContentDistribution|RelatedRecordId|
|ContentDocumentLinks|ContentDocumentLink|LinkedEntityId|
|null|ContentVersion|FirstPublishLocationId|
|DuplicateRecordItems|DuplicateRecordItem|RecordId|
|Emails|EmailMessage|RelatedToId|
|FeedSubscriptionsForEntity|EntitySubscription|ParentId|
|Events|Event|WhatId|
|null|EventChangeEvent|WhatId|
|null|EventRelationChangeEvent|RelationId|
|null|FeedComment|ParentId|
|null|FeedItem|ParentId|
|null|FlowRecordRelation|RelatedRecordId|
|litify_pm__Activities__r|LookedUpFromActivity|litify_pm__Matter__c|
|Notes|Note|ParentId|
|NotesAndAttachments|NoteAndAttachment|ParentId|
|OpenActivities|OpenActivity|WhatId|
|ProcessInstances|ProcessInstance|TargetObjectId|
|ProcessSteps|ProcessInstanceHistory|TargetObjectId|
|RecordActions|RecordAction|RecordId|
|Tasks|Task|WhatId|
|null|TaskChangeEvent|WhatId|
|TopicAssignments|TopicAssignment|EntityId|
|Vehicles__r|Vehicle__c|Matter__c|
|litify_pm__Bills__r|litify_pm__Bill__c|litify_pm__Matter__c|
|litify_pm__CalendarRulesTriggers__r|litify_pm__CalendarRulesTrigger__c|litify_pm__Matter__c|
|litify_pm__Damages__r|litify_pm__Damage__c|litify_pm__Matter__c|
|litify_pm__Expenses__r|litify_pm__Expense__c|litify_pm__Matter__c|
|litify_pm__Injuries__r|litify_pm__Injury__c|litify_pm__Matter__c|
|litify_pm__Insurances__r|litify_pm__Insurance__c|litify_pm__Matter__c|
|litify_pm__Intakes__r|litify_pm__Intake__c|litify_pm__Matter__c|
|litify_pm__Liens__r|litify_pm__Lien__c|litify_pm__lit_Matter__c|
|litify_pm__Lineup_Members__r|litify_pm__Lineup_Member__c|litify_pm__Matter__c|
|litify_pm__Matter_Stage_Activities__r|litify_pm__Matter_Stage_Activity__c|litify_pm__Matter__c|
|litify_pm__Matter_Teams__r|litify_pm__Matter_Team_Member__c|litify_pm__Matter__c|
|Feeds|litify_pm__Matter__Feed|ParentId|
|Histories|litify_pm__Matter__History|ParentId|
|Shares|litify_pm__Matter__Share|ParentId|
|Matters__r|litify_pm__Matter__c|Parent_Matter__c|
|litify_pm__Negotiations__r|litify_pm__Negotiation__c|litify_pm__Matter__c|
|litify_pm__Question_Answers__r|litify_pm__Question_Answer__c|litify_pm__Matter__c|
|litify_pm__Questionnaire_Output__r|litify_pm__Questionnaire_Output__c|litify_pm__Matter__c|
|litify_pm__Referrals__r|litify_pm__Referral__c|litify_pm__Matter__c|
|litify_pm__Requests__r|litify_pm__Request__c|litify_pm__Matter__c|
|litify_pm__LitifyResolutions__r|litify_pm__Resolution__c|litify_pm__Matter__c|
|litify_pm__Retainers__r|litify_pm__Retainer__c|litify_pm__Matter__c|
|litify_pm__Roles__r|litify_pm__Role__c|litify_pm__Matter__c|
|litify_pm__Time_Entries__r|litify_pm__Time_Entry__c|litify_pm__Matter__c|
|litify_pm__lit_Notes__r|litify_pm__lit_Note__c|litify_pm__lit_Matter__c|