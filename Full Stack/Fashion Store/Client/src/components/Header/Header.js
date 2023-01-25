import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../images/logo.png";
import { FaRegUser, FaRegHeart } from "react-icons/fa";
import { BiShoppingBag, BiSearch } from "react-icons/bi";
import ProfileItems from "./ProfileItems";

function Header() {
  return (
    <header className={styles.headerContainer}>
      <nav className={styles.headerItems}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
        <ul className={styles.navItems}>
          <li>
            <NavLink to="/shop/women">Women</NavLink>
          </li>
          <li>
            <NavLink to="/shop/men">Men</NavLink>
          </li>
          <li>
            <NavLink to="/shop/kids">Kids</NavLink>
          </li>
          <li>
            <NavLink to="/shop/others">Others</NavLink>
          </li>
        </ul>
        <div className={styles.search}>
          <BiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search for Products, Brands and More..."
          />
        </div>
        <ul className={styles.userLinks}>
          <li>
            <div>
              <span className={styles.userLink}>
                <div className={styles.onProfileHover}>
                  <ProfileItems />
                </div>
                <FaRegUser />
                <span className={styles.userLinkTag}>Profile</span>
              </span>
            </div>
          </li>
          <li>
            <Link to="/wishlist">
              <span className={styles.userLink}>
                <FaRegHeart />
                <span className={styles.userLinkTag}>Wishlist</span>
              </span>
            </Link>
          </li>
          <li>
            <Link to="/bag">
              <span className={styles.userLink}>
                <BiShoppingBag />
                <span className={styles.userLinkTag}>Bag</span>
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
