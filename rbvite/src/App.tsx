import { useState } from 'react';
import './App.css';
import Hello from './components/Hello';

function App() {
  const [count, setCount] = useState(0);
  const [age, setAge] = useState(0);
  // let age = 0;

  const h1Style = { backgroundColor: 'green', color: 'white' };

  const Title = ({ txt }: { txt: string }) => (
    <h1 style={h1Style}> AA: {txt} </h1>
  );

  console.log('Appppppppppppppppppppppp!');

  return (
    <>
      <Hello name='Hong' age={age}>
        <strong>AAA</strong>
        <div>dd</div>
      </Hello>
      {count ? <Title txt={`Vite+React ${count}`} /> : ''}
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count > 0 ? `Big ${count}` : 'Zero'}
        </button>
        <p>
          X: {count && 'X'.repeat(count)} - age: {age}
          <br></br>
          <input type='text'></input>
        </p>
        <br></br>
        <button
          onClick={() => {
            setAge(age + 1);
            console.log(age); //왜 이건 Hello에 있는 console.log보다 1 작게나오지? -> throttle로 구현되어있기때문?
          }}
        >
          Plus Age
        </button>
      </div>
    </>
  );
}

export default App;
