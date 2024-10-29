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
    } catch (error: unknown) {
      // Handle any errors.
      return this.handleThrowable(error);
    }
  }

  handleGetIncome(req: Request): Response {
    // Retrieve the search parameters from the request object.
    const params = this.getParams(req);

    try {
      // Check the URL has a savings search parameter.
      Validator.hasParam(params, "savings");

      // @ts-ignore Savings value already checked.
      const savingsString: string = params.get("savings");

      // Check whether the value for the savings key is a number.
      Validator.isNumber(Number.parseFloat(savingsString));

      // @ts-ignore Savings value already checked.
      const savings: number = Number.parseFloat(savingsString);

      // Check savings is a positive number.
      Validator.isPositiveNum(savings);

      // Calculate the required income from the savings.
      const income = this.calculatorService.calculateIncome(savings);

      // Format the required income.
      const formattedIncome = Formatter.buildPoundStr(income);

      // Return the formatted string to the user.
      return new Response(formattedIncome);
    } catch (error: unknown) {
      // Handle the error.
      return this.handleThrowable(error);
    }
  }

  handleGetSavings(req: Request): Response {
    // Retrieve the search parameters from the request object.
    const params = this.getParams(req);

    try {
      // Check the URL has an income search parameter.
      Validator.hasParam(params, "income");

      // @ts-ignore Income value already checked.
      const incomeString: string = params.get("income");

      // Check whether the value for the income key is a number.
      Validator.isNumber(Number.parseFloat(incomeString));

      // @ts-ignore Income value already checked.
      const income: number = Number.parseFloat(incomeString);

      // Check income is a positive number.
      Validator.isPositiveNum(income);

      // Calculate the required savings from the income.
      const savings = this.calculatorService.calculateSavings(income);

      // Format the required savings.
      const formattedSavings = Formatter.buildPoundStr(savings);

      // Return the formatted string to the user.
      return new Response(formattedSavings);
    } catch (error: unknown) {
      // Handle the error.
      return this.handleThrowable(error);
    }
  }
}
