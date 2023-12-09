// src/components/My.tsx
import Login from './Login';
import Profile from './Profile';
import AddCart from './AddCart';
import { useSession } from '../hooks/session-context';

const My = () => {
  const { session, addCart, removeCartItem } = useSession();

  return (
    <>
      {/* <button onClick={() => loginHandleRef.current?.focusName()}>XXX</button> */}
      {session.loginUser ? (
        <Profile />
      ) : (
        <Login />
        // <Login login={login} ref={loginHandleRef} />
      )}
      <AddCart addCart={addCart}></AddCart>
      <ul>
        {session.cart.map(({ id, name, price }) => (
          <li key={id}>
            <small>
              {id}
              <strong>{name}</strong>
            </small>
            <small>({price})</small>
            <button onClick={() => removeCartItem(id)}>DEL</button>
          </li>
        ))}
      </ul>
    </>
  );
};
export default My;
