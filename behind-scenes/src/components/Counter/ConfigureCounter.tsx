import { ChangeEvent, useState } from "react";
import { log } from "../../log";

interface Props {
  onSet: (enteredNumber: number) => void;
}

const ConfigureCounter = ({ onSet }: Props) => {
  log("<ConfigureCounter /> rendered", 1);
  const [enteredNumber, setEnteredNumber] = useState(0);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setEnteredNumber(+event.target.value);
  }

  function handleSetClick() {
    onSet(enteredNumber);
    setEnteredNumber(0);
  }
  return (
    <section id="configure-counter">
      <h2>Set Counter</h2>
      <input type="number" onChange={handleChange} value={enteredNumber} />
      <button onClick={handleSetClick}>Set</button>
    </section>
  );
};

export default ConfigureCounter;
