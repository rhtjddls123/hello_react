import { createContext, ReactNode, useState } from "react";

interface UserProgressContextType {
  progress: "" | "cart" | "checkout";
  showCart: () => void;
  hideCart: () => void;
  showCheckout: () => void;
  hideCheckout: () => void;
}

export const UserProgressContext = createContext<UserProgressContextType>({
  progress: "",
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {}
});

interface UserProgressContextProvider {
  children: ReactNode;
}

export const UserProgressContextProvider = ({ children }: UserProgressContextProvider) => {
  const [userProgress, setUserProgress] = useState<"" | "cart" | "checkout">("");

  function showCart() {
    setUserProgress("cart");
  }

  function hideCart() {
    setUserProgress("");
  }

  function showCheckout() {
    setUserProgress("checkout");
  }

  function hideCheckout() {
    setUserProgress("");
  }

  const userProgressContext = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout
  };
  console.log(userProgress);
  return <UserProgressContext.Provider value={userProgressContext}>{children}</UserProgressContext.Provider>;
};
