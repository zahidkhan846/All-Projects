import { Fragment } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

function Layout({ children }) {
  return (
    <Fragment>
      <Header />
      <main>{children}</main>
      <Footer />
    </Fragment>
  );
}

export default Layout;
