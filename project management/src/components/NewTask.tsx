import { ChangeEvent, useState } from "react";

interface Props {
  onAdd: (text: string) => void;
}

const NewTask = ({ onAdd }: Props) => {
  const [enteredTask, setEnteredTask] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEnteredTask(e.target.value);
  };

  const handleAddTask = () => {
    if (enteredTask.trim() === "") return;
    onAdd(enteredTask);
    setEnteredTask("");
  };

  return (
    <div className="flex items-center gap-4">
      <input onChange={handleChange} value={enteredTask} type="text" className="w-64 px-2 py-1 rounded-sm bg-stone-200" />
      <button onClick={handleAddTask} className="text-stone-700 hover:text-stone-950">
        Add Task
      </button>
    </div>
  );
};

export default NewTask;
