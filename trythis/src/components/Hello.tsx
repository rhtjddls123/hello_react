// src/components/Hello.tsx
import { PropsWithChildren, useEffect, memo } from 'react';
import { useCounter } from '../hooks/counter-context';
import { Sample } from './Sample';
import { useState, useImperativeHandle, forwardRef, useRef } from 'react';
import { useTimer } from '../hooks/timer-hooks';

type Props = {
  name: string;
  age: number;
  fn: () => void;
};

const ChildComponent = forwardRef((_, ref) => {
  const [badCount, setBadCount] = useState(0);
  const [goodCount, setGoodCount] = useState(0);

  const { useInterval, useTimeout } = useTimer();

  useInterval(() => setBadCount((pre) => pre + 1), 1000);
  useInterval(() => setGoodCount((pre) => pre + 1), 1000);

  useTimeout(
    (initSec) => {
      setBadCount(Number(initSec));
      setGoodCount(Number(initSec));
    },
    5000,
    100
  );
  useImperativeHandle(ref, () => {});
  return (
    <>
      <strong style={{ float: 'left', color: 'red' }}>{badCount}</strong>
      <strong style={{ float: 'right', color: 'green' }}>{goodCount}</strong>
    </>
  );
});

export const Hello = ({
  name,
  age,
  fn,
  children,
}: PropsWithChildren<Props>) => {
  // console.log('@@Hello');
  const { count } = useCounter();
  const { plusCount, minusCount } = useCounter();

  useEffect(() => {
    console.log('child.fn>>>', fn());
  }, [fn]);
  const childRef = useRef(null);
  return (
    <>
      <ChildComponent ref={childRef} />
      <h2>count: {count}</h2>
      <h1>
        Hello, {name}({age})
      </h1>
      {children}
      <button onClick={() => plusCount(2)}>count + 2</button>
      <button onClick={() => minusCount(3)}>count - 3</button>
      <Sample></Sample>
    </>
  );
};

export const MemoHello = memo(Hello, () => true);
