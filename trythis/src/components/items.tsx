import { useSession } from '../hooks/session-context';
import { CartHandle } from './Cart';
import Cart from './Cart';
import { useRef } from 'react';

export const Items = () => {
  const { addCart } = useSession();
  const childRef = useRef<CartHandle>(null);

  // const navigate = useNavigate();

  return <Cart ref={childRef} addCart={addCart}></Cart>;
};
