import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ApolloProvider from "./contexts/ApolloProvider";
import AuthProvider from "./contexts/AuthProvider";
import MessageProvider from "./contexts/MessageProvider";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider>
      <AuthProvider>
        <BrowserRouter>
          <MessageProvider>
            <App />
          </MessageProvider>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
