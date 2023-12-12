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
  addCart: (name: string, price: number, id?: number) => void;
};
export type CartHandle = {
  setCartItem: (id: number) => void;
};

const Cart = forwardRef(({ addCart }: Props, ref) => {
  const { session } = useSession();
  const [hasDirty, setDirty] = useState(false);
  const [nowModify, setModify] = useState(false);
  const [nowName, setName] = useState('');
  const [nowPrice, setPrice] = useState(0);
  // const [price, setPrice] = useState(0);
  // const [name, setName] = useState('');
  const idRef = useRef<number>(0);
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const checkDirty = () => {
    if (nowModify) {
      nowName === nameRef.current?.value &&
      '' + nowPrice === priceRef.current?.value
        ? setDirty(false)
        : setDirty(true);
      return;
    }
    nameRef.current?.value === '' && priceRef.current?.value === ''
      ? setDirty(false)
      : setDirty(true);
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
      setName(selectedItem?.name);
      setPrice(selectedItem?.price);
      setModify(true);
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
    if (nowModify) addCart(name, Number(price), Number(idRef.current));
    else addCart(name, Number(price));
    setModify(false);
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
