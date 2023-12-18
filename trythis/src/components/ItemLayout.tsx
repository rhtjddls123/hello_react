import { useSession } from '../hooks/session-context';
import { Link, Outlet } from 'react-router-dom';

export const ItemLayout = () => {
  const {
    session: { cart },
    removeCartItem,
  } = useSession();
  return (
    <>
      <ul>
        {cart.map(({ id, name, price }) => (
          <li key={id}>
            <small>{id}</small>
            <Link to={`/items/${id}?aaa=b`} state={{ name, price }}>
              <strong>{name}</strong>
            </Link>
            <small>({price.toLocaleString()}원)</small>
            <button onClick={() => removeCartItem(id)}>DEL</button>
            {/* <button onClick={() => navigate(`/items/${id}`)}>GO</button> */}
          </li>
        ))}
      </ul>
      <Outlet />
    </>
  );
};
