import Link from "next/link";
import { useRouter } from "next/router";
import Meta from "../../../components/Meta";

function index({ post }) {
  //   const router = useRouter();

  //   const { id } = router.query;

  return (
    <div className="post">
      <Meta title={post.title} />
      <h1>POST {post.id}</h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <br />
      <br />
      <Link href="/">
        <a className="btn">Go Back</a>
      </Link>
    </div>
  );
}

export default index;

// export const getServerSideProps = async (context) => {
//   const res = await fetch(
//     `https://jsonplaceholder.typicode.com/posts/${context.params.id}`
//   );

//   const post = await res.json();

//   return {
//     props: {
//       post,
//     },
//   };
// };

export const getStaticProps = async (context) => {
  const res = await fetch(
    `http://localhost:3000/api/posts/${context.params.id}`
  );

  const post = await res.json();

  return {
    props: {
      post,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:3000/api/posts");

  const posts = await res.json();

  const ids = posts.map((post) => post.id);

  const paths = ids.map((id) => {
    return {
      params: {
        id: id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};
