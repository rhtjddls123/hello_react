import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  open: boolean;
  className: string;
  children: ReactNode;
}

const Modal = ({ open, className, children }: ModalProps) => {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const modal = dialog.current;

    if (open) {
      modal?.showModal();
    }

    return () => modal?.close();
  }, [open]);

  const element = document.getElementById("modal");
  return element
    ? createPortal(
        <dialog ref={dialog} className={`modal ${className}`}>
          {children}
        </dialog>,
        element
      )
    : null;
};

export default Modal;
