import React, { FC } from "react";
import useSWR from "swr";
import { Post } from "../../utils/typeDefs";
import FeaturedItem from "./featuredItem";

const Featured: FC = () => {
  const { data: posts, error } = useSWR<Post[]>("/post/latest-posts");

  if (!posts) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.log(error);
  }

  return (
    <div className="container pt-4 mt-12">
      <h1 className="mb-2 text-sm font-bold">Latest Posts</h1>
      <div className="grid items-center justify-between w-full grid-cols-4 gap-6">
        {posts.map((post) => (
          <FeaturedItem key={post.identifier} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Featured;
