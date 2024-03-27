import { useRef, useState } from "react";

type Props = {
  name: string;
  symbol: string;
};

const Player = ({ name, symbol }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState<string | undefined>(name);
  const nameRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () => {
    setIsEditing((pre) => !pre);
    if (isEditing) setPlayerName(nameRef.current?.value);
  };

  return (
    <li>
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
