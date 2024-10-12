import { createContext, ReactNode, useReducer } from "react";

interface CartContextType {
  items: CartType[];
  addItem: (item: MealType) => void;
  removeItem: (id: string) => void;
  clearItem: () => void;
}

export const CartContext = createContext<CartContextType>({ items: [], addItem: () => {}, removeItem: () => {}, clearItem: () => {} });

interface CartContextProviderType {
  children: ReactNode;
}

type ActionType = { type: "ADD_ITEM"; item: MealType } | { type: "REMOVE_ITEM"; id: string } | { type: "CLEAR_ITEM" };

const cartReducer = (state: { items: CartType[] }, action: ActionType) => {
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);

    const updatedItems = [...state.items];

    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = { ...existingItem, quantity: existingItem.quantity + 1 };

      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }
  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedItems = [...state.items];

    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = { ...existingCartItem, quantity: existingCartItem.quantity - 1 };
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }
  if (action.type === "CLEAR_ITEM") {
    return { ...state, items: [] };
  }

  return state;
};

export const CartContextProvider = ({ children }: CartContextProviderType) => {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item: MealType) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }

  function removeItem(id: string) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }

  function clearItem() {
    dispatchCartAction({ type: "CLEAR_ITEM" });
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearItem
  };

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
};
