import React from "react";
import { Container } from "react-bootstrap";

const AUTH_URL = process.env.REACT_AP_SPOTIFY_AUTH_URI;

function Login() {
  return (
    <Container className="d-flex justify-content-center align-items-center full-height">
      <a href={AUTH_URL} className="btn btn-success btn-lg">
        Login with spotify
      </a>
    </Container>
  );
}

export default Login;
