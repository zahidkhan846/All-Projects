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

    const graphqlQuery = {
      query: `
        {
          post(id: "${id}") {
            _id
            title
            content
            imageUrl
            author {
              name
            }
            createdAt
          }
        }
      `,
    };

    fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(graphqlQuery),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        if (resData.errors) {
          throw new Error("Fetch post failed!");
        }
        console.log(resData);
        setPost(resData.data.post);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
        setLoading(false);
      });
    setLoading(false);
  }, [id, token]);

  const { _id, author, content, createdAt, imageUrl, title } = post;

  const handleDeletePost = (postId) => {
    const graphqlDeleteQuery = {
      query: `
        mutation {
          deletePost(id: "${postId}")
        }
      `,
    };

    fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(graphqlDeleteQuery),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        if (resData.errors) {
          throw new Error("Failed to Delete post.");
        }
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
            src={`http://localhost:4000/${imageUrl}`}
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
          <span>Posted by {author && author.name}</span>
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
