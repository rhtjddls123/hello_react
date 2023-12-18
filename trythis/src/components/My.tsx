// src/components/My.tsx
import { LoginMemo } from './Login';
import Profile from './Profile';
import Cart from './Cart';
import { useSession } from '../hooks/session-context';
import { memo, useRef } from 'react';
import { CartHandle } from './Cart';

export const My = () => {
  // console.log('@@My');
  const { session, addCart, removeCartItem, login } = useSession();
  const childRef = useRef<CartHandle>(null);

  return (
    <>
      {/* <button onClick={() => loginHandleRef.current?.focusName()}>XXX</button> */}
      {session.loginUser ? (
        <Profile />
      ) : (
        <LoginMemo login={login} />
        // <Login login={login} ref={loginHandleRef} />
      )}
      <Cart ref={childRef} addCart={addCart}></Cart>
      <ul>
        {session.cart.map(({ id, name, price }) => (
          <li key={id}>
            <small>{id}</small>
            <a
              onClick={() => {
                childRef.current?.setCartItem(id);
              }}
            >
              <strong>{name}</strong>
              <small>({price.toLocaleString()}원)</small>
            </a>
            <button onClick={() => removeCartItem(id)}>DEL</button>
          </li>
        ))}
      </ul>
    </>
  );
};
export const MyMemo = memo(My, () => true);
