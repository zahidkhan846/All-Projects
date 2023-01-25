import React, { useRef, useState } from "react";
import { Redirect, useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/signin.module.css";

function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const lNameRef = useRef();
  const fNameRef = useRef();
  const cPasswordRef = useRef();

  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { signUp, currentUser } = useAuth();

  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();

    const firstName = fNameRef.current.value;
    const lastName = lNameRef.current.value;
    const confirmPassword = cPasswordRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    setLoading(true);
    setPasswordError("");
    setError("");

    if (password !== confirmPassword) {
      setPasswordError("Password Mismatch!");
      return;
    }

    try {
      await signUp({ email, password, firstName, lastName });
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
        <h1>Create an Account</h1>
        {error && <p>{error}</p>}
        <div className={styles.formControl}>
          <label htmlFor="f-name">First Name</label>
          <input
            type="text"
            name="f-name"
            id="f-name"
            placeholder="Enter your first name..."
            ref={fNameRef}
          />
        </div>
        <div className={styles.formControl}>
          <label htmlFor="l-name">Last Name</label>
          <input
            type="text"
            name="l-name"
            id="l-name"
            placeholder="Enter your last name..."
            ref={lNameRef}
          />
        </div>
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
          <label htmlFor="c-password">Confirm Password</label>
          <input
            type="password"
            name="c-password"
            id="c-password"
            placeholder="Confirm Password..."
            ref={cPasswordRef}
          />
          {passwordError ? (
            <p className="text-light red">{passwordError}</p>
          ) : null}
        </div>
        <div className={styles.formControl}>
          <button disabled={loading} type="submit" className={styles.btn}>
            Login
          </button>
        </div>
        <p className={styles.link}>
          Already have an account <Link to="/signin">Sign in here</Link>.
        </p>
      </form>
    </div>
  );
}

export default SignUp;
