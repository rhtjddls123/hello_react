import { memo } from 'react';

export const Counter = ({
  plusCount,
  minusCount,
}: {
  plusCount: () => void;
  minusCount: () => void;
}) => {
  console.log('render Counter Component');

  return (
    <>
      <button onClick={plusCount}>+1</button>
      <button onClick={minusCount}>-1</button>
    </>
  );
};

export const CounterMemo = memo(Counter);
