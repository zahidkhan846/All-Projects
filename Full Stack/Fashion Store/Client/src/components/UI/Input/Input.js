import React from "react";

function Input(props) {
  return (
    <div className="form-control mt-min">
      <label {...props} htmlFor={props.id}>
        {props.label}
      </label>
      <input {...props} type={props.type} name={props.id} id={props.id} />
    </div>
  );
}

export default Input;
