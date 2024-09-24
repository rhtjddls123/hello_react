import { forwardRef, ReactNode, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import Cart from "./Cart";

interface Props {
  cartItems: cartType[];
  onUpdateCartItemQuantity: (productId: string, amount: number) => void;
  title: string;
  actions: ReactNode;
}

export interface HandleDialog {
  open: () => void;
}

const CartModal = forwardRef<HandleDialog, Props>(function Modal({ cartItems, onUpdateCartItemQuantity, title, actions }, ref) {
  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current?.showModal();
      }
    };
  });

  const modalElement = document.getElementById("modal");

  return modalElement
    ? createPortal(
        <dialog id="modal" ref={dialog}>
          <h2>{title}</h2>
          <Cart items={cartItems} onUpdateItemQuantity={onUpdateCartItemQuantity} />
          <form method="dialog" id="modal-actions">
            {actions}
          </form>
        </dialog>,
        modalElement
      )
    : null;
});

export default CartModal;