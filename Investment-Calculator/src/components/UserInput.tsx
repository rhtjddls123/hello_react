import { userInput } from "../types";

type input =
  | "InitialInvestment"
  | "AnnualInvestment"
  | "ExpectedReturn"
  | "Duration";

type Props = {
  userInput: userInput;
  handleChange: (inputIdentifier: input, newValue: number) => void;
};

const UserInput = ({ userInput, handleChange }: Props) => {
  return (
    <section id="user-input">
      <div className="input-group">
        <p>
          <label>INITIAL INVESTMENT</label>
          <input
            type="number"
            required
            value={userInput.InitialInvestment}
            onChange={(event) => {
              handleChange("InitialInvestment", +event.target.value);
            }}
          />
        </p>
        <p>
          <label>ANNUAL INVESTMENT</label>
          <input
            type="number"
            required
            value={userInput.AnnualInvestment}
            onChange={(event) => {
              handleChange("AnnualInvestment", +event.target.value);
            }}
          />
        </p>
      </div>
      <div className="input-group">
        <p>
          <label>EXPECTED RETURN</label>
          <input
            type="number"
            required
            value={userInput.ExpectedReturn}
            onChange={(event) => {
              handleChange("ExpectedReturn", +event.target.value);
            }}
          />
        </p>
        <p>
          <label>DURATION</label>
          <input
            type="number"
            required
            value={userInput.Duration}
            onChange={(event) => {
              handleChange("Duration", +event.target.value);
            }}
          />
        </p>
      </div>
    </section>
  );
};

export default UserInput;
