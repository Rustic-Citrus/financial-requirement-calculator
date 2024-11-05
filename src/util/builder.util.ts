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

  static buildResponseFromThrowable(error: unknown): Response {
    // Return the formatted response with error message or error as string.
    return new Response(null, {
      status: 400,
      statusText: error instanceof Error ? error.message : String(error),
    });
  }

  static buildParamsFromRequest(req: Request): URLSearchParams {
    // Retrieve the search parameters from the request object.
    return new URLSearchParams(new URL(req.url).search);
  }
}
