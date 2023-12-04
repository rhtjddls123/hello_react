// src/components/Login.tsx
import { useState } from 'react';
import { Cart } from '../App';

type Props = {
  addCart: ({ id, name, price }: Cart) => void;
};

const AddCart = ({ addCart }: Props) => {
  const [id, setId] = useState(0);
  const [price, setPrice] = useState(0);
  const [name, setName] = useState('');

  return (
    <>
      <div>
        상품ID:{' '}
        <input
          type='number'
          value={id}
          onChange={(e) => setId(+e.currentTarget.value)}
        />
        <br></br>
        상품명:{' '}
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <br></br>
        가격:{' '}
        <input
          type='number'
          value={price}
          onChange={(e) => setPrice(+e.currentTarget.value)}
        />
      </div>
      <button onClick={() => addCart({ id, name, price })}>추가</button>
    </>
  );
};
export default AddCart;
