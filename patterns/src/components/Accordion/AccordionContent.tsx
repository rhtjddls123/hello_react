import { ReactNode } from "react";
import { useAccordionContext } from "./Accordion";
import { useAccordionItemContext } from "./AccordionItem";

interface AccordionContentProps {
  className: string;
  children: ReactNode;
}

const AccordionContent = ({ className, children }: AccordionContentProps) => {
  const { openItemId } = useAccordionContext();
  const id = useAccordionItemContext();

  const isOpen = openItemId === id;

  return <div className={isOpen ? `${className} open` : `${className} close`}>{children}</div>;
};

export default AccordionContent;
