import React from "react";

function Button(props) {
  return (
    <button {...props} className={`btn ${props.customstyle}`}>
      {props.children}
    </button>
  );
}

export default Button;
