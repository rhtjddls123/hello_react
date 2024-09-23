import { useRef, useState } from "react";

export default function Player() {
  const playerName = useRef<HTMLInputElement>(null);
  const [enteredPlayerName, setEnteredPlayerName] = useState<string | null>(null);

  const handleClick = () => {
    if (playerName.current?.value) {
      setEnteredPlayerName(playerName.current.value);
      playerName.current.value = "";
    }
  };

  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName ?? "unknown entity"}</h2>
      <p>
        <input type="text" ref={playerName} />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
