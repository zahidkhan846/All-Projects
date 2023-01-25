import Link from "next/link";

export default function Home({ posts }) {
  return (
    <div className="container">
      <h1>Web News</h1>
      <p className="main-paragraph">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore eaque,
        officia tempore nisi illum eum laboriosam magnam omnis modi enim,
        corrupti iste ipsa reiciendis expedita inventore sit voluptate vero,
        minus eos veniam hic? Quibusdam impedit maxime architecto velit
        voluptatem necessitatibus.
      </p>

      <div className="posts">
        {posts.map((post) => {
          return (
            <Link key={post.id} href="/post/[id]" as={`/post/${post.id}`}>
              <div className="card">
                <h1>{post.title}</h1>
                <p>{post.body}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(`http://localhost:3000/api/posts`);
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
};

// export const getStaticProps = async () => {
//   const res = await fetch(
//     `https://jsonplaceholder.typicode.com/posts?_limit=6`
//   );

//   const posts = await res.json();

//   return {
//     props: {
//       posts,
//     },
//   };
// };
