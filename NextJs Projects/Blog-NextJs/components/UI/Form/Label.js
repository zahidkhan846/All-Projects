import { Checkbox, FormControlLabel, FormGroup } from "@material-ui/core";
import React from "react";

function Label({ state, handleChange }) {
  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox checked={state.html} onChange={handleChange} name="html" />
        }
        label="HTML"
      />
      <FormControlLabel
        control={
          <Checkbox checked={state.css} onChange={handleChange} name="css" />
        }
        label="CSS"
      />
      <FormControlLabel
        control={
          <Checkbox checked={state.js} onChange={handleChange} name="js" />
        }
        label="JS"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.react}
            onChange={handleChange}
            name="react"
          />
        }
        label="React Js"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.gatsby}
            onChange={handleChange}
            name="gatsby"
          />
        }
        label="Gatsby JS"
      />
      <FormControlLabel
        control={
          <Checkbox checked={state.node} onChange={handleChange} name="node" />
        }
        label="Node Js"
      />
      <FormControlLabel
        control={
          <Checkbox checked={state.next} onChange={handleChange} name="next" />
        }
        label="Next Js"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.other}
            onChange={handleChange}
            name="other"
          />
        }
        label="Other"
      />
    </FormGroup>
  );
}

export default Label;
