// src/components/My.tsx
import { Cart, Session } from '../App';
import Login from './Login';
import Profile from './Profile';
import { LoginUser } from '../App';
import AddCart from './AddCart';

type Props = {
  session: Session;
  login: ({ id, name }: LoginUser) => void;
  logout: () => void;
  removeCartItem: (idItem: number) => void;
  addCart: ({ id, name, price }: Cart) => void;
};

const My = ({
  session: { loginUser, cart },
  login,
  logout,
  removeCartItem,
  addCart,
}: Props) => {
  console.log('@@@My', { loginUser });
  return (
    <>
      {loginUser ? (
        <Profile loginUser={loginUser} logout={logout} />
      ) : (
        <Login login={login} />
      )}
      <AddCart addCart={addCart}></AddCart>
      <ul>
        {cart.map(({ id, name, price }) => (
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
