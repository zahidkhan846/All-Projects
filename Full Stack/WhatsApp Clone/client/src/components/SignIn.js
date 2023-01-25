import React, { useRef, useState } from "react";
import { Redirect, useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/signin.module.css";

function SignIn() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const history = useHistory();

  const { signIn, currentUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    setLoading(true);
    setError("");

    try {
      await signIn(email, password);
      history.replace("/");
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
    setLoading(false);
  };

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        {error && <p>{error}</p>}
        <div className={styles.formControl}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="user@domain.com"
            ref={emailRef}
          />
        </div>
        <div className={styles.formControl}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password..."
            ref={passwordRef}
          />
        </div>
        <div className={styles.formControl}>
          <button disabled={loading} type="submit" className={styles.btn}>
            Login
          </button>
        </div>
        <p className={styles.link}>
          Don't have an account <Link to="/signup">Create an account</Link>.
        </p>
      </form>
    </div>
  );
}

export default SignIn;
