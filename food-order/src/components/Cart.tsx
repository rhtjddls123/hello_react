import { useContext } from "react";
import Modal from "./UI/Modal";
import { CartContext } from "../store/CartContext";
import { currencyFormatter } from "../utils/formatting";
import Button from "./UI/Button";
import { UserProgressContext } from "../store/UserProgressContext";
import CartItem from "./CartItem";

const Cart = () => {
  const { items, addItem, removeItem } = useContext(CartContext);
  const { progress, hideCart, showCheckout } = useContext(UserProgressContext);

  const cartTotal = items.reduce((totalPrice, item) => totalPrice + +item.price * item.quantity, 0);

  const handleCloseCart = () => {
    hideCart();
  };

  const handleGoToCheckout = () => {
    showCheckout();
  };

  return (
    <Modal open={progress === "cart"} className="cart" onClose={progress === "cart" ? handleCloseCart : undefined}>
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => (
          <CartItem key={item.id} {...item} onIncrease={() => addItem(item)} onDecrease={() => removeItem(item.id)}></CartItem>
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {items.length > 0 && <Button onClick={handleGoToCheckout}>Go to checkout</Button>}
      </p>
    </Modal>
  );
};

export default Cart;
