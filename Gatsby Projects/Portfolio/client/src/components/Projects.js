import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Title from "./Title";
import Project from "./Project";

export const Projects = () => {
  const data = useStaticQuery(graphql`
    {
      allProjects: allStrapiProjects {
        nodes {
          description
          github
          id
          url
          title
          project_itm {
            id
            title
          }
          image {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `);

  const {
    allProjects: { nodes: projects },
  } = data;

  return (
    <section className="section projects">
      <Title title="All Projects" />
      <div className="section-center projects-center">
        {projects.map((project) => (
          <Project key={project.id} {...project} />
        ))}
      </div>
    </section>
  );
};
