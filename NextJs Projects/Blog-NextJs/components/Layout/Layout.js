import { Fragment } from "react";
import { useAlert } from "../../store/AlertContext";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Notification from "../UI/Notification/Notification";

function Layout({ children }) {
  const { alert } = useAlert();

  return (
    <Fragment>
      <Navbar />
      {alert && <Notification type={alert.type} desc={alert.desc} />}
      <main>{children}</main>
      <Footer />
    </Fragment>
  );
}

export default Layout;
