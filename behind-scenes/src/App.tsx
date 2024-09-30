import { useState } from "react";

import Counter from "./components/Counter/Counter.tsx";
import Header from "./components/Header.tsx";
import { log } from "./log.ts";
import ConfigureCounter from "./components/Counter/ConfigureCounter.tsx";

function App() {
  log("<App /> rendered");
  const [chosenCount, setChosenCount] = useState(0);

  const handleSetCount = (enteredNumber: number) => {
    setChosenCount(enteredNumber);
  };

  return (
    <>
      <Header />
      <main>
        <ConfigureCounter onSet={handleSetCount} />
        <Counter initialCount={chosenCount} />
      </main>
    </>
  );
}

export default App;
