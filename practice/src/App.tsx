import './App.css';
import { TitleMemo } from './components/Title';
import Box from './components/Box';
import Counter from './components/Counter';
import { ChangeEvent, useState } from 'react';

function App() {
  const [subTitle, setSubTitle] = useState<string>('asdfasdf');
  const [count, setCount] = useState(0);
  const increaseOrDecreaseCount = (state: string) => {
    if (state === 'increase') {
      setCount((count) => count + 1);
    } else if (state === 'decrease') {
      setCount((count) => count - 1);
    }
  };

  const changeSubTitle = (evt: ChangeEvent<HTMLInputElement>) => {
    // console.log(subTitle);
    return setSubTitle(evt.currentTarget.value);
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
          sub title: {subTitle}
        </TitleMemo>
        {/* <Counter /> */}
        <h1>Count: {count}</h1>
        <Counter increaseOrDecreaseCount={increaseOrDecreaseCount} />
        <input type='text' value={subTitle} onChange={changeSubTitle} />
      </Box>
    </>
  );
}

export default App;
