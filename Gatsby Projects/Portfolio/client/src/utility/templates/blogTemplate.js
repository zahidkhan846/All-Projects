import Layout from "../../components/Layout";
import ReactMark from "react-markdown";
import { Link } from "gatsby";
import { IoMdArrowBack } from "react-icons/io";
import Image from "gatsby-image";
import React from "react";
import { graphql } from "gatsby";
import Seo from "../../components/SEO";

const BlogDetail = ({
  data: {
    strapiBlogs: {
      content,
      title,
      date,
      desc,
      image: {
        childImageSharp: { fluid },
      },
    },
  },
}) => (
  <Layout>
    <Seo title={title} description={desc} />
    <section className="blog-template">
      <h2>{title}</h2>
      <div className="underline"></div>
      <div className="section-center">
        <h4>{date}</h4>
        <Image fluid={fluid} className="blog-img" />
        <article className="blog-content">
          <ReactMark source={content} />
        </article>
        <Link to="/blogs" className="btn center-btn">
          <IoMdArrowBack className="social-icon"></IoMdArrowBack> Go to Blogs
        </Link>
      </div>
    </section>
  </Layout>
);

export const query = graphql`
  query getSingleBlog($slug: String) {
    strapiBlogs(slug: { eq: $slug }) {
      content
      image {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      title
      desc
      date(formatString: "MMMM Do, YYYY")
    }
  }
`;

export default BlogDetail;
