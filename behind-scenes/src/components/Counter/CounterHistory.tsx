import { useState } from "react";

import { log } from "../../log.js";

interface HistoryItemType {
  count: number;
}

function HistoryItem({ count }: HistoryItemType) {
  log("<HistoryItem /> rendered", 3);

  const [selected, setSelected] = useState(false);

  function handleClick() {
    setSelected((prevSelected) => !prevSelected);
  }

  return (
    <li onClick={handleClick} className={selected ? "selected" : undefined}>
      {count}
    </li>
  );
}

interface CounterHistoryType {
  history: number[];
}

export default function CounterHistory({ history }: CounterHistoryType) {
  log("<CounterHistory /> rendered", 2);

  return (
    <ol>
      {history.map((count, index) => (
        <HistoryItem key={index} count={count} />
      ))}
    </ol>
  );
}
