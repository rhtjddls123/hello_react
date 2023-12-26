import { useOutletContext } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

type ChildProps = {
  currItem: Cart | null;
  addCart: (id: number, name: string, price: number) => void;
  removeCartItem: (itemId: number) => void;
};

export const Item = () => {
  const { currItem, addCart, removeCartItem } = useOutletContext<ChildProps>();
  const [item, setItem] = useState<Cart | null>();
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const curr = {
    id: currItem?.id,
    name: currItem?.name,
    price: currItem?.price,
  };
  console.log(sessionStorage);

  useEffect(() => {
    setItem(currItem);
    if (nameRef.current && priceRef.current && currItem) {
      nameRef.current.value = currItem.name;
      priceRef.current.value = '' + currItem.price;
    } else if (nameRef.current && priceRef.current && !currItem) {
      nameRef.current.value = '';
      priceRef.current.value = '';
    }
  }, [currItem]);

  const edit = () => {
    if (
      !nameRef.current?.value ||
      !priceRef.current?.value ||
      (nameRef.current?.value === curr.name &&
        priceRef.current?.value === '' + curr.price)
    ) {
      alert('제대로 입력하세요');
    } else if (nameRef.current?.value && priceRef.current?.value) {
      addCart(
        Number(item?.id),
        nameRef.current.value,
        Number(priceRef.current.value)
      );
      if (!item?.id) {
        setItem(null);
        nameRef.current.value = '';
        priceRef.current.value = '';
      }
    }
  };

  const remove = () => {
    if (item) {
      removeCartItem(item.id);
      setItem(null);
    }
    if (nameRef.current && priceRef.current) {
      nameRef.current.value = '';
      priceRef.current.value = '';
    }
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ margin: 'auto' }}>
          id: {item?.id}번 name: {item?.name} price:{' '}
          {item?.price.toLocaleString()}원
          {item?.id && <button onClick={() => remove()}>X</button>}
        </div>
        <div>
          상품명: <input type='text' ref={nameRef} /> 가격:{' '}
          <input type='number' ref={priceRef} />{' '}
          <button
            onClick={() => {
              edit();
            }}
          >
            {item?.id ? 'Edit' : 'Add'}
          </button>
        </div>
      </div>
    </>
  );
};
