import Link from "next/link";
import styles from "./SimpleCard.module.css";

function SimpleCard({ specialization }) {
  return (
    <div className={styles.skillCard}>
      {specialization.headIcon}
      <h2>{specialization.title}</h2>
      <p>{specialization.description}</p>
      <p className="heading-small">{specialization.spHead}</p>
      <ul>
        {specialization.specializationIcons.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
      <Link href="/about">Read More</Link>
    </div>
  );
}

export default SimpleCard;
