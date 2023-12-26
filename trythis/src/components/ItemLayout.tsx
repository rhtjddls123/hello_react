import { useSession } from '../hooks/session-context';
import { Outlet, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const ItemLayout = () => {
  // const [name, setName] = useState<string>('');
  console.log('itemlayout');
  const {
    session: { cart },
    removeCartItem,
    addCart,
  } = useSession();
  const [items, setItems] = useState<Cart[]>([]);
  const [searchParams, setSearchParams] = useSearchParams({
    searchStr: '',
    itemId: '',
  });
  const [currItem, setCurrItem] = useState<Cart | null>(null);

  const searchStr = searchParams.get('searchStr') || '';
  const itemId = searchParams.get('itemId') || '';
  items.sort((a, b) => {
    return b.id - a.id;
  });

  useEffect(() => {
    setItems(cart.filter((item) => item.name.includes(searchStr)));
  }, [cart, searchStr]);

  useEffect(() => {
    if (itemId)
      setCurrItem(cart.find((item) => item.id === Number(itemId)) || null);
    else setCurrItem(items[0]);
  }, [items, cart, itemId]);

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
          margin: '1rem',
          display: 'grid',
          gridTemplateColumns: '2fr 2fr',
          gap: '1em',
          width: '80vw',
        }}
      >
        <div>
          <ul style={{ height: '200px', overflow: 'auto', listStyle: 'none' }}>
            {items.map((item: Cart) => (
              <li key={item.id}>
                <small>{item.id}</small>
                <button
                  onClick={() => {
                    setCurrItem(item);
                    setSearchParams({ searchStr, itemId: String(item.id) });
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
        <Outlet context={{ item: currItem, addCart, removeCartItem }} />
      </div>
    </>
  );
};
