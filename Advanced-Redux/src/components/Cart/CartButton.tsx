import { useDispatch, useSelector } from "react-redux";
import classes from "./CartButton.module.css";
import { uiActions } from "../../store/ui-slice";
import { RootState } from "../../store";

const CartButton = () => {
  const total = useSelector((state: RootState) => state.cart.totalQuantity);
  const dispatch = useDispatch();
  const cartVisibleHandler = () => {
    dispatch(uiActions.toggle());
  };
  return (
    <button className={classes.button} onClick={cartVisibleHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{total}</span>
    </button>
  );
};

export default CartButton;
