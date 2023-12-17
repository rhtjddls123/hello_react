import {
  createContext,
  PropsWithChildren,
  useContext,
  useRef,
  useEffect,
  useReducer,
} from 'react';
import { DefaultSession } from '../dummy';
import { LoginHandle } from '../components/Login';
import { useFetchs } from '../hooks/fetch-hooks';

type SessionContextProps = {
  session: Session;
  login: ({ id, name }: LoginUser) => void;
  logout: () => void;
  addCart: (id: number, name: string, price: number) => void;
  removeCartItem: (itemId: number) => void;
};
const SessionContext = createContext<SessionContextProps>({
  session: DefaultSession,
  login: () => {},
  logout: () => {},
  addCart: () => {},
  removeCartItem: () => {},
});

type action = {
  type?: string;
  payload: LoginUser | null | Cart;
  itemId?: number;
};

const reducer = (session: Session, action: action) => {
  switch (action.type) {
    case 'login':
      return { ...session, loginUser: action.payload };
    case 'logout':
      return { ...session, loginUser: null };
    case 'addCart':
      return { ...session, cart: [...session.cart] };
    case 'removeCartItem':
      return {
        ...session,
        cart: session.cart.filter((cartItem) => cartItem.id !== action.itemId),
      };
    default:
      return session;
  }
};

const SessionContextProvider = ({ children }: PropsWithChildren) => {
  // const [session, setSession] = useState<Session>(DefaultSession);
  const [session, dispatch] = useReducer(reducer, DefaultSession);
  // const { useFetch } = useFetchs();

  // const url = '/data/sample.json';
  // const data = useFetch<Session>(url);

  // useEffect(() => {
  //   if (data) setSession(data);
  // }, [data]);

  const loginHandleRef = useRef<LoginHandle>(null);
  const login = ({ id, name }: LoginUser) => {
    if (id === 0 || !name.trim()) {
      alert('Input Id or Name');
      loginHandleRef.current?.focusName();
      return;
    }
    dispatch({ type: 'login', payload: { id, name } });
  };

  const logout = () => dispatch({ type: 'logout', payload: null });

  const addCart = (id: number, name: string, price: number) => {
    id = id || Math.max(...session.cart.map((item) => item.id), 0) + 1;
    const modifyItem = session.cart.find((item) => item.id === id);
    if (modifyItem) {
      modifyItem.name = name;
      modifyItem.price = price;
    } else {
      session.cart.push({ id, name, price });
    }
    dispatch({ type: 'addCart', payload: { id, name, price } });
  };

  const removeCartItem = (itemId: number) => {
    dispatch({
      type: 'removeCartItem',
      payload: null,
      itemId,
    });
  };

  return (
    <SessionContext.Provider
      value={{
        session,
        login,
        logout,
        addCart,
        removeCartItem,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

const useSession = () => useContext(SessionContext);

export { SessionContextProvider, useSession };
