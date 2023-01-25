import { Route, Switch } from "react-router";
import Register from "./components/User/Register";
import HomePage from "./pages";
import Layout from "./utils/Layout";
import PrivateRoute from "./utils/PrivateRoute";
import Bag from "./pages/bag";
import Orders from "./pages/orders";
import Wishlist from "./pages/wishlist";
import UserProfile from "./pages/user-profile";
import Women from "./components/Shop/Women";
import Men from "./components/Shop/Men";
import Kids from "./components/Shop/Kids";
import Others from "./components/Shop/Others";
import Login from "./components/User/Login";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/shop/women" component={Women} />
        <Route path="/shop/men" component={Men} />
        <Route path="/shop/kids" component={Kids} />
        <Route path="/shop/others" component={Others} />
        <PrivateRoute path="/profile" component={UserProfile} />
        <PrivateRoute path="/bag" component={Bag} />
        <PrivateRoute path="/orders" component={Orders} />
        <PrivateRoute path="/wishlist" component={Wishlist} />
      </Switch>
    </Layout>
  );
}
export default App;
