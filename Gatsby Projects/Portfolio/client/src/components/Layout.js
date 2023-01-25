import React, { useState } from "react";
import Navbar from "./Navbar";
import "../styles/main.css";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const [showSide, setShowSide] = useState(false);

  const handleSidebar = () => {
    setShowSide(!showSide);
  };

  return (
    <>
      <Navbar handleSidebar={handleSidebar} />
      <Sidebar handleSidebar={handleSidebar} showSide={showSide} />
      {children}
      <Footer />
    </>
  );
}
