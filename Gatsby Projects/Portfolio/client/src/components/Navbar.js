import React from "react";
import logo from "../images/logo.png";
import PageLinks from "../utility/constants/links";
import { FaAlignRight } from "react-icons/fa";

export default function Navbar(props) {
  const { handleSidebar } = props;

  return (
    <nav className="navbar">
      <div className="nav-center">
        <div className="nav-header">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <button onClick={handleSidebar} type="button" className="toggle-btn">
            <FaAlignRight></FaAlignRight>
          </button>
        </div>
        <PageLinks styleClass="nav-links"></PageLinks>
      </div>
    </nav>
  );
}
