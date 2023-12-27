import { Dispatch, SetStateAction, memo, useEffect } from 'react';
import Box from './Box';

export const CompB = ({
  setMountComp,
}: {
  setMountComp: Dispatch<SetStateAction<number>>;
}) => {
  console.log('CompB');
  useEffect(() => {
    setMountComp((pre) => (pre = pre + 1));
    return () => {
      setMountComp((pre) => (pre = pre - 1));
    };
  }, []);
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
