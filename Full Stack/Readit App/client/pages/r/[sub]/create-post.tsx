import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { FormEvent, useState, useEffect } from "react";
import useSWR from "swr";
import Sidebar from "../../../components/resources/sidebar";
import { axiosConnect } from "../../../config/axios";
import { useAuth } from "../../../context/auth";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [draft, setDraft] = useState(false);

  const [savedPosts, setSavedPosts] = useState([]);

  const { authenticated, user } = useAuth();

  const router = useRouter();

  const { sub: subName } = router.query;

  const { data: sub, error } = useSWR(subName ? "/sub/" + subName : null);

  useEffect(() => {
    fetch(`/api/r/${subName}/draft`)
      .then((response) => response.json())
      .then((responseData) => setSavedPosts(responseData.posts))
      .catch((error) => console.log(error));
  }, [subName]);

  if (!sub) {
    return (
      <p className="flex items-center justify-center h-full text-3xl font-bold text-gray-500">
        Loading...
      </p>
    );
  }

  if (error) {
    console.log(error);
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!authenticated) {
      return;
    }

    if (title.trim() === "") {
      return;
    }

    try {
      if (draft === true) {
        const res = await fetch(`/api/r/${subName}/draft`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            body: post,
            subName: sub.name,
            username: user.username,
          }),
        });
        const data = await res.json();
        console.log(data);
        setTitle("");
        setPost("");
      } else {
        const res = await axiosConnect.post("/post/create-post", {
          title: title,
          body: post,
          subName: sub.name,
        });
        console.log(res.data);
        router.push("/r/" + sub.name);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="container flex gap-4 py-8 mt-12">
      <div className="flex-1">
        <header>
          <div className="flex justify-between">
            <h1 className="text-xl font-medium">Create a post</h1>
            <p className="text-xs font-bold text-blue-500">
              DRAFT{" "}
              <span className="px-2 py-1 text-white bg-gray-500 rounded">
                {savedPosts?.length}
              </span>
            </p>
          </div>
          <div className="flex w-1/2 gap-2 p-4 my-4 overflow-hidden bg-white rounded">
            <Image
              className="rounded-full"
              src={sub.imageUrl}
              height={25}
              width={25}
            />
            <p>{`r/${sub.name}`}</p>
          </div>
        </header>
        <div className="bg-white rounded">
          <form className="p-6" onSubmit={handleSubmit}>
            <input
              className="w-full p-2 mb-4 border rounded focus:outline-none focus:border-gray-500 border-gary-300"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              value={post}
              onChange={(e) => setPost(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:border-gray-500 border-gary-300"
              rows={10}
              placeholder="Post (optional)"
            ></textarea>
            <div className="flex items-center justify-end gap-4 mt-4">
              <button
                className="px-6 py-2 font-bold text-white bg-blue-500 border border-blue-500 rounded-full hover:bg-blue-600 text-bold focus:outline-none"
                disabled={title.trim() === ""}
                type="submit"
              >
                Create Post
              </button>
              <button
                type="submit"
                className="px-6 py-2 font-bold text-blue-500 bg-gray-100 border border-blue-500 rounded-full hover:bg-blue-100 text-bold focus:outline-none"
                onClick={() => setDraft(true)}
              >
                Draft Post
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="w-72">
        <Sidebar sub={sub} />
      </div>
    </section>
  );
}

export default CreatePost;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req, res } = ctx;
  try {
    const cookie = req.headers.cookie;
    if (!cookie) throw new Error("Missing auth token");
    await axiosConnect.get("/auth/user/", { headers: { cookie } });
    return { props: {} };
  } catch (error) {
    res.writeHead(307, { Location: "/auth/login" }).end();
  }
};
