import { createContext, useState, PropsWithChildren, useContext } from 'react';

type ConterContextProps = {
  count: number;
  plusCount: () => void;
};
const CounterContext = createContext<ConterContextProps>({
  count: 0,
  plusCount: () => {},
});

const CounterContextProvider = ({ children }: PropsWithChildren) => {
  const [count, setCount] = useState(0);
  const plusCount = () => setCount(count + 1);

  return (
    <CounterContext.Provider value={{ count, plusCount }}>
      {children}
    </CounterContext.Provider>
  );
};

const useCounter = () => useContext(CounterContext);

export { CounterContextProvider, useCounter };
