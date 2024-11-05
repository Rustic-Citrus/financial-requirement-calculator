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
        const actual = Builder.buildResponseFromCalculation(
          5000,
          param,
          mockCalculator
        );

        expect(actual).toBeInstanceOf(Response);
        expect(actual.status).toEqual(200);
      });
    });
  });

  describe("buildResponseFromThrowable tests", () => {
    it("returns a 400-Response object if an Error object is passed as an argument", () => {
      const actual = Builder.buildResponseFromThrowable(
        new Error("Test Error")
      );

      expect(actual).toBeInstanceOf(Response);
      expect(actual.status).toEqual(400);
      expect(actual.statusText).toEqual("Test Error");
    });

    it("returns a 400-Response object if a string is passed as an argument", () => {
      const actual = Builder.buildResponseFromThrowable("Hello, World!");

      expect(actual).toBeInstanceOf(Response);
      expect(actual.status).toEqual(400);
      expect(actual.statusText).toEqual("Hello, World!");
    });

    it("returns a 400-Response object if a number is passed as an argument", () => {
      const actual = Builder.buildResponseFromThrowable(42);

      expect(actual).toBeInstanceOf(Response);
      expect(actual.status).toEqual(400);
      expect(actual.statusText).toEqual("42");
    });

    it("returns a 400-Response object if a non-Error object is passed as an argument", () => {
      const testObject = {
        name: "Albert Einstein",
        occupation: "Scientist",
      };
      const actual = Builder.buildResponseFromThrowable(testObject);

      expect(actual).toBeInstanceOf(Response);
      expect(actual.status).toEqual(400);
      expect(actual.statusText).toEqual(String(testObject));
    });
  });

  describe("buildParamsFromRequest tests", () => {
    it("returns an instance of a URLSearchParams object", () => {
      expect(
        Builder.buildParamsFromRequest(
          new Request(new URL("https://this.is.a.test/"))
        )
      ).toBeInstanceOf(URLSearchParams);
    });

    it("returns an instance of a URLSearchParams object with the original parameters of the request", () => {
      const url = "https://this.is.a.test/?example=Hello+World";
      
      const actual = Builder.buildParamsFromRequest(
        new Request(new URL(url))
      );

      expect(actual.has("example")).toBeTruthy();
      expect(actual.get("example")).toEqual("Hello World");
    })
  });
});
