import React from "react";
import { FaTimes } from "react-icons/fa";
import Links from "../utility/constants/links";
import SocialLinks from "../utility/constants/socialLinks";

export default function Sidebar(props) {
  const { handleSidebar, showSide } = props;
  return (
    <aside className={`sidebar ${showSide ? "show-sidebar" : ""}`}>
      <button onClick={handleSidebar} className="close-btn">
        <FaTimes />
      </button>
      <div className="side-container">
        <Links styleClass={`${showSide && "sidebar-links"}`} />
        <SocialLinks styleClass={`${showSide && "sidebar-icons"}`} />
      </div>
    </aside>
  );
}
