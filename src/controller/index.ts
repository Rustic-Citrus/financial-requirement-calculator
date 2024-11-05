import { Calculator } from "../service/index.ts";
import { Builder, Validator } from "../util/index.ts";
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

  handleGet(req: Request, expectedParam: "income" | "savings"): Response {
    try {
      // 1. VALIDATION STEPS

      // Retrieve the search parameters from the request object, check that the URL has the expected parameter, then save the value if it does.
      const params = Builder.buildParamsFromRequest(req);
      Validator.hasParam(params, expectedParam);
      const paramValue = params.get(expectedParam);

      // @ts-ignore Parameter existence checked. Check whether the parameter value is a number.
      Validator.isNumber(Number.parseFloat(paramValue));

      // @ts-ignore Parameter value is definitely a number. Check parameter value is greater than or equal to 0.
      Validator.isPositiveNum(Number.parseFloat(paramValue));

      // @ts-ignore Parameter value is definitely a positive number. Save value as a number to variable.
      const paramNumber: number = Number.parseFloat(paramValue);

      // 2. CALCULATION AND OUTPUT STEP

      // Build the appropriate response.
      return Builder.buildResponseFromCalculation(
        paramNumber,
        expectedParam,
        this.calculatorService
      );
    } catch (error: unknown) {
      // Handle any errors.
      return Builder.buildResponseFromThrowable(error);
    }
  }
}
