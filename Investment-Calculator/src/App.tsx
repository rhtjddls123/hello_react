import { useState } from "react";
import Header from "./components/Header";
import Result from "./components/Result";
import UserInput from "./components/UserInput";

type input =
  | "InitialInvestment"
  | "AnnualInvestment"
  | "ExpectedReturn"
  | "Duration";

function App() {
  const [userInput, setUserInput] = useState({
    InitialInvestment: 10000,
    AnnualInvestment: 1200,
    ExpectedReturn: 6,
    Duration: 10,
  });

  const handleChange = (inputIdentifier: input, newValue: number) => {
    setUserInput((preData) => {
      return { ...preData, [inputIdentifier]: newValue };
    });
  };

  const inputIsValid = userInput.Duration >= 1;

  return (
    <>
      <Header />
      <UserInput userInput={userInput} handleChange={handleChange} />
      {inputIsValid ? (
        <Result userInput={userInput} />
      ) : (
        <p className="center">Please enter a duration greater than zero.</p>
      )}
    </>
  );
}

export default App;
