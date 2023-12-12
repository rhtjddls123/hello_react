// src/App.tsx
import Hello from './components/Hello';
import My from './components/My';
import './App.css';
import { useCounter } from './hooks/counter-context';
import { useState, useEffect } from 'react';

function App() {
  console.log('@@@App');
  const { count } = useCounter();

  const [badSec, setBadSec] = useState(0);
  const [goodSec, setGoodSec] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setBadSec((pre) => pre + 1);
    }, 1000);
  }, []);
  useEffect(() => {
    const goodSet = setInterval(() => {
      setGoodSec((pre) => pre + 1);
    }, 1000);
    return () => {
      clearInterval(goodSet);
    };
  }, []);

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
