import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../store/contexts/AuthContext";
import styles from "./Header.module.css";
import axios from "../../config/axios";

function ProfileItems() {
  const { authenticated, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await axios.get("/user/logout-user");
      logout();
      window.location.reload();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className={styles.dropDownCard}>
      <div className={styles.auth}>
        {authenticated ? (
          <button className={styles.btnLink} onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login">Login/Register</Link>
        )}
      </div>
      <div className={styles.order}>
        <Link to="/profile">Profile</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/wishlist">Wishlist</Link>
      </div>
    </div>
  );
}

export default ProfileItems;
