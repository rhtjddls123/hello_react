import { useSession } from '../hooks/session-context';
import { Link, Outlet, useSearchParams } from 'react-router-dom';
// import { useState } from 'react';

export const ItemLayout = () => {
  // const [name, setName] = useState<string>('');
  const {
    session: { cart },
    removeCartItem,
  } = useSession();
  const [searchParams, setSearchParams] = useSearchParams({ searchStr: '' });

  return (
    <>
      상품명:{' '}
      <input
        value={searchParams.get('searchStr') || ''}
        type='text'
        onChange={(e) => setSearchParams({ searchStr: e.currentTarget.value })}
      />
      {/* 상품명:{' '}
      <input
        value={name}
        type='text'
        onChange={(e) => setName(e.currentTarget.value)}
      /> */}
      <ul>
        {cart
          // .filter((item) => item.name.includes(name))
          .filter((item) =>
            item.name.includes(searchParams.get('searchStr') || '')
          )
          .map((item: Cart) => (
            <li key={item.id}>
              <small>{item.id}</small>
              <Link to={`/items/${item.id}?aaa=b`} state={item}>
                <strong>{item.name}</strong>
              </Link>
              <small>({item.price.toLocaleString()}원)</small>
              <button onClick={() => removeCartItem(item.id)}>DEL</button>
            </li>
          ))}
      </ul>
      <Outlet />
    </>
  );
};
