import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  textOnly?: boolean;
  className?: string;
  children?: ReactNode;
}

const Button = ({ textOnly, className, children, ...props }: ButtonProps) => {
  const cssClasses = textOnly ? `text-button ${className}` : "button";

  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
