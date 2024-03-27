import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

type gameTurnsType = { square: { row: number; col: number }; player: string }[];

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const driveGameBoard = (gameTurns: gameTurnsType) => {
  const gameBoard: (string | null)[][] = [
    ...INITIAL_GAME_BOARD.map((array) => [...array]),
  ];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
};

const driveWinner = (
  gameBoard: (string | null)[][],
  players: {
    X: string;
    O: string;
  }
) => {
  let winner: string | null = null;

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
  return winner;
};

const driveActivePlayer = (gameTurns: gameTurnsType) => {
  let curPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") curPlayer = "O";
  return curPlayer;
};

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState<gameTurnsType>([]);

  const gameBoard = driveGameBoard(gameTurns);
  const activePlayer = driveActivePlayer(gameTurns);
  const winner = driveWinner(gameBoard, players);

  const hasDraw = gameTurns.length === 9 && !winner;

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
            name={PLAYERS.X}
            symbol="X"
            activePlayer={activePlayer}
            onChangeName={handleSetName}
          />
          <Player
            name={PLAYERS.O}
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
