export interface Client {
  /** litifyId */ litifyId?: string;
  /** email intake*/ _id?: string; //EMAIL HASH + Our salt
  /** QA*/ token?: string; // Expire?
  /** Blank*/ password?: string; // Hashed and salted (2nd stage)
  /** ACTIVE*/ status?: ClientStatus;
  /** Intake*/ firstName?: string;
  /** Intake*/ lastName?: string;
  salutation: "mr" | "mrs" | "ms"; // Picklist
  occupation: string;
  /** SurveyAnswers*/ address_contact_house_name_number?: string;
  /** SurveyAnswers*/ address_contact_street?: string;
  /** SurveyAnswers*/ address_contact_county?: string;
  /** SurveyAnswers*/ address_contact_town?: string;
  /** SurveyAnswers*/ address_contact_postcode?: string;
  /** SurveyAnswers*/ address_additionalInfo?: string;
  /** Intake || Survey answer*/ phone?: string;
  /** Intake*/ email?: string;
  /** SurveyAnswers*/ birthDate?: Date;
  /** SurveyAnswers*/ creationDate?: Date;
  salt: string;
}

export type ClientStatus = "ACTIVE" | "INACTIVE" | "DELETED";
