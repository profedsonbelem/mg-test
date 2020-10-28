import { Intake } from "../../types/intake";
import { mapAttributes } from "./object.utils";
import { getConfigFileFromS3 } from "../aws/sns.utils";

export function intakeIdQuery(intakeId: string, collection: string) {
  console.log(`Get object by its intake id from ${collection}`);

  switch (collection) {
    case "Intakes": {
      return { _id: intakeId };
    }
    case "QuestionnaireAnswers": {
      return { "secureLink._id": intakeId };
    }
    case "States": {
      return { "intake._id": intakeId };
    }
    case "SurveyAnswers": {
      return { userId: intakeId };
    }

    default: {
      return undefined;
    }
  }
}

/** @todo define intakeToLitifyMaps type */
export async function intakeToLitify(intake: Intake, resourcesFolder: string) {
  //Load map
  const intakeToLitifyMaps = await getConfigFileFromS3(
    resourcesFolder,
    "intakeToLitifyMaps.json"
  );

  const map: {
    [attInIntake: string]: string;
  } = intakeToLitifyMaps.map;
  const defaultValues = intakeToLitifyMaps.defaultValues;

  //Apply map to intake
  const litifyData = mapAttributes(intake, map, {
    keepAttributes: false,
    defaultValues,
  });

  //Return data
  return litifyData;
}
