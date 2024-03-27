type Props = {
  gameTurns: { square: { row: number; col: number }; player: string }[];
  onSelectSquare: (rowIndex: number, colIndex: number) => void;
};

const GameBoard = ({ gameTurns, onSelectSquare }: Props) => {
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

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => onSelectSquare(rowIndex, colIndex)}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};

export default GameBoard;
