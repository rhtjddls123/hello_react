import { useCallback, useState } from "react";
import QUESTIONS from "../questions";
import Question from "./Question";
import Summary from "./Summary";

export type AnswerState = "" | "answered" | "correct" | "wrong";

const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState<QuestionType["answers"]>([]);

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = QUESTIONS.length === activeQuestionIndex;

  const handleSelectAnswer = useCallback((selectedAnswer: string) => {
    setUserAnswers((prevAnswer) => [...prevAnswer, selectedAnswer]);
  }, []);

  const handleSkipAnswer = useCallback(() => handleSelectAnswer(""), [handleSelectAnswer]);

  if (quizIsComplete) {
    return <Summary userAnswers={userAnswers} />;
  }

  return (
    <div id="quiz">
      <Question key={activeQuestionIndex} index={activeQuestionIndex} onSelectAnswer={handleSelectAnswer} onSkipAnswer={handleSkipAnswer} />
    </div>
  );
};

export default Quiz;
