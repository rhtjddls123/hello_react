import './App.css';
import { TitleMemo } from './components/Title';
import Box from './components/Box';
import Counter from './components/Counter';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const increaseOrDecreaseCount = (state: string) => {
    if (state === 'increase') {
      setCount((count) => count + 1);
    } else if (state === 'decrease') {
      setCount((count) => count - 1);
    }
  };
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
          sub title: Counter (using UseState)
        </TitleMemo>
        {/* <Counter /> */}
        <h1>Count: {count}</h1>
        <Counter increaseOrDecreaseCount={increaseOrDecreaseCount} />
      </Box>
    </>
  );
}

export default App;
