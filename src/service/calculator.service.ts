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
    
    return annualIncome >= this.incomeThreshold
      ? 0
      : this.savingsThreshold +
          this.minYears * (this.incomeThreshold - annualIncome);
  }

  calculateIncome(savings: number) {
    // Throw an exception if savings is not a number.
    if (typeof savings !== "number") {
      throw new Error('typeof savings !== "number"');
    }

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
