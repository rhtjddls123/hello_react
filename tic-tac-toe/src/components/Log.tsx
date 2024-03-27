type Props = {
  gameTurns: { square: { row: number; col: number }; player: string }[];
};

const Log = ({ gameTurns }: Props) => {
  return (
    <ol id="log">
      {gameTurns.map((turn) => (
        <li key={`${turn.square.row} ${turn.square.col}`}>
          {turn.player} selected {turn.square.row},{turn.square.col}
        </li>
      ))}
    </ol>
  );
};

export default Log;