# Decisions:

- Use mongo on a server
- Use lambda functions to interact

---

# CRUD routes

- /api/{collectionName}/create
- /api/{collectionName}/retrieve
- /api/{collectionName}/retrieve-by-id/{\_id}
- /api/{collectionName}/update
- /api/{collectionName}/delete

## Validation behaviour

**White List:** Only do operation in listed collections (case sensitive)

## Valid collections

- Questionnaires
- Clients
- Answers
- Intakes
- QuestionnaireAnswers
- IntakeError

---

# Authorization

- **Permissions in collection level:** User have permission to _PUT_, _GET_ or _DELETE_ in the entire collection.
- **Log unauthorized requests:** Save unauthorized requests in database (change to s3 in the future?)
