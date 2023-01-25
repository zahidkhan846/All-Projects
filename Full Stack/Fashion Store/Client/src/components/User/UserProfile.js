import React, { useState } from "react";
import { useAuth } from "../../store/contexts/AuthContext";
import AddProduct from "../Products/AddProduct";
import styles from "./User.module.css";

function UserProfile() {
  const { currentUser } = useAuth();
  const [showManageProduct, setShowManageProduct] = useState(false);
  const [showAccount, setShowAccount] = useState(true);
  const [showProducts, setShowProducts] = useState(false);

  return (
    <section className={styles.userContainer}>
      <article>
        <div className={styles.userGrid}>
          <div className={styles.sidebar}>
            <ul>
              <li className={styles.userImage}>
                <img src={currentUser.imageUrl} alt={currentUser._id} />
              </li>
              <li className={styles.btnList} onClick={() => {}}>
                Change profile picture
              </li>
              <li
                className={styles.btnList}
                onClick={() => {
                  setShowManageProduct(true);
                  setShowAccount(false);
                  setShowProducts(false);
                }}
              >
                Manage products
              </li>
              <li
                className={styles.btnList}
                onClick={() => {
                  setShowManageProduct(false);
                  setShowAccount(true);
                  setShowProducts(false);
                }}
              >
                Manage Account
              </li>
              <li
                className={styles.btnList}
                onClick={() => {
                  setShowManageProduct(false);
                  setShowAccount(false);
                  setShowProducts(true);
                }}
              >
                All Products
              </li>
            </ul>
          </div>
          <div className={styles.content}>
            {showManageProduct && <AddProduct />}
            {showAccount && <div>Account</div>}
            {showProducts && <div>Products</div>}
          </div>
        </div>
      </article>
    </section>
  );
}

export default UserProfile;
