import React, { useState } from "react";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import styles from "./User.module.css";
import headerImage from "../../images/header.jpg";
import { Redirect, useHistory } from "react-router";
import { Link } from "react-router-dom";
import axios from "../../config/axios";
import { useAuth } from "../../store/contexts/AuthContext";

function Login() {
  const { authenticated } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState();

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/user/signin-user", {
        email,
        password,
      });
      if (res.status === 200) {
        history.push("/");
        window.location.reload();
      }
      console.log(res);
    } catch (err) {
      console.log(err);
      setErrors(err.response.data.error);
    }
  };

  console.log(errors);

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="bg-colorful">
      <section className="container-small">
        <article className={styles.formContainer}>
          <form className="form" onSubmit={handleSubmit}>
            <img src={headerImage} alt="header" />
            <div className="form-elements">
              <h1>
                <span className="text-pink">Login</span>{" "}
              </h1>

              <p className="py-min text-grey">
                <span>Enter your email and Password</span>
              </p>
              <Input
                htmlFor="email"
                type="email"
                id="email"
                name="email"
                label={
                  errors?.email ? (
                    <span style={{ color: "coral" }}>{errors.email}</span>
                  ) : (
                    "Email"
                  )
                }
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email..."
              />
              <Input
                htmlFor="password"
                type="password"
                id="password"
                name="password"
                label={
                  errors?.password ? (
                    <span style={{ color: "coral" }}>{errors.password}</span>
                  ) : (
                    "Password"
                  )
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Your Password..."
              />
              <p className="text-grey py-2">
                By continuing, I agree to the{" "}
                <strong className="text-pink">Tearms of Use</strong> &{" "}
                <strong className="text-pink">Privacy Policy</strong>
              </p>
              <Button type="submit" customstyle="btn-primary full-width">
                Continue
              </Button>
              <p className="mt-1">
                Forgot Password{" "}
                <Link className={styles.loginLink} to="/change-password">
                  Change Password
                </Link>
              </p>
              <p className="mt-1">
                Don't have an account{" "}
                <Link className={styles.loginLink} to="/register">
                  Register Here
                </Link>
              </p>
            </div>
          </form>
        </article>
      </section>
    </div>
  );
}

export default Login;
