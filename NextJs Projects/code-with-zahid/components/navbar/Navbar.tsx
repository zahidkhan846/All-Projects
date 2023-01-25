import React from "react";

function Navbar() {
  return (
    <React.Fragment>
      <nav>
        <ul className="nav-items">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Projects</a>
          </li>
          <li>
            <a href="#" className="primary-btn">
              Contact
            </a>
          </li>
        </ul>
        <div className="header-content"></div>
      </nav>
    </React.Fragment>
  );
}

export default Navbar;
