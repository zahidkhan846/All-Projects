import classNames from "classnames";
import moment from "moment";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import useSWR from "swr";
import CreateComment from "../../../../components/resources/CreateComment";
import PostComment from "../../../../components/resources/postComments";
import FooterButtons from "../../../../components/resources/footerButtons";
import PostHeader from "../../../../components/resources/postHeader";
import Sidebar from "../../../../components/resources/sidebar";
import VoteButtons from "../../../../components/resources/VoteButtons";
import { axiosConnect } from "../../../../config/axios";
import { useAuth } from "../../../../context/auth";
import { Post } from "../../../../utils/typeDefs";

function SinglePost() {
  const router = useRouter();
  const { authenticated } = useAuth();

  const { identifier, slug, sub } = router.query;

  const { data: post, error } = useSWR<Post>(
    identifier && slug ? `/post/get-post/${identifier}/${slug}` : null
  );

  if (!post) {
    return (
      <p className="flex items-center justify-center h-screen text-3xl font-bold text-gray-400">
        Loading...
      </p>
    );
  }

  console.log(post);

  const {
    username,
    body,
    createdAt,
    identifier: postId,
    subName,
    url,
    title,
    voteScore,
    commentCount,
    slug: postSlug,
    userVote,
    sub: postSub,
  } = post;

  if (error) {
    console.log(error);
  }

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
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.title} />
      </Head>
      <section className="mt-12 bg-blue-500">
        <div className="min-h-screen bg-gray-200 container-2">
          <header className="flex items-center justify-between h-12 px-24 text-white bg-black">
            <div className="flex items-center gap-8">
              <div className="flex gap-2">
                <button
                  className="text-base font-bold text-gray-500 focus:outline-none hover:text-white"
                  onClick={() => vote(1)}
                >
                  <i
                    className={classNames("icon-arrow-up", {
                      "text-green-500": userVote === 1,
                    })}
                  ></i>
                </button>
                <p className="text-base font-bold">{voteScore}</p>
                <button
                  className="text-base font-bold text-gray-500 focus:outline-none hover:text-white"
                  onClick={() => vote(-1)}
                >
                  <i
                    className={classNames("icon-arrow-down", {
                      "text-red-500": userVote === -1,
                    })}
                  ></i>
                </button>
              </div>
              <p>
                What is a simple, painful fact that people need to get over and
                accept?
              </p>
            </div>
            <div>
              <button
                onClick={() => router.back()}
                className="flex items-center gap-4 focus:outline-none hover:text-gray-300"
              >
                <i className="fa fa-times"></i> <span>Close</span>
              </button>
            </div>
          </header>
          <article className="bg-gray-200">
            <div className="container">
              <div className="flex gap-4 mt-8">
                <div className="flex-1 overflow-hidden text-black bg-white rounded">
                  <div className="flex gap-2 p-4">
                    <aside className="flex flex-col items-center justify-center w-8 gap-1">
                      <VoteButtons
                        voteScore={voteScore}
                        vote={vote}
                        userVote={userVote}
                      />
                    </aside>
                    <div className="flex-1">
                      <header>
                        <PostHeader
                          subName={subName}
                          postSub={postSub}
                          url={url}
                          createdAt={createdAt}
                          username={username}
                        />
                      </header>
                      <div>
                        <Link href={url}>
                          <a className="my-1 text-2xl font-medium">{title}</a>
                        </Link>
                        {body && (
                          <p className="text-sm cursor-pointer">{body}</p>
                        )}
                        <FooterButtons commentCount={commentCount} />
                      </div>
                      <CreateComment />
                      <PostComment />
                    </div>
                  </div>
                </div>
                <div className="w-72">
                  <Sidebar sub={postSub} />
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </Fragment>
  );
}

export default SinglePost;
