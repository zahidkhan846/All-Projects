import Image from "next/image";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import useSWR, { useSWRInfinite } from "swr";
import { useAuth } from "../../context/auth";
import { Post, Sub } from "../../utils/typeDefs";

import PostItem from "./post";
import TrandingSub from "./trandingSub";

const Home: FC = () => {
  const router = useRouter();
  const { authenticated, user } = useAuth();

  // const { data: posts, error, revalidate } = useSWR<Post[]>("/post/get-posts");
  const { data: subs, error: subError } = useSWR<Sub[]>("/misc/latest-subs");

  const [observedPosts, setObservedPosts] = useState("");

  const {
    data,
    error,
    mutate,
    size: page,
    setSize: setPage,
    isValidating,
    revalidate,
  } = useSWRInfinite<Post[]>(
    (index) => `/post/get-posts?page=${index}&count=4`
  );

  const posts: Post[] = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;

  useEffect(() => {
    if (!posts || posts.length === 0) return;
    const id = posts[posts.length - 1].identifier;

    if (id !== observedPosts) {
      setObservedPosts(id);
      observedElement(document.getElementById(id));
    }
  }, [posts]);

  const observedElement = (element: HTMLElement) => {
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting === true) {
          console.log("Bottom met fetching more data!");
          setPage(page + 1);
          observer.unobserve(element);
        }
      },
      { threshold: 1 }
    );
    observer.observe(element);
  };

  if (isLoadingInitialData || !subs) {
    return (
      <p className="flex items-center justify-center h-full text-3xl font-bold text-gray-500">
        Loading...
      </p>
    );
  }

  if (error || subError) {
    console.log(error, subError);
  }

  return (
    <div className="container flex gap-4 mt-4">
      <div className="flex-1">
        {posts.map((post) => (
          <PostItem key={post.identifier} post={post} revalidate={revalidate} />
        ))}
      </div>
      <div className="h-full overflow-hidden rounded w-72">
        <div style={{ minHeight: "410px" }} className="bg-white">
          <div className="flex items-end w-full h-20 bg-blue-900">
            <h1 className="p-2 font-bold text-white">
              Today's top growing communities
            </h1>
          </div>
          <div className="w-72">
            {subs?.map((sub: Sub, index) => (
              <TrandingSub sub={sub} index={index} key={index} />
            ))}

            <div className="w-full px-4 mt-4">
              <button className="w-full py-2 text-xs font-bold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none">
                VIEW ALL
              </button>
            </div>
          </div>
        </div>
        <div
          className="w-full mt-4 overflow-hidden bg-white rounded"
          style={{ minHeight: "150px" }}
        >
          <div>
            <div className="h-10 bg-blue-500"></div>
            <div
              style={{ marginTop: "-25px" }}
              className="flex items-center justify-center overflow-hidden rounded-md"
            >
              <Image
                src={user?.imageUrl || "https://picsum.photos/80"}
                className="rounded-md"
                width={50}
                height={50}
              />
            </div>
          </div>
          <p className="px-2 py-2">
            Your personal Reddit frontpage. Come here to check in with your
            favorite communities.
          </p>
          {authenticated && (
            <div className="mx-4 mt-2 mb-4">
              <button
                onClick={() => router.push("/subs/create-sub")}
                className="block w-full px-6 py-1 m-auto text-white bg-blue-500 border border-blue-500 rounded-full focus:outline-none hover:bg-blue-400 text-medium"
              >
                Create Community
              </button>
              <button
                onClick={() => router.push("/subs")}
                className="block w-full px-6 py-1 m-auto mt-4 text-blue-500 bg-white border border-blue-500 rounded-full focus:outline-none hover:bg-blue-100 text-medium"
              >
                Create Post
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
