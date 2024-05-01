// This function expects a JS object as an argument
// The object should contain the following properties
// - initialInvestment: The initial investment amount
// - annualInvestment: The amount invested every year
// - expectedReturn: The expected (annual) rate of return
// - duration: The investment duration (time frame)

import { userInput } from "../types";

export function calculateInvestmentResults({
  InitialInvestment,
  AnnualInvestment,
  ExpectedReturn,
  Duration,
}: userInput) {
  const annualData = [];
  let investmentValue = InitialInvestment;

  for (let i = 0; i < Duration; i++) {
    const interestEarnedInYear = investmentValue * (ExpectedReturn / 100);
    investmentValue += interestEarnedInYear + AnnualInvestment;
    annualData.push({
      year: i + 1, // year identifier
      interest: interestEarnedInYear, // the amount of interest earned in this year
      valueEndOfYear: investmentValue, // investment value at end of year
      annualInvestment: AnnualInvestment, // investment added in this year
    });
  }

  return annualData;
}

// The browser-provided Intl API is used to prepare a formatter object
// This object offers a "format()" method that can be used to format numbers as currency
// Example Usage: formatter.format(1000) => yields "$1,000"
export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
