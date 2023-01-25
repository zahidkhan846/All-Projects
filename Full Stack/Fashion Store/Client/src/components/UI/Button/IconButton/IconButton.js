import React from "react";
import styles from "./IconButton.module.css";

function IconButton(props) {
  return (
    <button {...props} className={`${styles.iconBtn}`}>
      {props.children}
    </button>
  );
}

export default IconButton;
