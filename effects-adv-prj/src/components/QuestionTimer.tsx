import { useEffect, useState } from "react";
import { AnswerState } from "./Quiz";

interface Props {
  timeout: number;
  mode: AnswerState;
  onTimeout: (() => void) | null;
}

const QuestionTimer = ({ timeout, mode, onTimeout }: Props) => {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    console.log("SETTING TIMEOUT");
    const timer = onTimeout && setTimeout(onTimeout, timeout);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timeout, onTimeout]);

  useEffect(() => {
    console.log("SETTING INTERVAL");
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress id="question-time" value={remainingTime} max={timeout} className={mode} />;
};

export default QuestionTimer;
