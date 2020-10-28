# Scripts

**TODO:** Create a endpoint to execute scripts??

## createFromCsv

This script will execute the intake process through the endpoint **api/createIntake**. For details on how that process work, check the **startIntake** documentation.

### Execution

        node lib/src/scripts/createFromCsv *argumentsPath*

### Arguments

The first (and only) parameter passed for this function is the path of a json file with the following attributes:

- **csvPath:** Path of the csv file with de data to be included. Each intake data must be in a row and the first row **must be** a header, with unique names for each column.
- **resourcesFolder:** The resourcesFolder to be sent in the api request.
- **apiUrl:** The api prefix, to be inserted before _api/createIntake_. For instance, if the endpoint is in _http://localhost:3000/api/creatIntake_, this argument should be "http://localhost:3000/api/creatIntake"
- **rowToIntake (optional)**: The map between the columns of the table and the intake attributes. If this isn't given, will use the column names as the attribute.
- **modules (optional)**: The modules to be sent in the api request.

**Important:** If rowToIntake is given, all columns that aren't mapped to an intake attribute will be ignored

#### Example file

```js
{
    "csvPath": "myCsv.csv",
    "resourcesFolder": "airline",
    "apiUrl": "http://localhost:3000",
    "rowToIntake": {
        "nome": "name",
        "e-mail": "email"
    },
    "modules": [
        "getHeaders",
        "createIntakeFromRaw",
        "createQuestionnaireAnswer",
        "createSurveyAnswer",
        "generateSurveyLink",
        "sendEmail"
    ]
}

```

### Improvements

- Give the option to do requests async
