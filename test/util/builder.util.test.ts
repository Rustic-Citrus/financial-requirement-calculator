import { beforeEach, describe, it } from "@std/testing/bdd";
import { expect, fn } from "jsr:@std/expect";
import { Builder } from "../../src/util/builder.util.ts";
import { Calculator } from "../../src/service/index.ts";

describe("Builder Utility tests", () => {
  let mockCalculator: Calculator;

  beforeEach(() => {
    mockCalculator = {
      calculateSavings: fn(() => 128),
      calculateIncome: fn(() => 256),
    } as Calculator;
  });

  describe("buildResponseFromCalculation tests", () => {
    it("calls the Formatter.buildPoundStr method if 'income' is passed as a parameter", () => {
      Builder.buildResponseFromCalculation(25000, "income", mockCalculator);

      expect(mockCalculator.calculateSavings).toHaveBeenCalledTimes(1);
      expect(mockCalculator.calculateIncome).not.toHaveBeenCalled();
    });

    it("calls the Formatter.buildPoundStr method if 'savings' is passed as a parameter", () => {
      Builder.buildResponseFromCalculation(50000, "savings", mockCalculator);

      expect(mockCalculator.calculateIncome).toHaveBeenCalledTimes(1);
      expect(mockCalculator.calculateSavings).not.toHaveBeenCalled();
    });

    it("throws an exception if there is an unexpected parameter", () => {
      expect(() => {
        Builder.buildResponseFromCalculation(
          5000,
          "strawberries" as "income" | "savings",
          mockCalculator
        );
      }).toThrow("expectedParam !== savings || income");
      expect(mockCalculator.calculateIncome).not.toHaveBeenCalled();
      expect(mockCalculator.calculateSavings).not.toHaveBeenCalled();
    });

    it("returns a Response object if the parameter is valid", () => {
      const validParams: ("income" | "savings")[] = ["income", "savings"];

      validParams.forEach((param) => {
        expect(
          Builder.buildResponseFromCalculation(5000, param, mockCalculator)
        ).toBeInstanceOf(Response);
      });
    });
  });
});
