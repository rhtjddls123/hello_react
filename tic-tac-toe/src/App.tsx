import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const driveActivePlayer = (
  gameTurns: { square: { row: number; col: number }; player: string }[]
) => {
  let curPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") curPlayer = "O";
  return curPlayer;
};

function App() {
  const [players, setPlayers] = useState({ X: "Player 1", O: "Player 2" });
  const [gameTurns, setGameTurns] = useState<
    { square: { row: number; col: number }; player: string }[]
  >([]);

  const gameBoard: (string | null)[][] = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let winner: string | null = null;
  const hasDraw = gameTurns.length === 9 && !winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    )
      winner = players[firstSquareSymbol as "X" | "O"];
  }
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

  const handleRestart = () => {
    setGameTurns([]);
  };

  const handleSetName = (symbol: "X" | "O", newName?: string) => {
    setPlayers((prevName) => {
      return { ...prevName, [symbol]: newName };
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name="Player 1"
            symbol="X"
            activePlayer={activePlayer}
            onChangeName={handleSetName}
          />
          <Player
            name="Player 2"
            symbol="O"
            activePlayer={activePlayer}
            onChangeName={handleSetName}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard gameBoard={gameBoard} onSelectSquare={handleActivePlayer} />
      </div>
      <Log gameTurns={gameTurns} />
    </main>
  );
}

export default App;
