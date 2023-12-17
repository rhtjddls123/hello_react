import { ChangeEvent, useEffect, useMemo, useState } from 'react';

export const Sample = () => {
  const [, rerender] = useState<ChangeEvent<HTMLInputElement>>();
  const [array] = useState<number[]>([]);
  // const array = [1, 2, 3];
  // const [level, setLevel] = useState<'A' | 'B' | 'C' | 'D' | 'F'>('A');

  const memoArray = useMemo(() => array, []);
  useEffect(() => {
    console.log('effect Array@@');
  }, [array]);
  console.log('rerender');

  return (
    <>
      {/* Level: {level} */}
      <button>{memoArray}</button>
      <button>Add-Array</button>
      <input type='text' onChange={rerender} />
    </>
  );
};
