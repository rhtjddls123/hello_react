import { createContext, useState, PropsWithChildren, useContext } from 'react';

type ConterContextProps = {
  count: number;
  plusCount: () => void;
  minusCount: () => void;
};
const CounterContext = createContext<ConterContextProps>({
  count: 0,
  plusCount: () => {},
  minusCount: () => {},
});

const CounterContextProvider = ({ children }: PropsWithChildren) => {
  const [count, setCount] = useState(0);
  const plusCount = () => setCount((count) => count + 1);
  const minusCount = () => setCount((count) => count - 1);

  return (
    <CounterContext.Provider value={{ count, plusCount, minusCount }}>
      {children}
    </CounterContext.Provider>
  );
};

const useCounter = () => useContext(CounterContext);

export { CounterContextProvider, useCounter };
