import { memo } from 'react';
import Box from './Box';

export const CompB = () => {
  console.log('CompB');
  return (
    <Box
      borderWidth='2px'
      borderColor='black'
      borderStyle='solid'
      padding='4px'
      margin='2px'
    >
      CompB
    </Box>
  );
};
export const CompBMemo = memo(CompB, () => {
  return true;
});
