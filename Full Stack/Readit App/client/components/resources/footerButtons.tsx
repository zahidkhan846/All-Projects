import Link from "next/link";
import React from "react";

function FooterButtons({ commentCount }) {
  const iconLink =
    "px-4 py-1 text-xs text-gray-500 hover:bg-gray-100 font-bold";

  return (
    <div className="flex items-center justify-start gap-1 mt-4">
      <Link href="/">
        <a className={iconLink}>
          <i className="fas fa-comment-alt"></i> {commentCount}{" "}
          {commentCount <= 1 ? "Comment" : "Comments"}
        </a>
      </Link>

      <Link href="/">
        <a className={iconLink}>
          <i className="fas fa-share"></i> Share
        </a>
      </Link>
      <Link href="/">
        <a className={iconLink}>
          <i className="fas fa-plus-square"></i> Save
        </a>
      </Link>
      <Link href="/">
        <a className={iconLink}>
          <i className="fas fa-ellipsis-h"></i>
        </a>
      </Link>
    </div>
  );
}

export default FooterButtons;
