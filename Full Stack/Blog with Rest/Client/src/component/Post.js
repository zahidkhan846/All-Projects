import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

export const Post = ({ posts }) => {
  if (posts.length === 0) {
    return (
      <div className="post-card">
        <h1 className="text-3xl mb2">No Post availble...</h1>
        <p>
          Create new Post{" "}
          <Link className="text-red-500" to="add-post">
            Link
          </Link>
        </p>
      </div>
    );
  }
  return (
    <div>
      {Array.isArray(posts) &&
        posts.map((post) => {
          const { _id, author, content, createdAt, imageUrl, title } = post;
          return (
            <div
              key={_id}
              className="max-w-sm rounded overflow-hidden shadow-lg m-auto mb-5"
            >
              <Link to={`post/${_id}`}>
                <img
                  src={`http://localhost:8080/${imageUrl}`}
                  alt={title}
                  className="shadow"
                />
                <div className="px-6 py-4">
                  <ul>
                    <li className="font-bold text-green-500 text-xl mb-2">
                      {title}
                    </li>
                    <li>{content}</li>
                  </ul>
                  <div className="text-m mt-2 text-red-300">
                    <p className="text-green-700">
                      Posted by {author.userName}
                    </p>
                    <p>Created Date: {moment(createdAt).format("MMM Do YY")}</p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
    </div>
  );
};
