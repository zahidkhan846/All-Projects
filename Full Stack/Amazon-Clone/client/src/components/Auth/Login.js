import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import logo from "../../assets/login.png";
import { useAuth } from "../../context/AuthContext";
import "../../styles/Login.css";

function Login() {
  const { signIn, currentUser } = useAuth();

  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await signIn(email, password);
      history.replace("/");
    } catch {
      setError("Unable to sign in");
    }
    setLoading(false);
  };

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <section id="form">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <div className="form-container">
          <form onSubmit={handleSubmit} className="login">
            <h1>Sign-In</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <label>Email or mobile phone number</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
            <label>Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            <button disabled={loading} type="submit">
              Login
            </button>
            <p>
              By continuing, you agree to Amazon's{" "}
              <a href="#!">Conditions of Use</a> and{" "}
              <a href="#!">Privacy Notice</a>.
            </p>
            <a href="#!">Need help?</a>
          </form>
        </div>

        <div className="signup">
          <p className="text-center">New to Amazon</p>
          <Link className="signup-btn" to="/signup">
            Create your Amazon account
          </Link>
        </div>
      </section>
      <footer>
        <div className="terms">
          <a href="#!">Conditions of Use</a>
          <a href="#!">Privacy Notice</a>
          <a href="#!">Help</a>
        </div>
        <p>© 1996-2021, Amazon.com, Inc. or its affiliates</p>
      </footer>
    </>
  );
}

export default Login;
