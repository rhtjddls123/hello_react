import { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import { CartContext } from "../store/CartContext";

const Header = () => {
  const { items } = useContext(CartContext);

  const totalCartItems = items.reduce((totalNumberOfItems, item) => totalNumberOfItems + item.quantity, 0);

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="logoImg" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
};

export default Header;
