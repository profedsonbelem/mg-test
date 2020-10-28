import { Responses } from "./common/api.response";

export const echo: any = async (event, _context) => {
  // const authorizationResult = await authorizeCrudV1(event);
  // if (!authorizationResult.authorized) {
  //     console.log("ERROR - ", authorizationResult.message);
  //     return Responses._400(
  //         "Not authorized. See logs for details",
  //         authorizationResult.status
  //     );
  // }
  try {
    console.log(event);

    console.log(event.Records);
    if (!event.Records) {
      const errresponse = {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        },
        body: JSON.stringify(event),
      };
      return errresponse;
    }
    for (var i = 0; i < event.Records.length; i++) {
      const r = event.Records[i];
      console.log(JSON.parse(r.Sns.Message).content);
    }

    return Responses._200(JSON.stringify({ echo: event.body }), 200);
  } catch (error) {
    console.log("ERROR - ", error);
    return Responses._500("Mongo error. See logs for details");
  }
};
