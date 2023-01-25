import React from "react";
import { Container } from "react-bootstrap";
import { RiChatVoiceFill } from "react-icons/ri";

function Header() {
  return (
    <Container
      className="d-flex w-100 bg-dark text-light justify-content-center align-items-center"
      style={{
        height: "60px",
        maxWidth: "100%",
        borderBottom: "2px solid #d3c614",
      }}
    >
      <h1 style={{ color: "coral", cursor: "default" }}>
        <span style={{ fontSize: "30px" }}>Chat App</span> <RiChatVoiceFill />
      </h1>
    </Container>
  );
}

export default Header;
