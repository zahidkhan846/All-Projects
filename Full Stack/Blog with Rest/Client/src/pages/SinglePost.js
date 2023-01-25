import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import moment from "moment";
import { AuthContext } from "../context/AuthContext";

function SinglePost() {
  const { token } = useContext(AuthContext);

  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8080/feed/post/" + id)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch post.");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        setPost(resData.post);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
        setLoading(false);
      });
    setLoading(false);
  }, [id]);

  const { _id, author, content, createdAt, imageUrl, title, updatedAt } = post;

  const handleDeletePost = (postId) => {
    fetch("http://localhost:8080/feed/post/" + postId, {
      headers: { Authorization: `Bearer ${token}` },
      method: "DELETE",
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to Delete post.");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  };

  if (loading) {
    return (
      <div className="post-card">
        <h1 className="text-3xl mb2">Loading...</h1>
      </div>
    );
  }

  return (
    <Fragment>
      <h1 className="text-5xl m-4 text-center">Post Description</h1>
      <div className="post-card">
        {imageUrl && (
          <img
            src={`http://localhost:8080/${imageUrl}`}
            alt={title}
            className="h-full rounded mb-2"
          />
        )}
        {error && <h2 className="text-1xl text-red-500 mb-2">{error}</h2>}
        <div className="post-content">
          <h2 className="text-3xl text-red-500 mb-2">{title}</h2>
          <p className="mb-2">{content}</p>
          <span>
            Posted on {moment(createdAt).format("MMMM Do YYYY, h:mm:ss a")}
          </span>
          <span>Posted by {author && author.userName}</span>
          <p className="mb-2">POST ID: {_id}</p>
          <span>Last Update {moment(updatedAt).fromNow()}</span>
        </div>
        <div className="flex:infile-felex justify-center mt-4">
          <Link
            to={`/edit-post/${_id}`}
            post={post}
            className="py-2 px-4 border border-transparent shadow-sm text-m font-medium rounded-md text-white bg-green-500 hover:bg-green-800"
          >
            Edit Post
          </Link>
          <button
            onClick={() => handleDeletePost(_id)}
            className="py-1.5 ml-2 px-4 border border-transparent shadow-sm text-m font-medium rounded-md text-white bg-red-500 hover:bg-red-800"
          >
            Delete Post
          </button>
        </div>
      </div>
    </Fragment>
  );
}

export default SinglePost;
