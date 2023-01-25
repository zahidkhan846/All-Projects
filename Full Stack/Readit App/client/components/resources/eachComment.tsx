import classNames from "classnames";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { axiosConnect } from "../../config/axios";
import { useAuth } from "../../context/auth";

function EachComment({ comment }) {
  const classes = "px-2 py-1 font-bold hover:bg-gray-300 focus:outline-none";

  const { authenticated } = useAuth();
  const router = useRouter();

  const { identifier, slug } = router.query;

  let commentId = comment.identifier;
  let userVote = comment.userVote;

  const vote = async (value: number) => {
    if (!authenticated) {
      router.push("/auth/login");
    }

    if (value === userVote) {
      value = 0;
    }

    try {
      const res = await axiosConnect.post("/misc/create-vote", {
        identifier,
        slug,
        value,
        commentIdentifier: commentId,
      });

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <header className="flex items-center gap-2">
        <Image
          className="rounded-full"
          src="https://www.gravatar.com/avatar/"
          height={35}
          width={35}
        />
        <span className="text-sm font-semibold">{comment.username}</span>
        <span className="text-sm italic text-gray-400">
          {moment(comment.createdAt).startOf("hour").fromNow()}
        </span>
        {comment.createdAt !== comment.updatedAt && (
          <span className="text-sm italic text-gray-400">
            {moment(comment.updatedAt).startOf("hour").fromNow()}
          </span>
        )}
      </header>
      <main className="px-4 pt-1">
        <p>{comment.body}</p>
      </main>
      <footer className="flex items-center gap-4 px-4 mt-1 mb-4">
        <div className="flex items-center gap-2">
          <button
            className="text-sm font-bold text-gray-500 focus:outline-none"
            onClick={() => vote(1)}
          >
            <i
              className={classNames("icon-arrow-up hover:text-black", {
                "text-green-500": userVote === 1,
              })}
            ></i>
          </button>
          <p className="text-xs font-bold">{comment.voteScore}</p>
          <button
            className="text-sm font-bold text-gray-500 focus:outline-none hover:text-black"
            onClick={() => vote(-1)}
          >
            <i
              className={classNames("icon-arrow-down hover:text-black", {
                "text-red-500": userVote === -1,
              })}
            ></i>
          </button>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <button className={classes}>
            <i className="fas fa-comment-alt"></i> Reply
          </button>
          <button className={classes}>Share</button>
          <button className={classes}>Report</button>
          <button className={classes}>Save</button>
        </div>
      </footer>
    </div>
  );
}

export default EachComment;
