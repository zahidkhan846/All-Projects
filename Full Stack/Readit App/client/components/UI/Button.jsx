import React from "react";

export const Button = (props) => {
  const classes =
    "w-full py-1 mb-4 font-bold text-white uppercase bg-blue-500 border-blue-500 rounded text-s";
  return (
    <button
      {...props}
      className={props.styles || classes}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
