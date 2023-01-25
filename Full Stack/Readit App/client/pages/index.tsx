import Head from "next/head";
import React, { Fragment } from "react";
import Dashboard from "../components/resources/dashboard";

function HomePage() {
  return (
    <Fragment>
      <Head>
        <title>Home Page</title>
        <meta
          name="description"
          content="This is somewhat clone of reddit.com"
        />
      </Head>
      <Dashboard />
    </Fragment>
  );
}

export default HomePage;
