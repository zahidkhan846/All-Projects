import classNames from "classnames";
import Link from "next/link";
import React, { FC, Fragment } from "react";
import { axiosConnect } from "../../config/axios";
import { useAuth } from "../../context/auth";

const HeaderButtons: FC = () => {
  const { authenticated, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await axiosConnect.get("/auth/logout");
      logout();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="flex justify-center gap-4 item-center">
      {!authenticated && (
        <Fragment>
          <Link href="/auth/login">
            <a className="hidden px-8 py-1 text-sm font-bold text-blue-500 bg-white border border-blue-500 rounded-full sm:block hover:bg-blue-100">
              Log In
            </a>
          </Link>
          <Link href="/auth/register">
            <a className="hidden px-8 py-1 text-sm font-bold text-white bg-blue-500 border border-blue-500 rounded-full sm:block hover:bg-blue-400">
              Sign Up
            </a>
          </Link>
        </Fragment>
      )}

      <button
        disabled={!authenticated}
        className={classNames(
          "py-1 px-8 border border-gray-200 rounded text-gray-200",
          {
            "cursor-default": !authenticated,
            "cursor-pointer border-green-400 rounded text-green-400 hover:border-red-400 hover:text-red-400":
              authenticated,
          }
        )}
        onClick={handleLogout}
      >
        <i className="fa fa-user" aria-hidden="true"></i>
      </button>
    </nav>
  );
};

export default HeaderButtons;
