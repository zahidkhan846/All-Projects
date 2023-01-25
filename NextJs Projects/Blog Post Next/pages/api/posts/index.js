import { posts } from "../../../data";

const fetchAllPost = (req, res) => {
  res.status(200).json(posts);
};

export default fetchAllPost;
