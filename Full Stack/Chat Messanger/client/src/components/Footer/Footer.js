import React from "react";
import "./Footer.css";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitch } from "react-icons/fa";

export function Footer() {
  return (
    <section id="footer-container" className="bg-dark">
      <div className="footer-content container">
        <ul className="social">
          <li>
            <a href="https://facebook.com" target="_blank">
              <FaFacebook className="icon" />
            </a>
          </li>
          <li>
            <a href="https://twitch.tv" target="_blank">
              <FaTwitch className="icon" />
            </a>
          </li>
          <li>
            <a href="https://linkedin.com" target="_blank">
              <FaLinkedin className="icon" />
            </a>
          </li>
          <li>
            <a href="https://github.com" target="_blank">
              <FaGithub className="icon" />
            </a>
          </li>
        </ul>

        <p>
          Copyright &copy; 2021 |
          <a target="_blank" href="https://codewithzahid.com">
            Code with Zahid
          </a>
        </p>
      </div>
    </section>
  );
}
