import { Dispatch, SetStateAction, memo, useEffect } from 'react';
import { useCounter } from '../hooks/counter-context';
import Box from './Box';

export const CompA = ({
  setMountComp,
}: {
  setMountComp: Dispatch<SetStateAction<number>>;
}) => {
  const { count } = useCounter();
  console.log('CompA');
  useEffect(() => {
    setMountComp((pre) => (pre = pre + 1));
    return () => {
      setMountComp((pre) => (pre = pre - 1));
    };
  }, []);

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
