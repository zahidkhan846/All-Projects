import moment from "moment";
import Link from "next/link";
import React, { Fragment } from "react";
import { axiosConnect } from "../../config/axios";
import { Post } from "../../utils/typeDefs";
import { useAuth } from "../../context/auth";
import { useRouter } from "next/router";
import FooterButtons from "./footerButtons";
import VoteButtons from "./VoteButtons";

interface SinglePost {
  post: Post;
  revalidate?: Function;
}

const PostItem = ({ post, revalidate }: SinglePost) => {
  const {
    username,
    body,
    createdAt,
    identifier,
    subName,
    url,
    title,
    voteScore,
    commentCount,
    slug,
    userVote,
    sub,
  } = post;

  const { authenticated } = useAuth();

  const router = useRouter();

  const vote = async (value: number) => {
    if (!authenticated) {
      router.push("/auth/login");
    }

    if (value === userVote) {
      value = 0;
    }
    try {
      await axiosConnect.post("/misc/create-vote", {
        identifier,
        slug,
        value,
      });
      revalidate();
    } catch (error) {
      console.log(error);
    }
  };

  const isPathSub = router.pathname === "r/[sub]";

  return (
    <div className="flex mb-4 bg-white rounded" id={identifier}>
      <div className="flex flex-col w-10 pt-4 text-center bg-gray-100 rounded-l place-items-center">
        <VoteButtons voteScore={voteScore} vote={vote} userVote={userVote} />
      </div>
      <div className="w-full pt-2 pl-2 pr-2">
        <div className="flex items-center">
          {!isPathSub && sub && (
            <Fragment>
              <Link href={`/r/${subName}`}>
                <img
                  className="w-6 h-6 mr-1 rounded-full"
                  src={sub?.imageUrl}
                />
              </Link>
              <Link href={`/r/${subName}`}>
                <a className="mr-1 text-xs font-bold hover:underline">
                  {`/r/${subName}`}{" "}
                  <span className="text-xs text-gray-500">.</span>
                </a>
              </Link>
            </Fragment>
          )}
          <p className="text-xs text-gray-500">
            Posted by{" "}
            <Link href={`/u/${username}`}>
              <a className="hover:underline">{`/u/${username}`}</a>
            </Link>
          </p>
          <Link href={url}>
            <a className="ml-1 text-xs text-gray-500">
              <span className="cursor-default">Posted on</span>{" "}
              <span className="hover:underline">
                {moment(createdAt).startOf("hour").fromNow()}
              </span>
            </a>
          </Link>
        </div>
        <Link href={url}>
          <a className="my-1 text-lg font-medium">{title} </a>
        </Link>
        {body && <p className="text-sm cursor-pointer">{body}</p>}
        <FooterButtons commentCount={commentCount} />
      </div>
    </div>
  );
};

export default PostItem;
