import React from "react";
import List from "../UI/List/List";
import styles from "./Wish.module.css";

function Wish() {
  return (
    <div className="container-small">
      <h2 className="text-center py-2 text-pink">Private Wishlist</h2>
      <ul className={styles.listItems}>
        <List />
        <List />
        <List />
      </ul>
    </div>
  );
}

export default Wish;
