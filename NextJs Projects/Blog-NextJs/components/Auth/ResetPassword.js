import Link from "next/link";
import { useState } from "react";
import classes from "../../styles/form.module.css";
import styles from "../../components/Auth/Auth.module.css";

function ResetPassword() {
  const [userEmail, setUserEmail] = useState("");

  const handleSubmit = () => {};
  return (
    <section>
      <div className={classes.heading}>
        <h1 className="text-center featured font-big">Login</h1>
        <div className="underline"></div>
      </div>
      <article className={classes.form}>
        <form onSubmit={handleSubmit}>
          <h2 className={styles.changeHeading}>Your Email...</h2>
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
          <div className={classes.btn}>
            <button
              type="submit"
              className={`${classes.submitButton} ${styles.changeBtn}`}
            >
              Send Message
            </button>
          </div>
        </form>
      </article>
      <div className={styles.formFooter}>
        <p>
          Don't have account? <Link href="/auth/register">Register Here</Link>
        </p>
        <p>
          Already have an account? <Link href="/auth/login">Sign In</Link>
        </p>
      </div>
    </section>
  );
}

export default ResetPassword;
