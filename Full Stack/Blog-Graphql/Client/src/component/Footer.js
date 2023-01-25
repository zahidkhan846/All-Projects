import React from "react";

function Footer() {
  return (
    <p className="text-center h-16 p-5">
      Copyright &copy; {new Date().getFullYear()}{" "}
      <a
        className="text-blue-500"
        href="https://codewithzahid.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Code with Zahid
      </a>
    </p>
  );
}

export default Footer;
