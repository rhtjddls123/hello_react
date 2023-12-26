import {
  createContext,
  PropsWithChildren,
  useContext,
  useRef,
  useEffect,
  useReducer,
  useCallback,
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

enum ActionType {
  SET_SESSION = 'setSession',
  LOGIN = 'login',
  LOGOUT = 'logout',
  ADD_ITEM = 'addCart',
  REMOVE_ITEM = 'removeCartItem',
}

type action =
  | { type: ActionType.SET_SESSION; payload: Session }
  | { type: ActionType.LOGIN; payload: LoginUser }
  | { type: ActionType.LOGOUT; payload: null }
  | { type: ActionType.ADD_ITEM; payload: Cart[] }
  | { type: ActionType.REMOVE_ITEM; payload: number };

const reducer = (session: Session, action: action) => {
  let tmp = session;
  switch (action.type) {
    case 'login':
    case 'logout':
      tmp = { ...session, loginUser: action.payload };
      break;
    case 'addCart':
      tmp = { ...session, cart: [...action.payload] };
      break;
    case 'removeCartItem':
      tmp = {
        ...session,
        cart: session?.cart.filter(
          (cartItem) => cartItem.id !== action.payload
        ),
      };
      break;
    case 'setSession':
      tmp = { ...action.payload };
      break;
  }

  setStorage(tmp);
  return tmp;
};

const SKEY = 'SESSION';
const setStorage = (session: Session | undefined) => {
  if (!session) return;
  // console.log('@@@@@@@@@@@@@@@@@@@@@', session);
  const { loginUser, cart } = session;
  sessionStorage.setItem(SKEY, JSON.stringify(loginUser));
  localStorage.setItem(SKEY, JSON.stringify(cart));
};

const getStorage = () => {
  const strLogin = sessionStorage.getItem(SKEY);
  const strCart = localStorage.getItem(SKEY);
  if (!strCart || (strCart === '[]' && strLogin === 'null')) return undefined;

  const loginUser = strLogin ? JSON.parse(strLogin) : null;
  const cart = JSON.parse(strCart);

  return { loginUser, cart };
};

const SessionContextProvider = ({ children }: PropsWithChildren) => {
  // const [session, setSession] = useState<Session>(DefaultSession);
  const storageData = getStorage();
  const [session, dispatch] = useReducer(
    reducer,
    storageData || DefaultSession
  );
  const { useFetch } = useFetchs();

  const url = '/data/sample.json';
  const data = useFetch<Session>(url, storageData);

  useEffect(() => {
    if (data) dispatch({ type: ActionType.SET_SESSION, payload: data });
  }, [data]);

  const loginHandleRef = useRef<LoginHandle>(null);
  const login = useCallback(({ id, name }: LoginUser) => {
    if (id === 0 || !name.trim()) {
      alert('Input Id or Name');
      loginHandleRef.current?.focusName();
      return;
    }
    dispatch({ type: ActionType.LOGIN, payload: { id, name } });
  }, []);

  const logout = useCallback(() => {
    if (session.loginUser) dispatch({ type: ActionType.LOGOUT, payload: null });
  }, [session]);

  const addCart = useCallback(
    (id: number, name: string, price: number) => {
      id = id || Math.max(...session.cart.map((item) => item.id), 0) + 1;
      const modifyItem = session.cart.find((item) => item.id === id);
      if (modifyItem) {
        modifyItem.name = name;
        modifyItem.price = price;
      } else {
        session.cart.push({ id, name, price });
      }
      dispatch({ type: ActionType.ADD_ITEM, payload: session.cart });
    },
    [session]
  );

  const removeCartItem = useCallback((itemId: number) => {
    dispatch({
      type: ActionType.REMOVE_ITEM,
      payload: itemId,
    });
  }, []);

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
