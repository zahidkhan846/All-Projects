import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <section className={styles.footerElements}>
        <article className={styles.eachSection}>
          <h4>Online Shopping</h4>
          <ul className={styles.links}>
            <li>Men</li>
            <li>Women</li>
            <li>Kids</li>
            <li>Living</li>
            <li>Others</li>
            <li>Offers</li>
          </ul>
        </article>
        <article className={styles.eachSection}>
          <h4>Useful Links</h4>
          <ul className={styles.links}>
            <li>Contact Us</li>
            <li>FAQ</li>
            <li>Terms of Use</li>
            <li>Track Orders</li>
            <li>Shipping</li>
            <li>Cancilattion</li>
            <li>Returns</li>
          </ul>
        </article>
        <article className={styles.eachSection}>
          <h4>Social Links</h4>
          <ul className={styles.links}>
            <li>
              <FaFacebook className={styles.social} />
            </li>
            <li>
              <FaTwitter className={styles.social} />
            </li>
            <li>
              <FaInstagram className={styles.social} />
            </li>
            <li>
              <FaYoutube className={styles.social} />
            </li>
          </ul>
        </article>
        <article className={styles.eachSection}>
          <ul>
            <li className={styles.featuresFooter}>
              <h5>100% Original</h5>
              <span>Guarantee for all products</span>
            </li>
            <li className={styles.featuresFooter}>
              <h5>Returens within 30 days</h5>
              <span>receiving your order</span>
            </li>
            <li className={styles.featuresFooter}>
              <h5>Get free delivery</h5>
              <span>for evenry order Rs 799</span>
            </li>
          </ul>
        </article>
      </section>
    </footer>
  );
}

export default Footer;
