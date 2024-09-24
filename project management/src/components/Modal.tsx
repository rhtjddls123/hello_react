import { forwardRef, ReactNode, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

interface Props {
  children: ReactNode;
  buttonCaption: string;
}

export interface ModalHandle {
  open: () => void;
}

const Modal = forwardRef<ModalHandle, Props>(({ children, buttonCaption }, ref) => {
  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current?.showModal();
      }
    };
  });

  const modalElement = document.getElementById("modal-root");

  return modalElement
    ? createPortal(
        <dialog ref={dialog} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
          {children}
          <form method="dialog" className="mt-4 text-right">
            <Button>{buttonCaption}</Button>
          </form>
        </dialog>,
        modalElement
      )
    : null;
});

export default Modal;
