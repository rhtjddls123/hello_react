import { useRef, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";

interface Props {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

function Modal({ open, children, onClose }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      dialog.current?.showModal();
    } else {
      dialog.current?.close();
    }
  }, [open]);

  const element = document.getElementById("modal");

  return element
    ? createPortal(
        <dialog className="modal" ref={dialog} onClose={onClose}>
          {open ? children : null}
        </dialog>,
        element
      )
    : null;
}

export default Modal;
