import { Dispatch, SetStateAction, memo, useEffect } from 'react';
import Box from './Box';

export const CompC = ({
  setMountComp,
}: {
  setMountComp: Dispatch<SetStateAction<number>>;
}) => {
  console.log('CompC');
  useEffect(() => {
    setMountComp((pre) => (pre = pre + 1));
    return () => {
      setMountComp((pre) => (pre = pre - 1));
    };
  }, []);
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
