# **Survey Answers**

## **Offline Execution**

    ./sls\ scripts/offlineStart.sh development.sh services/surveyAnswers.yml

## **Development.sh**

Verify the README.md and look for instructions

## **getAnswersSheet**

This endpoint will generate a spread sheet with data from survey answers

### **Send request**

**Method**: POST

**Token**: AdminToken

**BODY**:Query to be executed in the SurveyAnswers collection. If blank, will retrieve all data from Survey Answers, be carefull, this may take a long time.

It's possible to filter the request using attributes from Survey Answers, as the examples below:

```json
{
	"_id": {
		"$in": ["ID_1", "ID_2", "ID_N"]
	}
}
```

```json
{
	"userId": "uID"
}
```

```json
{
	"_id": {
		"$in": ["ID_1", "ID_2", "ID_N"]
	},
	"userId": "uID"
}
```

```json
{
	"answers.personal_limited_business.answer": true
}
```

**QUERY STRING PARAMS**: As optional, is possible to send some fields as Multi Value Query String Parameters, only the fields passed in this params will be in the spread sheet. Realize that those fields filter the answers using their ID . A simple example to retrieve the personal_first_name and personal_surname, looks like this:

    {urlTorequest}?fields=personal_first_name&fields=personal_surname

If don't send params, it will retrieve all the fields

By default, the output format is XLSX, but, as optinal too, its possible to send a Query String Param to get a CSV instead a XLSX, as the example below:

    	{urlTorequest}?output=csv

Of course, it's possible to combine the two optional params:

    	{urlTorequest}?fields=personal_first_name&fields=personal_surname&output=csv

### Response to request

    It returns a link to download the spread sheet
