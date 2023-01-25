import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footer}>
        <div className={styles.logoLight}>
          <Link href="/">
            <a className={styles.navLink}>
              <Image
                src="/assets/logo-light.png"
                alt="logo"
                height={100}
                width={200}
              />
            </a>
          </Link>
        </div>
        <div className={styles.copy}>
          <p className="max-300 text-center">
            Copyright &copy; {new Date().getFullYear()} | Code with Zahid All
            rights reserved.
          </p>
        </div>
        <div className={styles.socialLinks}>
          <h3 className="py-min">Fallow me on</h3>
          <ul className={styles.social}>
            <li>
              <a href="https://www.facebook.com/zahidkhan846">
                <FaFacebookF className={styles.socialIcon} />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/zahidkhan846">
                <FaLinkedinIn className={styles.socialIcon} />
              </a>
            </li>
            <li>
              <a href="https://github.com/zahidkhan846">
                <FaGithub className={styles.socialIcon} />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/zahid.khan846">
                <FaInstagram className={styles.socialIcon} />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/zahidkhanzk846">
                <FaTwitter className={styles.socialIcon} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
