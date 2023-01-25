import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import DashBoard from "./components/DashBoard";
import Header from "./components/UI/Header";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <Fragment>
      <Header />
      <Switch>
        <PrivateRoute path="/" exact component={DashBoard} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </Fragment>
  );
}

export default App;
