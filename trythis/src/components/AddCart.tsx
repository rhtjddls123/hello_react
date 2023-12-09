// src/components/Login.tsx
import { FormEvent, useRef } from 'react';

type Props = {
  addCart: (name: string, price: number) => void;
};

const AddCart = ({ addCart }: Props) => {
  // const [price, setPrice] = useState(0);
  // const [name, setName] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const price = priceRef.current?.value;
    if (!name) {
      alert('상품명을 정확히 입력해 주세요!');
      return nameRef.current?.focus();
    }

    if (!price) {
      alert('금액을 정확히 입력해 주세요!');
      return priceRef.current?.focus();
    }
    addCart(name, Number(price));
    nameRef.current.value = '';
    priceRef.current.value = '';
  };

  return (
    <>
      <form onSubmit={submit}>
        <div>
          <br></br>
          상품명: <input type='text' ref={nameRef} />
          가격: <input type='number' ref={priceRef} />
        </div>
        <button type='submit'>추가</button>
      </form>
    </>
  );
};
export default AddCart;
