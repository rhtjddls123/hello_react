import { useSession } from '../hooks/session-context';
import { Outlet, useSearchParams } from 'react-router-dom';
import { useState } from 'react';

export const ItemLayout = () => {
  // const [name, setName] = useState<string>('');
  console.log('itemlayout');
  const {
    session: { cart },
    removeCartItem,
    addCart,
  } = useSession();
  const [searchParams, setSearchParams] = useSearchParams({ searchStr: '' });
  const [currItem, setCurrItem] = useState<Cart | null>();

  return (
    <>
      상품명:{' '}
      <input
        value={searchParams.get('searchStr') || ''}
        type='text'
        onChange={(e) => setSearchParams({ searchStr: e.currentTarget.value })}
      />
      <br />
      <div
        style={{
          display: 'inline-flex',
        }}
      >
        <div>
          <ul style={{ height: '200px', overflow: 'auto' }}>
            {cart
              .filter((item) =>
                item.name.includes(searchParams.get('searchStr') || '')
              )
              .map((item: Cart) => (
                <li key={item.id}>
                  <small>{item.id}</small>
                  <button
                    onClick={() => {
                      setCurrItem(item);
                    }}
                  >
                    {item.name}
                  </button>

                  <small>({item.price.toLocaleString()}원)</small>
                  <button
                    onClick={() => {
                      removeCartItem(item.id);
                      setCurrItem(null);
                    }}
                  >
                    DEL
                  </button>
                </li>
              ))}
          </ul>
          <button
            onClick={() => {
              setCurrItem(null);
            }}
          >
            ADD
          </button>
        </div>
        <Outlet context={{ currItem, addCart, removeCartItem }} />
      </div>
    </>
  );
};
