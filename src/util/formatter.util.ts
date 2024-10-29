export class Formatter {
  static buildPoundStr(value: number): string {
    // Return a string of the number formatted to 2 decimal places and affixed with a pound symbol.
    return value.toLocaleString("en-GB", {
      style: "currency",
      currency: "GBP",
    });
  }
}
