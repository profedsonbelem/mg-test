import { APIGatewayProxyHandler } from "aws-lambda";

import { get } from "https";
import { Responses } from "./common/api.response";
import { authorizeIfAny } from "../modules/auth/core";
import { mapAttributes } from "../utils/misc/object.utils";
import db from "../utils/database/db.model";
import { normalizeString } from "../utils/misc/string.utils";
import moment = require("moment");

export const searchRegistration: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  try {
    // Auth
    const authorizationResult = authorizeIfAny(event, [
      "validateAdminToken",
      "validateAgentToken",
      "validateJWT",
    ]);
    if (!authorizationResult.authorized) {
      return Responses._400(`Not allowed to perform this operation.`, 403);
    }

    const registration = event.pathParameters.vrm;
    const lookForVin =
      !!event.queryStringParameters &&
      event.queryStringParameters.search === "vin";

    let res: any;
    if (lookForVin) {
      console.log(`Looking for vin ${registration}`);
      res = await searchVIN(registration);
    } else {
      console.log(`Looking for vrm ${registration}`);
      res = await searchVRM(registration);
    }

    return Responses._200(JSON.stringify(res), 200);
  } catch (error) {
    console.log("ERROR - ", error);
    return Responses._500(error);
  }
};

export const getUkvdEnhancedData: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  try {
    // Auth
    const authorizationResult = authorizeIfAny(event, [
      "validateAdminToken",
      "validateAgentToken",
      "validateJWT",
    ]);
    if (!authorizationResult.authorized) {
      return Responses._400(`Not allowed to perform this operation.`, 403);
    }

    const registration = event.pathParameters.registration;
    const lookForVin =
      !!event.queryStringParameters &&
      event.queryStringParameters.search === "vin";

    let res: any;
    if (lookForVin) {
      console.log(`Looking for vin ${registration}`);
      res = await searchVIN(registration);
    } else {
      console.log(`Looking for vrm ${registration}`);
      res = await searchVRM(registration);

      const plateChangeCount =
        res.Response.DataItems.VehicleHistory.PlateChangeCount;

      if (plateChangeCount !== 0) {
        console.log("Multiple records");
        return Responses._400("Couldn't identify correct vehicle", 404, res);
      }
    }

    const ukvdEnhancedData: any = extractUkvdEnhancedData(res);
    console.log(`EnhancedData: ${ukvdEnhancedData}`);
    if (!ukvdEnhancedData) {
      return Responses._400("No Ukvd enhanced data for that vehicle", 404);
    } else {
      return Responses._200("Success", ukvdEnhancedData, 200);
    }
  } catch (error) {
    console.log("ERROR - ", error);
    return Responses._500(error);
  }
};

async function searchVRM(vrm: string): Promise<any> {
  const normalizedVRM = normalizeString(vrm);
  // Check db cache
  const [register] = await db.retrieve("CarRegisters", { _id: normalizedVRM });

  if (!!register && register.expiresAt > new Date()) {
    return register.searchResult;
  }

  // Get from api
  const apiKey = process.env.carAPIKey;
  const url = `https://uk1.ukvehicledata.co.uk/api/datapackage/VehicleData?v=2&api_nullitems=1&auth_apikey=${apiKey}&key_VRM=${vrm}`;

  return new Promise((res, rej) => {
    get(url, (resp) => {
      console.log("here", resp);
      let data = "";

      // A chunk of data has been recieved.
      resp.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on("end", () => {
        const result = JSON.parse(data);
        console.log("end http req", result);
        db.update(
          "CarRegisters",
          {
            _id: normalizedVRM,
          },
          {
            $set: {
              _id: normalizedVRM,
              searchResult: result,
              expiresAt: moment().add({ days: 7 }).toDate(),
            },
          },
          false,
          true
        ).then(() => {
          res(result);
        });
      });
    }).on("error", (err) => {
      console.log("Error: " + err.message);
      db.update(
        "CarRegisters",
        {
          _id: normalizedVRM,
        },
        {
          $set: {
            _id: normalizedVRM,
            searchResult: err,
            expiresAt: moment().add({ days: 7 }).toDate(),
          },
        },
        false,
        true
      ).then(() => {
        rej(err.message);
      });
    });
  });
}

async function searchVIN(vin: string): Promise<any> {
  const normalizedVIN = normalizeString(vin);
  // Check db cache
  const [register] = await db.retrieve("CarRegisters", { _id: normalizedVIN });

  if (!!register && register.expiresAt > new Date()) {
    return register.searchResult;
  }

  // Get from api
  const apiKey = process.env.carAPIKey;
  const url = `https://uk1.ukvehicledata.co.uk/api/datapackage/VehicleData?v=2&api_nullitems=1&auth_apikey=${apiKey}&key_VIN=${vin}`;

  return new Promise((res, rej) => {
    get(url, (resp) => {
      console.log("here", resp);
      let data = "";

      // A chunk of data has been recieved.
      resp.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on("end", () => {
        const result = JSON.parse(data);
        console.log("end http req", result);
        db.update(
          "CarRegisters",
          {
            _id: normalizedVIN,
          },
          {
            $set: {
              _id: normalizedVIN,
              searchResult: result,
              expiresAt: moment().add({ days: 7 }).toDate(),
            },
          },
          false,
          true
        ).then(() => {
          res(result);
        });
      });
    }).on("error", (err) => {
      console.log("Error: " + err.message);
      db.update(
        "CarRegisters",
        {
          _id: normalizedVIN,
        },
        {
          $set: {
            _id: normalizedVIN,
            searchResult: err,
            expiresAt: moment().add({ days: 7 }).toDate(),
          },
        },
        false,
        true
      ).then(() => {
        rej(err.message);
      });
    });
  });
}

function extractUkvdEnhancedData(data: any) {
  return mapAttributes(data, {
    "Response.DataItems.UkvdEnhancedData.VehicleAlerts.VehicleAlertList":
      "VehicleAlertList",
  }).VehicleAlertList;
}
