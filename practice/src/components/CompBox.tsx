import { memo, useReducer, useState } from 'react';
import Box from './Box';
import { CompAMemo } from './CompA';
import { CompBMemo } from './CompB';
import { CompCMemo } from './CompC';

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

export const CompBox = () => {
  // const [toggles, setToggles] = useState({ A: false, B: false, C: false });
  const [toggles, dispatch] = useReducer(reducer, {
    A: false,
    B: false,
    C: false,
  });
  const [mountComp, setMountComp] = useState(0);

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
      Mounted Component Count: {mountComp}
      {toggles.A && <CompAMemo setMountComp={setMountComp} />}
      {toggles.B && <CompBMemo setMountComp={setMountComp} />}
      {toggles.C && <CompCMemo setMountComp={setMountComp} />}
    </Box>
  );
};
export const CompBoxMemo = memo(CompBox, () => {
  return true;
});
