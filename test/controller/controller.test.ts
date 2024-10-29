import { beforeEach, describe, it } from "@std/testing/bdd";
import { stub } from "@std/testing/mock";
import { expect } from "jsr:@std/expect/expect";
import { Controller } from "../../src/controller/index.ts";
import { Validator } from "../../src/util/validator.util.ts";

interface TestCondition {
  param: "income" | "savings";
  request: Request;
  expectedValue: null | string;
}

describe("Controller tests", () => {
  let testController: Controller;
  let mockUrl: string;

  beforeEach(() => {
    // Setup
    // Create a fresh instance of the Controller class.
    testController = new Controller();
  });

  describe("handleGet tests", () => {
    // The expected parameters.
    const expectedParams: Array<"income" | "savings"> = ["income", "savings"];

    it("returns a 400-response for a request without the expected search parameters", () => {
      // Arrange
      // Initialise array for actual responses.
      const responses: Response[] = [];

      // Create a mock URL.
      mockUrl = "http://localhost:4000/";

      // Create a mock Request.
      const mockRequest = new Request(mockUrl, {
        method: "GET",
      });

      // Act
      expectedParams.forEach((param) => {
        responses.push(testController.handleGet(mockRequest, param));
      });

      // Assert
      responses.forEach((response) => {
        expect(response.status).toEqual(400);
        expect(response.statusText).toContain("!URLSearchParams.has");
      });
    });

    it("returns a 400-response for a request where the expected parameter has a value which is not a number", () => {
      // Arrange
      // Initialise array for actual responses.
      const responses: Response[] = [];

      const testConditions: TestCondition[] = [
        {
          param: "income",
          request: new Request("http://localhost:4000/?income=hello", {
            method: "GET",
          }),
          expectedValue: null,
        },
        {
          param: "savings",
          request: new Request("http://localhost:4000/?savings=world", {
            method: "GET",
          }),
          expectedValue: null,
        },
      ];

      // Act
      testConditions.forEach((condition) => {
        responses.push(
          testController.handleGet(condition.request, condition.param)
        );
      });

      // Assert
      responses.forEach((response) => {
        expect(response.status).toEqual(400);
        expect(response.statusText).toEqual('typeof value !== "number"');
      });
    });

    it("returns a 400-response for a request where the value for the expected parameter is a negative number", () => {
      // Arrange
      // Initialise array for actual responses.
      const responses: Response[] = [];

      const testConditions: TestCondition[] = [
        {
          param: "income",
          request: new Request("http://localhost:4000/?income=-5300", {
            method: "GET",
          }),
          expectedValue: null,
        },
        {
          param: "savings",
          request: new Request("http://localhost:4000/?savings=-75000", {
            method: "GET",
          }),
          expectedValue: null,
        },
      ];

      // Act
      testConditions.forEach((condition) => {
        responses.push(
          testController.handleGet(condition.request, condition.param)
        );
      });

      // Assert
      responses.forEach((response) => {
        expect(response.status).toEqual(400);
        expect(response.statusText).toEqual("value < 0");
      });
    });

    it("returns a 400-response if a non-error is thrown", () => {
      // Setup
      // Save a reference to the original implementation of isNumber.
      const originalIsNumber = Validator.isNumber;

      // Arrange
      // Create a stub of a Validator method which throws something other than an Error.
      stub(Validator, "isNumber", () => {
        throw "Woops!";
      });

      // Create a mock URL.
      mockUrl = "http://localhost:4000/?savings=27500";

      // Create a mock Request.
      const mockRequest = new Request(mockUrl, {
        method: "GET",
      });

      // Act
      // Try to process a perfectly valid request.
      const response = testController.handleGet(mockRequest, "savings");

      // Assert
      expect(response.status).toEqual(400);
      expect(response.statusText).toEqual("Woops!");

      // Teardown
      Validator.isNumber = originalIsNumber;
    });

    it("returns a 200-response for a request when the values for the expected parameters are valid", () => {
      // Arrange
      const responses: Response[] = [];

      const testConditions: TestCondition[] = [
        {
          param: "savings",
          request: new Request("http://localhost:4000/?savings=55000", {
            method: "GET",
          }),
          expectedValue: "£13,400.00",
        },
        {
          param: "income",
          request: new Request("http://localhost:4000/?income=30000", {
            method: "GET",
          }),
          expectedValue: "£0.00",
        },
      ];
      // Act
      testConditions.forEach((condition) => {
        responses.push(
          testController.handleGet(condition.request, condition.param)
        );
      });

      // Assert
      responses.forEach((response) => {
        console.log(response);
      });

      responses.forEach(async (response, index) => {
        expect(await response.text()).toEqual(
          testConditions[index].expectedValue
        );
      });
    });
  });
});
