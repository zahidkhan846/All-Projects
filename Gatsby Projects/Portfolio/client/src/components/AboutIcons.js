import React from "react";

export default function AboutIcons(props) {
  const { react, js, html, css, scss } = props;

  return (
    <ul className="about-icons-ul">
      <li>{react}</li>
      <li>{js}</li>
      <li>{html}</li>
      <li>{css}</li>
      <li>{scss}</li>
    </ul>
  );
}
