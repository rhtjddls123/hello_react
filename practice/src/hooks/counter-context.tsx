import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from 'react';

type CounterContextProps = {
  count: number;
  plusCount: () => void;
  minusCount: () => void;
};

const CounterContext = createContext<CounterContextProps>({
  count: 0,
  plusCount: () => {},
  minusCount: () => {},
});

const reducer = (count: number, type: string) => {
  switch (type) {
    case 'plus':
      return count + 1;
    case 'minus':
      return count - 1;
    default:
      return count;
  }
};

const CounterContextProvider = ({ children }: PropsWithChildren) => {
  const [count, dispatch] = useReducer(reducer, 0);
  const plusCount = useCallback(() => {
    dispatch('plus');
  }, []);
  const minusCount = useCallback(() => {
    dispatch('minus');
  }, []);

  return (
    <CounterContext.Provider value={{ count, plusCount, minusCount }}>
      {children}
    </CounterContext.Provider>
  );
};

const useCounter = () => useContext(CounterContext);

export { CounterContextProvider, useCounter };
