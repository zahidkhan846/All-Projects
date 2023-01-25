import React, { createContext, useContext, useEffect, useState } from "react";

const NotificatinContext = createContext({
  notification: null,
  showNotifcation: (notificationData) => {},
  closeNotification: () => {},
});

export const useNotification = () => useContext(NotificatinContext);

function NotificationProvider({ children }) {
  const [activeNotification, setActiveNotification] = useState();

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.alertType === "success" ||
        activeNotification.alertType === "error")
    ) {
      const timer = setTimeout(() => {
        closeNotification();
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  const showNotifcation = (notificationData) => {
    setActiveNotification(notificationData);
  };

  const closeNotification = () => {
    setActiveNotification(null);
  };

  const value = {
    notification: activeNotification,
    showNotifcation,
    closeNotification,
  };

  return (
    <NotificatinContext.Provider value={value}>
      {children}
    </NotificatinContext.Provider>
  );
}

export default NotificationProvider;
