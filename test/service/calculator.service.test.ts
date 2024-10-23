import { beforeEach, describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { assertThrows } from "jsr:@std/assert";
import { Calculator } from "../../src/service/calculator.service.ts";
import { CURRENT_INCOME_THRESHOLD } from "../../src/constants.ts";

describe("Calculator Service Tests", () => {
  let testCalculator: Calculator;

  describe("calculateSavings method", () => {
    // Setup

    beforeEach(() => {
      // Instantiate the Calculator class with the current income threshold.
      testCalculator = new Calculator(CURRENT_INCOME_THRESHOLD);
    });

    it("returns the expected value for the required savings, given a valid income threshold and a valid number representing an annual income", () => {
      // Assemble

      // Set three randomly chosen values for income between 0-10,000, 10,001-20,000 and 20,001-28,999.
      const testAnnualIncomes: number[] = [2285, 17228, 28481];

      // Set the savings values using the predefined formula.
      const expectedSavings: number[] = [82787.5, 45430.0, 17297.5];

      // Initialise an empty array for the calculated savings values.
      const actualSavings: number[] = [];

      // Act
      for (const income of testAnnualIncomes) {
        // Calculate the required savings.
        const savings = testCalculator.calculateSavings(income);

        // Push to actualSavings array.
        actualSavings.push(savings);
      }

      // Assert

      // Check each calculated savings value matches the predefined savings values.
      expect(actualSavings[0]).toEqual(expectedSavings[0]);
      expect(actualSavings[1]).toEqual(expectedSavings[1]);
      expect(actualSavings[2]).toEqual(expectedSavings[2]);
    });

    it("returns a value of zero for savings if the income parameter is greater than or equal to 29000", () => {
      // Assemble
      // Set three randomly chosen values for income between £29,000 and £100,000.
      const testAnnualIncomes: number[] = [29000, 97293, 63321];

      // Expected savings is £0 for all three values.
      const expectedSavings: number = 0;

      // Initialise an empty array for the calculated savings values.
      const actualSavings: number[] = [];

      // Act
      for (const income of testAnnualIncomes) {
        // Calculate the required savings.
        const savings = testCalculator.calculateSavings(income);

        // Push to actualSavings array.
        actualSavings.push(savings);
      }

      // Assert
      // Check each calculated savings value matches the predefined savings values.
      actualSavings.forEach((savings) => {
        expect(savings).toBe(expectedSavings);
      });
    });

    it("throws an error if the income parameter is a number less than 0", () => {
      // Assemble
      // Set three randomly chosen values for incomes less than £0.
      const testAnnualIncomes: number[] = [-13657, -78254, -35101];

      // Act & Assert
      // Check that each income value causes an error to be thrown.
      testAnnualIncomes.forEach((income) => {
        assertThrows(() => {
          testCalculator.calculateSavings(income);
        });
      });
    });

    it("throws an error if the income parameter is not a number", () => {
      // Assemble
      // Set three values that are not numbers.
      const testAnnualIncomes = ["Hello, World!", [1, 2, 3], true];

      // Act & Assert
      // @ts-ignore For all testAnnualIncome values... 
      testAnnualIncomes.forEach((income) => {
        assertThrows(() => {
          // @ts-ignore ...Check that each income value causes an exception to be thrown. 
          testCalculator.calculateSavings(income);
        });
      });
    });
  });
});
