import React, { Fragment } from "react";
import { Home } from "../components/Home/Home";
import Featured from "../components/Products/Featured";

function HomePage() {
  return (
    <Fragment>
      <Home />
      <Featured />
    </Fragment>
  );
}

export default HomePage;
