import { createContext, useContext, useEffect, useState } from "react";

const AlertContext = createContext({
  alert: null,
  showAlert: () => {},
  closeAlert: () => {},
});

export const useAlert = () => useContext(AlertContext);

function AlertProvider({ children }) {
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (alert && (alert.type === "success" || alert.type === "error")) {
      const timer = setTimeout(() => {
        closeAlert();
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [alert]);

  const showAlert = (alertDetail) => {
    setAlert(alertDetail);
  };

  const closeAlert = () => {
    setAlert(null);
  };

  const value = {
    alert,
    showAlert,
    closeAlert,
  };

  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
}

export default AlertProvider;
