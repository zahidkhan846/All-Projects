import React, { useRef, useState } from "react";
import Card from "../UI/Card";
import styles from "../../styles/auth.module.css";
import { Link, Redirect } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useAuth } from "../../contexts/AuthProvider";
import FooterForm from "../UI/FooterForm";
import { REGISTER_USER } from "../../utils/GraphqlQuery";

function Register(props) {
  const { user } = useAuth();

  const [errors, setErrors] = useState();

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update: (_, __) => props.history.push("/login"),
    onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
  });

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    registerUser({
      variables: {
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      },
    });
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <div className={styles.cardContainer}>
        <Card>
          <form onSubmit={handleSubmit}>
            <h3>Register</h3>
            <div className="form-control">
              <label htmlFor="username">
                {errors?.username ? (
                  <span className={styles.labelError}>{errors.username}</span>
                ) : (
                  "Enter Username"
                )}
              </label>
              <input
                className={errors?.username && styles.inputError}
                id="username"
                type="text"
                ref={usernameRef}
              />
            </div>
            <div className="form-control">
              <label htmlFor="email">
                {errors?.email ? (
                  <span className={styles.labelError}>{errors.email}</span>
                ) : (
                  "Enter Email"
                )}
              </label>
              <input
                className={errors?.email && styles.inputError}
                id="email"
                type="email"
                ref={emailRef}
              />
            </div>
            <div className="form-control">
              <label htmlFor="password">
                {errors?.password ? (
                  <span className={styles.labelError}>{errors.password}</span>
                ) : (
                  "Enter Password"
                )}
              </label>
              <input
                className={errors?.password && styles.inputError}
                id="password"
                type="password"
                ref={passwordRef}
              />
            </div>
            <div className="form-control">
              <label htmlFor="c-password">
                {errors?.confirmPassword ? (
                  <span className={styles.labelError}>
                    {errors.confirmPassword}
                  </span>
                ) : (
                  "Confirm Password"
                )}
              </label>
              <input
                className={errors?.password && styles.inputError}
                id="c-password"
                type="password"
                ref={confirmPasswordRef}
              />
            </div>
            <div className="form-control">
              <button
                disabled={loading}
                className="success full-width"
                type="submit"
              >
                {loading ? "Loading..." : "Register"}
              </button>
            </div>
          </form>
        </Card>
        <div className="mt-2">
          <p>
            Already have an account, click here to{" "}
            <Link to="/login">Login</Link>
          </p>
        </div>
        <div className="mt-2">
          <FooterForm />
        </div>
      </div>
    </div>
  );
}

export default Register;
