// import { useState } from 'react';

type Props = {
  increaseOrDecreaseCount: Function;
};

const Counter = ({ increaseOrDecreaseCount }: Props) => {
  // const [count, setCount] = useState(0);
  return (
    <>
      <button onClick={() => increaseOrDecreaseCount('increase')}>+1</button>
      <button onClick={() => increaseOrDecreaseCount('decrease')}>-1</button>
    </>
  );
};

export default Counter;
