// src/components/Hello.tsx
import { PropsWithChildren, useEffect, memo } from 'react';
import { useCounter } from '../hooks/counter-context';
import { Sample } from './Sample';

type Props = {
  name: string;
  age: number;
  fn: () => void;
};

export const Hello = ({
  name,
  age,
  fn,
  children,
}: PropsWithChildren<Props>) => {
  console.log('@@Hello');
  const { plusCount, minusCount } = useCounter();

  useEffect(() => {
    console.log('child.fn>>>', fn());
  }, [fn]);
  return (
    <>
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
