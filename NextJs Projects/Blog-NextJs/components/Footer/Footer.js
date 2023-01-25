import { Facebook, GitHub, LinkedIn, Twitter } from "@material-ui/icons";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAlert } from "../../store/AlertContext";
import classes from "./Footer.module.css";

function Footer() {
  const { showAlert } = useAlert();

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });

    const data = await res.json();

    if (!res.ok) {
      showAlert({
        type: "error",
        desc: data.message || "Something went wrong!",
      });
    } else {
      showAlert({
        type: "success",
        desc: data.message || "Successfully subscribed!",
      });
      setEmail("");
    }
  };

  return (
    <section className={classes.sectionFooter}>
      <div className="container">
        <footer className={classes.footerContainer}>
          <div className={classes.footerLogo}>
            <Link href="/">
              <a>
                <Image
                  src="/images/logo.png"
                  alt="logo"
                  height={60}
                  width={60}
                />
              </a>
            </Link>
            <p>
              &copy; {new Date().getFullYear().toString()}{" "}
              <Link passHref={true} href="https://www.codewithzahid.com">
                Code with Zahid
              </Link>
            </p>
          </div>
          <div className={classes.subscription}>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Type Your Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                placeholder="user@domain.com"
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
          <div className={classes.socialLinks}>
            <ul>
              <li>
                <Link passHref={true} href="https://www.facebook.com">
                  <Facebook className={classes.icon} />
                </Link>
              </li>
              <li>
                <Link passHref={true} href="https://www.twitter.com">
                  <Twitter className={classes.icon} />
                </Link>
              </li>
              <li>
                <Link passHref={true} href="https://www.linkedin.com">
                  <LinkedIn className={classes.icon} />
                </Link>
              </li>
              <li>
                <Link passHref={true} href="https://www.github.com">
                  <GitHub className={classes.icon} />
                </Link>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
}

export default Footer;
