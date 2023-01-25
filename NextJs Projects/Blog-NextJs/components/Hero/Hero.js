import Image from "next/image";
import Link from "next/link";
import classes from "./Hero.module.css";

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.content}>
        <Image src="/images/me.jpg" width={250} height={250} alt="zahid" />
        <h1>Hi, I'm Zahid</h1>
        <p>
          I blog about web development, especially frontend frameworks like
          React, Anguler and backend frameworks like ExpressJS.
        </p>
        <Link href="/about-me">Know More</Link>
      </div>
    </section>
  );
}

export default Hero;
