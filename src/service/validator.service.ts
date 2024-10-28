export class Validator {
  static isPositiveNum(value: number) {
    // Throw an exception if the value is less than 0.
    if (value < 0) {
      throw new Error("value < 0");
    }
  }

  static isNumber(value: unknown) {
    // Throw an exception if the value is not a number.
    if (typeof value !== "number") {
      throw new Error('typeof value !== "number"');
    }
  }

  static hasIncomeField(someObject: object) {
    // Throw an exception if the object does not have an income field.
    if (!Object.hasOwn(someObject, "income")) {
      throw new Error('!Object.hasOwn(someObject, "income")');
    }
  }
}
