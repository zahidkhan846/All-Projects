import Image from "next/image";
import Link from "next/link";
import styles from "./Card.module.css";

function Card({ project }) {
  const {
    title,
    description,
    completedOn,
    tags,
    slug,
    websiteLink,
    githubLink,
    category,
    categoryIcon: {
      fields: {
        file: { url: iconUrl },
      },
    },
  } = project.fields;

  return (
    <Link href={`/projects/${slug}`}>
      <article className={styles.card}>
        <header className={styles.cardHeader}>
          <p>{project.completedOn}</p>
          <h2>{title}</h2>
        </header>
        <div className={styles.category}>
          <a href="#!" className={styles.avatar}>
            <Image
              src={`https:${iconUrl}`}
              alt={project.title}
              width={50}
              height={50}
            />
          </a>
          <svg className={styles.halfCircle} viewBox="0 0 106 57">
            <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
          </svg>
          <div className={styles.name}>
            <div className={styles.namePrefix}>Category</div>
            {category}
          </div>
        </div>
        <div className={styles.tags}>
          {tags.map((tag, index) => (
            <Link href="/" key={index}>
              {tag}
            </Link>
          ))}
        </div>
      </article>
    </Link>
  );
}

export default Card;
