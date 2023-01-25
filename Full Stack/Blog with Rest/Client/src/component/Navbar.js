import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar({ toggleNavButton }) {
  const { userAuth, logoutHandler } = useContext(AuthContext);

  const history = useHistory();

  const handleLogout = async () => {
    try {
      await logoutHandler();
      history.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav role="navigation" className="navbar">
      <Link to="/" className="pl-8">
        Blog
      </Link>
      <div className="px-4 cursor-pointer md:hidden" onClick={toggleNavButton}>
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="pr-8 md:block hidden">
        {!userAuth ? (
          <>
            <Link className="p-4" to="/">
              Home
            </Link>
            <Link className="p-4" to="/login">
              Login
            </Link>
          </>
        ) : (
          <>
            <Link className="p-4" to="/">
              Home
            </Link>
            <Link className="p-4" to="/posts">
              Posts
            </Link>
            <Link className="p-4" to="/add-post">
              Add Post
            </Link>
            <button
              onClick={handleLogout}
              className="p-2 rounded border-2 border-red-500 hover:bg-red-500 hover:text-white transition duration-300 ease-in-out text-red-500"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
