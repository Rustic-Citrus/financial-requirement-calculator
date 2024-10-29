import { Calculator } from "../service/index.ts";
import { Validator, Formatter } from "../util/index.ts";
import {
  CURRENT_INCOME_THRESHOLD,
  CURRENT_MIN_YEARS,
  CURRENT_SAVINGS_THRESHOLD,
} from "../constants.ts";

export class Controller {
  private calculatorService: Calculator;

  constructor() {
    this.calculatorService = new Calculator(
      CURRENT_INCOME_THRESHOLD,
      CURRENT_SAVINGS_THRESHOLD,
      CURRENT_MIN_YEARS
    );
  }

  getParams(req: Request): URLSearchParams {
    // Retrieve the search parameters from the request object.
    return new URLSearchParams(new URL(req.url).search);
  }

  getResponse(
    paramNumber: number,
    expectedParam: "income" | "savings"
  ): Response {
    // Calculate the required income from the savings or the required savings from the income, format the output, and return the response to user.
    return expectedParam === "income"
      ? new Response(
          Formatter.buildPoundStr(
            this.calculatorService.calculateSavings(paramNumber)
          )
        )
      : new Response(
          Formatter.buildPoundStr(
            this.calculatorService.calculateIncome(paramNumber)
          )
        );
  }

  handleThrowable(error: unknown): Response {
    // Return the formatted response with error message or error as string.
    return new Response(null, {
      status: 400,
      statusText: error instanceof Error ? error.message : String(error),
    });
  }

  handleGet(req: Request, expectedParam: "income" | "savings"): Response {
    // Retrieve the search parameters from the request object.
    const params = this.getParams(req);

    try {
      // Check that the URL has the expected parameter, then save the value if it does.
      Validator.hasParam(params, expectedParam);
      const paramValue = params.get(expectedParam);

      // @ts-ignore Parameter existence checked. Check whether the parameter value is a number.
      Validator.isNumber(Number.parseFloat(paramValue));

      // @ts-ignore Parameter value is definitely a number. Check parameter value is greater than or equal to 0.
      Validator.isPositiveNum(Number.parseFloat(paramValue));

      // @ts-ignore Parameter value is definitely a positive number. Save value as a number to variable.
      const paramNumber: number = Number.parseFloat(paramValue);

      // Build the appropriate response.
      return this.getResponse(paramNumber, expectedParam);
    } catch (error: unknown) {
      // Handle any errors.
      return this.handleThrowable(error);
    }
  }
}
