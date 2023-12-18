// src/App.tsx
import { MemoHello } from './components/Hello';
import { MyMemo } from './components/My';
import './App.css';
import { useCounter } from './hooks/counter-context';
import { useState, useEffect, useCallback } from 'react';
import { useTimer } from './hooks/timer-hooks';
import { SessionContextProvider } from './hooks/session-context.tsx';

function App() {
  // console.log('@@@App');
  const { count } = useCounter();

  const [badSec, setBadSec] = useState(0);
  const [goodSec, setGoodSec] = useState(0);
  const { useInterval, useTimeout } = useTimer();
  const fn = useCallback(() => 'useCallback', []);
  // const fn = () => 'FN';

  useInterval(() => setBadSec((pre) => pre + 1), 1000);

  useEffect(() => {
    const goodSet = setInterval(() => setGoodSec((pre) => pre + 1), 1000);
    return () => {
      clearInterval(goodSet);
    };
  }, []);

  useTimeout(() => console.log('X'), 1000);
  useTimeout((name) => console.log(`Hello, ${name}!!!`), 1000, ['Hong']);
  useTimeout(
    (init) => {
      setBadSec(Number(init));
      setGoodSec(Number(init));
    },
    5000,
    100
  );

  return (
    <SessionContextProvider>
      <span style={{ float: 'left', color: 'red' }}>{badSec} sec</span>
      <span style={{ float: 'right', color: 'green' }}>{goodSec} sec</span>

      <h2>count: {count}</h2>
      <MyMemo />
      <MemoHello name='홍길동' age={32} fn={fn}>
        <h3>반갑습니다~</h3>
      </MemoHello>
    </SessionContextProvider>
  );
}

export default App;
