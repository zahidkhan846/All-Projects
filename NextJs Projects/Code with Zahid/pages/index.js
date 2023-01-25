import { Fragment } from "react";
import Hero from "../components/Hero/Hero";
import Specialize from "../components/Specialize/Specialize";
import Featured from "../components/Projects/Featured";
import Meta from "../components/Meta/Meta";
import { contentful } from "../utils/contentful";

function HomePage({ featured }) {
  return (
    <Fragment>
      <Meta
        title="Code with Zahid | Home"
        description="Hi! My name is Zahid Khan, I am a full stack developer, I spesialize in React, Anguler, Vue, NodeJs, ExpressJs, HTML, CSS, Javascript."
      />
      <Hero />
      <Specialize />
      <Featured featured={featured} />
    </Fragment>
  );
}

export const getStaticProps = async () => {
  const client = contentful();
  const res = await client.getEntries({ content_type: "project" });

  return {
    props: {
      featured: res.items.filter((project) => project.fields.isFeatured),
      revalidate: 1,
    },
  };
};

export default HomePage;
