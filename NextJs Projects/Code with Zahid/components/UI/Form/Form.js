import { useState } from "react";
import styles from "./Form.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import Alert from "../Alert/Alert";

function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrors(null);
      setLoading(true);
      const res = await axios.post("/api/contact/", { email, name, message });
      if (res.status === 200) {
        setName("");
        setEmail("");
        setMessage("");
        router.push("/");
      }
      setLoading(false);
    } catch (error) {
      setErrors(error.response.data.errors);
      setLoading(false);
    }
  };

  const handleRemoveErros = () => {
    setErrors(null);
  };

  return (
    <section className={styles.formContainer}>
      {errors && (
        <Alert errors={errors} handleRemoveErros={handleRemoveErros} />
      )}
      <div className={styles.heading}>
        <h1 className="text-center">Contact Me</h1>
        <div className="underline"></div>
      </div>
      <article className={styles.form}>
        <form onSubmit={handleSubmit}>
          <h2>Say Hello...</h2>
          <div className={styles.formControl}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              id="message"
              rows="5"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div className={styles.btn}>
            <button
              disabled={loading}
              type="submit"
              className={
                loading
                  ? `${styles.submitButton} ${styles.disabled}`
                  : styles.submitButton
              }
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </article>
    </section>
  );
}

export default Form;
