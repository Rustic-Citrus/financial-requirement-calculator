import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { Validator } from "../../src/service/validator.service.ts";

describe("Validator Service tests", () => {
  describe("isPositiveNum tests", () => {
    it("throws an error if the received value is a number less than 0", () => {
      // Assemble
      // Set three randomly chosen values for values less than 0.
      const testValues: number[] = [-13657, -78254, -35101];

      // Act & Assert
      // Check that each negative value causes an error to be thrown.
      testValues.forEach((value) => {
        expect(() => {
          Validator.isPositiveNum(value);
        }).toThrow();
      });
    });

    it("does not throw an error if the received value is a number equal to or greater than 0", () => {
      // Assemble
      // Set three randomly chosen values for values greater than or equal to 0.
      const testValues: number[] = [0, 20543, 23713];

      // Act & Assert
      // Check that each negative value does not cause an error to be thrown.
      testValues.forEach((value) => {
        expect(() => {
          Validator.isPositiveNum(value);
        }).not.toThrow();
      });
    });
  });

  describe("isNumber tests", () => {
    it("throws an error if the received value is not a number", () => {
      // Assemble
      // Set three values that are not numbers.
      const testValues = ["Hello, World!", [1, 2, 3], true];

      // Act & Assert
      // For all test values...
      testValues.forEach((value) => {
        expect(() => {
          // ...Check that each value causes an exception to be thrown.
          Validator.isNumber(value);
        }).toThrow();
      });
    });

    it("does not throw an error if the received value is a number", () => {
      // Assemble
      // Set three values that are numbers.
      const testValues = [8073, -7762, 29938.8];

      // Act & Assert
      // For all test values...
      testValues.forEach((value) => {
        expect(() => {
          // ...Check that each value does not cause an exception to be thrown.
          Validator.isNumber(value);
        }).not.toThrow();
      });
    });
  });
});
