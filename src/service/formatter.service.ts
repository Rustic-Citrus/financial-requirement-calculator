export class Formatter {
  static buildPoundStr(value: number): string {
    return value.toLocaleString("en-GB", {
      style: "currency",
      currency: "GBP",
    });
  }
}
