import Head from "next/head";
import { Fragment } from "react";
import safeJsonStringify from "safe-json-stringify";
import Posts from "../../components/Posts/Posts";
import { dbConnect, getDocuments } from "../../utils/database";

function AllPosts(props) {
  const { posts } = props;

  return (
    <Fragment>
      <Head>
        <title>All Posts</title>
        <meta
          name="description"
          content="a list of all pragramming reated content."
        />
      </Head>
      <Posts posts={posts} />
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

export default AllPosts;
