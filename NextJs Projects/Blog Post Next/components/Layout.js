import React from "react";
import styles from "../styles/Layout.module.css";
import Meta from "./Meta";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <>
      <Meta />
      <Navbar />
      <div className={styles.container}>
        <main className={styles.main}>{children}</main>
      </div>
    </>
  );
}

export default Layout;
