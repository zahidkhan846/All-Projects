import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { useAuth } from "../../context/auth";

function Sidebar({ sub }) {
  const { authenticated } = useAuth();

  const router = useRouter();

  const handleCreatePost = (post) => {
    if (!authenticated) {
      return;
    }
    router.push(`/r/${sub.name}/create-post`);
  };

  return (
    <div
      style={{ minHeight: "300px" }}
      className="w-full overflow-hidden bg-white rounded"
    >
      <div className="flex items-center h-16 bg-blue-500">
        <p className="px-4 font-bold text-white">About Community</p>
      </div>
      <div className="p-4" style={{ borderBottom: "1px solid lightgray" }}>
        <p>Posts, gifs, and videos</p>
        <div className="flex justify-between gap-4 pb-4 mt-4 w-36">
          <div>
            <p className="text-lg font-semibold">3.4m</p>
            <p className="text-xs font-semibold text-gray-500">Members</p>
          </div>
          <div>
            <p className="text-lg font-semibold">4.4k</p>
            <p className="text-xs font-semibold text-gray-500">Online</p>
          </div>
        </div>
      </div>
      <div className="px-4 mt-4">
        <div className="flex items-center h-full gap-2">
          <p>
            <i className="fa fa-birthday-cake" aria-hidden="true"></i>
          </p>
          <p>{`Created ${moment(sub.createdAt).format("MMM Do, YYYY")}`}</p>
        </div>
        <div className="flex items-center h-full gap-2 mt-4">
          <p>
            <i className="fa fa-tag" aria-hidden="true"></i>
          </p>
          <p>{`r/${sub.name} topics`}</p>
        </div>
      </div>
      {authenticated && (
        <div className="flex items-center justify-center w-full h-full my-4">
          <button
            onClick={handleCreatePost}
            className="px-8 py-2 text-sm text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none"
          >
            Create New Post
          </button>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
