export class Calculator {
  private incomeThreshold: number;

  constructor(incomeThreshold: number) {
    this.incomeThreshold = incomeThreshold;
  }

  calculateSavings(annualIncome: number) {
    if (annualIncome >= 0) {
      return annualIncome >= this.incomeThreshold ?
      0 :
      16000 + 2.5 * (this.incomeThreshold - annualIncome);
    }
    throw new Error("annualIncome < 0");
  }
}
