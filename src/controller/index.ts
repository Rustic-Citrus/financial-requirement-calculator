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

  handleGetIncome(req: Request): Response {
    // Retrieve the search parameters from the request object.
    const url = new URL(req.url);
    const params = new URLSearchParams(url.search);

    try {
      // Check the URL has a savings search parameter.
      Validator.hasSavingsParam(params);

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
      // Check that an Error is thrown rather than something else.
      let message: string;

      if (error instanceof Error) {
        message = error.message;
      } else {
        message = String(error);
      }

      // Return the error message to the user.
      return new Response(null, {
        status: 400,
        statusText: message,
      });
    }
  }

  handleGetSavings(req: Request): Response {
    // Retrieve the search parameters from the request object.
    const url = new URL(req.url);
    const params = new URLSearchParams(url.search);

    try {
      // Check the URL has an income search parameter.
      Validator.hasIncomeParam(params);
    } catch (error: unknown) {
      // Check that an Error is thrown rather than something else.
      let message: string;

      if (error instanceof Error) {
        message = error.message;
      } else {
        message = String(error);
      }

      // Return the error message to the user.
      return new Response(null, {
        status: 400,
        statusText: message,
      });
    }

    return new Response();
  }
}
