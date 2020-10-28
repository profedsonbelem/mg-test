# Endpoints

## createOne

- _Handler:_ src/endpoints/litify/crud.createOne
- _Method:_ post
- _Path:_ litify/{resource}/createOne
- _Authorization:_ admin token
- _Body:_ Object to be created in litify
- _Query params:_ -
- _Responses:_

  - _Success:_

    - _status:_ 201
    - _message:_ ${resource} created: ${createdId}
    - _aditionalInfo:_ createdObject

  - _Wrong/no token given:_

    - _status:_ 403
    - _message:_ Not allowed to perform this operation.

  - _Another (unexpected) error:_
    - _status:_ 500
    - _message:_ Error on litify create: \${error}

## queryRetrieve

- _Handler:_ src/endpoints/litify/crud.queryRetrieve
- _Method:_ post
- _Path:_ litify/{resource}/queryRetrieve
- _Authorization:_ admin token
- _Body:_ query
- _Query params:_ -
- _Responses:_

  - _Success:_

    - _status:_ 200
    - _message:_ Success
    - _aditionalInfo:_ data

  - _Didn't find data:_

    - _status:_ 404
    - _message:_ \${resource} not found

  - _Wrong/no token given:_

    - _status:_ 403
    - _message:_ Not allowed to perform this operation.

  - _Another (unexpected) error:_
    - _status:_ 500
    - _message:_ Error on litify queryRetrieve: \${error}

## soqlRetrieve

- _Handler:_ src/endpoints/litify/crud.soqlRetrieve
- _Method:_ get
- _Path:_ litify/soqlRetrieve
- _Authorization:_ admin token
- _Body:_ -
- _Query params:_
  - _query:_ Query to be executed
- _Responses:_

  - _status:_ 200

    - _message:_ Success
    - _aditionalInfo:_ data

  - _Didn't find data:_

    - _status:_ 404
    - _message:_ \${resource} not found

  - _No query given:_

    - _status:_ 400
    - _message:_ Bad request: mising query

  - _Wrong/no token given:_

    - _status:_ 403
    - _message:_ Not allowed to perform this operation.

  - _Another (unexpected) error:_
    - _status:_ 500
    - _message:_ Error on litify soqlRetrieve: \${error}

## retrieveOne

- _Handler:_ src/endpoints/litify/crud.retrieveOne
- _Method:_ get
- _Path:_ litify/{resource}/retrieveOne/{\_id}
- _Authorization:_ admin token
- _Body:_ -
- _Query params:_ -
- _Responses:_

  - _status:_ 200

    - _message:_ Found ${resource} ${\_id}
    - _aditionalInfo:_ data

  - _Didn't find data:_

    - _status:_ 404
    - _message:_ \${resource} not found

  - _Wrong/no token given:_

    - _status:_ 403
    - _message:_ Not allowed to perform this operation.

  - _Another (unexpected) error:_
    - _status:_ 500
    - _message:_ Error on litify retrieveOne: \${error}

## updateOne

- _Handler:_ src/endpoints/litify/crud.updateOne
- _Method:_ post
- _Path:_ litify/{resource}/updateOne
- _Authorization:_ admin token
- _Body:_
- _Query params:_
- _Responses:_

  - _Success:_

    - _status:_ 200
    - _message:_ ${resource} ${updatedId} updated
    - _aditionalInfo:_ updatedObject

  - _Wrong/no token given:_

    - _status:_ 403
    - _message:_ Not allowed to perform this operation.

  - _Another (unexpected) error:_
    - _status:_ 500
    - _message:_ Error on litify updateOne: \${error}

## deleteOne

- _Handler:_ src/endpoints/litify/crud.deleteOne
- _Method:_ delete
- _Path:_ litify/{resource}/deleteOne/{\_id}
- _Authorization:_ admin token
- _Body:_
- _Query params:_
- _Responses:_

  - _Success:_

    - _status:_ 200
    - _message:_ \${resource} deleted

  - _Wrong/no token given:_

    - _status:_ 403
    - _message:_ Not allowed to perform this operation.

  - _Another (unexpected) error:_
    - _status:_ 500
    - _message:_ Error on litify deleteOne: \${error}

# Litify Objects

## Party (Account)
