export class Calculator {
  private incomeThreshold: number;
  private minYears: number = 2.5;
  private savingsThreshold: number;

  constructor(incomeThreshold: number, savingsThreshold: number, minYears: number) {
    this.incomeThreshold = incomeThreshold;
    this.savingsThreshold = savingsThreshold;
    this.minYears = minYears;
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
      : this.savingsThreshold +
          this.minYears * (this.incomeThreshold - annualIncome);
  }

  calculateIncome(savings: number) {
    return (
      (savings - this.savingsThreshold - this.minYears * this.incomeThreshold) /
      -this.minYears
    );
  }
}
