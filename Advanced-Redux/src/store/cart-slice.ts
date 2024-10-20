import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartType = {
  items: CartItemType[];
  totalQuantity: number;
  changed: boolean;
};

const initialCartState: CartType = {
  items: [],
  totalQuantity: 0,
  changed: false
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    replaceCart(state, action: PayloadAction<Omit<CartType, "changed">>) {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
    },
    addItemToCart(state, action: PayloadAction<CartItemType>) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: 1
        });
      } else {
        existingItem.quantity += 1;
        existingItem.total += existingItem.price;
      }

      state.totalQuantity = state.items.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0);
    },
    removeItemFromCart(state, action: PayloadAction<CartItemType>) {
      const id = action.payload.id;
      const existingItem = state.items.find((item) => item.id === id);
      state.changed = true;
      if (existingItem && existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else if (existingItem) {
        existingItem.quantity--;
        existingItem.total -= existingItem.price;
      }
      state.totalQuantity = state.items.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0);
    }
  }
});

export const cartActions = cartSlice.actions;
export default cartSlice;
