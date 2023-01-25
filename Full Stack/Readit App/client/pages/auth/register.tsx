import React, { Fragment } from "react";
import Head from "next/head";
import Register from "../../components/auth/register";

function RegisterPage() {
  return (
    <Fragment>
      <Head>
        <title>Register</title>
      </Head>
      <Register />
    </Fragment>
  );
}

export default RegisterPage;
