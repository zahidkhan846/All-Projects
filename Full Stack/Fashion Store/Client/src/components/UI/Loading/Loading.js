import React from "react";
import styles from "./Loading.module.css";
import { AiOutlineLoading } from "react-icons/ai";

function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <AiOutlineLoading className={styles.icon} />
      <p>Loading...</p>
    </div>
  );
}

export default Loading;
