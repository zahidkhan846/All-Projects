import React, { useEffect } from "react";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./components/Checkout/Checkout";
import Login from "./components/Auth/Login";
import Payment from "./components/Payment/Payment";
import CreateAccount from "./components/Auth/CreateAccount";
import { useAuth } from "./context/AuthContext";
import { useUserData } from "./context/UserContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./pages/Orders";
import PrimeVideos from "./pages/PrimeVideos";
import { STRIPE_PUB_KEY } from "./config/secret";

function App() {
  const { currentUser } = useAuth();
  const { getUserData } = useUserData();

  const promise = loadStripe(STRIPE_PUB_KEY);

  useEffect(() => {
    if (currentUser) {
      getUserData(currentUser.uid);
    }
  }, [currentUser]);

  console.log(currentUser);

  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact
          render={() => (
            <>
              <Header /> <HomePage />
            </>
          )}
        />
        <Route path="/login" component={Login} />
        <Route
          path="/payment"
          render={() => (
            <>
              <Header />
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            </>
          )}
        />
        <Route path="/signup" component={CreateAccount} />
        <Route
          path="/checkout"
          render={() => (
            <>
              <Header /> <Checkout />
            </>
          )}
        />
        <Route
          path="/orders"
          render={() => (
            <>
              <Header /> <Orders />
            </>
          )}
        />
        <Route
          path="/prime"
          render={() => (
            <>
              <Header /> <PrimeVideos />
            </>
          )}
        />
      </Switch>
    </Router>
  );
}

export default App;
