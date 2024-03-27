import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";

const driveActivePlayer = (
  gameTurns: { square: { row: number; col: number }; player: string }[]
) => {
  let curPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") curPlayer = "O";
  return curPlayer;
};

function App() {
  const [gameTurns, setGameTurns] = useState<
    { square: { row: number; col: number }; player: string }[]
  >([]);

  const activePlayer = driveActivePlayer(gameTurns);

  const handleActivePlayer = (rowIndex: number, colIndex: number) => {
    setGameTurns((prevTurns) => {
      const curPlayer = driveActivePlayer(prevTurns);

      const updateTurns = [
        { square: { row: rowIndex, col: colIndex }, player: curPlayer },
        ...prevTurns,
      ];
      return updateTurns;
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" activePlayer={activePlayer} />
          <Player name="Player 2" symbol="O" activePlayer={activePlayer} />
        </ol>
        <GameBoard gameTurns={gameTurns} onSelectSquare={handleActivePlayer} />
      </div>
      <Log gameTurns={gameTurns} />
    </main>
  );
}

export default App;
