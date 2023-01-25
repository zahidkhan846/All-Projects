import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Sidenav({ showSidenav, toggleNavButton }) {
  const { userAuth, logoutHandler } = useContext(AuthContext);

  return (
    <div
      className={showSidenav ? "sidenav" : "hidden"}
      onClick={toggleNavButton}
    >
      {!userAuth ? (
        <>
          <Link className="side-link" to="/">
            Home
          </Link>
          <Link className="side-link" to="/login">
            Login
          </Link>
        </>
      ) : (
        <>
          <Link className="side-link" to="/">
            Home
          </Link>
          <Link className="side-link" to="/posts">
            Posts
          </Link>
          <Link className="side-link" to="/add-post">
            Add Post
          </Link>
          <button
            onClick={logoutHandler}
            className="p-2 text-red-500 btn btn--secondary"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export default Sidenav;
