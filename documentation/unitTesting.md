# Unit Tests

## Libraries

- [Chai](https://www.chaijs.com/api/): Assertion library.
- [Mocha](https://mochajs.org/): Testing framework.
- [Istanbul](https://istanbul.js.org/docs/tutorials/mocha/): Code coverage.

**Note:** Node already has a native [assertion library](https://nodejs.org/api/assert.html).

## Preparation

```sh
# Install unit test libraries (already in package.json)
npm i
# Install mocha globally, so we can test with 'mocha ~directory~'
npm i --global mocha
```

## Creating Tests

### Directives

- Test files must have the sufix _.test.ts_.
- Each service mult have its own test folder so, when we manage to deploy each service individually, we only test the necessary methods.
  - If a method is used **only** in the service **~service~**, its test must be created in the folder **unitTests/~service~/**.
    - **Note:** If this method isn't in the **modules/~service~** folder already, it should be.
- Use the **unitTests/common** folder to create tests in methods that are used in multiple services. The _models_ and _utils_ tests must be created in this folder.
- **Every** bug must become a test so it won't come back in further updates.
- [Dynamically generated tests](https://mochajs.org/#dynamically-generating-tests) **must** have typed test cases
- If you want a test to be written, but can't write it right now, let it [pending](https://mochajs.org/#pending-tests).

### What NOT to test

- Third party libraries
- API calls
- Methods that need external resources
  - Database operations
  - AWS operations
- Handlers (ideally)

### What to test

- Everything else

### Structure of a test

```ts
describe("The function blabla", () => {
  const commonVariables = {
    ...
  };

  it("what do you expect to in this particular case", () => {
    const particularVariable = {
      ...
    };

    const result = blabla(...);

    expect(result)...
  });

  describe("what do you expect in this SET of tests", () => {
    type testType = {
      // what do you expect to in this particular case
      description: string,
      //
      expectedResult: any,
      // other particular variables
      ...
    }
    const testCases: testType[] = [
      ...
    ];

    for(let test of testCases) {
      it(test.description, () => {
        const result = blabla(...);

        expect(result)...
      })
    }
  });

  it("this should be tested, but I didn't write the test yet");
});
```

## Executing tests

- **Test a single service:**

```sh
# Replace ~service~ by the name of the service you want to test
# Make sure there are test files in the folder unitTests/~service~
service=~service~ npm run test
```

- **Test all services (not recommended):**

```sh
npm run testAll
```

## To do

### On bitbucket

- Automatcally run tests for services on deploy (_common_ tests should be executed before trying to deploy any other service)
  - _What needs to be done:_ Write at least one test file for each service OR create script to only execute tests if there's a test file ([see post](https://stackoverflow.com/questions/35246829/mocha-throws-an-error-when-no-tests-are-found-can-this-be-suppressed)).
- Send test report by email when there's an error
  - _What needs to be done:_ Find out how to do that in bitbucket and change the [reporter](https://mochajs.org/#reporters) to a more human readable one.
  - _Idea:_ Save a report copy in a S3 bucket and notify a SNS topic.
- Suppress console log from successful tests
  - _What needs to be done:_ Find a suitable solution (see [this](https://github.com/mochajs/mocha/issues/1998) and [this](https://github.com/mochajs/mocha/issues/1582#issuecomment-87464832))

### Code coverage

- Get code coverage reports sent by email.

  - _What needs to be done:_ Find out how to do that in bitbucket and change the [reporter](https://mochajs.org/#reporters) to a more human readable one.
  - _Idea:_ Save a report copy in a S3 bucket and notify a SNS topic.

- Add a minimum coverage ratio to deploy.

  - _What needs to be done:_ Find out how to do that.

- Ignore legacy code.
  - _What needs to be done:_ Find out how to that.
