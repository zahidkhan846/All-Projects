import React from "react";
import Image from "gatsby-image";
import { CgWebsite } from "react-icons/cg";
import { FaGithub } from "react-icons/fa";

export default function Project(props) {
  const { description, title, github, url, image, project_itm } = props;

  return (
    <article className="project">
      <Image fluid={image.childImageSharp.fluid} className="project-img" />
      <div className="project-info">
        <h3>{title}</h3>
        <p className="project-desc">{description}</p>
        <div className="project-stack">
          <p style={{ color: "gray" }}>Technologies used in this project</p>
          {project_itm.map((eachItem) => (
            <span key={eachItem.id}>{eachItem.title}</span>
          ))}
        </div>
        <div className="project-links">
          <a href={github} target="_blank" rel="noreferrer">
            <FaGithub className="project-icon" />
          </a>
          <a href={url} target="_blank" rel="noreferrer">
            <CgWebsite className="project-icon" />
          </a>
        </div>
      </div>
    </article>
  );
}
