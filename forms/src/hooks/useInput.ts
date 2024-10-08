import { ChangeEvent, useState } from "react";

interface Props {
  defaultValue: string;
  validationFn: (enteredValue: string) => string | boolean;
}

const useInput = ({ defaultValue, validationFn }: Props) => {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const valueIsValid = validationFn(enteredValue);

  const hanleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(event.target.value);
    setDidEdit(false);
  };

  const handleInputBlur = () => {
    setDidEdit(true);
  };

  return {
    value: enteredValue,
    hanleInputChange,
    handleInputBlur,
    hasError: didEdit && !valueIsValid
  };
};

export default useInput;
