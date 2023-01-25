import { useLazyQuery } from "@apollo/client";
import React, { useRef, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Card from "../UI/Card";
import styles from "../../styles/auth.module.css";
import { useAuth } from "../../contexts/AuthProvider";
import FooterForm from "../UI/FooterForm";
import { LOGIN_USER } from "../../utils/GraphqlQuery";

function Login(props) {
  const { loginAction, user } = useAuth();

  const [errors, setErrors] = useState();

  const [login, { loading }] = useLazyQuery(LOGIN_USER, {
    onCompleted: (data) => {
      loginAction(data.login);
      window.location.href = "/";
    },
    onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
  });

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    login({ variables: { email: email, password: password } });
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <div className={styles.cardContainer}>
        <Card>
          <form onSubmit={handleSubmit}>
            <h3>Login</h3>
            {errors ? (
              <ul className="errors">
                {Object.values(errors).map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            ) : null}
            <div className="form-control">
              <label htmlFor="email">Email Address</label>
              <input id="email" type="email" ref={emailRef} />
            </div>
            <div className="form-control">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" ref={passwordRef} />
            </div>
            <div className="form-control">
              <button className="success full-width" type="submit">
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
        </Card>
        <div className="mt-2">
          <p>
            Don't have an account, click here to{" "}
            <Link to="/register">Register</Link>
          </p>
        </div>
        <div className="mt-2">
          <FooterForm />
        </div>
      </div>
    </div>
  );
}

export default Login;
