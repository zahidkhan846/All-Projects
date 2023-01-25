import React, { useContext, useEffect, useState } from "react";
import { Post } from "./Post";
import axios from "axios";
import Pagination from "./Pagination";
import { AuthContext } from "../context/AuthContext";
import { Redirect } from "react-router-dom";
import socketIOClient from "socket.io-client";

function Posts() {
  const { userAuth } = useContext(AuthContext);

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

  const addPost = (post) => {
    setPosts((prevPosts) => {
      const updatedPosts = [...prevPosts];
      updatedPosts.unshift(post);
      return updatedPosts;
    });
  };

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:8080/feed/posts");
    try {
      setPosts(res.data.posts);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (userAuth) {
      fetchPosts();
      const socket = socketIOClient("http://localhost:8080", {
        transports: ["websocket"],
      });
      socket.on("posts", (data) => {
        if (data.action === "create") {
          addPost(data.post);
        }
      });
    }
  }, []);

  if (loading) {
    return (
      <div className="post-card">
        <h1 className="text-3xl mb2">Loading...</h1>
      </div>
    );
  }

  if (!userAuth && !loading) {
    return <Redirect to="/" />;
  }

  return (
    <div className="w-full h-auto">
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
