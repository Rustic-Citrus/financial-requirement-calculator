import { beforeEach, describe, it } from "@std/testing/bdd";
import { Controller } from "../../src/controller/index.ts";
import { expect } from "jsr:@std/expect/expect";

describe("Controller class tests", () => {
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
  });
});
