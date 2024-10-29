import { beforeEach, describe, it } from "@std/testing/bdd";
import { stub } from "@std/testing/mock";
import { expect } from "jsr:@std/expect/expect";
import { Controller } from "../../src/controller/index.ts";
import { Validator } from "../../src/util/validator.util.ts";

describe("Controller tests", () => {
  let testController: Controller;
  let mockUrl: string;

  beforeEach(() => {
    // Setup
    // Create a fresh instance of the Controller class.
    testController = new Controller();
  });

  describe("handleGetIncome tests", () => {
    it("returns a 400-response for a request with no savings search parameters", () => {
      // Arrange
      // Create a mock URL.
      mockUrl = "http://localhost:4000/";

      // Create a mock Request.
      const mockRequest = new Request(mockUrl, {
        method: "GET",
      });

      // Act
      const response = testController.handleGetIncome(mockRequest);

      // Assert
      expect(response.status).toEqual(400);
      expect(response.statusText).toEqual('!URLSearchParams.has("savings")');
    });

    it("returns a 400-response for a request with a value for the savings search parameter that is not a number", () => {
      // Arrange
      // Create a mock URL.
      mockUrl = "http://localhost:4000/?savings=hello";

      // Create a mock Request.
      const mockRequest = new Request(mockUrl, {
        method: "GET",
      });

      // Act
      const response = testController.handleGetIncome(mockRequest);

      // Assert
      expect(response.status).toEqual(400);
      expect(response.statusText).toEqual('typeof value !== "number"');
    });

    it("returns a 400-response for a request with a value for the savings search parameter that is a negative number", () => {
      // Arrange
      // Create a mock URL.
      mockUrl = "http://localhost:4000/?savings=-45000";

      // Create a mock Request.
      const mockRequest = new Request(mockUrl, {
        method: "GET",
      });

      // Act
      const response = testController.handleGetIncome(mockRequest);

      // Assert
      expect(response.status).toEqual(400);
      expect(response.statusText).toEqual("value < 0");
    });

    it("returns a 200-response for a request when the value for the savings parameter is valid", async () => {
      // Arrange
      // Create a mock URL.
      mockUrl = "http://localhost:4000/?savings=27500";

      // Create a mock Request.
      const mockRequest = new Request(mockUrl, {
        method: "GET",
      });

      // Act
      const response = testController.handleGetIncome(mockRequest);
      // Assert
      expect(response.status).toEqual(200);
      expect(await response.text()).toEqual("£24,400.00");        
    });

    it("returns a 400-response when a non-error is thrown", () => {
      // Setup
      // Save a reference to the original implementation of isNumber.
      const originalIsNumber = Validator.isNumber

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
      const response = testController.handleGetIncome(mockRequest);

      // Assert
      expect(response.status).toEqual(400);
      expect(response.statusText).toEqual("Woops!");

      // Teardown
      Validator.isNumber = originalIsNumber;
    })
  });

  describe("handleGetSavings tests", () => {
    it("returns a 400-response for a request with no income search parameters", () => {
      // Arrange
      // Create a mock URL.
      mockUrl = "http://localhost:4000/";

      // Create a mock Request.
      const mockRequest = new Request(mockUrl, {
        method: "GET",
      });

      // Act
      const response = testController.handleGetSavings(mockRequest);

      // Assert
      expect(response.status).toEqual(400);
      expect(response.statusText).toEqual('!URLSearchParams.has("income")');
    });

    it("returns a 400-response for a request with a value for the income search parameter that is not a number", () => {
      // Arrange
      // Create a mock URL.
      mockUrl = "http://localhost:4000/?income=hello";

      // Create a mock Request.
      const mockRequest = new Request(mockUrl, {
        method: "GET",
      });

      // Act
      const response = testController.handleGetSavings(mockRequest);

      // Assert
      expect(response.status).toEqual(400);
      expect(response.statusText).toEqual('typeof value !== "number"');
    });

    it("returns a 400-response for a request with a value for the income search parameter that is a negative number", () => {
      // Arrange
      // Create a mock URL.
      mockUrl = "http://localhost:4000/?income=-45000";

      // Create a mock Request.
      const mockRequest = new Request(mockUrl, {
        method: "GET",
      });

      // Act
      const response = testController.handleGetSavings(mockRequest);

      // Assert
      expect(response.status).toEqual(400);
      expect(response.statusText).toEqual("value < 0");
    });

    it("returns a 200-response for a request when the value for the income parameter is valid", async () => {
      // Arrange
      // Create a mock URL.
      mockUrl = "http://localhost:4000/?income=27500";

      // Create a mock Request.
      const mockRequest = new Request(mockUrl, {
        method: "GET",
      });

      // Act
      const response = testController.handleGetSavings(mockRequest);
      // Assert
      expect(response.status).toEqual(200);
      expect(await response.text()).toEqual("£19,750.00");        
    });
  })
});
