export class Calculator {
  private incomeThreshold: number;

  constructor(incomeThreshold: number) {
    this.incomeThreshold = incomeThreshold;
  }

  calculateSavings(annualIncome: number) {
    return 16000 + 2.5 * (this.incomeThreshold - annualIncome);
  }
}
