import styles from "../../styles/SinglePage.module.css";
import Image from "next/image";
import moment from "moment";
import { FcCheckmark } from "react-icons/fc";
import { Fragment } from "react";
import Meta from "../../components/Meta/Meta";
import { contentful } from "../../utils/contentful";
import { AiFillGithub } from "react-icons/ai";
import { CgWebsite } from "react-icons/cg";
import Skeleton from "../../components/UI/Skeleton/Skeleton";

function ProjectDetail({ project }) {
  if (!project) return <Skeleton />;

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
    <Fragment>
      <Meta title={`${title} | Code with Zahid`} description={description} />
      <section className={styles.singlePageContainer}>
        <div className={styles.header}>
          <h1 className="text-center font-2 py-min">Project Details</h1>
          <div className="underline"></div>
        </div>
        <div className={styles.singlePage}>
          <div className={styles.image}>
            <Image
              src={`https:${imageUrl}`}
              alt="title"
              width={900}
              height={500}
            />
          </div>
          <div className={styles.textArea}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.content}>{description}</p>
            <div className={styles.tags}>
              <span className={styles.tagHeading}>Technologies used</span>
              <ul>
                {tags.map((tag, index) => (
                  <li key={index}>
                    <FcCheckmark />
                    <span>{tag}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className={styles.date}>
              Completed on{" "}
              <span>{moment(completedOn).format("MMMM Do YYYY")}</span>
            </p>
          </div>
        </div>
        <div className={styles.projectSocialLinks}>
          <ul>
            <li>
              <a target="_blank" href={githubLink} rel="noopener noreferrer">
                <AiFillGithub className={styles.linkIcon} />{" "}
                <span>Souce Code</span>
              </a>
            </li>
            <li>
              <a target="_blank" href={websiteLink} rel="noopener noreferrer">
                <CgWebsite className={styles.linkIcon} />{" "}
                <span>Visit Website</span>
              </a>
            </li>
          </ul>
        </div>
      </section>
    </Fragment>
  );
}

const client = contentful();

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: "project",
  });

  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const { params } = context;

  const { items } = await client.getEntries({
    content_type: "project",
    "fields.slug": params.slug,
  });

  if (!items.length) {
    return {
      redirect: { destination: "/", permanent: false },
    };
  }

  return {
    props: { project: items[0] },
    revalidate: 1,
  };
};

export default ProjectDetail;
