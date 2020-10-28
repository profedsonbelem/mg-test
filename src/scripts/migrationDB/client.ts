import { Client } from "../../types/migrationDB/client";
import { hashSync } from "bcryptjs";
import { DataClient as DC } from "../../types/migrationDB/dataClient";

interface DataClient extends DC {
  _id: any;
}

interface Address {
  contact_house_name_number: string;
  contact_street: string;
  contact_county: string;
  contact_town: string;
  contact_postcode: string;
  address_additionalInfo: string;
}

export default async function createClient(
  dataClient: DataClient,
  salt: string
): Promise<Client> {
  let address: Address = null;
  let birthDate: Date = null;
  let creationDate: Date = null;

  try {
    address = JSON.parse(
      dataClient.SurveyAnswers[0].answers.address_complete.answer
    );
    address.address_additionalInfo =
      dataClient.SurveyAnswers[0].answers.address_complete.additionalInfo || "";
  } catch (error) {
    // console.log(`***************Failed to find address`);
    address = null;
  }
  try {
    if (
      Date.parse(
        dataClient.SurveyAnswers[0].answers.personal_date_of_birth.answer
      )
    ) {
      birthDate = new Date(
        dataClient.SurveyAnswers[0].answers.personal_date_of_birth.answer
      );
    }
    birthDate = null;
  } catch (error) {
    // console.log(`***************Failed to find birthDate`);
    birthDate = null;
  }

  try {
    creationDate = new Date(dataClient.SurveyAnswers[0].dateStart);
  } catch (error) {
    creationDate = new Date(dataClient._id.getTimestamp());
  }

  return {
    litifyId: null,
    _id: hashSync(dataClient.email, salt),
    token: null,
    password: null,
    status: "ACTIVE",
    firstName: dataClient.first_name || null,
    lastName: dataClient.surname || null,
    address_contact_house_name_number: address
      ? address.contact_house_name_number
      : null,
    address_contact_street: address ? address.contact_street : null,
    address_contact_county: address ? address.contact_county : null,
    address_contact_town: address ? address.contact_town : null,
    address_contact_postcode: address ? address.contact_postcode : null,
    address_additionalInfo: address ? address.address_additionalInfo : null,
    phone: dataClient.phone || null,
    email: dataClient.email,
    birthDate,
    creationDate,
    salt,
    salutation: "ms",
    occupation: "",
  };
}
