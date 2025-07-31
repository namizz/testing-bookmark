import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
interface InputProps {
  label?: string;
  ph: string;
  register?: UseFormRegisterReturn;
  error?: string;
  type?: string;
}
const InputBox = ({ label, ph, register, error, type }: InputProps) => {
  return (
    <div className="flex flex-col  p-2 ">
      {label && (
        <label htmlFor="input" className="font-semibold text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type || "text"}
        {...register}
        className={`border py-2 px-4 rounded-md border-gray-300 ${
          error ? "border-red-500" : ""
        }`}
        placeholder={ph}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputBox;
