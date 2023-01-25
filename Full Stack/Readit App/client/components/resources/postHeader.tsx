import moment from "moment";
import Link from "next/link";
import React from "react";

function PostHeader(props) {
  return (
    <div className="flex items-center">
      <Link href={`/r/${props.subName}`}>
        <img
          className="w-6 h-6 mr-1 rounded-full"
          src={props.postSub.imageUrl}
        />
      </Link>
      <Link href={`/r/${props.subName}`}>
        <a className="text-xs font-bold hover:underline">{`/r/${props.subName}`}</a>
      </Link>
      <p className="ml-1 text-xs text-gray-500">
        . Posted by{" "}
        <Link href={`/u/${props.username}`}>
          <a className="hover:underline">{`/u/${props.username}`}</a>
        </Link>
      </p>
      <Link href={props.url}>
        <a className="ml-1 text-xs text-gray-500">
          <span className="cursor-default">Posted on</span>{" "}
          <span className="hover:underline">
            {moment(props.createdAt).startOf("hour").fromNow()}
          </span>
        </a>
      </Link>
    </div>
  );
}

export default PostHeader;
