import Image from "next/image";
import Link from "next/link";
import classes from "./Contact.module.css";

function Contact() {
  return (
    <div className="contact-container">
      <div className="py-1">
        <h1 className="text-center featured">Contact</h1>
        <div className="underline"></div>
      </div>
      <section className={classes.contactContainer}>
        <article className={classes.contact}>
          <Image
            src="/images/hero.jpg"
            alt="contact"
            height={500}
            width={700}
          />
          <div className={classes.contactInfo}>
            <h2>Contact Me</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque,
              corporis sit. Facere non aut ipsum veritatis. Molestias sunt in
              aut.
            </p>
            <div>
              <Link href="/contact">Reach Out</Link>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}

export default Contact;
