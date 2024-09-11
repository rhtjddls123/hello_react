import { InputHTMLAttributes } from "react";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  invalid: boolean;
}

export default function CustomInput({ label, invalid, ...props }: CustomInputProps) {
  let labelClasses = "block mb-2 text-xs font-bold tracking-wide";
  let inputClasses = "w-full px-3 py-2 leading-tight border rounded shadow";

  if (invalid) {
    labelClasses += " text-red-400";
    inputClasses += " text-red-500 bg-red-100 border-red-300";
  } else {
    labelClasses += " text-stone-200";
    inputClasses += " text-gray-700 bg-stone-300";
  }

  return (
    <p>
      <label className={labelClasses}>{label}</label>
      <input className={inputClasses} {...props} />
    </p>
  );
}
