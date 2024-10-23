export class Calculator {
  private incomeThreshold: number;

  constructor(incomeThreshold: number) {
    this.incomeThreshold = incomeThreshold;
  }

  calculateSavings(annualIncome: number) {
    // Throw an exception if annualIncome is not a number.
    if (typeof annualIncome !== "number") {
      throw new Error('typeof annualIncome !== "number"');
    }

    // Throw an exception if annualIncome is less than £0.
    if (annualIncome < 0) {
      throw new Error("annualIncome < 0");
    }

    return annualIncome >= this.incomeThreshold
      ? 0
      : 16000 + 2.5 * (this.incomeThreshold - annualIncome);
  }
}
