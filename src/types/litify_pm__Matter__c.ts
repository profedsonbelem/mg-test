/** @constant salesforceName Type name in salesforce */
 export const salesforceName = "litify_pm__Matter__c";

/** @constant allFields All fields, comma separated.
 * As salesforce doesn't support 'SELECT *', use 'SELECT `${allFields}`' 
 */
 export const allFields = "Id, OwnerId, IsDeleted, Name, RecordTypeId, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, LastViewedDate, LastReferencedDate, litify_pm__Billable_Matter__c, litify_pm__Billing_Type__c, litify_pm__Budget_Used__c, litify_pm__Budget__c, litify_pm__Case_Type__c, litify_pm__Client__c, litify_pm__Close_Date__c, litify_pm__Closed_Reason_Details__c, litify_pm__Closed_Reason__c, litify_pm__Contingency_Fee_Rate__c, litify_pm__Description__c, litify_pm__Display_Name__c, litify_pm__Fee_Amount__c, litify_pm__Gross_Recovery__c, litify_pm__Hard_Costs__c, litify_pm__Hourly_Rate__c, litify_pm__Ignore_Default_Plan__c, litify_pm__Incident_date__c, litify_pm__Limitations_date_satisfied__c, litify_pm__Lost_Reason__c, litify_pm__Matter_Address_1__c, litify_pm__Matter_Address_2__c, litify_pm__Matter_City__c, litify_pm__Matter_Has_Budget__c, litify_pm__Matter_Location__c, litify_pm__Matter_Plan__c, litify_pm__Matter_Postal_Code__c, litify_pm__Matter_Stage_Activity_Formula__c, litify_pm__Matter_Stage_Activity__c, litify_pm__Matter_State__c, litify_pm__Matter__c, litify_pm__Net_Recovery__c, litify_pm__Notify_users_when_budget_reached__c, litify_pm__Open_Date__c, litify_pm__Originating_Attorney__c, litify_pm__Pending_Date__c, litify_pm__Practice_Area2__c, litify_pm__Primary_Intake__c, litify_pm__Principal_Attorney__c, litify_pm__Referral__c, litify_pm__Retainer_Used__c, litify_pm__Soft_Costs__c, litify_pm__Source_Type__c, litify_pm__Source__c, litify_pm__Status__c, litify_pm__Statute_Of_Limitations__c, litify_pm__Total_Amount_Billable__c, litify_pm__Total_Amount_Due__c, litify_pm__Total_Matter_Value__c, litify_pm__Total_matter_cost__c, litify_pm__Turn_Down_Details__c, litify_pm__Use_same_client_location__c, litify_pm__total_amount_paid__c, litify_pm__Total_Amount_Billed__c, litify_pm__Total_Amount_Expensed_Due__c, litify_pm__Total_Amount_Expensed__c, litify_pm__Total_Amount_Retained__c, litify_pm__Total_Amount_Time_Entries_Billed__c, litify_pm__Total_Amount_Time_Entries_Due__c, litify_pm__Total_Amount_Time_Entries_Unpaid__c, litify_pm__Total_Amount_Unbilled_Expenses__c, litify_pm__Total_Hours__c, litify_pm__total_amount_time_entries__c, litify_pm__Last_Called_At__c, litify_pm__Last_Emailed_At__c, litify_pm__Total_Calls__c, litify_pm__Total_Emails__c, litify_pm__Case_Title__c, litify_pm__Closed_Date__c, litify_pm__Court__c, litify_pm__Default_Matter_Team__c, litify_pm__Matter_Team_Modified__c, litify_pm__Discharge_Date__c, litify_pm__Docket_Number__c, litify_pm__FeesDueToOthers__c, litify_pm__Filed_Date__c, litify_pm__Moved_to_Litigation__c, litify_pm__OpposingParty__c, litify_pm__Pre_Lit_Offer_Amount__c, litify_pm__Trial_Date__c, litify_pm__Total_Damages__c, litify_pm__Amount_Due_to_Client__c, litify_pm__Companion__c, litify_pm__Net_Attorney_Fee__c, litify_pm__lit_Exact_Source__c, litify_pm__lit_Matter_County__c, Parent_Matter__c, X12_Como_voc_ficou_sabendo_do_Essure__c, litify_pm__Manual_Statute_of_Limitations__c, litify_pm__Starting_Matter_Stage_Override__c, litify_pm__lit_Case_Manager__c, litify_pm__lit_Display_Name_Link__c, litify_tso_My_Matter__c, litify_pm__lit_Partner_Attorney_Fee__c, litify_pm__lit_Referral_Partner_Fee_Percent__c, litify_pm__lit_Referral_Partner__c, litify_pm__lit_Total_Client_Payout__c, litify_pm__lit_Damage_Total__c, litify_pm__lit_Expense_Total__c, litify_pm__lit_Lien_Total__c, Client__c, Vehicle_Model__c, VIN_Number__c, Vehicle_Registration__c, Registered_From__c, Registered_To__c, X14_Quais_dessas_outras_formas_de_esteri__c, Is_the_claimant_a_business__c, X12_1_Outros__c, Technical_Measures_applied__c, Vehicle_still_in_client_s_possesion__c, Vehicle_Mileage__c, X14_1_Outros__c, Date_of_Purchase__c, Price_Paid__c, Part_Exchange__c, Value_of_Exchanged_Part__c, How_was_the_vehicle_purchased__c, Secondhand_mileage__c, Vendor__c, Vendor_Details__c, Approved_Dealer__c, Dealer_Trading_Name__c, Finance_Leasing_Agreement_on_File__c, Date_of_Finance_Agreement__c, Creditor__c, Type_of_Agreement__c, Deposits__c, Contributions__c, Discounts__c, Total_Value_of_Discounts__c, Date_of_Technical_Measures__c, Name_of_Garage__c, Engine_Modified__c, Vehicle_Chipturned__c, Date_of_Sale_or_Disposition__c, Mileage_at_Sale_or_Disposition__c, Why_is_vehicle_no_longer_in_possession__c, Selling_Price__c, Was_the_vehicle_part_exchanged__c, Value_of_Part_Exchanged__c, Nature_of_the_Purchaser__c, Insurance_Payment__c, No_Longer_in_Possession_Reason__c, When_did_you_put_Essure__c, Were_you_able_to_remove_it__c, Co_Consel_in_Brasil__c, Current_Co_Counsel__c, ID__c, Proof_of_residence__c, Contract_Signed__c, Personal_ID__c, Signature_Date__c, Essure_Removed__c, Contract_PGMBM_signature_sent_via_email__c, Contract_PGMBM_Signature_sent_via_Whats__c, X15_Caso_outras_formas_de_esteriliza_o__c, Essure_implantation_hospital_status__c, Essure_implementation_hospital_name__c, Essure_implantation_hospital_street_name__c, Essure_implantation_hospital_city__c, Intake_ID__c, Essure_was_an_alternative_offered__c, Essure_how_did_you_hear_about_it__c, Essure_alternatives_offered__c, X01_Nome_completo__c, Essure_reason_not_tubal_ligation__c, Essure_what_made_you_opt_for__c, Essure_risks_informed__c, Essure_general_anesthesia__c, Essure_has_performed_prior_examination__c, Essure__c, Essure_performe_a_proce__c, Essure_remove__c, essure_when__c, essure_when_perform__c, essure_when_remove__c, Questionnaire_Complete__c, Client_Documents_Reviewed__c, essure_procedure__c, essure_first_procedue__c, essure_thru__c, Essure_Date_of_procedure__c, essure_indication__c, Essure_health_insurance__c, essure_tests_performed__c, Type_of_h__c, essure_date_of_hospitalization__c, Essure_date_of_medical_release__c, essure_complication__c, essure_problems_solved__c, Essure_1__c, essure_2__c, essure_3__c, essure_4__c, essure_5__c, Essure_6__c, essure_7__c, Essure_8__c, Essure_9__c, Essure_10__c, essure_11__c, essure_12__c, essure_13__c, essure_14__c, essure_15__c, Esure_16__c, essure_17__c, essure_18__c, essure_19__c, essure_16__c, Days_Since_Last_Contact__c, Total_Time_Since_Last_Contact__c, Picklist_Status__c, essure_20__c, essure_21__c, Document_Status__c, essure_22__c, essure_23__c, essure_24__c, essure_25__c, essure_26__c, essure_27__c, Essure_28__c, Essure_29__c, Essure_30__c, essure_31__c, essure_32__c, essure_33__c, essure_34__c, Essure_35__c, essure_36__c, essure_37__c, Essure_38__c, Essure_39__c, essure_40__c, essure_41__c, essure_42__c, essure_43__c, essure_44__c, essure_45__c, Essure_46__c, Essure_47__c, X02_Data_de_nascimento__c, X03_1_Endere_o_completo_Rua__c, X03_2_Endere_o_completo_N_mero__c, X03_3_Endere_o_completo_Complemento__c, X03_4_Endere_o_completo_Bairro__c, X03_5_Endere_o_completo_Cidade__c, X03_6_Endere_o_completo_Estado__c, X03_7_Endere_o_completo_Pa_s__c, X03_8_Endere_o_completo_CEP__c, X04_Telefone_com_DDD__c, X05_Email__c, X06_Idade__c, X07_Escolaridade__c, X08_Data_do_implante__c, X09_Onde_o_procedimento_de_implante_do__c, X10_Nome_do_hospital_cl_nica_no_qual_o__c, X11_Endere_o_do_hospital_cl_nica_no_qua__c, Data__c, statement_of_truth__c, X13_Alguma_outra_forma_de_esteriliza_o__c, Where_did_the_client_come_from__c, Co_counsel_s_Name__c, X16_Caso_tenha_sido_discutido_sobre_o_pr__c, Co_counsel_s_OAB__c, Co_counsel_s_email__c, X19_Foi_aplicada_anestesia_geral_para_re__c, X20_Voc_realizou_algum_exame_tr_s_meses__c, X21_Voc_precisou_realizar_algum_procedi__c, X22_Voc_realizou_alguma_cirurgia_para_r__c, X23_Voc_tem_a_inten_o_de_realizar_a_ci__c, X24_Quando_caso_a_resposta_21_seja_sim__c, X25_1a_Tipo_de_Procedimento__c, X25_1b_Realizado_via__c, X25_1c_Data_de_realiza_o__c, X25_1d_Nome_do_Hospital__c, X25_1e_Plano_de_sa_de__c, X25_1f_Tipo_de_indica_o__c, X25_1g_Exames_pr_vios_realizados__c, X25_1h_Tipo_de_interna_o__c, X25_1i_Data_de_interna_o__c, X25_1j_Data_de_alta_m_dica__c, X25_1l_Complica_es__c, X26_Ap_s_a_cirurgia_procedimento_para_re__c, X27_Ap_s_o_implante_do_dispositivo_quan__c, Co_counsel_s_Phone__c, Co_counsel_s_mobile_phone__c, X30_As_suas_suspeitas_de_associa_o_do_d__c, X31_Se_sim_quando__c, X32_Voc_falou_para_o_seu_m_dico_que_voc__c, X33_Se_sim_seu_m_dico_confirmou_a_possi__c, X34_Voc_concorda_com_o_diagn_stico_do_s__c, X35_Voc_gostaria_de_ser_reavaliada__c, X36_Por_favor_forne_a_a_data_na_qual_voc__c, Co_counsel_s_Firm__c, X38_Voc_teve_uma_gravidez_indesejada_ap__c, X39_Por_favor_forne_a_a_data_na_qual_voc__c, Co_counsel_s_Office_Address__c, X41_Voc_teve_alguma_complica_o_durante__c, X42_Se_sim_por_favor_nos_forne_a_detalh__c, X43_Voc_teve_alguma_complica_o_no_part__c, X44_Se_sim_por_favor_nos_forne_a_detalh__c, Co_counsel_s_e_mail_2__c, X46_Forne_a_quaisquer_detalhes_adicionai__c, X47_Avalie_de_1_a_10_o_quanto_sua_qual__c, X47_1_Voc_teve_problemas_conjugais_ou_fa__c, X47_2_Descreva_brevemente_estes_problema__c, X48_0_Voc_teve_que_ficar_sem_trabalhar__c, X48_1_Voc_acha_que_o_Essure_prejudicou__c, Identifying_Documents__c, X48_3_Outro_campo_aberto__c, X48_4_A_altera_o_de_fun_o_ou_capacidad__c, X48_5_De_quanto_valor_em_reais__c, Proof_of_Adress__c, X48_7_Isso_afetou_a_sua_renda_familiar__c, X48_8_Em_quanto_aproximadamente_Uma_es__c, X49_Voc_precisou_de_assist_ncia_com_seu__c, X50_Voc_incorreu_em_algum_custo_como_re__c, X51_Voc_incorreu_em_algum_custo_com_com__c, X51_1_Se_sim_qual_a_estimativa_de_gasto__c, X52_Voc_incorreu_em_algum_custo_com_m_d__c, X52_1_Se_sim_qual_a_estimativa_de_gasto__c, X53_Voc_incorreu_em_algum_custo_com_adv__c, X53_1_Se_sim_qual_a_estimativa_de_gasto__c, X54_Voc_incorreu_em_algum_custo_com_pro__c, X54_1_Se_sim_qual_a_estimativa_de_gasto__c, X55_Voc_incorreu_em_algum_custo_com_fis__c, X55_1_Se_sim_qual_a_estimativa_de_gasto__c, X56_Voc_incorreu_em_algum_custo_com_ter__c, X56_1_Se_sim_qual_a_estimativa_de_gasto__c, X57_Voc_incorreu_em_algum_custo_com_exa__c, X57_1_Se_sim_qual_a_estimativa_de_gasto__c, X58_Voc_incorreu_em_algum_custo_com_enc__c, X58_1_Se_sim_qual_a_estimativa_de_gasto__c, X59_Voc_incorreu_em_algum_custo_com_bab__c, X59_1_Se_sim_qual_a_estimativa_de_gasto__c, X60_Voc_incorreu_em_algum_custo_com_rec__c, X60_1_Se_sim_qual_a_estimativa_de_gasto__c, X61_Por_favor_descreva_quaisquer_outros__c, X62_Qual_foi_o_seu_gasto_total_decorrent__c, ID_da_lista__c, CURRENT_PHASE__c, Contrato_assinado__c, NS_ESSURE__c, X15_1_Outros__c, X17_Voc_foi_informada_sobre_os_seguinte__c, X17_1_Outros_efeitos_colaterais__c, X18_Quem_te_informou_sobre_os_riscos_do__c, X18_1_Outros__c, X28_Quando_voc_associou_os_seus_prob_del__c, X29_O_que_a_levou_a_fazer_essa_associa__c, X29_1_Outros__c, X37_Quais_sintomas_voc_apresentou_Mar__c, X37_1_Outros_problemas_psicol_gicos_ou_p__c, X37_2_Outro_por_favor_especifique__c, X40_Como_a_gravidez_evoluiu__c, X40_1_Outro_por_favor_especifique__c, X45_Voc_tem_hist_rico_m_dico_de_qualque__c, X48_2_De_que_forma__c, X48_2_2_Outro__c, X48_6_Pelo_seu_quadro_atual_voc_acha_q__c, Important_comments__c, INFO_PRE_OP__c, DEV_PROCEDURE_1_2_3__c, DEV_PROC_REQ__c, DEV_REMOVE_1_2_3__c, MED_REPORT__c, INSS__c, PRESCRIPTION_1_2_3__c, DOC_NOTE_1_2_3__c, EXAMS_PRE__c, EXAMS_POST__c, EXAMS_OTHER__c, DEV_REM_REQ__c, MAR_CERTIFICATE__c, BIRTH_CERTIFICATE_1_2_3__c, ABORTION_DOCS__c, PERSONAL_REPORT__c, Referrall__c, MESSAGE_RECORDS__c, IMAGE_RECORDS__c, INVOICE_MED_1_2_3__c, INVOICE_PRIVATE_1_2_3__c, INVOICE_LAWYER_1_2_3__c, INVOICE_PROCEDURE_1_2_3__c, INVOICE_PHYSIO_1_2_3__c, INVOICE_PSYCH_1_2_3__c, INVOICE_EXAM_1_2_3__c, INVOICE_HEALTH_INSURANCE_1_2_3__c, INVOICE_CARE__c, INVOICE_TRANSPORTATION__c, OTHER_INVOICES__c, Children_Documents__c, Cocounsel__c, Interview__c, OTHER_PROCEDURES__c, CFA_Version__c, Personal_limited_business__c, Personal_Business_Name__c, Personal_company_role__c, Observation__c, State__c, Client_s_CPF__c, Client_s_Address__c, Client_s_City__c, CEP__c, Medical_Report__c, Survey_External_Id__c, lead_source__c, lead_source_other__c";

/** @interface litify_pm__Matter__c (labeled as Matter)
 * Check litify_pm__Matter__c.md for fields labels and relationship info.
 */
export interface litify_pm__Matter__c {
/** Max length: 18. */
	Id?: string;
/** Check Group,User relationship Owner. */
	OwnerId?: any;
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
	litify_pm__Billable_Matter__c?: boolean;
	litify_pm__Billing_Type__c?: litify_pm__Billing_Type__cType;
/** // Check .md for details. */
	litify_pm__Budget_Used__c?: any;
/** Max length: 16.2. */
	litify_pm__Budget__c?: number;
/** Check litify_pm__Case_Type__c relationship litify_pm__Case_Type__r. */
	litify_pm__Case_Type__c?: any;
/** Check Account relationship litify_pm__Client__r. */
	litify_pm__Client__c: any;
/** YYYY-MM-DD */
	litify_pm__Close_Date__c?: string;
	litify_pm__Closed_Reason_Details__c?: litify_pm__Closed_Reason_Details__cType;
	litify_pm__Closed_Reason__c?: litify_pm__Closed_Reason__cType;
/** // Check .md for details. */
	litify_pm__Contingency_Fee_Rate__c?: any;
/** Max length: 131072. */
	litify_pm__Description__c?: string;
/** Max length: 255 */
	litify_pm__Display_Name__c?: string;
/** Max length: 16.2. */
	litify_pm__Fee_Amount__c?: number;
/** Max length: 16.2. */
	litify_pm__Gross_Recovery__c?: number;
/** Max length: 16.2. */
	litify_pm__Hard_Costs__c?: number;
/** Max length: 16.2. */
	litify_pm__Hourly_Rate__c?: number;
	litify_pm__Ignore_Default_Plan__c?: boolean;
/** YYYY-MM-DD */
	litify_pm__Incident_date__c?: string;
	litify_pm__Limitations_date_satisfied__c?: boolean;
/** Max length: 255. */
	litify_pm__Lost_Reason__c?: string;
/** Max length: 255 */
	litify_pm__Matter_Address_1__c?: string;
/** Max length: 255 */
	litify_pm__Matter_Address_2__c?: string;
/** Max length: 255 */
	litify_pm__Matter_City__c?: string;
	litify_pm__Matter_Has_Budget__c?: boolean;
/** Max length: 1300 */
	litify_pm__Matter_Location__c?: string;
/** Check litify_pm__Matter_Plan__c relationship litify_pm__Matter_Plan__r. */
	litify_pm__Matter_Plan__c?: any;
/** Max length: 255 */
	litify_pm__Matter_Postal_Code__c?: string;
/** Max length: 1300 */
	litify_pm__Matter_Stage_Activity_Formula__c?: string;
/** Check litify_pm__Matter_Stage_Activity__c relationship litify_pm__Matter_Stage_Activity__r. */
	litify_pm__Matter_Stage_Activity__c?: any;
	litify_pm__Matter_State__c?: litify_pm__Matter_State__cType;
/** Max length: 18.0. */
	litify_pm__Matter__c?: number;
/** Max length: 16.2. */
	litify_pm__Net_Recovery__c?: number;
/** // Check .md for details. */
	litify_pm__Notify_users_when_budget_reached__c?: any;
/** YYYY-MM-DD */
	litify_pm__Open_Date__c?: string;
/** Check User relationship litify_pm__Originating_Attorney__r. */
	litify_pm__Originating_Attorney__c?: any;
/** YYYY-MM-DD */
	litify_pm__Pending_Date__c?: string;
/** Max length: 1300 */
	litify_pm__Practice_Area2__c?: string;
/** Check litify_pm__Intake__c relationship litify_pm__Primary_Intake__r. */
	litify_pm__Primary_Intake__c?: any;
/** Check User relationship litify_pm__Principal_Attorney__r. */
	litify_pm__Principal_Attorney__c?: any;
/** Check litify_pm__Referral__c relationship litify_pm__Referral__r. */
	litify_pm__Referral__c?: any;
/** // Check .md for details. */
	litify_pm__Retainer_Used__c?: any;
/** Max length: 16.2. */
	litify_pm__Soft_Costs__c?: number;
	litify_pm__Source_Type__c?: litify_pm__Source_Type__cType;
/** Check litify_pm__Source__c relationship litify_pm__Source__r. */
	litify_pm__Source__c?: any;
	litify_pm__Status__c?: litify_pm__Status__cType;
/** YYYY-MM-DD */
	litify_pm__Statute_Of_Limitations__c?: string;
/** Max length: 16.2. */
	litify_pm__Total_Amount_Billable__c?: number;
/** Max length: 16.2. */
	litify_pm__Total_Amount_Due__c?: number;
/** Max length: 16.2. */
	litify_pm__Total_Matter_Value__c?: number;
/** Max length: 16.2. */
	litify_pm__Total_matter_cost__c?: number;
/** Max length: 32768. */
	litify_pm__Turn_Down_Details__c?: string;
	litify_pm__Use_same_client_location__c?: boolean;
/** Max length: 16.2. */
	litify_pm__total_amount_paid__c?: number;
/** Max length: 16.2. */
	litify_pm__Total_Amount_Billed__c?: number;
/** Max length: 16.2. */
	litify_pm__Total_Amount_Expensed_Due__c?: number;
/** Max length: 16.2. */
	litify_pm__Total_Amount_Expensed__c?: number;
/** Max length: 16.2. */
	litify_pm__Total_Amount_Retained__c?: number;
/** Max length: 16.2. */
	litify_pm__Total_Amount_Time_Entries_Billed__c?: number;
/** Max length: 16.2. */
	litify_pm__Total_Amount_Time_Entries_Due__c?: number;
/** Max length: 16.2. */
	litify_pm__Total_Amount_Time_Entries_Unpaid__c?: number;
/** Max length: 16.2. */
	litify_pm__Total_Amount_Unbilled_Expenses__c?: number;
/** Max length: 16.2. */
	litify_pm__Total_Hours__c?: number;
/** Max length: 16.2. */
	litify_pm__total_amount_time_entries__c?: number;
	litify_pm__Last_Called_At__c?: Date;
	litify_pm__Last_Emailed_At__c?: Date;
/** Max length: 18.0. */
	litify_pm__Total_Calls__c?: number;
/** Max length: 18.0. */
	litify_pm__Total_Emails__c?: number;
/** Max length: 255 */
	litify_pm__Case_Title__c?: string;
/** YYYY-MM-DD */
	litify_pm__Closed_Date__c?: string;
/** Check Account relationship litify_pm__Court__r. */
	litify_pm__Court__c?: any;
/** Check litify_pm__Default_Matter_Team__c relationship litify_pm__Default_Matter_Team__r. */
	litify_pm__Default_Matter_Team__c?: any;
	litify_pm__Matter_Team_Modified__c?: boolean;
/** YYYY-MM-DD */
	litify_pm__Discharge_Date__c?: string;
/** Max length: 100 */
	litify_pm__Docket_Number__c?: string;
/** Max length: 16.2. */
	litify_pm__FeesDueToOthers__c?: number;
/** YYYY-MM-DD */
	litify_pm__Filed_Date__c?: string;
/** YYYY-MM-DD */
	litify_pm__Moved_to_Litigation__c?: string;
/** Check Account relationship litify_pm__OpposingParty__r. */
	litify_pm__OpposingParty__c?: any;
/** Max length: 16.2. */
	litify_pm__Pre_Lit_Offer_Amount__c?: number;
/** YYYY-MM-DD */
	litify_pm__Trial_Date__c?: string;
/** Max length: 16.2. */
	litify_pm__Total_Damages__c?: number;
/** Max length: 16.2. */
	litify_pm__Amount_Due_to_Client__c?: number;
/** Check litify_pm__Companion__c relationship litify_pm__Companion__r. */
	litify_pm__Companion__c?: any;
/** Max length: 16.2. */
	litify_pm__Net_Attorney_Fee__c?: number;
/** Max length: 255 */
	litify_pm__lit_Exact_Source__c?: string;
/** Max length: 255 */
	litify_pm__lit_Matter_County__c?: string;
/** Check litify_pm__Matter__c relationship Parent_Matter__r. */
	Parent_Matter__c?: any;
	X12_Como_voc_ficou_sabendo_do_Essure__c?: X12_Como_voc_ficou_sabendo_do_Essure__cType[];
	litify_pm__Manual_Statute_of_Limitations__c?: boolean;
/** Check litify_pm__Matter_Stage__c relationship litify_pm__Starting_Matter_Stage_Override__r. */
	litify_pm__Starting_Matter_Stage_Override__c?: any;
/** Check User relationship litify_pm__lit_Case_Manager__r. */
	litify_pm__lit_Case_Manager__c?: any;
/** Max length: 1300 */
	litify_pm__lit_Display_Name_Link__c?: string;
	litify_tso_My_Matter__c?: boolean;
/** Max length: 10.2. */
	litify_pm__lit_Partner_Attorney_Fee__c?: number;
/** // Check .md for details. */
	litify_pm__lit_Referral_Partner_Fee_Percent__c?: any;
/** Check litify_pm__Firm__c relationship litify_pm__lit_Referral_Partner__r. */
	litify_pm__lit_Referral_Partner__c?: any;
/** Max length: 16.2. */
	litify_pm__lit_Total_Client_Payout__c?: number;
/** Max length: 16.2. */
	litify_pm__lit_Damage_Total__c?: number;
/** Max length: 16.2. */
	litify_pm__lit_Expense_Total__c?: number;
/** Max length: 16.2. */
	litify_pm__lit_Lien_Total__c?: number;
	Client__c?: Client__cType;
	Vehicle_Model__c?: Vehicle_Model__cType;
/** Max length: 17 */
	VIN_Number__c?: string;
/** Max length: 255 */
	Vehicle_Registration__c?: string;
/** YYYY-MM-DD */
	Registered_From__c?: string;
/** YYYY-MM-DD */
	Registered_To__c?: string;
	X14_Quais_dessas_outras_formas_de_esteri__c?: X14_Quais_dessas_outras_formas_de_esteri__cType[];
	Is_the_claimant_a_business__c?: Is_the_claimant_a_business__cType;
/** Max length: 255 */
	X12_1_Outros__c?: string;
	Technical_Measures_applied__c?: Technical_Measures_applied__cType;
	Vehicle_still_in_client_s_possesion__c?: Vehicle_still_in_client_s_possesion__cType;
/** Max length: 18.0. */
	Vehicle_Mileage__c?: number;
/** Max length: 255 */
	X14_1_Outros__c?: string;
/** YYYY-MM-DD */
	Date_of_Purchase__c?: string;
/** Max length: 16.2. */
	Price_Paid__c?: number;
	Part_Exchange__c?: Part_Exchange__cType;
/** Max length: 16.2. */
	Value_of_Exchanged_Part__c?: number;
	How_was_the_vehicle_purchased__c?: How_was_the_vehicle_purchased__cType;
/** Max length: 18.0. */
	Secondhand_mileage__c?: number;
	Vendor__c?: Vendor__cType;
/** Max length: 32768. */
	Vendor_Details__c?: string;
	Approved_Dealer__c?: Approved_Dealer__cType;
/** Max length: 255. */
	Dealer_Trading_Name__c?: string;
	Finance_Leasing_Agreement_on_File__c?: boolean;
/** YYYY-MM-DD */
	Date_of_Finance_Agreement__c?: string;
/** Max length: 255 */
	Creditor__c?: string;
	Type_of_Agreement__c?: Type_of_Agreement__cType;
	Deposits__c?: boolean;
	Contributions__c?: boolean;
	Discounts__c?: boolean;
/** Max length: 16.2. */
	Total_Value_of_Discounts__c?: number;
/** YYYY-MM-DD */
	Date_of_Technical_Measures__c?: string;
/** Max length: 255 */
	Name_of_Garage__c?: string;
	Engine_Modified__c?: Engine_Modified__cType;
	Vehicle_Chipturned__c?: Vehicle_Chipturned__cType;
/** YYYY-MM-DD */
	Date_of_Sale_or_Disposition__c?: string;
/** Max length: 18.0. */
	Mileage_at_Sale_or_Disposition__c?: number;
	Why_is_vehicle_no_longer_in_possession__c?: Why_is_vehicle_no_longer_in_possession__cType;
/** Max length: 200 */
	Selling_Price__c?: string;
	Was_the_vehicle_part_exchanged__c?: Was_the_vehicle_part_exchanged__cType;
/** Max length: 16.2. */
	Value_of_Part_Exchanged__c?: number;
	Nature_of_the_Purchaser__c?: Nature_of_the_Purchaser__cType;
/** Max length: 16.2. */
	Insurance_Payment__c?: number;
/** Max length: 32768. */
	No_Longer_in_Possession_Reason__c?: string;
/** YYYY-MM-DD */
	When_did_you_put_Essure__c?: string;
	Were_you_able_to_remove_it__c?: Were_you_able_to_remove_it__cType;
	Co_Consel_in_Brasil__c?: Co_Consel_in_Brasil__cType;
/** Check Account relationship Current_Co_Counsel__r. */
	Current_Co_Counsel__c?: any;
/** Max length: 50 */
	ID__c?: string;
	Proof_of_residence__c?: Proof_of_residence__cType;
	Contract_Signed__c?: Contract_Signed__cType;
	Personal_ID__c?: Personal_ID__cType;
/** YYYY-MM-DD */
	Signature_Date__c?: string;
	Essure_Removed__c?: Essure_Removed__cType;
	Contract_PGMBM_signature_sent_via_email__c?: Contract_PGMBM_signature_sent_via_email__cType;
	Contract_PGMBM_Signature_sent_via_Whats__c?: Contract_PGMBM_Signature_sent_via_Whats__cType;
	X15_Caso_outras_formas_de_esteriliza_o__c?: X15_Caso_outras_formas_de_esteriliza_o__cType[];
	Essure_implantation_hospital_status__c?: Essure_implantation_hospital_status__cType;
/** Max length: 255 */
	Essure_implementation_hospital_name__c?: string;
/** Max length: 255 */
	Essure_implantation_hospital_street_name__c?: string;
/** Max length: 255 */
	Essure_implantation_hospital_city__c?: string;
/** Max length: 1300 */
	Intake_ID__c?: string;
	Essure_was_an_alternative_offered__c?: Essure_was_an_alternative_offered__cType;
	Essure_how_did_you_hear_about_it__c?: Essure_how_did_you_hear_about_it__cType;
	Essure_alternatives_offered__c?: Essure_alternatives_offered__cType;
/** Max length: 255 */
	X01_Nome_completo__c?: string;
/** Max length: 255. */
	Essure_reason_not_tubal_ligation__c?: string;
	Essure_what_made_you_opt_for__c?: Essure_what_made_you_opt_for__cType[];
	Essure_risks_informed__c?: Essure_risks_informed__cType[];
	Essure_general_anesthesia__c?: Essure_general_anesthesia__cType;
	Essure_has_performed_prior_examination__c?: Essure_has_performed_prior_examination__cType;
	Essure__c?: Essure__cType[];
	Essure_performe_a_proce__c?: Essure_performe_a_proce__cType;
	Essure_remove__c?: Essure_remove__cType;
/** Max length: 255 */
	essure_when__c?: string;
/** Max length: 100 */
	essure_when_perform__c?: string;
	essure_when_remove__c?: essure_when_remove__cType[];
	Questionnaire_Complete__c?: boolean;
	Client_Documents_Reviewed__c?: boolean;
/** Max length: 255 */
	essure_procedure__c?: string;
/** Max length: 255 */
	essure_first_procedue__c?: string;
	essure_thru__c?: essure_thru__cType;
/** YYYY-MM-DD */
	Essure_Date_of_procedure__c?: string;
	essure_indication__c?: essure_indication__cType;
/** Max length: 200 */
	Essure_health_insurance__c?: string;
/** Max length: 255 */
	essure_tests_performed__c?: string;
	Type_of_h__c?: Type_of_h__cType;
/** YYYY-MM-DD */
	essure_date_of_hospitalization__c?: string;
/** YYYY-MM-DD */
	Essure_date_of_medical_release__c?: string;
/** Max length: 255 */
	essure_complication__c?: string;
/** Max length: 255 */
	essure_problems_solved__c?: string;
/** YYYY-MM-DD */
	Essure_1__c?: string;
/** YYYY-MM-DD */
	essure_2__c?: string;
	essure_3__c?: essure_3__cType[];
	essure_4__c?: essure_4__cType;
	essure_5__c?: essure_5__cType;
/** YYYY-MM-DD */
	Essure_6__c?: string;
	essure_7__c?: essure_7__cType;
	Essure_8__c?: Essure_8__cType;
	Essure_9__c?: Essure_9__cType;
	Essure_10__c?: Essure_10__cType;
/** YYYY-MM-DD */
	essure_11__c?: string;
	essure_12__c?: essure_12__cType[];
	essure_13__c?: essure_13__cType;
/** YYYY-MM-DD */
	essure_14__c?: string;
	essure_15__c?: essure_15__cType;
	Esure_16__c?: Esure_16__cType;
/** Max length: 255 */
	essure_17__c?: string;
	essure_18__c?: essure_18__cType;
/** Max length: 3000. */
	essure_19__c?: string;
	essure_16__c?: essure_16__cType;
/** Max length: 18.0. */
	Days_Since_Last_Contact__c?: number;
/** Max length: 1300 */
	Total_Time_Since_Last_Contact__c?: string;
	Picklist_Status__c?: Picklist_Status__cType;
	essure_20__c?: essure_20__cType[];
/** Max length: 32768. */
	essure_21__c?: string;
	Document_Status__c?: Document_Status__cType;
	essure_22__c?: essure_22__cType[];
/** Max length: 250 */
	essure_23__c?: string;
/** Max length: 32768. */
	essure_24__c?: string;
	essure_25__c?: essure_25__cType;
/** Max length: 32768. */
	essure_26__c?: string;
	essure_27__c?: essure_27__cType;
	Essure_28__c?: Essure_28__cType;
	Essure_29__c?: Essure_29__cType;
/** Max length: 32768. */
	Essure_30__c?: string;
	essure_31__c?: essure_31__cType;
/** Max length: 32768. */
	essure_32__c?: string;
	essure_33__c?: essure_33__cType;
/** Max length: 32768. */
	essure_34__c?: string;
/** Max length: 32768. */
	Essure_35__c?: string;
/** Max length: 32768. */
	essure_36__c?: string;
	essure_37__c?: essure_37__cType;
/** Max length: 32768. */
	Essure_38__c?: string;
	Essure_39__c?: Essure_39__cType;
/** Max length: 32768. */
	essure_40__c?: string;
	essure_41__c?: essure_41__cType;
/** Max length: 32768. */
	essure_42__c?: string;
	essure_43__c?: essure_43__cType;
/** Max length: 32768. */
	essure_44__c?: string;
	essure_45__c?: essure_45__cType;
/** Max length: 32768. */
	Essure_46__c?: string;
	Essure_47__c?: Essure_47__cType;
/** YYYY-MM-DD */
	X02_Data_de_nascimento__c?: string;
/** Max length: 200 */
	X03_1_Endere_o_completo_Rua__c?: string;
/** Max length: 7.0. */
	X03_2_Endere_o_completo_N_mero__c?: number;
/** Max length: 50 */
	X03_3_Endere_o_completo_Complemento__c?: string;
/** Max length: 50 */
	X03_4_Endere_o_completo_Bairro__c?: string;
/** Max length: 50 */
	X03_5_Endere_o_completo_Cidade__c?: string;
/** Max length: 30 */
	X03_6_Endere_o_completo_Estado__c?: string;
/** Max length: 40 */
	X03_7_Endere_o_completo_Pa_s__c?: string;
/** Max length: 30 */
	X03_8_Endere_o_completo_CEP__c?: string;
/** Max length: 255 */
	X04_Telefone_com_DDD__c?: string;
/** Email. Max length: 80. */
	X05_Email__c?: string;
	X06_Idade__c?: X06_Idade__cType;
	X07_Escolaridade__c?: X07_Escolaridade__cType;
/** YYYY-MM-DD */
	X08_Data_do_implante__c?: string;
	X09_Onde_o_procedimento_de_implante_do__c?: X09_Onde_o_procedimento_de_implante_do__cType;
/** Max length: 50 */
	X10_Nome_do_hospital_cl_nica_no_qual_o__c?: string;
/** Max length: 70 */
	X11_Endere_o_do_hospital_cl_nica_no_qua__c?: string;
/** YYYY-MM-DD */
	Data__c?: string;
/** Max length: 255 */
	statement_of_truth__c?: string;
	X13_Alguma_outra_forma_de_esteriliza_o__c?: X13_Alguma_outra_forma_de_esteriliza_o__cType;
	Where_did_the_client_come_from__c?: Where_did_the_client_come_from__cType;
/** Max length: 200 */
	Co_counsel_s_Name__c?: string;
/** Max length: 255. */
	X16_Caso_tenha_sido_discutido_sobre_o_pr__c?: string;
/** Max length: 200 */
	Co_counsel_s_OAB__c?: string;
/** Email. Max length: 80. */
	Co_counsel_s_email__c?: string;
	X19_Foi_aplicada_anestesia_geral_para_re__c?: X19_Foi_aplicada_anestesia_geral_para_re__cType;
	X20_Voc_realizou_algum_exame_tr_s_meses__c?: X20_Voc_realizou_algum_exame_tr_s_meses__cType;
	X21_Voc_precisou_realizar_algum_procedi__c?: X21_Voc_precisou_realizar_algum_procedi__cType;
	X22_Voc_realizou_alguma_cirurgia_para_r__c?: X22_Voc_realizou_alguma_cirurgia_para_r__cType;
	X23_Voc_tem_a_inten_o_de_realizar_a_ci__c?: X23_Voc_tem_a_inten_o_de_realizar_a_ci__cType;
	X24_Quando_caso_a_resposta_21_seja_sim__c?: X24_Quando_caso_a_resposta_21_seja_sim__cType;
/** Max length: 255 */
	X25_1a_Tipo_de_Procedimento__c?: string;
	X25_1b_Realizado_via__c?: X25_1b_Realizado_via__cType;
/** YYYY-MM-DD */
	X25_1c_Data_de_realiza_o__c?: string;
/** Max length: 255 */
	X25_1d_Nome_do_Hospital__c?: string;
/** Max length: 255 */
	X25_1e_Plano_de_sa_de__c?: string;
	X25_1f_Tipo_de_indica_o__c?: X25_1f_Tipo_de_indica_o__cType;
/** Max length: 255. */
	X25_1g_Exames_pr_vios_realizados__c?: string;
	X25_1h_Tipo_de_interna_o__c?: X25_1h_Tipo_de_interna_o__cType;
/** YYYY-MM-DD */
	X25_1i_Data_de_interna_o__c?: string;
/** YYYY-MM-DD */
	X25_1j_Data_de_alta_m_dica__c?: string;
/** Max length: 255. */
	X25_1l_Complica_es__c?: string;
/** Max length: 255. */
	X26_Ap_s_a_cirurgia_procedimento_para_re__c?: string;
/** YYYY-MM-DD */
	X27_Ap_s_o_implante_do_dispositivo_quan__c?: string;
/** Max length: 20 */
	Co_counsel_s_Phone__c?: string;
/** Max length: 200 */
	Co_counsel_s_mobile_phone__c?: string;
	X30_As_suas_suspeitas_de_associa_o_do_d__c?: X30_As_suas_suspeitas_de_associa_o_do_d__cType;
/** YYYY-MM-DD */
	X31_Se_sim_quando__c?: string;
	X32_Voc_falou_para_o_seu_m_dico_que_voc__c?: X32_Voc_falou_para_o_seu_m_dico_que_voc__cType;
	X33_Se_sim_seu_m_dico_confirmou_a_possi__c?: X33_Se_sim_seu_m_dico_confirmou_a_possi__cType;
	X34_Voc_concorda_com_o_diagn_stico_do_s__c?: X34_Voc_concorda_com_o_diagn_stico_do_s__cType;
	X35_Voc_gostaria_de_ser_reavaliada__c?: X35_Voc_gostaria_de_ser_reavaliada__cType;
/** YYYY-MM-DD */
	X36_Por_favor_forne_a_a_data_na_qual_voc__c?: string;
/** Max length: 200 */
	Co_counsel_s_Firm__c?: string;
	X38_Voc_teve_uma_gravidez_indesejada_ap__c?: X38_Voc_teve_uma_gravidez_indesejada_ap__cType;
/** YYYY-MM-DD */
	X39_Por_favor_forne_a_a_data_na_qual_voc__c?: string;
/** Max length: 255. */
	Co_counsel_s_Office_Address__c?: string;
	X41_Voc_teve_alguma_complica_o_durante__c?: X41_Voc_teve_alguma_complica_o_durante__cType;
/** Max length: 255. */
	X42_Se_sim_por_favor_nos_forne_a_detalh__c?: string;
	X43_Voc_teve_alguma_complica_o_no_part__c?: X43_Voc_teve_alguma_complica_o_no_part__cType;
/** Max length: 255. */
	X44_Se_sim_por_favor_nos_forne_a_detalh__c?: string;
/** Email. Max length: 80. */
	Co_counsel_s_e_mail_2__c?: string;
/** Max length: 255. */
	X46_Forne_a_quaisquer_detalhes_adicionai__c?: string;
/** Max length: 2.0. */
	X47_Avalie_de_1_a_10_o_quanto_sua_qual__c?: number;
	X47_1_Voc_teve_problemas_conjugais_ou_fa__c?: X47_1_Voc_teve_problemas_conjugais_ou_fa__cType;
/** Max length: 32768. */
	X47_2_Descreva_brevemente_estes_problema__c?: string;
	X48_0_Voc_teve_que_ficar_sem_trabalhar__c?: X48_0_Voc_teve_que_ficar_sem_trabalhar__cType;
	X48_1_Voc_acha_que_o_Essure_prejudicou__c?: X48_1_Voc_acha_que_o_Essure_prejudicou__cType;
	Identifying_Documents__c?: Identifying_Documents__cType;
/** Max length: 255. */
	X48_3_Outro_campo_aberto__c?: string;
	X48_4_A_altera_o_de_fun_o_ou_capacidad__c?: X48_4_A_altera_o_de_fun_o_ou_capacidad__cType;
/** Max length: 7.2. */
	X48_5_De_quanto_valor_em_reais__c?: number;
	Proof_of_Adress__c?: Proof_of_Adress__cType;
	X48_7_Isso_afetou_a_sua_renda_familiar__c?: X48_7_Isso_afetou_a_sua_renda_familiar__cType;
/** Max length: 7.2. */
	X48_8_Em_quanto_aproximadamente_Uma_es__c?: number;
	X49_Voc_precisou_de_assist_ncia_com_seu__c?: X49_Voc_precisou_de_assist_ncia_com_seu__cType;
	X50_Voc_incorreu_em_algum_custo_como_re__c?: X50_Voc_incorreu_em_algum_custo_como_re__cType;
	X51_Voc_incorreu_em_algum_custo_com_com__c?: X51_Voc_incorreu_em_algum_custo_com_com__cType;
/** Max length: 7.2. */
	X51_1_Se_sim_qual_a_estimativa_de_gasto__c?: number;
	X52_Voc_incorreu_em_algum_custo_com_m_d__c?: X52_Voc_incorreu_em_algum_custo_com_m_d__cType;
/** Max length: 7.2. */
	X52_1_Se_sim_qual_a_estimativa_de_gasto__c?: number;
	X53_Voc_incorreu_em_algum_custo_com_adv__c?: X53_Voc_incorreu_em_algum_custo_com_adv__cType;
/** Max length: 16.2. */
	X53_1_Se_sim_qual_a_estimativa_de_gasto__c?: number;
	X54_Voc_incorreu_em_algum_custo_com_pro__c?: X54_Voc_incorreu_em_algum_custo_com_pro__cType;
/** Max length: 16.2. */
	X54_1_Se_sim_qual_a_estimativa_de_gasto__c?: number;
	X55_Voc_incorreu_em_algum_custo_com_fis__c?: X55_Voc_incorreu_em_algum_custo_com_fis__cType;
/** Max length: 16.2. */
	X55_1_Se_sim_qual_a_estimativa_de_gasto__c?: number;
	X56_Voc_incorreu_em_algum_custo_com_ter__c?: X56_Voc_incorreu_em_algum_custo_com_ter__cType;
/** Max length: 16.2. */
	X56_1_Se_sim_qual_a_estimativa_de_gasto__c?: number;
	X57_Voc_incorreu_em_algum_custo_com_exa__c?: X57_Voc_incorreu_em_algum_custo_com_exa__cType;
/** Max length: 16.2. */
	X57_1_Se_sim_qual_a_estimativa_de_gasto__c?: number;
	X58_Voc_incorreu_em_algum_custo_com_enc__c?: X58_Voc_incorreu_em_algum_custo_com_enc__cType;
/** Max length: 16.2. */
	X58_1_Se_sim_qual_a_estimativa_de_gasto__c?: number;
	X59_Voc_incorreu_em_algum_custo_com_bab__c?: X59_Voc_incorreu_em_algum_custo_com_bab__cType;
/** Max length: 16.2. */
	X59_1_Se_sim_qual_a_estimativa_de_gasto__c?: number;
	X60_Voc_incorreu_em_algum_custo_com_rec__c?: X60_Voc_incorreu_em_algum_custo_com_rec__cType;
/** Max length: 16.2. */
	X60_1_Se_sim_qual_a_estimativa_de_gasto__c?: number;
/** Max length: 255. */
	X61_Por_favor_descreva_quaisquer_outros__c?: string;
/** Max length: 16.2. */
	X62_Qual_foi_o_seu_gasto_total_decorrent__c?: number;
/** Max length: 2.0. */
	ID_da_lista__c?: number;
	CURRENT_PHASE__c?: CURRENT_PHASE__cType;
	Contrato_assinado__c?: Contrato_assinado__cType;
	NS_ESSURE__c?: NS_ESSURE__cType;
/** Max length: 255 */
	X15_1_Outros__c?: string;
	X17_Voc_foi_informada_sobre_os_seguinte__c?: X17_Voc_foi_informada_sobre_os_seguinte__cType[];
/** Max length: 255. */
	X17_1_Outros_efeitos_colaterais__c?: string;
	X18_Quem_te_informou_sobre_os_riscos_do__c?: X18_Quem_te_informou_sobre_os_riscos_do__cType[];
/** Max length: 255. */
	X18_1_Outros__c?: string;
/** YYYY-MM-DD */
	X28_Quando_voc_associou_os_seus_prob_del__c?: string;
	X29_O_que_a_levou_a_fazer_essa_associa__c?: X29_O_que_a_levou_a_fazer_essa_associa__cType[];
/** Max length: 255. */
	X29_1_Outros__c?: string;
	X37_Quais_sintomas_voc_apresentou_Mar__c?: X37_Quais_sintomas_voc_apresentou_Mar__cType[];
/** Max length: 255. */
	X37_1_Outros_problemas_psicol_gicos_ou_p__c?: string;
/** Max length: 255. */
	X37_2_Outro_por_favor_especifique__c?: string;
	X40_Como_a_gravidez_evoluiu__c?: X40_Como_a_gravidez_evoluiu__cType[];
/** Max length: 255. */
	X40_1_Outro_por_favor_especifique__c?: string;
	X45_Voc_tem_hist_rico_m_dico_de_qualque__c?: X45_Voc_tem_hist_rico_m_dico_de_qualque__cType[];
	X48_2_De_que_forma__c?: X48_2_De_que_forma__cType[];
/** Max length: 255. */
	X48_2_2_Outro__c?: string;
	X48_6_Pelo_seu_quadro_atual_voc_acha_q__c?: X48_6_Pelo_seu_quadro_atual_voc_acha_q__cType;
/** Max length: 32768. */
	Important_comments__c?: string;
	INFO_PRE_OP__c?: INFO_PRE_OP__cType;
	DEV_PROCEDURE_1_2_3__c?: DEV_PROCEDURE_1_2_3__cType;
	DEV_PROC_REQ__c?: DEV_PROC_REQ__cType;
	DEV_REMOVE_1_2_3__c?: DEV_REMOVE_1_2_3__cType;
	MED_REPORT__c?: MED_REPORT__cType;
	INSS__c?: INSS__cType;
	PRESCRIPTION_1_2_3__c?: PRESCRIPTION_1_2_3__cType;
	DOC_NOTE_1_2_3__c?: DOC_NOTE_1_2_3__cType;
	EXAMS_PRE__c?: EXAMS_PRE__cType;
	EXAMS_POST__c?: EXAMS_POST__cType;
	EXAMS_OTHER__c?: EXAMS_OTHER__cType;
	DEV_REM_REQ__c?: DEV_REM_REQ__cType;
	MAR_CERTIFICATE__c?: MAR_CERTIFICATE__cType;
	BIRTH_CERTIFICATE_1_2_3__c?: BIRTH_CERTIFICATE_1_2_3__cType;
	ABORTION_DOCS__c?: ABORTION_DOCS__cType;
	PERSONAL_REPORT__c?: PERSONAL_REPORT__cType;
	Referrall__c?: Referrall__cType;
	MESSAGE_RECORDS__c?: MESSAGE_RECORDS__cType;
	IMAGE_RECORDS__c?: IMAGE_RECORDS__cType;
	INVOICE_MED_1_2_3__c?: INVOICE_MED_1_2_3__cType;
	INVOICE_PRIVATE_1_2_3__c?: INVOICE_PRIVATE_1_2_3__cType;
	INVOICE_LAWYER_1_2_3__c?: INVOICE_LAWYER_1_2_3__cType;
	INVOICE_PROCEDURE_1_2_3__c?: INVOICE_PROCEDURE_1_2_3__cType;
	INVOICE_PHYSIO_1_2_3__c?: INVOICE_PHYSIO_1_2_3__cType;
	INVOICE_PSYCH_1_2_3__c?: INVOICE_PSYCH_1_2_3__cType;
	INVOICE_EXAM_1_2_3__c?: INVOICE_EXAM_1_2_3__cType;
	INVOICE_HEALTH_INSURANCE_1_2_3__c?: INVOICE_HEALTH_INSURANCE_1_2_3__cType;
	INVOICE_CARE__c?: INVOICE_CARE__cType;
	INVOICE_TRANSPORTATION__c?: INVOICE_TRANSPORTATION__cType;
	OTHER_INVOICES__c?: OTHER_INVOICES__cType;
	Children_Documents__c?: Children_Documents__cType;
	Cocounsel__c?: Cocounsel__cType;
	Interview__c?: Interview__cType;
	OTHER_PROCEDURES__c?: OTHER_PROCEDURES__cType;
/** Max length: 100 */
	CFA_Version__c?: string;
	Personal_limited_business__c?: Personal_limited_business__cType;
/** Max length: 200 */
	Personal_Business_Name__c?: string;
	Personal_company_role__c?: Personal_company_role__cType;
/** Max length: 32768. */
	Observation__c?: string;
/** Max length: 200 */
	State__c?: string;
/** Max length: 200 */
	Client_s_CPF__c?: string;
/** Max length: 200 */
	Client_s_Address__c?: string;
/** Max length: 200 */
	Client_s_City__c?: string;
/** Max length: 200 */
	CEP__c?: string;
	Medical_Report__c?: boolean;
/** Max length: 200 */
	Survey_External_Id__c?: string;
	lead_source__c?: lead_source__cType;
/** Max length: 100 */
	lead_source_other__c?: string;
}

export type litify_pm__Billing_Type__cType =  "Hourly"| "Flat Rate"| "Contingency"| "Alternative Fee Arrangement";

export type litify_pm__Closed_Reason_Details__cType =  "Already represented"| "Case already settled"| "Client unresponsive"| "Conflict with one or more parties"| "Decided to use other firm"| "Insufficient coverage"| "Insufficient damages"| "Limited/No injury"| "Limited/No treatment"| "No defect"| "Questionable/No liability"| "SOL expired"| "Wrong location"| "Other"| "Favorable"| "Unfavorable"| "Partially Favorable"| "With Prejudice"| "Without Prejudice";

export type litify_pm__Closed_Reason__cType =  "Terminated - Ineligible Client"| "Cancellation - Client Requested Cancellation"| "Settlement"| "Decision"| "Verdict"| "Referred Out";

export type litify_pm__Matter_State__cType =  "AK Alaska"| "AL Alabama"| "AR Arkansas"| "AZ Arizona"| "CA California"| "CO Colorado"| "CT Connecticut"| "DC District of Columbia"| "DE Delaware"| "FL Florida"| "GA Georgia"| "HI Hawaii"| "IA Iowa"| "ID Idaho"| "IL Illinois"| "IN Indiana"| "KS Kansas"| "KY Kentucky"| "LA Louisiana"| "MA Massachusetts"| "MD Maryland"| "ME Maine"| "MI Michigan"| "MN Minnesota"| "MO Missouri"| "MS Mississippi"| "MT Montana"| "NC North Carolina"| "ND North Dakota"| "NE Nebraska"| "NH New Hampshire"| "NJ New Jersey"| "NM New Mexico"| "NV Nevada"| "NY New York"| "OH Ohio"| "OK Oklahoma"| "OR Oregon"| "PA Pennsylvania"| "RI Rhode Island"| "SC South Carolina"| "SD South Dakota"| "TN Tennessee"| "TX Texas"| "UT Utah"| "VA Virginia"| "VT Vermont"| "WA Washington"| "WI Wisconsin"| "WV West Virginia"| "WY Wyoming";

export type litify_pm__Source_Type__cType =  "Attorney Referral"| "Non-Attorney Referral"| "Event"| "Advertisement"| "Other"| "Internet";

export type litify_pm__Status__cType =  "Open"| "Closed"| "Re_opened"| "Requested_Closure";

export type X12_Como_voc_ficou_sabendo_do_Essure__cType =  "Recomendação médica por médico do SUS"| "Recomendação médica por médico do conv"| "Propaganda feita em hospital";

export type Client__cType =  "Audi"| "BMW"| "Buick"| "Cadillac"| "Chevrolet"| "Chrysler"| "Dodge"| "Ferrari"| "Ford"| "GM"| "GEM"| "GMC"| "Honda"| "Hummer"| "Hyundai"| "Infiniti"| "Isuzu"| "Jaguar"| "Jeep"| "Kia"| "Lamborghini"| "Land Rover"| "Lexus"| "Lincoln"| "Lotus"| "Mazda"| "Mercedes-Benz"| "Mercury"| "Mitsubishi"| "Nissan"| "Oldsmobile"| "Peugeot"| "Pontiac"| "Porsche"| "Regal"| "Saab"| "Saturn"| "Subaru"| "Suzuki"| "Toyota"| "Volkswagen"| "Volvo";

export type Vehicle_Model__cType =  "Volkswagen Arteon"| "Volkswagen Arteon 4motion"| "Volkswagen Atlas"| "Volkswagen Atlas 4motion"| "Volkswagen Atlas Cross Sport"| "Volkswagen Atlas Cross Sport 4motion"| "Volkswagen Beetle"| "Volkswagen Beetle Convertible"| "Volkswagen Beetle Dune"| "Volkswagen Beetle Dune Convertible"| "Volkswagen Cabrio"| "Volkswagen Cabriolet"| "Volkswagen CC"| "Volkswagen CC 4motion"| "Volkswagen Corrado"| "Volkswagen Corrado SLC"| "Volkswagen e-Golf"| "Volkswagen Eos"| "Volkswagen Eurovan"| "Volkswagen Eurovan Camper"| "Volkswagen Fox"| "Volkswagen Fox GL Wagon"| "Volkswagen Fox Wagon"| "Volkswagen Golf"| "Volkswagen Golf/GTI"| "Volkswagen Golf Alltrack"| "Volkswagen Golf III"| "Volkswagen Golf III / GTI"| "Volkswagen Golf R"| "Volkswagen Golf SportWagen"| "Volkswagen Golf SportWagen 4motion"| "Volkswagen GTI"| "Volkswagen GTI/Golf GT"| "Volkswagen GTI 16v"| "Volkswagen GTI VR6"| "Volkswagen Jetta"| "Volkswagen Jetta GLI"| "Volkswagen Jetta GLI/Wolfsburg Edition"| "Volkswagen Jetta GLI 16v"| "Volkswagen Jetta GLX"| "Volkswagen Jetta Hybrid"| "Volkswagen Jetta III"| "Volkswagen Jetta III GLX"| "Volkswagen Jetta SportWagen"| "Volkswagen Jetta Wagon"| "Volkswagen New Beetle"| "Volkswagen New Beetle Convertible"| "Volkswagen New Golf"| "Volkswagen New GTI"| "Volkswagen New Jetta"| "Volkswagen Passat"| "Volkswagen Passat 4motion"| "Volkswagen Passat Syncro"| "Volkswagen Passat Wagon"| "Volkswagen Passat Wagon 4motion"| "Volkswagen Passat Wagon Syncro"| "Volkswagen Phaeton"| "Volkswagen Quantum"| "Volkswagen Quantum Syncro Wagon"| "Volkswagen Quantum Wagon"| "Volkswagen R32"| "Volkswagen Rabbit"| "Volkswagen Rabbit Convertible"| "Volkswagen Routan"| "Volkswagen Routan FWD"| "Volkswagen Scirocco"| "Volkswagen Scirocco 16v"| "Volkswagen Tiguan"| "Volkswagen Tiguan 4motion"| "Volkswagen Tiguan Limited"| "Volkswagen Tiguan Limited 4motion"| "Volkswagen Touareg"| "Volkswagen Touareg Hybrid"| "Volkswagen Vanagon/Camper 2WD"| "Volkswagen Vanagon 2WD"| "Volkswagen Vanagon Syncro 4WD"| "GLA 250 4MATIC SUV"| "GLB 250 4MATIC SUV"| "GLC 300 4MATIC SUV"| "GLCe 300 4MATIC"| "AMG GLC 43 4MATIC SUV"| "AMG GLC 63 S 4MATIC+ SUV"| "GLC 300 4MATIC Coupe"| "AMG GLC 43 4MATIC Coupe"| "AMG GLC 63 S 4MATIC+ Coupe"| "GLE 350 4MATIC SUV"| "GLE 450 4MATIC SUV"| "AMG GLE 53 4MATIC+ SUV"| "AMG GLE 43 4MATIC Coupe"| "AMG GLE 63 S 4MATIC Coupe"| "GLS 450 4MATIC SUV"| "GLS 580 4MATIC SUV"| "G 550 SUV"| "AMG G 63 SUV"| "A 250 4MATIC Hatch"| "AMG A 35 4MATIC Hatch"| "A 220 4MATIC Sedan"| "AMG A 35 4MATIC Sedan"| "C 300 4MATIC Sedan"| "AMG C 43 4MATIC Sedan"| "AMG C 63 Sedan"| "AMG C 63 S Sedan"| "E 350 4MATIC Sedan"| "E 450 4MATIC Sedan"| "AMG E 53 4MATIC + Sedan"| "AMG E 63 S 4MATIC+ Sedan"| "S 450 4MATIC Sedan (Short Wheelbase)"| "S 560 4MATIC Sedan (Short Wheelbase)"| "S 560 4MATIC Sedan (Long Wheelbase)"| "S 560e Sedan (Long Wheelbase)"| "AMG S 63 4MATIC+ Sedan"| "AMG S 65 Sedan"| "Mercedes-Maybach S 560 4MATIC Sedan"| "Mercedes-Maybach S 650 Sedan"| "C 300 4MATIC Wagon"| "AMG C 43 4MATIC Wagon"| "E 450 4MATIC Wagon"| "AMG E 53 4MATIC+ Wagon"| "AMG E 63 S 4MATIC Wagon"| "CLA 250 4MATIC Coupe"| "AMG CLA 35 Coupe"| "AMG CLA 45 Coupe"| "C 300 4MATIC Coupe"| "AMG C 43 4MATIC Coupe"| "AMG C 63 S Coupe"| "E 450 4MATIC Coupe"| "AMG E 53 4MATIC+ Coupe"| "CLS 450 4MATIC Coupe"| "AMG CLS 53 4MATIC+ Coupe"| "S 560 4MATIC Coupe"| "AMG S 63 4MATIC+ Coupe"| "AMG GT 53 4MATIC+ 4-Door Coupe"| "AMG GT 63 4MATIC+ 4-Door Coupe"| "AMG GT 63 S 4MATIC+ 4-Door Coupe"| "AMG GT C Coupe"| "AMG GT R Coupe"| "C 300 4MATIC Cabriolet"| "AMG C 43 4MATIC Cabriolet"| "AMG C 63 S Cabriolet"| "E 450 4MATIC Cabriolet"| "AMG E 53 4MATIC+ Cabriolet"| "S 560 Cabriolet"| "AMG S 63 4MATIC+ Cabriolet"| "SLC 300 Roadster"| "AMG SLC 43 Roadster"| "SL 450 Roadster"| "SL 550 Roadster"| "Mercedes-AMG GT C Roadster"| "GLC 350e 4MATIC";

export type X14_Quais_dessas_outras_formas_de_esteri__cType =  "Esterilização por laparoscopia"| "Contraceptivos não-cirúrgicos (anticonc"| "Laqueadura";

export type Is_the_claimant_a_business__cType =  "Yes"| "No";

export type Technical_Measures_applied__cType =  "Yes"| "No";

export type Vehicle_still_in_client_s_possesion__cType =  "Yes"| "No";

export type Part_Exchange__cType =  "Yes"| "No";

export type How_was_the_vehicle_purchased__cType =  "Dealer";

export type Vendor__cType =  "Vendor A"| "Vendor B"| "Vendor C";

export type Approved_Dealer__cType =  "Dealer 1"| "Dealer 2"| "Dealer 3";

export type Type_of_Agreement__cType =  "1"| "2"| "3";

export type Engine_Modified__cType =  "Yes"| "No";

export type Vehicle_Chipturned__cType =  "Yes"| "No";

export type Why_is_vehicle_no_longer_in_possession__cType =  "A"| "B"| "C";

export type Was_the_vehicle_part_exchanged__cType =  "Yes"| "No";

export type Nature_of_the_Purchaser__cType =  "1"| "2"| "3";

export type Were_you_able_to_remove_it__cType =  "Yes"| "No";

export type Co_Consel_in_Brasil__cType =  "Yes"| "No";

export type Proof_of_residence__cType =  "Yes"| "No";

export type Contract_Signed__cType =  "Yes"| "No"| "DISCONTINUANCE"| "DISCONTINUANCE TO BE CONFIRMED"| "BREAKUP MESSAGE";

export type Personal_ID__cType =  "Yes"| "No";

export type Essure_Removed__cType =  "Yes"| "No";

export type Contract_PGMBM_signature_sent_via_email__cType =  "Yes"| "No";

export type Contract_PGMBM_Signature_sent_via_Whats__cType =  "Yes"| "No";

export type X15_Caso_outras_formas_de_esteriliza_o__cType =  "Ausência de cirurgia"| "Facilidade de implantação"| "Preço";

export type Essure_implantation_hospital_status__cType =  "SUS"| "Hospital/Clínica privada";

export type Essure_was_an_alternative_offered__cType =  "Sim"| "Não";

export type Essure_how_did_you_hear_about_it__cType =  "Recomendação médica por médico do sus"| "Recomendação médica por médico do convênio ou privado"| "Propaganda feita em hospital"| "Outros";

export type Essure_alternatives_offered__cType =  "Esterilização por laparoscopia"| "Contraceptivos não-cirúrgicos (anticoncepcional, DIU, SIU)"| "Laqueadura"| "Outros";

export type Essure_what_made_you_opt_for__cType =  "Ausência de cirurgia"| "Facilidade de implantação"| "Preço"| "Outros";

export type Essure_risks_informed__cType =  "Risco de necessidade de outra cirurgia"| "Dor pélvica"| "Hemorragia"| "Migração do dispositivo (o dispositivo pode sair do lugar)"| "Possibilidade de rejeição do dispositivo pelo corpo, exigindo que o dispositivo fosse removido"| "Risco de gravidez indesejada";

export type Essure_general_anesthesia__cType =  "Sim"| "Não";

export type Essure_has_performed_prior_examination__cType =  "Sim"| "Não";

export type Essure__cType =  "Sim"| "Não";

export type Essure_performe_a_proce__cType =  "Sim"| "Não";

export type Essure_remove__cType =  "Sim"| "Não";

export type essure_when_remove__cType =  "Nos próximos 20 dias"| "Nos próximos 2 meses"| "Nos próximos 6 meses"| "Não tenho nenhuma data aproximada";

export type essure_thru__cType =  "SUS"| "Particular";

export type essure_indication__cType =  "Urgência"| "não";

export type Type_of_h__cType =  "ambulatorial"| "hospitalar"| "clinico";

export type essure_3__cType =  "Li sobre os sintomas em blogs e/ou outros sites"| "Ouvi pessoas que também tiveram o dispositivo implantado reclamarem dos mesmos sintomas"| "Li no site da Bayer sobre o dispositivo"| "Meu médico me avisou sobre a possível associação"| "Outros";

export type essure_4__cType =  "Sim"| "Não";

export type essure_5__cType =  "sim"| "não";

export type essure_7__cType =  "sim"| "não";

export type Essure_8__cType =  "Sim"| "Não";

export type Essure_9__cType =  "Sim"| "Não";

export type Essure_10__cType =  "Sim"| "Não";

export type essure_12__cType =  "Dor crônica na pelve, virilha, pernas ou pés"| "Dores de cabeça"| "Fadiga"| "Fraqueza muscular"| "Inchaço e/ou ganho de peso"| "Sangramento anormal (geral)"| "Mudanças no ciclo menstrual"| "Cólicas menstruais graves"| "Migração do dispositivo"| "Rejeição/Intolerância ao dispositivo"| "Quebra do dispositivo"| "Expulsão do dispositivo Essure"| "Necessidade de cirurgia"| "Reação alérgica ou de hipersensibilidade"| "Doença/distúrbio autoimune"| "Problemas ou alterações na bexiga ou na urina"| "Dispareunia (relação sexual dolorosa)"| "Perda de libido ou desejo sexual"| "Falha na oclusão da trompa de Falópio"| "Perfuração de trompas de falópio"| "Perfuração do útero"| "Histerectomia"| "Ooforectomia (remoção de ovários)"| "Salpingectomia (remoção das trompas de falópio)"| "Perda de cabelo"| "Problemas hormonais"| "Depressão"| "Outros problemas psicológicos ou psiquiátricos"| "Outros";

export type essure_13__cType =  "sim"| "não";

export type essure_15__cType =  "Parto normal a termo"| "Natimorto"| "Gravidez ectópica"| "Aborto espontâneo"| "Outro";

export type Esure_16__cType =  "Sim"| "Não";

export type essure_18__cType =  "Sim"| "Não";

export type essure_16__cType =  "Sim"| "Não";

export type Picklist_Status__cType =  "Waiting for questionnaire from client"| "Partially complete - missing information"| "Complete - requires revision"| "Complete - Reviewed";

export type essure_20__cType =  "Doença inflamatória pélvica"| "Cirurgia abdominal"| "Cesárea"| "Nenhum dos casos acima";

export type Document_Status__cType =  "No documents from client"| "Missing documents"| "Additional documents requested"| "All documents received";

export type essure_22__cType =  "Doença inflamatória pélvica"| "Cirurgia abdominal"| "Cesárea"| "Nenhum dos casos acima";

export type essure_25__cType =  "Sim"| "Não";

export type essure_27__cType =  "Sim"| "Não";

export type Essure_28__cType =  "Sim"| "Não";

export type Essure_29__cType =  "Sim"| "Não";

export type essure_31__cType =  "Sim"| "Não";

export type essure_33__cType =  "Sim"| "Não";

export type essure_37__cType =  "Sim"| "Não";

export type Essure_39__cType =  "Sim"| "Não";

export type essure_41__cType =  "Sim"| "Não";

export type essure_43__cType =  "Sim"| "Não";

export type essure_45__cType =  "Sim"| "Não";

export type Essure_47__cType =  "Sim"| "Não";

export type X06_Idade__cType =  "Menos de 16 anos"| "De 16 a 18 anos"| "De 19 a 25 anos"| "De 26 a 30 anos"| "De 30 a 40 anos"| "Mais de 40 anos";

export type X07_Escolaridade__cType =  "Sem escolaridade"| "Ensino fundamental (1º grau) incompleto"| "Ensino fundamental (1º grau) completo"| "Ensino médio (2º grau) incompleto"| "Ensino médio (2º grau) completo"| "Superior incompleto"| "Superior completo"| "Mestrado ou doutorado"| "Não sei informar";

export type X09_Onde_o_procedimento_de_implante_do__cType =  "SUS"| "Hospital/Clínica privada";

export type X13_Alguma_outra_forma_de_esteriliza_o__cType =  "Sim"| "Não";

export type Where_did_the_client_come_from__cType =  "Whatsapp"| "Website"| "Form";

export type X19_Foi_aplicada_anestesia_geral_para_re__cType =  "Sim"| "Não";

export type X20_Voc_realizou_algum_exame_tr_s_meses__cType =  "Sim"| "Não";

export type X21_Voc_precisou_realizar_algum_procedi__cType =  "Sim"| "Não";

export type X22_Voc_realizou_alguma_cirurgia_para_r__cType =  "Sim"| "Não";

export type X23_Voc_tem_a_inten_o_de_realizar_a_ci__cType =  "Sim"| "Não";

export type X24_Quando_caso_a_resposta_21_seja_sim__cType =  "Nos próximos 20 dias"| "Nos próximos 2 meses"| "Nos próximos 6 meses"| "Não tenho nenhuma data aproximada"| "Outra data (caso a cliente já tenha uma data marcada que não se encaixe nas alternativas anteriores)";

export type X25_1b_Realizado_via__cType =  "SUS"| "Particular";

export type X25_1f_Tipo_de_indica_o__cType =  "Eletiva"| "Urgência"| "Emergência";

export type X25_1h_Tipo_de_interna_o__cType =  "ambulatorial"| "hospitalar";

export type X30_As_suas_suspeitas_de_associa_o_do_d__cType =  "Sim"| "Não";

export type X32_Voc_falou_para_o_seu_m_dico_que_voc__cType =  "Sim"| "Não";

export type X33_Se_sim_seu_m_dico_confirmou_a_possi__cType =  "Sim"| "Não";

export type X34_Voc_concorda_com_o_diagn_stico_do_s__cType =  "Sim"| "Não";

export type X35_Voc_gostaria_de_ser_reavaliada__cType =  "Sim"| "Não";

export type X38_Voc_teve_uma_gravidez_indesejada_ap__cType =  "Sim"| "Não";

export type X41_Voc_teve_alguma_complica_o_durante__cType =  "Sim"| "Não";

export type X43_Voc_teve_alguma_complica_o_no_part__cType =  "Sim"| "Não";

export type X47_1_Voc_teve_problemas_conjugais_ou_fa__cType =  "Sim"| "Não";

export type X48_0_Voc_teve_que_ficar_sem_trabalhar__cType =  "Sim"| "Não";

export type X48_1_Voc_acha_que_o_Essure_prejudicou__cType =  "Sim"| "Não";

export type Identifying_Documents__cType =  "Yes"| "Pending"| "N/A";

export type X48_4_A_altera_o_de_fun_o_ou_capacidad__cType =  "Sim"| "Não";

export type Proof_of_Adress__cType =  "Yes"| "Pending"| "N/A";

export type X48_7_Isso_afetou_a_sua_renda_familiar__cType =  "Sim"| "Não";

export type X49_Voc_precisou_de_assist_ncia_com_seu__cType =  "Sim"| "Não";

export type X50_Voc_incorreu_em_algum_custo_como_re__cType =  "Sim"| "Não";

export type X51_Voc_incorreu_em_algum_custo_com_com__cType =  "Sim"| "Não";

export type X52_Voc_incorreu_em_algum_custo_com_m_d__cType =  "Sim"| "Não";

export type X53_Voc_incorreu_em_algum_custo_com_adv__cType =  "Sim"| "Não";

export type X54_Voc_incorreu_em_algum_custo_com_pro__cType =  "Sim"| "Não";

export type X55_Voc_incorreu_em_algum_custo_com_fis__cType =  "Sim"| "Não";

export type X56_Voc_incorreu_em_algum_custo_com_ter__cType =  "Sim"| "Não";

export type X57_Voc_incorreu_em_algum_custo_com_exa__cType =  "Sim"| "Não";

export type X58_Voc_incorreu_em_algum_custo_com_enc__cType =  "Sim"| "Não";

export type X59_Voc_incorreu_em_algum_custo_com_bab__cType =  "Sim"| "Não";

export type X60_Voc_incorreu_em_algum_custo_com_rec__cType =  "Sim"| "Não";

export type CURRENT_PHASE__cType =  "Client - Complete"| "Client - pending documents"| "Discontinued - Confirmed"| "Discontinued - To be confirmed"| "Prospect";

export type Contrato_assinado__cType =  "true"| "false";

export type NS_ESSURE__cType =  "Yes"| "Pending"| "N/A";

export type X17_Voc_foi_informada_sobre_os_seguinte__cType =  "Risco de necessidade de outra cirurgia"| "Dor pélvica"| "Hemorragia"| "Migração do dispositivo (o dispositivo"| "Possibilidade de rejeição do dispositiv"| "Risco de gravidez indesejada"| "Não fui informada sobre nenhum risco";

export type X18_Quem_te_informou_sobre_os_riscos_do__cType =  "Médico ou outro profissional de saúde"| "Bayer"| "Familiar/Amigo/Conhecido"| "Notícias na mídia";

export type X29_O_que_a_levou_a_fazer_essa_associa__cType =  "Li sobre os sintomas em blogs e/ou outro"| "Ouvi pessoas que também tiveram o dispos"| "Li no site da Bayer sobre o dispositivo"| "Meu médico me avisou sobre a possível as";

export type X37_Quais_sintomas_voc_apresentou_Mar__cType =  "Dor crônica na pelve, virilha, pernas"| "Dores de cabeça"| "Fadiga"| "Fraqueza muscular"| "Inchaço e/ou ganho de peso"| "Sangramento anormal (geral)"| "Mudanças no ciclo menstrual"| "Cólicas menstruais graves"| "Migração do dispositivo"| "Rejeição/Intolerância ao dispositivo"| "Alergia e reações de sensibilidade ou"| "Quebra do dispositivo"| "Expulsão do dispositivo Essure"| "Necessidade de cirurgia/procedimento"| "Reação alérgica ou de hipersensibilidade"| "Doença/distúrbio autoimune"| "Problemas ou alterações na bexiga ou na"| "Dispareunia (relação sexual dolorosa)"| "Perda de libido ou desejo sexual"| "Falha na oclusão da trompa de Falópio"| "Perfuração de trompas de falópio"| "Perfuração do útero"| "Perda de cabelo"| "Problemas hormonais"| "Depressão";

export type X40_Como_a_gravidez_evoluiu__cType =  "Parto normal a termo"| "Natimorto"| "Gravidez ectópica"| "Aborto espontâneo";

export type X45_Voc_tem_hist_rico_m_dico_de_qualque__cType =  "Doença inflamatória pélvica"| "Cirurgia abdominal"| "Cesárea"| "Nenhum dos casos acima";

export type X48_2_De_que_forma__cType =  "ainda não pude voltar a trabalhar"| "voltei a trabalhar na mesma função, mas"| "voltei a trabalhar em outra função";

export type X48_6_Pelo_seu_quadro_atual_voc_acha_q__cType =  "Sim"| "Não";

export type INFO_PRE_OP__cType =  "Yes"| "Pending"| "N/A";

export type DEV_PROCEDURE_1_2_3__cType =  "Yes"| "Pending"| "N/A";

export type DEV_PROC_REQ__cType =  "Yes"| "Pending"| "N/A";

export type DEV_REMOVE_1_2_3__cType =  "Yes"| "Pending"| "N/A";

export type MED_REPORT__cType =  "Yes"| "Pending"| "N/A";

export type INSS__cType =  "Yes"| "Pending"| "N/A";

export type PRESCRIPTION_1_2_3__cType =  "Yes"| "Pending"| "N/A";

export type DOC_NOTE_1_2_3__cType =  "Yes"| "Pending"| "N/A";

export type EXAMS_PRE__cType =  "Yes"| "Pending"| "N/A";

export type EXAMS_POST__cType =  "Yes"| "Pending"| "N/A";

export type EXAMS_OTHER__cType =  "Yes"| "Pending"| "N/A";

export type DEV_REM_REQ__cType =  "Yes"| "Pending"| "N/A";

export type MAR_CERTIFICATE__cType =  "Yes"| "Pending"| "N/A";

export type BIRTH_CERTIFICATE_1_2_3__cType =  "Yes"| "Pending"| "N/A";

export type ABORTION_DOCS__cType =  "Yes"| "Pending"| "N/A";

export type PERSONAL_REPORT__cType =  "Yes"| "Pending"| "N/A";

export type Referrall__cType =  "Yes"| "Pending"| "N/A";

export type MESSAGE_RECORDS__cType =  "Yes"| "Pending"| "N/A";

export type IMAGE_RECORDS__cType =  "Yes"| "Pending"| "N/A";

export type INVOICE_MED_1_2_3__cType =  "Yes"| "Pending"| "N/A";

export type INVOICE_PRIVATE_1_2_3__cType =  "Yes"| "Pending"| "N/A";

export type INVOICE_LAWYER_1_2_3__cType =  "Yes"| "Pending"| "N/A";

export type INVOICE_PROCEDURE_1_2_3__cType =  "Yes"| "Pending"| "N/A";

export type INVOICE_PHYSIO_1_2_3__cType =  "Yes"| "Pending"| "N/A";

export type INVOICE_PSYCH_1_2_3__cType =  "Yes"| "Pending"| "N/A";

export type INVOICE_EXAM_1_2_3__cType =  "Yes"| "Pending"| "N/A";

export type INVOICE_HEALTH_INSURANCE_1_2_3__cType =  "Yes"| "Pending"| "N/A";

export type INVOICE_CARE__cType =  "Yes"| "Pending"| "N/A";

export type INVOICE_TRANSPORTATION__cType =  "Yes"| "Pending"| "N/A";

export type OTHER_INVOICES__cType =  "Yes"| "Pending"| "N/A";

export type Children_Documents__cType =  "Yes"| "Pending"| "N/A";

export type Cocounsel__cType =  "Yes"| "Pending"| "N/A";

export type Interview__cType =  "Yes"| "Pending"| "N/A";

export type OTHER_PROCEDURES__cType =  "Yes"| "Pending"| "N/A";

export type Personal_limited_business__cType =  "Yes"| "No";

export type Personal_company_role__cType =  "Director"| "Officer"| "Secretary"| "Other";

export type lead_source__cType =  "Social Media (Facebook, Instagram, Twitter, LinkedIn etc)"| "Search engine (Google,Bing etc)"| "Television Ad"| "Radio Ad"| "Other (please specify)"| "Word of mouth";