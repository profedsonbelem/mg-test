import { Client } from "../../types/migrationDB/client";
import { applyMaps } from "../misc/object.utils";
import { Account } from "../../types/accounts";

const map: { [att in keyof Account]?: (c: Client) => any } = {
  // Name: (client: Client) => client.firstName,
  BillingStreet: (client: Client) =>
    `${client.address_contact_street ||
      ""}, ${client.address_contact_house_name_number || ""}`,
  BillingCity: (client: Client) => client.address_contact_town,
  BillingPostalCode: (client: Client) => client.address_contact_postcode,
  // ShippingStreet: (client: Client) =>
  // `${client.address_contact_street ||
  //   ""}, ${client.address_contact_house_name_number || ""}`,
  // ShippingCity: (client: Client) => client.address_contact_town,
  // ShippingPostalCode: (client: Client) => client.address_contact_postcode,
  litify_pm__Phone_Mobile__c: (client: Client) => {
    return client.phone;
  },
  litify_pm__Date_of_birth__c: (client: Client) => client.birthDate,
  litify_pm__Email__c: (client: Client) => client.email,
  litify_pm__First_Name__c: (client: Client) => client.firstName,
  litify_pm__Last_Name__c: (client: Client) => client.lastName,
  // Personal_Surname__c: (client: Client) => client.lastName,
  BillingCountry: (client: Client) => client.address_contact_county,
  // ShippingCountry: (client: Client) => client.address_contact_county,
  litify_pm__Salutation__c: (client: Client) => {
    if (client.salutation === "mr") {
      return "Mr.";
    } else if (client.salutation === "mrs") return "Mrs.";
    else if (client.salutation === "ms") return "Ms.";
    else return undefined;
  },
  // Occupation__c: (client: Client) => client.occupation,
  PGMBM_ID__c: (client: Client) => client._id,
};

export const mapClientToAccount = (client: Client) => {
  return applyMaps<Client>(client, map);
};
