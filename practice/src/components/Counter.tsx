import { memo } from 'react';
import { useCounter } from '../hooks/counter-context';

export const Counter = () => {
  const { plusCount, minusCount } = useCounter();
  console.log('render Counter Component');

  return (
    <>
      <button onClick={plusCount}>+1</button>
      <button onClick={minusCount}>-1</button>
    </>
  );
};

export const CounterMemo = memo(Counter);
