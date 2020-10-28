import { GetSignedUrlBody } from "../../src/endpoints/S3Files";

const body: GetSignedUrlBody = {
  ext: "pdf",
  md5: "some_md5",
  questionId: "question_id",
  surveyAnswer: "5ebc45a99f40b20007965817",
  surveyId: "TEST",
};
