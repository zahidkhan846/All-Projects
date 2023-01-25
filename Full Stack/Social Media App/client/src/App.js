import { Route, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MenuBar from "./components/MenuBar";
import SinglePost from "./components/SinglePost";

import "./App.css";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <Container>
      <MenuBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/posts/:postId" component={SinglePost} />
        <PrivateRoute path="/register" component={Register} />
        <PrivateRoute path="/login" component={Login} />
      </Switch>
    </Container>
  );
}

export default App;
