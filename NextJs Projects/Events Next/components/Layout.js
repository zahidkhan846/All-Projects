import React, { Fragment } from "react";
import { Navbar } from "../components/Navbar";
import { useNotification } from "../store/NotificationContext";
import Footer from "./Footer";
import Notification from "./Notification";

function Layout({ children }) {
  const { notification } = useNotification();

  return (
    <Fragment>
      <Navbar />
      {notification && (
        <div className="notification-card">
          <Notification
            title={notification.title}
            alertType={notification.alertType}
            message={notification.message}
          />
        </div>
      )}
      <main className="container">{children}</main>
      <Footer />
    </Fragment>
  );
}

export default Layout;
