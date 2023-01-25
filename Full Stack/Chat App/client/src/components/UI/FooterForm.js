import React from "react";

function FooterForm() {
  return (
    <p className="white">
      Copyright &copy;{" "}
      <a
        href="http://codewithzahid.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Code with zahid
      </a>{" "}
      {new Date().getFullYear()}
    </p>
  );
}

export default FooterForm;
