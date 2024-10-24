export class Validator {
  static isPositiveNum(value: number) {
    if (value < 0) {
      throw new Error("value < 0");
    }
  }

  static isNumber(value: unknown) {
    if (typeof value !== "number") {
      throw new Error('typeof value !== "number"');
    }
  }
}
