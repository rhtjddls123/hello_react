import { createContext, ReactNode, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

interface CartContextType {
  items: itemType[];
  addItemToCart: (id: string) => void;
  updateCartItemQuantity: (productId: string, amount: number) => void;
}

export const CartContext = createContext<CartContextType>({ items: [], addItemToCart: () => {}, updateCartItemQuantity: () => {} });

interface Props {
  children: ReactNode;
}

type ActionType = { type: "ADD-ITEM"; payload: { id: string } } | { type: "UPDATE-ITEM"; payload: { productId: string; amount: number } };

const shoppingCartReducer = (state: { items: itemType[] }, action: ActionType) => {
  if (action.type === "ADD-ITEM") {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex((cartItem) => cartItem.id === action.payload.id);
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload.id);
      if (product)
        updatedItems.push({
          id: action.payload.id,
          name: product.title,
          price: product.price,
          quantity: 1
        });
    }

    return {
      ...state,
      items: updatedItems
    };
  }

  if (action.type === "UPDATE-ITEM") {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex((item) => item.id === action.payload.productId);

    const updatedItem = {
      ...updatedItems[updatedItemIndex]
    };

    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      ...state,
      items: updatedItems
    };
  }

  return state;
};

export const CartContextProvider = ({ children }: Props) => {
  const [shoppingCartState, ShoppingCartDispatch] = useReducer(shoppingCartReducer, { items: [] });

  function handleAddItemToCart(id: string) {
    ShoppingCartDispatch({ type: "ADD-ITEM", payload: { id } });
  }

  function handleUpdateCartItemQuantity(productId: string, amount: number) {
    ShoppingCartDispatch({ type: "UPDATE-ITEM", payload: { productId, amount } });
  }

  const ctxValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updateCartItemQuantity: handleUpdateCartItemQuantity
  };

  return <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>;
};
