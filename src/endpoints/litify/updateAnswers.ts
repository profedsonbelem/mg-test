import { APIGatewayProxyHandler } from "aws-lambda";

import { Response } from "../common/api.response";
import { authorizeIfAny } from "../../modules/auth/core";
import litify from "../../utils/database/litify.model";
import { Account } from "../../types/accounts";
import { Matter } from "../../types/matter";
import { Vehicle__c as Vehicle } from "../../types/Vehicle__c";
import { getIDandStatusVehicleFromMatter } from "../../modules/litify/getLitifyDataToMercedesQuestionnarie";

export const updateAnswers: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  try {
    const authorizationResult = authorizeIfAny(event, ["validateAdminToken"]);
    if (!authorizationResult.authorized) {
      return Response({
        data: null,
        statusCode: 400,
        error: { code: 403, message: `Not allowed to perform this operation.` },
      });
    }

    const token = process.env.AuthorizationLitify;
    const questionnaireId = event.queryStringParameters.questionnaireId;
    const { matterId, data } = JSON.parse(event.body);

    if (!matterId || !data) {
      return Response({
        data: null,
        statusCode: 400,
        error: { code: 400, message: `Missing params.` },
      });
    }

    if (questionnaireId === "mercedes" || questionnaireId === "test-mercedes") {
      const matter = await litify.retrieve("litify_pm__Matter__c", matterId);
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

      const account = await litify.retrieve(
        "Account",
        matter.litify_pm__Client__c
      );
      if (account.length === 0) {
        return Response({
          data: null,
          statusCode: 404,
          error: { code: 400, message: `"Matter has no account associated"` },
        });
      }

      const vehicle = await getIDandStatusVehicleFromMatter(matterId);
      if (vehicle.length === 0) {
        return Response({
          data: null,
          statusCode: 404,
          error: { code: 400, message: `Matter has no vehicle associated` },
        });
      }

      let keysData = Object.keys(data);
      let valuesData = Object.values(data);
      let accountUpdated: Account = { Id: account.Id };
      let matterUpdated: Matter = {
        Id: matterId,
        litify_pm__Status__c: matter.litify_pm__Status__c,
      };
      let vehicleUpdated: Vehicle = {
        Id: vehicle[0].Id,
        Vehicle_Status__c: vehicle[0].Vehicle_Status__c,
      };

      let objAux = {};

      for (let i = 0; i < keysData.length; i++) {
        let keysDataSplit = keysData[i].split(".");
        if (keysDataSplit[0] === "Account") {
          objAux = { [keysDataSplit[1]]: valuesData[i] };
          accountUpdated = Object.assign(accountUpdated, objAux);
        }

        if (keysDataSplit[0] === "litify_pm__Matter__c") {
          objAux = { [keysDataSplit[1]]: valuesData[i] };
          matterUpdated = Object.assign(matterUpdated, objAux);
        }

        if (keysDataSplit[0] === "Vehicle__c") {
          objAux = { [keysDataSplit[1]]: valuesData[i] };
          vehicleUpdated = Object.assign(vehicleUpdated, objAux);
        }
      }

      await litify.update("Account", accountUpdated);
      await litify.update("litify_pm__Matter__c", matterUpdated);
      await litify.update("Vehicle__c", vehicleUpdated);

      let objAccount = { accountUpdated: accountUpdated };
      let objMatter = { matterUpdated: matterUpdated };
      let objVehicle = { vehicleUpdated: vehicleUpdated };

      let dataUpdated = Object.assign(objAccount, objMatter, objVehicle);

      return Response({
        data: dataUpdated,
        statusCode: 200,
      });
    }

    return Response({
      data: null,
      statusCode: 400,
      error: { code: 404, message: `QuestionnaireId is not Mercedes` },
    });
  } catch (error) {
    console.log(`Internal server error: ${error}`);

    return Response({
      data: null,
      statusCode: 500,
      error: { code: 500, message: `Internal server error: ${error}` },
    });
  }
};
