import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

interface Props {
  title: string;
  targetTime: number;
}

const TimerChallenge = ({ title, targetTime }: Props) => {
  const timer = useRef<number>();
  const dialog = useRef<HTMLDialogElement>(null);
  const interval = 10;

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining < 0) {
    clearInterval(timer.current);
    dialog.current?.showModal();
  }

  const handleReset = () => {
    setTimeRemaining(targetTime * 1000);
  };

  const handleStart = () => {
    timer.current = setInterval(() => {
      setTimeRemaining((pre) => pre - interval);
    }, interval);
  };

  const handleStop = () => {
    clearInterval(timer.current);
    dialog.current?.showModal();
  };
  return (
    <>
      <ResultModal ref={dialog} targetTime={targetTime} remainingTime={timeRemaining} onReset={handleReset} />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>{timerIsActive ? "Stop" : "Start"} Challenge</button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>{timerIsActive ? "Time is running..." : "Timer inactive"}</p>
      </section>
    </>
  );
};

export default TimerChallenge;
