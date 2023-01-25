import React, { Fragment } from "react";
import Header from "../UI/Header";
import { useRouter } from "next/router";
import { useSearch } from "../../context/search";

function Layout(props) {
  const { pathname } = useRouter();

  const authRoutes = ["/auth/login", "/auth/register"];

  const authRoute = authRoutes.includes(pathname);

  const { setSubs } = useSearch();

  const handleCloseSearch = () => {
    setSubs([]);
  };

  return (
    <div onClick={handleCloseSearch}>
      {!authRoute && <Header />}
      <main>{props.children}</main>
    </div>
  );
}

export default Layout;
