import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { setContext } from "apollo-link-context";
import { AuthProvider } from "./store/AuthReducer";

import App from "./App";

import "semantic-ui-css/semantic.min.css";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_SERVER_URI,
});

const authLink = setContext(() => {
  const token = localStorage.getItem("MEGNET_CHAT_TOKEN");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
