import { BiHomeSmile } from "react-icons/bi";
import { BsInfoCircle } from "react-icons/bs";
import { IoMdCodeWorking } from "react-icons/io";
import { FaAngleDoubleRight, FaPhoneVolume } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";

function Header() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarNav}>
        <li className={styles.logo}>
          <Link href="/">
            <a className={styles.navLink}>
              <span className={`${styles.linkText} ${styles.logoText}`}>
                Code with Zahid
              </span>
              <FaAngleDoubleRight className={styles.navIcon} />
            </a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/">
            <a className={styles.navLink}>
              <BiHomeSmile className={styles.navIcon} />
              <span className={styles.linkText}>Home</span>
            </a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/projects">
            <a className={styles.navLink}>
              <IoMdCodeWorking className={styles.navIcon} />
              <span className={styles.linkText}>Projects</span>
            </a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/about">
            <a className={styles.navLink}>
              <BsInfoCircle className={styles.navIcon} />
              <span className={styles.linkText}>About</span>
            </a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/contact">
            <a className={styles.navLink}>
              <FaPhoneVolume className={styles.navIcon} />
              <span className={styles.linkText}>Contact</span>
            </a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/">
            <a className={styles.navLink}>
              <Image src="/assets/logo.png" alt="logo" height={40} width={30} />
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
