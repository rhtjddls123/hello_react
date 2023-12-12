import {
  createContext,
  useState,
  PropsWithChildren,
  useContext,
  useRef,
} from 'react';
import { DefaultSession } from '../dummy';
import { LoginHandle } from '../components/Login';

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

const SessionContextProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session>(DefaultSession);

  const addCart = (id: number, name: string, price: number) => {
    id = id || Math.max(...session.cart.map((item) => item.id), 0) + 1;
    const modifyItem = session.cart.find((item) => item.id === id);
    if (modifyItem) {
      modifyItem.name = name;
      modifyItem.price = price;
    } else {
      session.cart.push({ id, name, price });
    }
    setSession({ ...session, cart: [...session.cart] });
  };

  const loginHandleRef = useRef<LoginHandle>(null);
  const login = ({ id, name }: LoginUser) => {
    if (id === 0 || !name.trim()) {
      alert('Input Id or Name');
      loginHandleRef.current?.focusName();
      return;
    }
    setSession({ ...session, loginUser: { id, name } });
  };

  const logout = () => {
    setSession({ ...session, loginUser: null });
  };

  const removeCartItem = (itemId: number) => {
    setSession({
      ...session,
      cart: session.cart.filter((cartItem) => cartItem.id !== itemId),
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
