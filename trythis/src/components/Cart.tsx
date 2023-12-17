// src/components/Login.tsx
import {
  FormEvent,
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import { useSession } from '../hooks/session-context';

type Props = {
  addCart: (id: number, name: string, price: number) => void;
};
export type CartHandle = {
  setCartItem: (id: number) => void;
};

const Cart = forwardRef(({ addCart }: Props, ref) => {
  console.log('cart@@@@');
  const { session } = useSession();
  const [hasDirty, setDirty] = useState(false);
  const idRef = useRef<number>(0);
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const checkDirty = () => {
    const id = idRef.current;
    const name = nameRef.current?.value;
    const price = priceRef.current?.value;
    const selectedItem = !id
      ? { name: '', price: 0 }
      : session.cart.find((item) => item.id === id) || {
          name: '',
          price: 0,
        };
    setDirty(
      (name !== '' || price !== '') &&
        (name !== selectedItem.name || price !== '' + selectedItem.price)
    );
  };

  const setCartItem = (id: number) => {
    idRef.current = id;
    const selectedItem = session.cart.find((item) => item.id === id) || {
      name: '',
      price: 0,
    };
    if (nameRef.current && priceRef.current) {
      nameRef.current.value = selectedItem?.name;
      priceRef.current.value = '' + selectedItem?.price;
    }
  };

  useImperativeHandle(ref, () => ({
    setCartItem,
  }));

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
    addCart(idRef.current, name, Number(price));
    idRef.current = 0;
    nameRef.current.value = '';
    priceRef.current.value = '';
    setDirty(false);
  };

  return (
    <>
      <form onSubmit={submit}>
        <div>
          <br></br>
          상품명:{' '}
          <input type='text' ref={nameRef} onChange={() => checkDirty()} />
          가격:{' '}
          <input type='number' ref={priceRef} onChange={() => checkDirty()} />
        </div>
        {hasDirty && <button type='submit'>저장</button>}
      </form>
    </>
  );
});
export default Cart;
