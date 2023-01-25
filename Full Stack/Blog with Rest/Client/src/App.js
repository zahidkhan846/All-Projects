import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Footer from "./component/Footer";
import Navbar from "./component/Navbar";
import Sidenav from "./component/Sidenav";
import SinglePost from "./pages/SinglePost";
import AddPosts from "./pages/AddPosts";
import ContentPage from "./pages/PostPage";
import HomePage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import Signup from "./component/Auth/Signup";
import ResetPassword from "./component/Auth/ResetPassword";
import EditPost from "./component/EditPost";

function App() {
  const [showSidenav, setShowSidenav] = useState(false);

  const toggleNavButton = () => {
    setShowSidenav(!showSidenav);
  };

  return (
    <>
      <Navbar toggleNavButton={toggleNavButton} />
      <Sidenav showSidenav={showSidenav} toggleNavButton={toggleNavButton} />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/post/:id" component={SinglePost} />
        <Route path="/posts" component={ContentPage} />
        <Route path="/add-post" component={AddPosts} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={LoginPage} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route path="/edit-post/:id" component={EditPost} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
