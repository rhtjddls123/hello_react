// src/App.tsx
import { MemoHello } from './components/Hello';
import { MyMemo } from './components/My';
import './App.css';
import { useCounter } from './hooks/counter-context';
import {
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
  useRef,
} from 'react';
import { useTimer } from './hooks/timer-hooks';
import { SessionContextProvider } from './hooks/session-context.tsx';

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

function App() {
  // console.log('@@@App');
  const { count } = useCounter();
  const fn = useCallback(() => 'useCallback', []);
  // const fn = () => 'FN';

  const childRef = useRef(null);

  return (
    <SessionContextProvider>
      <ChildComponent ref={childRef} />
      <h2>count: {count}</h2>
      <MyMemo />
      <MemoHello name='홍길동' age={32} fn={fn}>
        <h3>반갑습니다~</h3>
      </MemoHello>
    </SessionContextProvider>
  );
}

export default App;
