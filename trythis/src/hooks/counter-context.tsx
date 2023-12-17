import {
  createContext,
  useCallback,
  PropsWithChildren,
  useContext,
  useReducer,
} from 'react';

type ConterContextProps = {
  count: number;
  plusCount: (value?: number) => void;
  minusCount: (value?: number) => void;
};
const CounterContext = createContext<ConterContextProps>({
  count: 0,
  plusCount: () => {},
  minusCount: () => {},
});

const reducer = (
  count: number,
  { type, payload = 1 }: { type: string; payload?: number }
) => {
  switch (type) {
    case 'plus':
      return count + payload;
    case 'minus':
      return count - payload;

    default:
      return count;
  }
};

const CounterContextProvider = ({ children }: PropsWithChildren) => {
  const [count, dispatch] = useReducer(reducer, 0);
  const plusCount = useCallback((value?: number) => {
    dispatch({ type: 'plus', payload: value });
  }, []);
  const minusCount = useCallback((value?: number) => {
    dispatch({ type: 'minus', payload: value });
  }, []);

  return (
    <CounterContext.Provider value={{ count, plusCount, minusCount }}>
      {children}
    </CounterContext.Provider>
  );
};

const useCounter = () => useContext(CounterContext);

export { CounterContextProvider, useCounter };
