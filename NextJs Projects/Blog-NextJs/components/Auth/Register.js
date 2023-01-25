import { useState } from "react";
import styles from "./Auth.module.css";
import classes from "../../styles/form.module.css";
import Link from "next/link";
import { useAlert } from "../../store/AlertContext";
import { useRouter } from "next/router";

function Register() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { showAlert } = useAlert();

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (userPassword !== userConfirmPassword) {
      setLoading(false);
      return showAlert({ type: "error", desc: "Passowrd did not match!" });
    }

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        userName: userName,
        email: userEmail,
        password: userPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      showAlert({
        type: "error",
        desc: data.message || "Something went wrong.",
      });
      setLoading(false);
    } else {
      showAlert({
        type: "success",
        desc: data.message || "Successfully Registerd.",
      });
      setUserName("");
      setUserEmail("");
      setUserPassword("");
      setUserConfirmPassword("");
      router.push("/auth/login");
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <section>
      <div className={classes.heading}>
        <h1 className="text-center featured font-big">Register</h1>
        <div className="underline"></div>
      </div>
      <article className={classes.form}>
        <form onSubmit={handleSubmit}>
          <h2 className={styles.formheading}>Your Info...</h2>
          <div className={classes.formControl}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name..."
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
              required
            />
          </div>
          <div className={classes.formControl}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="user@domain.com"
              value={userEmail}
              onChange={(event) => setUserEmail(event.target.value)}
              required
            />
          </div>
          <div className={classes.formControl}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password..."
              value={userPassword}
              onChange={(event) => setUserPassword(event.target.value)}
              required
            />
          </div>
          <div className={classes.formControl}>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirm Password..."
              value={userConfirmPassword}
              onChange={(event) => setUserConfirmPassword(event.target.value)}
              required
            />
          </div>
          <div className={classes.btn}>
            <button
              disabled={loading}
              type="submit"
              className={`${classes.submitButton} ${styles.registerBtn}`}
            >
              {loading ? "Loading..." : "Register"}
            </button>
          </div>
        </form>
      </article>
      <div className={styles.formFooter}>
        <p>
          Already have account? <Link href="/auth/login">Login</Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
