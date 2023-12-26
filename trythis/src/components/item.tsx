import { useOutletContext, useSearchParams } from 'react-router-dom';
import { useEffect, useReducer, useRef } from 'react';

type ChildProps = {
  item: Cart;
  addCart: (id: number, name: string, price: number) => void;
  removeCartItem: (itemId: number) => void;
};

export const Item = () => {
  const { item, addCart, removeCartItem } = useOutletContext<ChildProps>();
  const [isEditing, toggleEditing] = useReducer((pre) => !pre, false);
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const [, setSearchParams] = useSearchParams({ searchStr: '' });

  useEffect(() => {
    if (nameRef.current && priceRef.current && item) {
      nameRef.current.value = item.name;
      priceRef.current.value = '' + item.price;
    }
  }, [item, isEditing]);

  const edit = () => {
    if (isEditing) {
      if (nameRef.current && priceRef.current) {
        addCart(item?.id || 0, nameRef.current.value, +priceRef.current.value);
        setSearchParams({ searchStr: nameRef.current.value });
      }
    }

    toggleEditing();
  };

  const remove = () => {
    if (item) {
      removeCartItem(item.id);
    }
    if (nameRef.current && priceRef.current) {
      nameRef.current.value = '';
      priceRef.current.value = '';
    }
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          border: '2px solid green',
          justifyContent: 'center',
        }}
      >
        <div>
          {!isEditing ? (
            <div>
              id: {item?.id}번 name: {item?.name} price:{' '}
              {item?.price.toLocaleString()}원
              {item?.id && <button onClick={() => remove()}>X</button>}
            </div>
          ) : (
            <div>
              <input type='text' ref={nameRef} />
              <br />
              <input type='number' ref={priceRef} />
              <br />
            </div>
          )}
          {isEditing && <button onClick={toggleEditing}>Cancel</button>}
          <button onClick={edit}>{isEditing ? 'Save' : 'Edit'}</button>
        </div>
      </div>
    </>
  );
};
