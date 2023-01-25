import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import logo from "../../assets/logo.png";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import "./Header.css";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useUserData } from "../../context/UserContext";
import { useAuth } from "../../context/AuthContext";

function Header() {
  const { cart } = useCart();
  const { user } = useUserData();
  const { signOutUser, currentUser } = useAuth();

  console.log(user);

  return (
    <header className="header">
      <Link to="/" className="logo">
        <img src={logo} alt="amazon" />
      </Link>
      <div className="header-search">
        <input type="text" />
        <SearchIcon className="search-icon" />
      </div>
      <nav className="nav-items">
        <ul>
          <li>
            {currentUser ? (
              <div onClick={signOutUser}>
                <span className="line-1">
                  Hello, {user && user.userName?.split(" ")[0]}
                </span>
                <span className="line-2">Logout</span>
              </div>
            ) : (
              <Link to="/login">
                <span className="line-1">Hello, User</span>
                <span className="line-2">Sign In</span>
              </Link>
            )}
          </li>
          <li>
            <Link to="/orders">
              <span className="line-1">Return</span>
              <span className="line-2">& Orders</span>
            </Link>
          </li>
          <li>
            <Link to="/prime">
              <span className="line-1">Your</span>
              <span className="line-2">Prime</span>
            </Link>
          </li>
          <li>
            <Link to="/checkout" className="cart">
              <span className="cart-line-1">
                <ShoppingBasketIcon className="icon" />
              </span>
              <span className="cart-line-2">{cart?.length}</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
