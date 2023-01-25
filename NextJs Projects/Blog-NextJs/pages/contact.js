import Head from "next/head";
import { Fragment, useState } from "react";
import { useAlert } from "../store/AlertContext";
import classes from "../styles/form.module.css";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const { showAlert } = useAlert();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      return showAlert({ type: "error", desc: "Please provide valid input." });
    }

    showAlert({ type: "loading", desc: "Sending request to the server." });

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        message: message,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      showAlert({
        type: "error",
        desc: data.message || "Something went wrong.",
      });
    } else {
      showAlert({ type: "success", desc: "Successfully sent." });
    }

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <Fragment>
      <Head>
        <title>Contact Me</title>
        <meta name="description" content="contact page" />
      </Head>
      <section>
        <div className={classes.heading}>
          <h1 className="text-center featured font-big">Contact Me</h1>
          <div className="underline"></div>
        </div>
        <article className={classes.form}>
          <form onSubmit={handleSubmit}>
            <h2>Say Hello...</h2>
            <div className={classes.formControl}>
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your full name..."
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className={classes.formControl}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email..."
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className={classes.formControl}>
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                id="message"
                rows="5"
                placeholder="Type your message..."
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              ></textarea>
            </div>
            <div className={classes.btn}>
              <button type="submit" className={classes.submitButton}>
                Send Message
              </button>
            </div>
          </form>
        </article>
      </section>
    </Fragment>
  );
}

export default Contact;
