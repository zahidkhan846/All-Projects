import classNames from "classnames";
import React from "react";

function VoteButtons({ vote, userVote, voteScore }) {
  return (
    <>
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
      <p className="text-xs font-bold">{voteScore}</p>
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
    </>
  );
}

export default VoteButtons;
