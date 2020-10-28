# Database

## Indexes

### SurveyAnswers

- **userId**: Used to get the surveys by its intake id
- **questionnaireId**: Used to get surveys by its process (airlines, mercedes, etc)

### States

- **intake.\_id**: Used to get the state by its intake id. Used in emailLead modules to avoid states with the same intake

### JumioData

- **jumioResponse.transactionReference**: Used to get the jumio data by its transaction reference

# Endpoints

| Endpoint                               | Token Validation    | Ad Hoc Authorization | Method | Body                                                           | Query Params                      |
| -------------------------------------- | ------------------- | -------------------- | ------ | -------------------------------------------------------------- | --------------------------------- |
| <td colspan=5> **CRUD**                |
| api/{collection}/create                | authorizeAdminToken | No                   | Post   | any[]                                                          | -                                 |
| api/{collection}/retrieve              | authorizeAdminOrJWT | Yes                  | Post   | any                                                            | -                                 |
| api/{collection}/retrieve-by-id/{\_id} | authorizeAdminOrJWT | Yes                  | Get    | -                                                              | -                                 |
| api/{collection}/update                | authorizeAdminOrJWT | Yes                  | Post   | query: any <br> update: any                                    | -                                 |
| api/{collection}/delete/{\_id}         | authorizeAdminToken | No                   | Delete | -                                                              | -                                 |
| api/{collection}/count                 | authorizeAdminToken | No                   | Post   | any                                                            | -                                 |
| <td colspan=5> **Intake Process**      |
| api/createIntake                       | authorizeAdminToken | No                   | Post   | resourcesFolder: string <br> data: any <br> modules?: string[] | -                                 |
| api/getAnswersCSV                      | authorizeAdminToken | No                   | Post   | any                                                            | -                                 |
| api/getStats                           | authorizeAdminToken | No                   | Post   | questionnaireId: string                                        | -                                 |
| emailAnswer                            | authorizeAdminOrJWT | Yes                  | Post   | any                                                            | token <br> targetEmail <br> email |
| questIds                               | authorizeAdminToken | No                   | Get    | -                                                              | -                                 |
| <td colspan=5> **Jumio**               |
| api/getAuthenticationResult            | authorizeAdminOrJWT | Yes                  | Post   | -                                                              | transactionReference              |
| api/jumioCallback                      | -                   | Yes                  | Post   | string                                                         | -                                 |
| api/requestAuthentication              | authorizeJWT        | Yes                  | -      | -                                                              |
| <td colspan=5> **Other Endpoints**     |
| api/cars/{vrm}                         | authorizeAdminOrJWT | No                   | Get    | -                                                              | -                                 |
| api/getSignedUrl                       | authorizeAdminOrJWT | Yes                  | Post   | GetSignedUrlBody                                               | -                                 |
| crypto/descrypt/{token}                | -                   | No                   | Get    | -                                                              | -                                 |
| sendMail                               | authorizeAdminToken | No                   | Post   | EmailEventData                                                 | -                                 |
| translateText                          | authorizeAdminToken | No                   | Post   | data: TranslateRequest                                         | -                                 |
| validateToken/{token}                  | -                   | No                   | Get    | -                                                              | type                              |

## CRUD

- **api/{collection}/create:** Create the objects in the request body in the database. On a successfull call, returns a 201 and the id of the new documents.

  - **Example request:**

  ```json
  {
    "path": "http://localhost:3000/api/Intakes/create",
    "headers": { "Authorization": "adminToken" },
    "body": [
      { "_id": "someId", "name": "Some Name", "email": "some@email.com" },
      {
        "_id": "anotherId",
        "name": "Another Name",
        "email": "another@email.com"
      }
    ]
  }
  ```

  - **Example response:**

  ```json
  {
    "message": "Intakes created",
    "aditionalInfo": {
      "insertedId": {
        "0": "someId",
        "1": "anotherId"
      }
    }
  }
  ```

- **api/{collection}/retrieve:** Search in the database using the request body as query. On a successfull call, returns a 200 and the retrieved data as a strigified array.

  - **Example request:**

  ```json
  {
    "path": "http://localhost:3000/api/Intakes/retrieve",
    "headers": { "Authorization": "adminToken" },
    "body": { "_id": "someId", "name": "Some Name", "email": "some@email.com" }
  }
  ```

  - **Example response:**

  ```json
  {
    "message": "Success",
    "aditionalInfo": {
      "data": "[{\"_id\":\"someId\",\"name\":\"Some Name\",\"email\":\"some@email.com\"}]"
    }
  }
  ```

- **api/{collection}/retrieve-by-id/{\_id}:** Search the ellement with the given \_id in the database. On a successfull call, returns a 200 and the retrieved data as a strigified array or a 204 with the requestedId if no data was found.

  - **Example request:**

  ```json
  {
    "path": "http://localhost:3000/api/Intakes/retrieve-by-id/someId",
    "headers": { "Authorization": "adminToken" },
    "body": {}
  }
  ```

  - **Example response:**

  ```json
  {
    "message": "Success",
    "aditionalInfo": {
      "data": "[{\"_id\":\"someId\",\"name\":\"Some Name\",\"email\":\"some@email.com\"}]"
    }
  }
  ```

- **api/{collection}/update:** Apply the given update to all ellements that match the query. On a successfull call, returns a 200 and the number of documents updated in the operation.
  - **Example request:**
  ```json
  {
    "path": "http://localhost:3000/api/Intakes/retrieve",
    "headers": { "Authorization": "adminToken" },
    "body": {
      "query": {
        "_id": "someId",
        "name": "Some Name",
        "email": "some@email.com"
      },
      "update": { "$set": { "name": "Changed Name" } }
    }
  }
  ```
  - **Example response:**
  ```json
  {
    "message": "Questionnaire updated",
    "aditionalInfo": {
      "nUpdateds": 1
    }
  }
  ```
- **api/{collection}/delete/{\_id}:**
- **api/{collection}/count:**

## Intake Process

- **api/createIntake:**
- **api/getAnswersCSV:**
- **api/getStats:**
- **emailAnswer:**
- **questIds:**

## Jumio

- **api/getAuthenticationResult:**
- **api/jumioCallback:**
- **api/requestAuthentication:**

## Other Endpoints

- **api/cars/{vrm}:**
- **api/getSignedUrl:**
- **crypto/descrypt/{token}:**
- **sendMail:**
- **translateText:**
- **validateToken/{token}:**

# Lambdas

## Intake Process Lambdas

- **emailLead:**
- **echo:**

## Auth Lambdas

- **authorizeAdminToken:**
- **authorizeJWT:**
- **authorizeAdminOrJWT:**
