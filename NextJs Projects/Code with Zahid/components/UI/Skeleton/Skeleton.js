import React from "react";
import styles from "./Skeleton.module.css";

function Skeleton() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.header}></div>
      <div className={styles.image}></div>
      <div className={styles.projectTitle}></div>
      <div className={styles.desc}></div>
      <div className={styles.box}></div>
      <div className={styles.completed}></div>
      <div className={styles.links}></div>
    </div>
  );
}

export default Skeleton;
