import React from "react";
import Layout from "../components/Layout";
import { Projects } from "../components/Projects";
import Seo from "../components/SEO";

const AllProjects = () => {
  return (
    <Layout>
      <Seo title="My Projects" description="About Projects" />
      <section className="projects-page">
        <Projects />
      </section>
    </Layout>
  );
};
export default AllProjects;
