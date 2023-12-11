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
  addCart: (name: string, price: number, id?: number) => void;
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

  const addCart = (name: string, price: number, itemId?: number) => {
    const id =
      session.cart
        .map((cart) => cart.id)
        .sort()
        .at(-1) || 0;
    if (itemId) {
      const tmpCart = [
        ...session.cart.filter((cart) => cart.id !== itemId),
        { id: itemId, name, price },
      ];
      setSession({ ...session, cart: tmpCart });
    } else {
      const tmpCart = [...session.cart, { id: id + 1, name, price }];
      setSession({ ...session, cart: tmpCart });
    }
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
