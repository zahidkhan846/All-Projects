import React from "react";

function Error({ errValue }) {
  return (
    <div className="ui error message">
      <ul className="list">
        <li>{errValue}</li>
      </ul>
    </div>
  );
}

export default Error;
