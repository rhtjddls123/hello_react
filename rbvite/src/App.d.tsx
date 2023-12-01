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
            console.log(age);
          }}
        >
          Plus Age
        </button>
      </div>
    </>
  );
}

export default App;
