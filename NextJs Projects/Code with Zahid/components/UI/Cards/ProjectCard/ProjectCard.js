import styles from "./ProjectCard.module.css";
import Image from "next/image";
import Link from "next/link";
import { CgDetailsMore, CgWebsite } from "react-icons/cg";
import { BiChevronsRight } from "react-icons/bi";
import { AiFillGithub } from "react-icons/ai";
import moment from "moment";

function ProjectCard({ project }) {
  const {
    title,
    description,
    completedOn,
    tags,
    slug,
    websiteLink,
    githubLink,
    projectImage: {
      fields: {
        file: { url: imageUrl },
      },
    },
    categoryIcon: {
      fields: {
        file: { url: iconUrl },
      },
    },
  } = project.fields;

  return (
    <article className={styles.projectCard}>
      <div className={styles.mainImage}>
        <Image
          src={`https:${imageUrl}`}
          height={240}
          width={400}
          alt={project.title}
        />
      </div>
      <div className={styles.categoryImage}>
        <Image
          src={`https:${iconUrl}`}
          height={50}
          width={50}
          alt={project.title}
        />
      </div>
      <div className={styles.textArea}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.desc}>{description}</p>
        <p className={styles.date}>
          <span>Completed on</span> {moment(completedOn).format("MMMM Do YYYY")}
        </p>
        <ul className={styles.tags}>
          {tags.map((tag, index) => (
            <li key={index}>{tag}</li>
          ))}
        </ul>
      </div>
      <div className={styles.buttons}>
        <div className={styles.cardLink}>
          <a target="_blank" href={githubLink} rel="noopener noreferrer">
            <AiFillGithub className={styles.cardLinkIcon} />
          </a>
          <a target="_blank" href={websiteLink} rel="noopener noreferrer">
            <CgWebsite className={styles.cardLinkIcon} />
          </a>
        </div>
        <div>
          <Link href={`/projects/${slug}`}>
            <a className={styles.viewPageBtn}>
              <span>Read More</span>
              <BiChevronsRight className={styles.vpIcon} />
            </a>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
