import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../store/contexts/AuthContext";

function PrivateRoute({ component: Component, ...rest }) {
  const { authenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default PrivateRoute;
