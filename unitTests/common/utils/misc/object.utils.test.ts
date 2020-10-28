import { expect } from "chai";
require("chai").should();
import {
  mapAttributes,
  getAttribute,
  setAttribute,
} from "../../../../src/utils/misc/object.utils";

describe("The getAttribute function", () => {
  const testObject = { a: 1, b: { c: 2 } };

  it("should return undefined when the desired attribute doesn't exist", () => {
    const unexistentAttribute = "d";

    const result = getAttribute(testObject, unexistentAttribute);

    expect(result).to.be.undefined;
  });

  describe("should return the desired attribute when it exists", () => {
    type testType = {
      description: string;
      attribute: string;
      expectedValue: any;
    };
    const testCases: testType[] = [
      {
        description: "on the root of the object",
        attribute: "a",
        expectedValue: 1,
      },
      {
        description: "nested on the object",
        attribute: "b.c",
        expectedValue: 2,
      },
    ];

    for (let test of testCases) {
      it(test.description, () => {
        const result = getAttribute(testObject, test.attribute);

        expect(result).to.be.equal(test.expectedValue);
      });
    }
  });

  it("should return undefined when the attribute is undefined", () => {
    const result = getAttribute(testObject, undefined);

    expect(result).to.be.undefined;
  });
});

describe("The setAttribute function", () => {
  const initialObject: any = { a: 1, b: { c: 2 } };
  let testObject: any;
  beforeEach(() => {
    testObject = { ...initialObject };
  });

  describe("should create the attribute if it doesn't exists", () => {
    type testType = {
      description: string;
      attribute: string;
      value: any;
    };
    const testCases: testType[] = [
      {
        description: "on the root of the object",
        attribute: "d",
        value: "1",
      },
      {
        description: "nested on the object",
        attribute: "b.d",
        value: 2,
      },
    ];

    for (let test of testCases) {
      it(test.description, () => {
        const result = setAttribute(initialObject, test.attribute, test.value);

        expect(result).to.have.nested.property(test.attribute, test.value);
      });
    }
  });

  describe("should replace the attribute if it exists", () => {
    type testType = {
      description: string;
      attribute: string;
      value: any;
    };
    const testCases: testType[] = [
      {
        description: "on the root of the object",
        attribute: "a",
        value: 2,
      },
      {
        description: "nested on the object",
        attribute: "b.c",
        value: 1,
      },
    ];

    for (let test of testCases) {
      it(test.description, () => {
        const result = setAttribute(initialObject, test.attribute, test.value);

        expect(result).to.have.nested.property(test.attribute, test.value);
      });
    }
  });

  it("should not change other attributes");
});

describe("The mapAttribute function", () => {
  // Variables common to some tests
  const map = { testInput: "testOutput" };
  const defaultValues = { testOutput: "default" };

  describe("should use the default value when", () => {
    type testType = { description: string; object: any };
    const testCases: testType[] = [
      //Object with missing testInput
      { description: "the mapped attribute doesn't exist", object: {} },
      //Object with undefined testInput
      {
        description: "the mapped attribute is undefined",
        object: { testInput: undefined },
      },
      //Object with null testInput
      {
        description: "the mapped attribute is null",
        object: { testInput: null },
      },
    ];

    for (let test of testCases) {
      it(test.description, () => {
        const result = mapAttributes(test.object, map, { defaultValues });
        expect(result)
          .to.have.property("testOutput")
          .equal(defaultValues.testOutput);
      });
    }
  });

  describe("should use the actual value when", () => {
    type testType = { description: string; object: any; expectedValue: any };
    const testCases: testType[] = [
      //Object has value equals false
      {
        description: "the mapped attribute is false",
        object: { testInput: false },
        expectedValue: false,
      },
      //Object has testInput equals 0
      {
        description: "the mapped attribute is 0",
        object: { testInput: 0 },
        expectedValue: 0,
      },
    ];

    for (let test of testCases) {
      it(test.description, () => {
        const result = mapAttributes(test.object, map, { defaultValues });
        expect(result)
          .to.have.property("testOutput")
          .equal(test.expectedValue);
      });
    }
  });
});
