import {
  useParams,
  useLocation,
  // useSearchParams,
  useNavigate,
} from 'react-router-dom';
import { useSession } from '../hooks/session-context';
import { useEffect } from 'react';

export const Item = () => {
  const {
    session: { cart },
  } = useSession();
  const { id } = useParams();
  const location = useLocation();

  const item: Cart =
    location.state || cart.find((item) => item.id === Number(id));
  // const [, setSearchParams] = useSearchParams({});
  // console.log('ddddd', searchParams.get('aaa'));
  const navigate = useNavigate();
  useEffect(() => {
    if (!item) navigate('/items');
  }, [navigate, item]);
  return (
    <>
      id: {id}번 name: {item?.name} price: {item?.price.toLocaleString()}원
      <button>Edit</button>
    </>
  );
};
