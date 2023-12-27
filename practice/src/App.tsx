import './App.css';
import { TitleMemo } from './components/Title';
import Box from './components/Box';
import { CounterMemo } from './components/Counter';
import { useRef, useState } from 'react';

function App() {
  const [subTitle, setSubTitle] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [count, setCount] = useState(0);
  const increaseOrDecreaseCount = (state: string) => {
    if (state === 'increase') {
      setCount((count) => count + 1);
    } else if (state === 'decrease') {
      setCount((count) => count - 1);
    }
  };
  console.log('App');
  return (
    <>
      <Box
        borderWidth='2px'
        borderColor='blue'
        borderStyle='solid'
        padding='4px'
        margin='2px'
      >
        <TitleMemo color='red'>
          {/* <Title title='React Tutorial' color='red'> */}
          sub title: {subTitle}
        </TitleMemo>
        {/* <Counter /> */}
        <h1>Count: {count}</h1>
        <CounterMemo increaseOrDecreaseCount={increaseOrDecreaseCount} />

        <input type='text' ref={inputRef} />
        <button
          onClick={() => {
            setSubTitle('' + inputRef.current?.value);
          }}
        >
          입력
        </button>
      </Box>
    </>
  );
}

export default App;
