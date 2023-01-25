import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Menu } from "semantic-ui-react";
import { useAuth } from "../store/AuthReducer";

const MenuBar = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <Menu pointing secondary size="massive" color="pink">
        <Menu.Item name="Home" as={NavLink} to="/" exact />
        <Menu.Menu position="right">
          <Menu.Item name="Login" as={NavLink} to="/login" />
          <Menu.Item name="Register" as={NavLink} to="/register" />
        </Menu.Menu>
      </Menu>
    );
  } else {
    return (
      <Menu pointing secondary size="massive" color="teal">
        <Menu.Item name={user.userName} as={NavLink} to="/" exact />
        <Menu.Menu position="right">
          <Menu.Item
            name="logout"
            as={Button}
            size="huge"
            onClick={() => logout()}
          />
        </Menu.Menu>
      </Menu>
    );
  }
};

export default MenuBar;
