import Link from "next/link";
import React from "react";

function UserComment({ comment }) {
  return (
    <div className="flex gap-4 p-2 mb-2 bg-white rounded">
      <div>
        <i className="text-blue-500 fa fa-comments" aria-hidden="true"></i>
      </div>
      <div>
        <p>
          {comment.body}{" "}
          <span className="text-xs italic text-red-500">
            by {comment.username}
          </span>
        </p>

        <p className="text-xs italic text-gray-400">commented on</p>
        <Link href={comment.post.url}>
          <a className="text-blue-500">{comment.post.title}</a>
        </Link>
        <Link href={`/r/${comment.post.subName}`}>
          <a className="ml-4 text-sm font-bold text-green-500">{`/r/${comment.post.subName}`}</a>
        </Link>
      </div>
    </div>
  );
}

export default UserComment;
