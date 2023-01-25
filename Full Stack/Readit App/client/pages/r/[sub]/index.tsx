import classNames from "classnames";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { ChangeEvent, Fragment, useRef } from "react";
import useSWR from "swr";
import PostItem from "../../../components/resources/post";
import Sidebar from "../../../components/resources/sidebar";
import { axiosConnect } from "../../../config/axios";
import { useAuth } from "../../../context/auth";
import { Sub } from "../../../utils/typeDefs";

function SubPage() {
  const router = useRouter();

  const { authenticated, user } = useAuth();

  const imageUploadRef = useRef<HTMLInputElement>();

  const subName = router.query.sub;

  const {
    data: sub,
    error,
    revalidate,
  } = useSWR<Sub>(subName ? "/sub/" + subName : null);

  if (!sub) {
    return (
      <p className="flex items-center justify-center h-screen text-3xl font-bold text-gray-500">
        Loading...
      </p>
    );
  }
  let subOwner;
  if (authenticated && user.username === sub.username) {
    subOwner = user.username;
  }

  if (error) {
    console.log(error);
  }

  const openFileExplorer = (type: string) => {
    if (!subOwner) {
      return;
    }
    imageUploadRef.current.name = type;
    imageUploadRef.current.click();
  };

  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!subOwner) {
      return;
    }
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", imageUploadRef.current.name);

    try {
      await axiosConnect.post(`/sub/${sub.name}/image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      revalidate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <Head>
        <title>{sub.title}</title>
      </Head>
      <div className="mt-12">
        <input
          type="file"
          hidden={true}
          ref={imageUploadRef}
          onChange={uploadImage}
        />
        <header
          onClick={() => openFileExplorer("banner")}
          className={classNames("w-full h-60 bg-blue-800", {
            "cursor-pointer": subOwner,
          })}
        >
          {sub.bannerUrl && (
            <img
              className="object-cover w-full h-full"
              src={sub.bannerUrl}
              alt={sub.title}
            />
          )}
        </header>
        <div className="px-2 py-3 bg-white">
          <div className="container flex items-center gap-4">
            <div style={{ marginTop: "-20px" }}>
              <Image
                className={classNames("rounded-full", {
                  "cursor-pointer": subOwner,
                })}
                src={sub.imageUrl}
                height={80}
                width={80}
                onClick={() => openFileExplorer("image")}
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center justify-center h-full gap-4">
                <h1 className="text-2xl font-bold">{sub.title}</h1>
                <button className="px-6 py-1 font-bold text-white bg-blue-500 border rounded-full focus:outline-none hover:bg-blue-400">
                  Join
                </button>
              </div>
              <p className="text-xs font-semibold text-gray-500">{`r/${sub.title.toLowerCase()}`}</p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="flex gap-4 pt-4">
            <div className="flex-1">
              {sub.posts.map((post) => (
                <PostItem key={post.identifier} post={post} />
              ))}
            </div>
            <div className="w-72">
              <Sidebar sub={sub} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default SubPage;
