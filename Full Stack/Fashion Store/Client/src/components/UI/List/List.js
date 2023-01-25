import React from "react";
import image from "../../../images/img1.jpg";
import IconButton from "../Button/IconButton/IconButton";
import { FaRegTrashAlt } from "react-icons/fa";
import styles from "./List.module.css";

function List() {
  return (
    <li className={styles.listItem}>
      <img src={image} alt="img" className={styles.productImg} />
      <p className={styles.title}>Lorem, ipsum.</p>
      <p className={styles.desc}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo,
        velit!
      </p>
      <p className={styles.price}>$20</p>
      <IconButton style={{ color: "coral" }}>
        <FaRegTrashAlt />
      </IconButton>
    </li>
  );
}

export default List;
