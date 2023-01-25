import classNames from "classnames";
import React, { FC } from "react";

interface InputTypes {
  className?: string;
  type: string;
  placeholder: string;
  value: string;
  error: string | undefined;
  setValue: (arg: string) => void;
}

const Input: FC<InputTypes> = (props) => {
  const { className, type, placeholder, value, error, setValue } = props;

  const inputClass =
    "w-full px-3 py-2 border border-gray-200 rounded-sm outline-none bg-gray-50 focus:bg-white hover:bg-white";

  return (
    <div className={className}>
      <input
        type={type}
        className={classNames(inputClass, {
          "border-red-500": error,
        })}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <small className="font-medium text-red-600">{error}</small>
    </div>
  );
};

export default Input;
