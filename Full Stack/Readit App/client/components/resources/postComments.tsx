import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { Comment } from "../../utils/typeDefs";
import EachComment from "./eachComment";

function PostComment() {
  const router = useRouter();

  const { identifier, slug } = router.query;

  const { data: comments, error } = useSWR<Comment[]>(
    identifier && slug
      ? `/post/get-post/${identifier}/${slug}/post-comment`
      : null
  );

  if (!comments) {
    return (
      <p className="flex items-center justify-center h-screen text-3xl font-bold text-gray-400">
        Loading...
      </p>
    );
  }

  if (error) {
    router.push("/auth/login");
  }

  return (
    <div className="mt-4">
      <p className="pb-2 text-xs font-bold text-gray-500">
        SORT BY{"  "}
        <span className="text-sm font-bold text-green-500">CREATED DATE</span>
      </p>
      <div>
        {comments.map((comment) => (
          <EachComment comment={comment} key={comment.identifier} />
        ))}
      </div>
    </div>
  );
}

export default PostComment;
