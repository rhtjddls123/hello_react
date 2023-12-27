import { useState } from 'react';
import Box from './Box';
import CompA from './CompA';
import CompB from './CompB';
import CompC from './CompC';

const CompBox = () => {
  const [toggles, setToggles] = useState({ A: false, B: false, C: false });
  return (
    <Box
      borderWidth='2px'
      borderColor='green'
      borderStyle='solid'
      padding='4px'
      margin='2px'
    >
      <button
        onClick={() =>
          setToggles({ A: !toggles.A, B: toggles.B, C: toggles.C })
        }
      >
        toggleA
      </button>
      <button
        onClick={() =>
          setToggles({ A: toggles.A, B: !toggles.B, C: toggles.C })
        }
      >
        toggleB
      </button>
      <button
        onClick={() =>
          setToggles({ A: toggles.A, B: toggles.B, C: !toggles.C })
        }
      >
        toggleC
      </button>
      <br />
      {toggles.A && <CompA />}
      {toggles.B && <CompB />}
      {toggles.C && <CompC />}
    </Box>
  );
};
export default CompBox;
