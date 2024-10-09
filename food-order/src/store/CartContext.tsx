import { createContext, ReactNode, useReducer } from "react";

interface CartContextType {
  items: itemType[];
  addItem: (item: itemType) => void;
  removeItem: (id: string) => void;
}

export const CartContext = createContext<CartContextType>({ items: [], addItem: () => {}, removeItem: () => {} });

interface CartContextProviderType {
  children: ReactNode;
}

type ActionType = { type: "ADD_ITEM"; item: itemType } | { type: "REMOVE_ITEM"; id: string };

const cartReducer = (state: { items: itemType[] }, action: ActionType) => {
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

    return { ...state, updatedItems };
  }

  return state;
};

export const CartContextProvider = ({ children }: CartContextProviderType) => {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item: itemType) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }

  function removeItem(id: string) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem
  };

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
};
