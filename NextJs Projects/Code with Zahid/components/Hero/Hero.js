import Image from "next/image";
import Link from "next/link";
import { SocialLinks } from "../../utils/socialLinks";
import styles from "./Hero.module.css";

function Hero() {
  return (
    <section className={styles.hero}>
      <article className={styles.content}>
        <div className={styles.imgContainer}>
          <Image src="/assets/me.jpg" width={250} height={250} alt="Zahid" />
        </div>
        <h1>Hi, I'm Zahid.</h1>
        <h3>I am a full-stack web developer.</h3>
        <p>
          I work with frontend and backend frameworks like React, ExpressJs, and
          NextJs.
        </p>
        <SocialLinks />
        <div className={styles.aboutButton}>
          <Link href="/about">Know More</Link>
        </div>
      </article>
    </section>
  );
}

export default Hero;
