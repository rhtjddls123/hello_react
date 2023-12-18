// src/components/My.tsx
import { LoginMemo } from './Login';
import Profile from './Profile';
import Cart from './Cart';
import { useSession } from '../hooks/session-context';
import { memo, useRef } from 'react';
import { CartHandle } from './Cart';
import classNames from 'classnames';

export const My = () => {
  // console.log('@@My');
  const {
    session: { loginUser, cart },
    addCart,
    removeCartItem,
    login,
  } = useSession();
  const childRef = useRef<CartHandle>(null);

  return (
    <>
      {/* <button onClick={() => loginHandleRef.current?.focusName()}>XXX</button> */}
      <div className={classNames({ 'green-border': !loginUser })}>
        {
          loginUser ? <Profile /> : <LoginMemo login={login} />
          // <Login login={login} ref={loginHandleRef} />
        }
      </div>
      <Cart ref={childRef} addCart={addCart}></Cart>
      <ul>
        {cart.map(({ id, name, price }) => (
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
