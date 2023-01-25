import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import TextEditor from "./TextEditor";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to={`/documents/${uuidv4()}`} />
      </Route>
      <Route path="/documents/:id" exact component={TextEditor} />
    </Switch>
  );
}
