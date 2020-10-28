import { Intake } from "../../types/intake";
import { Client } from "../../types/migrationDB/client";
import { ObjectId } from "mongodb";
import { genSaltSync, hashSync } from "bcryptjs";
import { SurveyAnswer } from "../../types/surveyAnswer";
import { normalizeString } from "../../utils/misc/string.utils";
import { applyMaps } from "../../utils/misc/object.utils";
// import * as moment from "moment";

interface Address {
  contact_house_name_number: string;
  contact_street: string;
  contact_county: string;
  contact_town: string;
  contact_postcode: string;
  address_additionalInfo: string;
}

const map: { [att in keyof Client]?: any } = {
  firstName: (sa: SurveyAnswer) => {
    if (
      !sa.answers.personal_first_name ||
      !sa.answers.personal_first_name.answer
    ) {
      return undefined;
    }
    return sa.answers.personal_first_name.answer;
  },
  lastName: (sa: SurveyAnswer) => {
    if (!sa.answers.personal_surname || !sa.answers.personal_surname.answer) {
      return undefined;
    }
    return sa.answers.personal_surname.answer;
  },
  address_contact_house_name_number: (sa: SurveyAnswer) => {
    if (!!sa.answers.address_complete && !!sa.answers.address_complete.answer) {
      try {
        const parsed: Address = JSON.parse(sa.answers.address_complete.answer);
        return parsed.contact_house_name_number;
      } catch (error) {}
    } else {
      return undefined;
    }
  },
  address_contact_street: (sa: SurveyAnswer) => {
    if (!!sa.answers.address_complete && !!sa.answers.address_complete.answer) {
      try {
        const parsed: Address = JSON.parse(sa.answers.address_complete.answer);
        return parsed.contact_street;
      } catch (error) {}
    } else {
      return undefined;
    }
  },
  address_contact_county: (sa: SurveyAnswer) => {
    if (!!sa.answers.address_complete && !!sa.answers.address_complete.answer) {
      try {
        const parsed: Address = JSON.parse(sa.answers.address_complete.answer);
        return parsed.contact_county;
      } catch (error) {}
    } else {
      return undefined;
    }
  },
  address_contact_town: (sa: SurveyAnswer) => {
    if (!!sa.answers.address_complete && !!sa.answers.address_complete.answer) {
      try {
        const parsed: Address = JSON.parse(sa.answers.address_complete.answer);
        return parsed.contact_town;
      } catch (error) {}
    } else {
      return undefined;
    }
  },
  address_contact_postcode: (sa: SurveyAnswer) => {
    if (!!sa.answers.address_complete && !!sa.answers.address_complete.answer) {
      try {
        const parsed: Address = JSON.parse(sa.answers.address_complete.answer);
        return parsed.contact_postcode;
      } catch (error) {}
    } else {
      return undefined;
    }
  },
  address_additionalInfo: (sa: SurveyAnswer) => {
    if (!!sa.answers.address_complete) {
      return sa.answers.address_complete.additionalInfo;
    } else {
      return undefined;
    }
  },
  phone: (sa: SurveyAnswer) => {
    if (!sa.answers.contact_phone) {
      return undefined;
    }
    return sa.answers.contact_phone.answer || undefined;
  },
  email: (sa: SurveyAnswer) => {
    if (!sa.answers.contact_email || !sa.answers.contact_email.answer) {
      return undefined;
    }
    try {
      const normalizedEmail = normalizeString(sa.answers.contact_email.answer);
      return normalizedEmail;
    } catch (error) {
      return undefined;
    }
  },
  birthDate: (sa: SurveyAnswer) => {
    if (
      !sa.answers.personal_date_of_birth ||
      !sa.answers.personal_date_of_birth.answer
    ) {
      return undefined;
    }
    try {
      const [dd, mm, yyyy] = (<string>(
        sa.answers.personal_date_of_birth.answer
      )).split("/");

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
  salutation: (sa: SurveyAnswer) => {
    if (!sa.answers.personal_title) {
      return undefined;
    }
    return sa.answers.personal_title.answer || undefined;
  },
  occupation: (sa: SurveyAnswer) => {
    if (!sa.answers.personal_company_role) {
      return undefined;
    }
    return sa.answers.personal_company_role.answer || undefined;
  },
};

export class ClientModel {
  static async createClientFromOldData(
    intake: Intake,
    surveyAnswers: SurveyAnswer
  ): Promise<Client> {
    let creationDate: Date;
    let address: Address;
    let birthDate: Date;
    let address_additionalInfo: string;

    try {
      const idAsObject = new ObjectId(intake._id);
      creationDate = new Date(idAsObject.getTimestamp());
    } catch (error) {
      // Failed to get creation date
    }

    try {
      address = JSON.parse(surveyAnswers.answers.address_complete.answer);
    } catch (error) {
      // console.log(`***************Failed to find address`);
    }

    try {
      address_additionalInfo =
        surveyAnswers.answers.address_complete.additionalInfo;
    } catch (error) {}

    try {
      if (Date.parse(surveyAnswers.answers.personal_date_of_birth.answer)) {
        birthDate = new Date(
          surveyAnswers.answers.personal_date_of_birth.answer
        );
      }
    } catch (error) {
      // console.log(`***************Failed to find birthDate`);
    }

    const salt = genSaltSync(10);
    const _id = hashSync(normalizeString(intake.email), salt);
    const fromSa = this.getSurveyAnswersInfo(surveyAnswers);
    // console.log(fromSa);

    return {
      // New data
      _id,
      // litifyId: undefined,
      // token: undefined,
      // password: undefined,
      status: "ACTIVE",
      salt,
      // Intake Data
      creationDate,
      phone: intake.phone,
      email: normalizeString(intake.email),
      firstName: intake.first_name || "",
      lastName: intake.surname || "",
      // Survey Answers Data
      address_contact_house_name_number: address
        ? address.contact_house_name_number
        : undefined,
      address_contact_street: address ? address.contact_street : undefined,
      address_contact_county: address ? address.contact_county : undefined,
      address_contact_town: address ? address.contact_town : undefined,
      address_contact_postcode: address ? address.contact_postcode : undefined,
      address_additionalInfo: address_additionalInfo,
      birthDate,
      salutation: !!surveyAnswers.answers.personal_title
        ? surveyAnswers.answers.personal_title.answer
        : undefined,
      occupation: !!surveyAnswers.answers.personal_company_role
        ? surveyAnswers.answers.personal_company_role.answer
        : undefined,
      ...fromSa,
    };
  }

  static getSurveyAnswersInfo(surveyAnswer: SurveyAnswer) {
    return applyMaps<SurveyAnswer>(surveyAnswer, map);
  }
}
