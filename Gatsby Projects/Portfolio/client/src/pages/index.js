import React from "react";
import FeaturedBlogs from "../components/Blogs/FeaturedBlogs";
import FeaturedProjects from "../components/FeaturedProjects";
import Hero from "../components/Hero";
import Layout from "../components/Layout";
import Services from "../components/Services";
import Seo from "../components/SEO";

function Home() {
  return (
    <Layout>
      <Seo title="Home" description="This is the home page." />
      <Hero />
      <Services />
      <FeaturedProjects />
      <FeaturedBlogs />
    </Layout>
  );
}

export default Home;
