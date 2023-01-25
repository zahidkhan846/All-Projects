import React, { useContext, useEffect, useState } from "react";
import { Post } from "./Post";
import Pagination from "./Pagination";
import { AuthContext } from "../context/AuthContext";

function Posts() {
  const { token } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const onBtnClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const fetchPosts = async () => {
    const graphqlQuery = {
      query: `
        {
          posts {
            posts {
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
        if (resData.errors) {
          throw new Error("Unable to fetch posts!");
        }
        setPosts(resData.data.posts.posts);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="post-card">
        <h1 className="text-3xl mb2">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="w-full h-screen">
      <h1 className="text-5xl m-4 text-center text-green-700">All Posts</h1>
      {error && <p className="text-red-500">{error}</p>}
      <Post posts={currentPosts} />
      <Pagination
        elementsPerPage={postsPerPage}
        totalElements={posts.length}
        onBtnClick={onBtnClick}
      />
    </div>
  );
}

export default Posts;
