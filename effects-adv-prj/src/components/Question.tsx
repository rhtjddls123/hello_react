import Answers from "./Answers";
import QuestionTimer from "./QuestionTimer";
import QUESTIONS from "../questions.ts";
import { useState } from "react";
import { AnswerState } from "./Quiz";

interface Props {
  index: number;
  onSelectAnswer: (selectedAnswer: string) => void;
  onSkipAnswer: () => void;
}
const Question = ({ index, onSelectAnswer, onSkipAnswer }: Props) => {
  const [answer, setAnswer] = useState<{ selectedAnswer: string; isCorrect: boolean | null }>({
    selectedAnswer: "",
    isCorrect: null
  });

  let timer = 10000;

  if (answer.selectedAnswer) {
    timer = 1000;
  }

  if (answer.isCorrect !== null) {
    timer = 2000;
  }

  const handleSelectAnswer = (answer: string) => {
    setAnswer({ selectedAnswer: answer, isCorrect: null });

    setTimeout(() => {
      setAnswer({ selectedAnswer: answer, isCorrect: QUESTIONS[index].answers[0] === answer });

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  };

  let answerState: AnswerState = "";

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }

  return (
    <div id="question">
      <QuestionTimer key={timer} timeout={timer} mode={answerState} onTimeout={answer.selectedAnswer === "" ? onSkipAnswer : null} />
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        answers={QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
};

export default Question;
