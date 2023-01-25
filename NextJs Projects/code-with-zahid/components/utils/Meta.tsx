import React, { Fragment } from "react";
import Head from "next/head";

interface MetaProps {
  title?: string;
  content?: string;
}

function Meta(props: MetaProps) {
  return (
    <Fragment>
      <Head>
        <title>{props.title ? props.title : "Code with Zahid"}</title>
        <meta
          name="description"
          content={
            props.content
              ? props.content
              : "Hi! My name is Zahid Khan. I am a full-stack developer."
          }
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </Fragment>
  );
}

export default Meta;
