import { posts } from "../../../data";

function fetchSinglePost(req, res) {
  const id = req.query.id;

  const post = posts.find((post) => post.id === +id);

  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({
      message: "Post not found",
    });
  }
}

export default fetchSinglePost;
