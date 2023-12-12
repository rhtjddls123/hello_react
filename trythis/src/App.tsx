// src/App.tsx
import Hello from './components/Hello';
import My from './components/My';
import './App.css';
import { useCounter } from './hooks/counter-context';
import { useState, useEffect } from 'react';
import { useTimer } from './hooks/timer-hooks';

function App() {
  // console.log('@@@App');
  const { count } = useCounter();

  const [badSec, setBadSec] = useState(0);
  const [goodSec, setGoodSec] = useState(0);
  const { useInterval, useTimeout } = useTimer();

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
    <>
      <span style={{ float: 'left', color: 'red' }}>{badSec} sec</span>
      <span style={{ float: 'right', color: 'green' }}>{goodSec} sec</span>

      <h2>count: {count}</h2>
      <My />
      <Hello name='홍길동' age={30}>
        <h3>반갑습니다~</h3>
      </Hello>
    </>
  );
}

export default App;
