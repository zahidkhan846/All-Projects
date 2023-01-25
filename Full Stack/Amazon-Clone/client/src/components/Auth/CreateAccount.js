import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import "../../styles/CreateAccount.css";
import "../../styles/Login.css";
import logo from "../../assets/login.png";
import { useAuth } from "../../context/AuthContext";

function CreateAccount() {
  const { signUp, currentUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await signUp({ email, password, userName, phone });
      history.replace("/");
    } catch {
      setError("Failed to create an account");
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
          <form onSubmit={handleSubmit} className="signup">
            <h1>Create Account</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <label>Your name</label>
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
            />
            <label>Mobile number</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
            />
            <label>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
            <label>Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="i-pwd"
              type="password"
            />
            <p className="info">Password must be at least 6 characters.</p>
            <p>
              We will send you a text to verify your phone. Message and Data
              rates may apply.
            </p>

            <button disabled={loading} type="submit">
              Continue
            </button>
            <div className="signin">
              <p>
                Already have an account? <Link to="/login">Sign In</Link>
              </p>
              <p>
                Buying for work? <a href="#!">Create a free business account</a>
              </p>
            </div>
          </form>
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

export default CreateAccount;
