import React from "react";
import Seo from "../components/SEO";
import Layout from "../components/Layout";
import Blogs from "./../components/Blogs/Blogs";

export default function AllBlogs() {
  return (
    <Layout>
      <Seo title="Blog" description="Blog Page" />
      <section className="blog-page">
        <Blogs />
      </section>
    </Layout>
  );
}
