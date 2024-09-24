import { forwardRef, InputHTMLAttributes, LegacyRef, TextareaHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  textarea?: false;
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  textarea: true;
}

type Props = (InputProps | TextareaProps) & { label: string };

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>(({ label, textarea, ...props }, ref) => {
  const classes = "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";
  return (
    <p className="flex flex-col gap-1 my-4">
      <label className="text-sm font-bold uppercase text-stone-500">{label}</label>
      {textarea ? (
        <textarea className={classes} {...(props as TextareaProps)} ref={ref as LegacyRef<HTMLTextAreaElement>} />
      ) : (
        <input className={classes} {...(props as InputProps)} ref={ref as LegacyRef<HTMLInputElement>} />
      )}
    </p>
  );
});

export default Input;
