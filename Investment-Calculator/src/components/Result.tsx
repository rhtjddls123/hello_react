import { userInput } from "../types";
import { calculateInvestmentResults, formatter } from "../util/investment";

type Props = {
  userInput: userInput;
};

const Result = ({ userInput }: Props) => {
  const resultsData = calculateInvestmentResults(userInput);
  const initialInvestment =
    resultsData[0].valueEndOfYear -
    resultsData[0].interest -
    resultsData[0].annualInvestment;

  return (
    <table id="result">
      <thead>
        <tr>
          <th>Year</th>
          <th>Investment Value</th>
          <th>Interest (Year)</th>
          <th>Total interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {resultsData.map((value) => {
          const totalInterest =
            value.valueEndOfYear -
            value.annualInvestment * value.year -
            initialInvestment;
          const totalAmountInvested = value.valueEndOfYear - totalInterest;
          return (
            <tr key={value.year}>
              <th>{value.year}</th>
              <th>{formatter.format(value.valueEndOfYear)}</th>
              <th>{formatter.format(value.interest)}</th>
              <th>{formatter.format(totalInterest)}</th>
              <th>{formatter.format(totalAmountInvested)}</th>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Result;
