import { useReducer } from 'react';
import Box from './Box';
import CompA from './CompA';
import CompB from './CompB';
import CompC from './CompC';

const reducer = (
  state: { A: boolean; B: boolean; C: boolean },
  type: string
) => {
  switch (type) {
    case 'A':
      return { ...state, A: !state.A };
    case 'B':
      return { ...state, B: !state.B };
    case 'C':
      return { ...state, C: !state.C };
    default:
      return state;
  }
};

const CompBox = ({ count }: { count: number }) => {
  // const [toggles, setToggles] = useState({ A: false, B: false, C: false });
  const [toggles, dispatch] = useReducer(reducer, {
    A: false,
    B: false,
    C: false,
  });

  return (
    <Box
      borderWidth='2px'
      borderColor='green'
      borderStyle='solid'
      padding='4px'
      margin='2px'
    >
      <button onClick={() => dispatch('A')}>toggleA</button>
      <button onClick={() => dispatch('B')}>toggleB</button>
      <button onClick={() => dispatch('C')}>toggleC</button>
      <br />
      {toggles.A && <CompA count={count} />}
      {toggles.B && <CompB />}
      {toggles.C && <CompC />}
    </Box>
  );
};
export default CompBox;
