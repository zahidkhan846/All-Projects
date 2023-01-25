import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Image from "gatsby-image";
import Title from "../components/Title";
import { skills } from "../utility/constants/services";
import AboutIcons from "./../components/AboutIcons";
import { FaRegFilePdf } from "react-icons/fa";
import Seo from "../components/SEO";

const About = ({
  data: {
    about: { nodes },
    pdf,
  },
}) => {
  const { abt, title, image } = nodes[0];

  return (
    <Layout>
      <Seo title="About" description="About Zahid" />
      <section className="about-page">
        <div className="section-center about-center">
          <Image fluid={image.childImageSharp.fluid} className="about-img" />
          <article className="about-text">
            <Title title={title} />
            <p>{abt}</p>
            <div className="my-resume">
              <a
                className="resume-btn"
                href={pdf.publicURL}
                target="_blank"
                rel="noreferrer"
              >
                <FaRegFilePdf className="resume-icon"></FaRegFilePdf>Resume
              </a>
            </div>
            <div className="about-icons">
              {skills.map((skill, index) => (
                <AboutIcons key={index} {...skill} />
              ))}
            </div>
          </article>
        </div>
      </section>
    </Layout>
  );
};
export const query = graphql`
  {
    pdf: file(name: { eq: "resume" }) {
      publicURL
      name
      extension
    }
    about: allStrapiAbout {
      nodes {
        abt
        title
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
`;

export default About;
