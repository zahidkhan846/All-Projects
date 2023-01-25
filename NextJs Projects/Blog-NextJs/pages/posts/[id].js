import Head from "next/head";
import { Fragment } from "react";
import safeJsonStringify from "safe-json-stringify";
import Post from "../../components/Posts/Post/Post";
import { dbConnect, getSingleDocument } from "../../utils/database";

function SinglePost(props) {
  const { post } = props;

  return (
    <Fragment>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.title} />
      </Head>
      <Post post={post} />;
    </Fragment>
  );
}

export const getServerSideProps = async (context) => {
  const { params } = context;

  const { id } = params;

  const client = await dbConnect();

  const doc = await getSingleDocument(client, "posts", id);

  const jsonDoc = safeJsonStringify(doc);

  const post = JSON.parse(jsonDoc);

  if (!doc) {
    return {
      notFound: true,
    };
  }

  return {
    props: { post },
  };
};

export default SinglePost;
