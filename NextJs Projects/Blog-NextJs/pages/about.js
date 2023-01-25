import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import classes from "../styles/about.module.css";

function AboutPage() {
  return (
    <Fragment>
      <Head>
        <title>About Me</title>
        <meta name="description" content="about zahid khan" />
      </Head>
      <div className="about-container">
        <div className="py-1">
          <h1 className="text-center font-big featured">About Me</h1>
          <div className="underline"></div>
        </div>
        <section>
          <article className={classes.about}>
            <Image src="/images/me.jpg" alt="about" height={300} width={300} />
            <div className={classes.aboutInfo}>
              <h2>About Me</h2>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Itaque, corporis sit. Facere non aut ipsum veritatis. Molestias
                sunt in aut.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deserunt excepturi quae quasi ducimus libero, optio ab voluptas
                aliquid maiores ipsum voluptatum asperiores in repellat, iste
                laborum dolor blanditiis, quam labore enim eligendi molestias!
                Molestias, amet explicabo quidem maxime tempore deleniti
                excepturi quod enim voluptatem recusandae quaerat eum,
                consequuntur, sequi cupiditate.
              </p>
            </div>
          </article>
          <div className={classes.btn}>
            <Link href="/contact">Contact Me</Link>
          </div>
        </section>
      </div>
    </Fragment>
  );
}

export default AboutPage;
