import { CustomAuthorizerResult, PolicyDocument, Statement } from "aws-lambda";

export function generateAuthorizerResponse(
  principalId: string,
  effect: string,
  resource: string,
  context?: any
) {
  console.log("Generating policy");
  const policyDocument: PolicyDocument = {
    Version: "2012-10-17",
    Statement: [],
  };

  if (effect && resource) {
    const statement: Statement = {
      Action: "execute-api:Invoke",
      Effect: effect,
      Resource: resource,
    };

    policyDocument.Statement.push(statement);
  }

  const authResponse: CustomAuthorizerResult = {
    principalId,
    policyDocument,
    context,
  };

  console.log(`Generated ${JSON.stringify(authResponse)}`);
  return authResponse;
}
