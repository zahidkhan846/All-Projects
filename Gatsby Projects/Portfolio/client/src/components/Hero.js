import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Image from "gatsby-image";
import { Link } from "gatsby";
import SocialLinks from "../utility/constants/socialLinks";

const Hero = () => {
  const data = useStaticQuery(graphql`
    {
      img: file(relativePath: { eq: "hero-img.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      pdf: file(name: { eq: "resume" }) {
        extension
        publicURL
        name
      }
    }
  `);

  const {
    img: {
      childImageSharp: { fluid },
    },
  } = data;

  return (
    <header className="hero">
      <div className="section-center hero-center">
        <article className="hero-info">
          <div>
            <div className="underline"></div>
            <h1>Hi, i'm Zahid.</h1>
            <h3>I build & design User Interfaces</h3>
            <Link to="/contact" className="btn">
              Contact Me
            </Link>
            <span style={{ marginLeft: "1.5rem" }}>
              <a
                href={data.pdf.publicURL}
                className="btn"
                target="_blank"
                rel="noreferrer"
              >
                My Resume
              </a>
            </span>
            <SocialLinks />
          </div>
        </article>
        <Image fluid={fluid} className="hero-img" />
      </div>
    </header>
  );
};

export default Hero;
