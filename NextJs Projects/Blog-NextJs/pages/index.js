import Head from "next/head";
import { Fragment } from "react";
import safeJsonStringify from "safe-json-stringify";
import Contact from "../components/Contact/Contact";
import FeaturedPosts from "../components/FeaturedPosts/FeaturedPosts";
import Hero from "../components/Hero/Hero";
import { dbConnect, getDocuments } from "../utils/database";

function HomePage(props) {
  const { posts } = props;

  const featuredPosts = posts.filter((post) => post.isFeatured);

  return (
    <Fragment>
      <Head>
        <title>Home | Next Blog</title>
        <meta
          name="description"
          content="blog about programming and development."
        />
      </Head>
      <Hero />
      <FeaturedPosts featuredPosts={featuredPosts} />
      <Contact />
    </Fragment>
  );
}

export async function getStaticProps() {
  const client = await dbConnect();

  const docs = await getDocuments(client, "posts", { _id: -1 });

  const jsonDoc = safeJsonStringify(docs);

  const posts = JSON.parse(jsonDoc);

  if (!docs) {
    return {
      notFound: true,
    };
  }

  return {
    props: { posts },
  };
}
export default HomePage;
