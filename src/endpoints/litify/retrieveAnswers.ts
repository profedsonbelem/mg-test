import { APIGatewayProxyHandler } from "aws-lambda";
import { Response } from "../common/api.response";
import { authorizeIfAny } from "../../modules/auth/core";
import {
  getVehicleFromMatter,
  getMatterFromMatterID,
  getAccountFromMatter,
} from "../../modules/litify/getLitifyDataToMercedesQuestionnarie";

export const retrieveAnswers: APIGatewayProxyHandler = async (
  event,
  context
) => {
  try {
    //Authentication (token), Matter Id, map (or something that indicates the map)
    // const authorizationResult = authorizeIfAny(event, ["validateAdminToken"]);
    // if (!authorizationResult.authorized) {
    // 	return Response({
    // 		data: null,
    // 		statusCode: 400,
    // 		error: { code: 403, message: `Not allowed to perform this operation.` },
    // 	});
    // }

    return Response({
      data: JSON.stringify(event.requestContext.authorizer),
      statusCode: 200,
    });

    const token = process.env.AuthorizationLitify;
    const { matterId } = JSON.parse(event.body);

    // console.log(`*******${matterId}`);
    let data = {};

    if (!matterId) {
      return Response({
        data: null,
        statusCode: 400,
        error: { code: 400, message: `Missing params.` },
      });
    }

    // console.log("****Começou");
    const matter = await getMatterFromMatterID(matterId);
    if (matter.length === 0) {
      return Response({
        data: null,
        statusCode: 404,
        error: {
          code: 400,
          message: `Did not found matter with id: ${matterId}`,
        },
      });
    }
    // console.log(`*******Matter: ${matter[0]}`);

    const account = await getAccountFromMatter(
      matter[0]["litify_pm__Client__c"]
    );
    if (account.length === 0) {
      return Response({
        data: null,
        statusCode: 404,
        error: { code: 400, message: `"Matter has no account associated"` },
      });
    }
    delete matter[0]["litify_pm__Client__c"];

    // console.log(`*******Account: ${account[0]}`);

    const vehicle = await getVehicleFromMatter(matterId);
    if (vehicle.length === 0) {
      return Response({
        data: null,
        statusCode: 404,
        error: { code: 400, message: `Matter has no vehicle associated` },
      });
    }

    // console.log(`******Vehicle: ${vehicle[0]}`);

    Object.keys(vehicle[0]).forEach((key) => {
      data[`Vehicle__c.${key}`] = vehicle[0][key];
    });

    Object.keys(account[0]).forEach((key) => {
      data[`Account.${key}`] = account[0][key];
    });

    Object.keys(matter[0]).forEach((key) => {
      data[`litify_pm__Matter__c.${key}`] = matter[0][key];
    });

    delete data["Vehicle__c.attributes"];
    delete data["Account.attributes"];
    delete data["litify_pm__Matter__c.attributes"];

    // console.log(JSON.stringify(data));
    return Response({
      data,
      statusCode: 200,
    });
  } catch (error) {
    return Response({
      data: null,
      statusCode: 500,
      error: { code: 500, message: `Internal server error: ${error}` },
    });
  }
};
