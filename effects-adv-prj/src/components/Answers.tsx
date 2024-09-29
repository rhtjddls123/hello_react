import { useRef } from "react";
import { AnswerState } from "./Quiz";

interface Props {
  answers: QuestionType["answers"];
  selectedAnswer: string;
  answerState: AnswerState;
  onSelect: (selectedAnswer: string) => void;
}

const Answers = ({ answers, selectedAnswer, answerState, onSelect }: Props) => {
  const shuffledAnswers = useRef<QuestionType["answers"] | null>(null);

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        const isSelected = selectedAnswer === answer;
        let cssClass = "";

        if (answerState === "answered" && isSelected) {
          cssClass = "selected";
        }

        if ((answerState === "correct" || answerState === "wrong") && isSelected) {
          cssClass = answerState;
        }

        return (
          <li key={answer} className="answer">
            <button
              onClick={() => {
                onSelect(answer);
              }}
              className={cssClass}
              disabled={answerState !== ""}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Answers;
