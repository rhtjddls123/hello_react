import { useState } from 'react';
import Box from './Box';
import CompA from './CompA';
import CompB from './CompB';
import CompC from './CompC';

const CompBox = () => {
  const [toggleA, setToggleA] = useState(false);
  const [toggleB, setToggleB] = useState(false);
  const [toggleC, setToggleC] = useState(false);
  return (
    <Box
      borderWidth='2px'
      borderColor='green'
      borderStyle='solid'
      padding='4px'
      margin='2px'
    >
      <button onClick={() => setToggleA((pre) => !pre)}>toggleA</button>
      <button onClick={() => setToggleB((pre) => !pre)}>toggleB</button>
      <button onClick={() => setToggleC((pre) => !pre)}>toggleC</button>
      <br />
      {toggleA && <CompA />}
      {toggleB && <CompB />}
      {toggleC && <CompC />}
    </Box>
  );
};
export default CompBox;
