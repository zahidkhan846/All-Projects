import Link from "next/link";
import React from "react";
import styles from "../styles/navbar.module.css";

export function Navbar() {
  return (
    <header className={styles.navbar}>
      <h2 className={styles.logo}>
        <Link href="/">Event Manager</Link>
      </h2>
      <nav>
        <ul className={styles.socialLinks}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/events">Events</Link>
          </li>
          <li>
            <Link href="/about">About Us</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
