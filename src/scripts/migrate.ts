import { SurveyAnswer } from "../types/surveyAnswer";
import { Intake } from "../types/intake";

type CurrentData = {
  intake: Intake;
  surveyAnswer: SurveyAnswer;
};

type CurrentDataMap = {
  intake: { [attInIntake: string]: string };
  surveyAnswers: { [attInIntake: string]: string };
};

// Use maps to create client from intake ans surveyAnswers
async function createClient(cur: CurrentData, map: CurrentDataMap) {}

// Use maps to create claim from intake ans surveyAnswers
async function createClaim(cur: CurrentData, map: CurrentDataMap) {}

async function main() {
  // Set environment
  // Get all intakes, joined with their surveyanswers
  // For each intake create client and claim
  // Create all entries in db
}
