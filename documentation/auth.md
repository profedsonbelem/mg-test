# Authentication process

In order to authenticate our users, we implemented two kinds of tokens:

- **Admin token:** Hardcoded tokens that allow access to (almost) any endpoints.
  - **@todo**: Get these token from KMS (?) and change them over time.
- **JWT:** This token is created by the **decrypt** lambda, and allows access to some request in some endpoints (see [Ad hoc authorization](##ad-hoc-authorization)). Usually, they will only allow that the user get access to it's information.

# Authorization Process

To prevent data leak or improper use of our endpoints, it's crucial that we implement safer authorization methods. At the moment, our authorization is performed in two steps:

- Token validation through a [lambda authorizer](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html);
- Ad hoc authorization in the endpoint;

Ideally, all unauthorized requests would be blocked at the token validation step, but since the lambda authorizers **do not** have access to the request body, some authorizations can't be done in that phase. That being the case, we should consider droping this step and finding another solution that allow us to perform all the necessary authorization before the endpoint is reached.

## Token Validation

The following lambda authorizers are implemented:

| Authorizer | Allows |
| authorizeAdminToken | Requests with admin tokens in the Authorization header |
| authorizeJWT | Requests with valid JWT in the Authorization header |
| authorizeAdminOrJWT | Requests with admin tokens or valid JWT in the Authorization header |

## Ad Hoc Authorization

The following endpoints have Ad Hoc authorization:

- **api/{collection}/retrieve:** If the request uses the the admin token, any operation is allowed. Otherwise only requests to the collections "Intakes", "QuestionnaireAnswers", "States" and "SurveyAnswers" are allowed. Besides that, the query will be modified to ensure the retrieved data belongs to the token owner.
- **api/{collection}/retrieve-by-id:** If the request uses the the admin token, any operation is allowed. Otherwise only requests to the collections "Intakes", "QuestionnaireAnswers", "States" and "SurveyAnswers" are allowed. Besides that, the query will be modified to ensure the retrieved data belongs to the token owner.
- **api/{collection}/update:** If the request uses the the admin token, any operation is allowed. Otherwise only requests to the collections "Intakes", "QuestionnaireAnswers", "States" and "SurveyAnswers" are allowed. Besides that, the query will be modified to ensure the updated data belongs to the token owner.
- **api/getAuthenticationResult:** If the request uses the the admin token, any operation is allowed. Otherwise, the request is allowed only if the userReference in the JumioData equals the userId decoded from the token.
- **api/getSignedUrl:** If the request uses the the admin token, any operation is allowed. Otherwise, the request is allowed only if the surveyAnswer in the request body equals the userId decoded from the token.
- **api/jumioCallback:** If the request uses the the admin token, any operation is allowed. Otherwise, the request is allowed only if the request sourceIp is in the region white list.
- **api/requestAuthentication:** The request is allowed only if a valid JWT is given and the decoded token has a userId attribute.
- **emailAnswer:** If the request uses the the admin token, any operation is allowed. Otherwise, the request is allowed only if the JWT token and the token given in the query have the same id and email, and that email equals the email given by in the query.
