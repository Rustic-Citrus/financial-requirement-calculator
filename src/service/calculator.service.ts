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
    return annualIncome >= this.incomeThreshold
      ? 0
      : this.savingsThreshold +
          this.minYears * (this.incomeThreshold - annualIncome);
  }

  calculateIncome(savings: number) {
    // Throw an exception if savings are lower than threshold.
    if (savings < this.savingsThreshold) {
      throw new Error("savings < savingsThreshold");
    }

    return (
      (savings - this.savingsThreshold - this.minYears * this.incomeThreshold) /
      -this.minYears
    );
  }
}
