import { Fragment } from "react";
import Meta from "../../components/Meta/Meta";
import Projects from "../../components/Projects/Projects";
import { contentful } from "../../utils/contentful";

function ProjectsPage({ allProjects }) {
  return (
    <Fragment>
      <Meta
        title="Code with Zahid | Projects"
        description="This page contain all projects created by Zahid Khan."
      />{" "}
      <Projects allProjects={allProjects} />
    </Fragment>
  );
}

export const getStaticProps = async () => {
  const client = contentful();

  const res = await client.getEntries({ content_type: "project" });

  return {
    props: {
      allProjects: res.items,
    },
    revalidate: 1,
  };
};

export default ProjectsPage;
