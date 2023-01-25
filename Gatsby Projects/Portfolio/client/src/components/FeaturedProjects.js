import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Title from "./Title";
import { Link } from "gatsby";
import Project from "./Project";

const FeaturedProjects = () => {
  const data = useStaticQuery(graphql`
    {
      allStrapiProjects(filter: { featured: { eq: true } }) {
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
    allStrapiProjects: { nodes: projects },
  } = data;

  return (
    <section className="section projects">
      <Title title="Featured Projects" />
      <div className="section-center projects-center">
        {projects.map((project) => (
          <Project key={project.id} {...project} />
        ))}
        <Link to="/projects" className="btn center-btn">
          Projects
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProjects;
