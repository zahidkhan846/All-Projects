import React from "react";
import SocialLinks from "../utility/constants/socialLinks";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div>
          <SocialLinks styleClass="footer-links"></SocialLinks>
          <h4>
            copyright &copy; {new Date().getFullYear()}{" "}
            <span>Code with Zahid</span> <div>all rights reserved</div>
          </h4>
        </div>
      </footer>
    </>
  );
}
