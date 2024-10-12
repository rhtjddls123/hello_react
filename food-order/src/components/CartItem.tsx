import { currencyFormatter } from "../utils/formatting";

interface CartItemProps {
  name: string;
  quantity: number;
  price: string;
  onIncrease: () => void;
  onDecrease: () => void;
}

const CartItem = ({ name, quantity, price, onIncrease, onDecrease }: CartItemProps) => {
  return (
    <li className="cart-item">
      <p>
        {name} - {quantity} x {currencyFormatter.format(+price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <span>{quantity}</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
};

export default CartItem;
