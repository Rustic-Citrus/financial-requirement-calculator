import { Formatter } from "./formatter.util.ts";
import { Calculator } from "../service/index.ts";

export class Builder {
  static buildResponseFromCalculation(
    paramNumber: number,
    expectedParam: "income" | "savings",
    calculator: Calculator
  ): Response {
    // Calculate the required income from the savings or the required savings from the income, format the output, and return the response to user.
    switch (expectedParam) {
      case "income":
        return new Response(
          Formatter.buildPoundStr(calculator.calculateSavings(paramNumber))
        );
      case "savings":
        return new Response(
          Formatter.buildPoundStr(calculator.calculateIncome(paramNumber))
        );
      default:
        throw new Error("expectedParam !== savings || income");
    }
  }

}
