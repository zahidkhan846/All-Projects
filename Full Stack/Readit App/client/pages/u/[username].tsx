import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import PostItem from "../../components/resources/post";
import UserCard from "../../components/resources/userCard";
import UserComment from "../../components/resources/userComment";
import { Comment, Post } from "../../utils/typeDefs";

function UserData() {
  const router = useRouter();

  const { username } = router.query;

  const { data, error, revalidate } = useSWR<any>(
    username ? `/user/${username}` : null
  );

  if (!data) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.log(error);
  }

  console.log(data);

  return (
    <div className="container py-8 mt-12">
      <div className="flex gap-4">
        <div className="flex-1">
          {data.submissitions.map((submissition: any) => {
            if (submissition.type === "Post") {
              const post: Post = submissition;
              return <PostItem key={post.identifier} post={post} />;
            } else {
              const comment: Comment = submissition;
              return <UserComment comment={comment} key={comment.identifier} />;
            }
          })}
        </div>
        <div>
          <UserCard user={data.user} revalidate={revalidate} />
        </div>
      </div>
    </div>
  );
}

export default UserData;
