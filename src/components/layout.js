import React from "react";
import Head from "next/head";

import Header from "./header";

export default ({ children }) => (
  <div className="wrapper">
    <Head>
      <title>AKAI Apps</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className="background" />
    <Header />
    <main>{children}</main>
  </div>
);
