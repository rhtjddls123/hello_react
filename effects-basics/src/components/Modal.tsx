import { forwardRef, ReactNode, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: ReactNode;
}

export interface HandleDialog {
  open: () => void;
  close: () => void;
}

const Modal = forwardRef<HandleDialog, Props>(function Modal({ children }, ref) {
  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current?.showModal();
      },
      close: () => {
        dialog.current?.close();
      }
    };
  });

  const element = document.getElementById("modal");

  return element
    ? createPortal(
        <dialog className="modal" ref={dialog}>
          {children}
        </dialog>,
        element
      )
    : null;
});

export default Modal;
