import { ButtonHTMLAttributes, ElementType, ReactNode } from "react";
import { log } from "../../log.ts";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ElementType;
  children: ReactNode;
}

export default function IconButton({ children, icon, ...props }: Props) {
  log("<IconButton /> rendered", 2);

  const Icon = icon;
  return (
    <button {...props} className="button">
      <Icon className="button-icon" />
      <span className="button-text">{children}</span>
    </button>
  );
}
