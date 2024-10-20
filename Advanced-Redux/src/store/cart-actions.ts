import { Dispatch } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";
import { cartActions, CartType } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch: Dispatch) => {
    const fetchData = async () => {
      const response = await fetch("https://redux-test-b5b79-default-rtdb.firebaseio.com/cart.json");
      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = await response.json();
      return data;
    };

    try {
      const cartData: Omit<CartType, "changed"> = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity
        })
      );
    } catch {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error...",
          message: "Fetching cart data failed!"
        })
      );
    }
  };
};

export const sendCartData = (cart: CartType) => {
  return async (dispatch: Dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pendding",
        title: "Sending...",
        message: "Sending cart data!"
      })
    );

    const sendRequest = async () => {
      const response = await fetch("https://redux-test-b5b79-default-rtdb.firebaseio.com/cart.json", {
        method: "PUT",
        body: JSON.stringify({
          items: cart.items,
          totalQuantity: cart.totalQuantity
        })
      });
      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!"
        })
      );
    } catch {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error...",
          message: "Sending cart data failed!"
        })
      );
    }
  };
};
