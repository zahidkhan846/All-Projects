import styles from "../styles/event.module.css";
import Link from "next/link";

export function Event({
  title,
  image,
  description,
  location,
  date,
  id,
  linkText,
  eventLink,
}) {
  const newDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className={styles.cardContainer}>
      <h1>{title}</h1>
      <img src={image} alt={title} />
      <p className={styles.desc}>{description}</p>
      <p className={styles.loc}>
        <span>Location: </span>
        {location}
      </p>
      <p className={styles.date}>
        <span>Event Date: </span>
        {newDate}
      </p>
      <div className={styles.btnContainer}>
        <Link href={eventLink ? eventLink : `/events/${id}`}>
          {linkText ? linkText : "View Page"}
        </Link>
      </div>
    </div>
  );
}
