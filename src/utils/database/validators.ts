import {
  validateQuestionnaire,
  validateQuestionnaireUpdate,
} from "../../types/questionnaire";
import { validateClient, validateClientUpdate } from "../../types/client";
import { validateIntake, validateIntakeUpdate } from "../../types/intake";
import {
  validateQuestionnaireAnswersUpdate,
  validateQuestionnaireAnswers,
} from "../../types/questionnaireAnswers";
import {
  validateIntakeError,
  validateIntakeErrorUpdate,
} from "../../types/intakeError";
import {
  validateSurveyAnswer,
  validateSurveyAnswerUpdate,
} from "../../types/surveyAnswer";
import { validateCounters, validateCountersUpdate } from "../../types/counters";
import { AuthResponseContext } from "aws-lambda";
import { TokenPayload } from "../../types/tokenPayload";
import { intakeIdQuery } from "../misc/intake.utils";

export async function validateInsertion(data: any[], collection: string) {
  switch (collection) {
    //The questionnaires collection is deprecated. Use Survey instead
    case "Questionnaires": {
      return false;
      // return validateQuestionnaire(data);
    }
    case "Clients": {
      return validateClient(data);
    }
    case "Intakes": {
      return validateIntake(data);
    }
    case "QuestionnaireAnswers": {
      return validateQuestionnaireAnswers(data);
    }
    case "IntakeError": {
      return validateIntakeError(data);
    }
    case "SurveyAnswers": {
      return validateSurveyAnswer(data);
    }
    case "Counters": {
      return validateCounters(data);
    }
    case "Survey": {
      return true;
    }
    default: {
      console.log("here");
      throw new Error("Invalid collection");
    }
  }
}

export async function validateUpdate(update: any, collection: string) {
  switch (collection) {
    case "Questionnaires": {
      return validateQuestionnaireUpdate(update);
    }
    case "Clients": {
      return validateClientUpdate(update);
    }
    case "Intakes": {
      return validateIntakeUpdate(update);
    }
    case "QuestionnaireAnswers": {
      return validateQuestionnaireAnswersUpdate(update);
    }
    case "IntakeError": {
      return validateIntakeErrorUpdate(update);
    }
    case "Counters": {
      return validateCountersUpdate(update);
    }
    case "SurveyAnswers": {
      return validateSurveyAnswerUpdate(update);
    }
    case "Survey": {
      return true;
    }
    default: {
      throw new Error("Invalid collection");
    }
  }
}

export function qualifyQuery(
  query: any,
  collection: string,
  authContext?: any
) {
  if (!authContext) {
    throw new Error("Didn't authorize before!");
  }

  const tokenPayload = authContext;
  if (!!tokenPayload.allowedAsAdmin) {
    console.log("Allowed as admin");
    return query;
  }

  const idConstraint = intakeIdQuery(tokenPayload.userId, collection);

  if (!idConstraint) {
    throw new Error(`Not authorized to perform operation on ${collection}`);
  } else {
    return { $and: [query, idConstraint] };
  }
}
