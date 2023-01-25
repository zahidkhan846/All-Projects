import React, { Fragment } from "react";
import Head from "next/head";
import Login from "../../components/auth/login";

function LoginPage() {
  return (
    <Fragment>
      <Head>
        <title>Login Page</title>
      </Head>
      <Login />
    </Fragment>
  );
}

export default LoginPage;
