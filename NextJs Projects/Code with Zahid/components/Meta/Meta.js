import React, { Fragment } from "react";
import Head from "next/head";

function Meta(props) {
  return (
    <Fragment>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
      </Head>
    </Fragment>
  );
}

export default Meta;
