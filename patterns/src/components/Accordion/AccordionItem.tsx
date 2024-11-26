import { createContext, ReactNode, useContext } from "react";

interface AccordionItemProps {
  id: string;
  className?: string;
  children: ReactNode;
}

const AccordionItemContext = createContext("");

export function useAccordionItemContext() {
  const ctx = useContext(AccordionItemContext);

  if (!ctx) {
    throw Error("AccordionItem-related components must be wrapper by <Accordion.Item>.");
  }

  return ctx;
}

const AccordionItem = ({ id, className, children }: AccordionItemProps) => {
  return (
    <AccordionItemContext.Provider value={id}>
      <li className={className}>{children}</li>
    </AccordionItemContext.Provider>
  );
};

export default AccordionItem;
