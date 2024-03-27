import { useState } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

type Props = {
  activePlayerSymbol: string;
  onSelectSquare: () => void;
};

const GameBoard = ({ activePlayerSymbol, onSelectSquare }: Props) => {
  const [gameBoard, setGameBoard] =
    useState<(string | null)[][]>(initialGameBoard);

  const handleSelectSquare = (rowIndex: number, colIndex: number) => {
    setGameBoard((prevGameBoard) => {
      const updateGameBoard: (string | null)[][] = [
        ...prevGameBoard.map((innerArray) => [...innerArray]),
      ];
      updateGameBoard[rowIndex][colIndex] = activePlayerSymbol;
      return updateGameBoard;
    });
    onSelectSquare();
  };
  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>
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
