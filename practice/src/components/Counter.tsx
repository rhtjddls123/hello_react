import { memo } from 'react';

type Props = {
  increaseOrDecreaseCount: Function;
};

export const Counter = ({ increaseOrDecreaseCount }: Props) => {
  console.log('render Counter Component');
  // const [count, setCount] = useState(0);
  return (
    <>
      <button onClick={() => increaseOrDecreaseCount('increase')}>+1</button>
      <button onClick={() => increaseOrDecreaseCount('decrease')}>-1</button>
    </>
  );
};

export const CounterMemo = memo(Counter, () => true);
