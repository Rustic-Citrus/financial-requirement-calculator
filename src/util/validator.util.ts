export class Validator {
  static isPositiveNum(value: number) {
    // Throw an exception if the value is less than 0.
    if (value < 0) {
      throw new Error("value < 0");
    }
  }

  static isNumber(value: unknown) {
    // Throw an exception if the value is not a number.
    if (typeof value !== "number" || isNaN(value)) {
      throw new Error('typeof value !== "number"');
    }
  }

  static hasParam(params: URLSearchParams, key: string) {
    if (!params.has(key) || params.get(key) === null) {
      throw new Error(`!URLSearchParams.has("${key}")`);
    }
  }
}
