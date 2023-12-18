import { useParams, useLocation, useSearchParams } from 'react-router-dom';
import { useSession } from '../hooks/session-context';

export const Item = () => {
  const {
    session: { cart },
  } = useSession();
  const { id } = useParams();

  const location = useLocation();
  const { name, price } =
    location.state || cart.find((item) => item.id === Number(id));
  const [searchParams, setSearchParams] = useSearchParams({});
  console.log(searchParams.get('aaa'));

  return (
    <>
      id: {id}번 name: {name} price: {price.toLocaleString()}원
      <button onClick={() => setSearchParams({ aaa: 'X' })}>SSS</button>
    </>
  );
};
