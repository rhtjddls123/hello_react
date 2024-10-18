import { useSelector } from "react-redux";
import Auth from "./components/Auth";
import Counter from "./components/Counter";
import Header from "./components/Header";
import { RootState } from "./store";
import UserProfile from "./components/UserProfile";

function App() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
  return (
    <>
      <Header />
      {isAuth ? <UserProfile /> : <Auth />}
      <Counter />
    </>
  );
}

export default App;
