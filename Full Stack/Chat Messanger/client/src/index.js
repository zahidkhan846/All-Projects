import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ContactsProvider from "./contexts/ContactsProvider";
import ConversationsProvider from "./contexts/ConvertationsProvider";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <ContactsProvider>
    <ConversationsProvider>
      <App />
    </ConversationsProvider>
  </ContactsProvider>,
  document.getElementById("root")
);
