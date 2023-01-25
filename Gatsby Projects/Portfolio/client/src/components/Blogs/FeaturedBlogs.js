import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Title from "../Title";
import Blog from "./Blog";
import { Link } from "gatsby";

const FeaturedBlogs = () => {
  const data = useStaticQuery(graphql`
    {
      allStrapiBlogs(sort: { fields: date, order: DESC }, limit: 3) {
        nodes {
          slug
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
      <Title title="Latest Articals" />
      <div className="section-center blogs-center">
        {blogs.map((blog) => (
          <Blog key={blog.id} {...blog} />
        ))}
      </div>
      <Link to="/blogs" className="btn center-btn">
        Go to Blogs
      </Link>
    </section>
  );
};

export default FeaturedBlogs;
