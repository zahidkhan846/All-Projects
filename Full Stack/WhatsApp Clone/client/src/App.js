import React from "react";
import Messanger from "./components/Messanger";
import PrivateRoute from "./utils/PrivateRoute";
import { Switch, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

function App() {
  return (
    <Switch>
      <PrivateRoute path="/" exact component={Messanger} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route component={SignIn} />
    </Switch>
  );
}

export default App;
