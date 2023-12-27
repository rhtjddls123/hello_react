import { memo } from 'react';
import Box from './Box';

export const CompC = () => {
  console.log('CompC');
  return (
    <Box
      borderWidth='2px'
      borderColor='brown'
      borderStyle='solid'
      padding='4px'
      margin='2px'
    >
      CompC
    </Box>
  );
};
export const CompCMemo = memo(CompC, () => {
  return true;
});
