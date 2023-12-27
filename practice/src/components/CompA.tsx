import { memo } from 'react';
import { useCounter } from '../hooks/counter-context';
import Box from './Box';

export const CompA = () => {
  const { count } = useCounter();
  console.log('CompA');

  return (
    <Box
      borderWidth='2px'
      borderColor='yellow'
      borderStyle='solid'
      padding='4px'
      margin='2px'
    >
      CompA({count})
    </Box>
  );
};
export const CompAMemo = memo(CompA, () => {
  return true;
});
