import { useRef, useState } from "react";

type Props = {
  name: string;
  symbol: "X" | "O";
  activePlayer: string;
  onChangeName: (symbol: "X" | "O", newName?: string) => void;
};

const Player = ({ name, symbol, activePlayer, onChangeName }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState<string | undefined>(name);
  const nameRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () => {
    setIsEditing((pre) => !pre);
    if (isEditing) {
      setPlayerName(nameRef.current?.value);
      onChangeName(symbol, nameRef.current?.value);
    }
  };

  return (
    <li className={activePlayer === symbol ? "active" : undefined}>
      <span className="player">
        {isEditing ? (
          <input type="text" ref={nameRef} defaultValue={playerName} required />
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
};

export default Player;
