import React from "react";
import { SWRConfig } from "swr";
import Layout from "../components/Layout/Layout";
import { axiosConnect } from "../config/axios";
import AuthProvider from "../context/auth";
import SearchProvider from "../context/search";
import "../styles/globals.css";
import "../utils/customIcon/style.css";

function MyApp({ Component, pageProps }) {
  const value = {
    fetcher: (url) =>
      axiosConnect
        .get(url)
        .then((res) => res.data)
        .catch((err) => {
          throw err.response.data;
        }),
  };

  return (
    <SearchProvider>
      <AuthProvider>
        <SWRConfig value={value}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SWRConfig>
      </AuthProvider>
    </SearchProvider>
  );
}

export default MyApp;
