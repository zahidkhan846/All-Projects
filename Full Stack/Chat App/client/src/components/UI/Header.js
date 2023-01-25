import React from "react";
import { NavLink } from "react-router-dom";
import TextsmsIcon from "@material-ui/icons/Textsms";
import { useAuth } from "../../contexts/AuthProvider";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import HomeIcon from "@material-ui/icons/Home";

function Header() {
  const { user, logoutAction } = useAuth();

  const activeClass = {
    background: "#675fcf",
    color: "white",
  };

  const handleLogout = () => {
    logoutAction();
    window.location.href = "/login";
  };

  return (
    <header>
      <nav>
        <h1>
          <TextsmsIcon className="icon" />
          <span>CWZ Connect</span>
        </h1>
        <ul>
          {user && (
            <li>
              <NavLink activeStyle={activeClass} to="/" exact>
                <span>Home </span> <HomeIcon />
              </NavLink>
            </li>
          )}
          <li>
            {user ? (
              <button className="logout-btn" onClick={handleLogout}>
                <span>Logout</span>
                <PowerSettingsNewIcon />
              </button>
            ) : (
              <NavLink activeStyle={activeClass} to="/login">
                Login
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
