import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import { axiosConnect } from "../../config/axios";
import { useAuth } from "../../context/auth";

function CreateComment() {
  const { authenticated } = useAuth();

  const [comment, setComment] = useState("");

  const router = useRouter();

  const { identifier, slug } = router.query;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (comment.trim() === "") return;
    try {
      await axiosConnect.post(
        `/post/get-post/${identifier}/${slug}/post-comment`,
        { body: comment }
      );
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  if (!authenticated) {
    return (
      <div className="flex justify-between px-2 py-4 mt-4 border border-gray-200 rounded">
        <p className="text-gray-500">Login or sign up to leave a comment</p>
        <div>
          <Link href="/auth/login">
            <a className="px-8 py-2 text-sm font-bold text-blue-500 bg-white border border-blue-500 rounded-full hover:bg-blue-100">
              Log In
            </a>
          </Link>
          <Link href="/auth/register">
            <a className="px-8 py-2 ml-2 text-sm font-bold text-white bg-blue-500 border border-blue-500 rounded-full hover:bg-blue-400">
              Sign Up
            </a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-between gap-4 px-2 py-3 mt-4 border border-gray-200 rounded"
    >
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full focus:outline-none"
        placeholder="Create a comment..."
        rows={5}
      ></textarea>
      <div className="flex items-end">
        <button
          type="submit"
          disabled={comment.trim() === ""}
          className="px-6 py-2 ml-2 text-sm font-bold text-white bg-blue-500 border border-blue-500 rounded-full focus:outline-none"
        >
          Comment
        </button>
      </div>
    </form>
  );
}

export default CreateComment;
