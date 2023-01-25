import { useState } from "react";
import styles from "./Auth.module.css";
import classes from "../../styles/form.module.css";
import Link from "next/link";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";

function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email: userEmail,
      password: userPassword,
    });
    setLoading(false);
    if (res.error === null) {
      router.push("/posts");
    }
  };

  return (
    <section>
      <div className={classes.heading}>
        <h1 className="text-center featured font-big">Login</h1>
        <div className="underline"></div>
      </div>
      <article className={classes.form}>
        <form onSubmit={handleSubmit}>
          <h2 className={styles.loginHeading}>Credentials...</h2>
          <div className={classes.formControl}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="user@domain.com"
              value={userEmail}
              onChange={(event) => setUserEmail(event.target.value)}
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
            />
          </div>
          <div className={classes.btn}>
            <button
              disabled={loading}
              type="submit"
              className={`${classes.submitButton} ${styles.loginBtn}`}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
        </form>
      </article>
      <div className={styles.formFooter}>
        <p>
          Don't have account? <Link href="/auth/register">Register Here</Link>
        </p>
        <p>
          Forgot your password?{" "}
          <Link href="/auth/change-password">Change Password</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
