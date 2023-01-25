import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Blog from "./Blog";
import Title from "../Title";

const Blogs = () => {
  const data = useStaticQuery(graphql`
    {
      allStrapiBlogs(sort: { fields: date, order: DESC }) {
        nodes {
          slug
          content
          desc
          date(formatString: "MMMM Do, YYYY")
          id
          title
          category
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
    allStrapiBlogs: { nodes: blogs },
  } = data;

  return (
    <section className="section">
      <Title title="Blogs" />
      <div className="section-center blogs-center">
        {blogs.map((blog) => (
          <Blog key={blog.id} {...blog} />
        ))}
      </div>
    </section>
  );
};

export default Blogs;
