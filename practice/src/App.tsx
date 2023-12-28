import './App.css';
import { TitleMemo } from './components/Title';
import Box from './components/Box';
import { CounterMemo } from './components/Counter';
import { useRef, useState } from 'react';
import { CompBoxMemo } from './components/CompBox';
import { useCounter } from './hooks/counter-context';

function App() {
  const [subTitle, setSubTitle] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { count, plusCount, minusCount } = useCounter();
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
        <TitleMemo color='red'>sub title: {subTitle}</TitleMemo>
        <h1>Count: {count}</h1>
        <CounterMemo plusCount={plusCount} minusCount={minusCount} />

        <input type='text' ref={inputRef} />
        <button
          onClick={() => {
            setSubTitle('' + inputRef.current?.value);
          }}
        >
          입력
        </button>
      </Box>
      <CompBoxMemo />
    </>
  );
}

export default App;
