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

type ChildHandler = {
  appendPeriod: () => void;
};
const ChildComponent = forwardRef((_, ref) => {
  const [childText, setChildText] = useState('.');
  const [badCount, setBadCount] = useState(0);
  const [goodCount, setGoodCount] = useState(0);

  const { useInterval, useTimeout } = useTimer();

  useInterval(() => setBadCount((pre) => pre + 1), 1000);
  useInterval(() => setGoodCount((pre) => pre + 1), 1000);

  useTimeout(
    (initSec) => {
      setBadCount(initSec);
      setGoodCount(initSec);
    },
    5000,
    100
  );
  const handler: ChildHandler = {
    appendPeriod: () => setChildText((c) => c + '.'),
  };
  useImperativeHandle(ref, () => handler);
  return (
    <>
      <strong style={{ float: 'left', color: 'red' }}>{badCount}</strong>
      childComp:{childText}
      <strong style={{ float: 'right', color: 'green' }}>{goodCount}</strong>
    </>
  );
});

function App() {
  // console.log('@@@App');
  const { count } = useCounter();
  const fn = useCallback(() => 'useCallback', []);
  // const fn = () => 'FN';

  const childRef = useRef<ChildHandler>(null);

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
