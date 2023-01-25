import classNames from "classnames";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { FormEvent, Fragment, useState } from "react";
import { axiosConnect } from "../../config/axios";

function CraeteSubPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [errors, setErrors] = useState<Partial<any>>({});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    try {
      const res = await axiosConnect.post("/sub/create-sub", {
        name,
        title,
        description,
      });
      console.log(res.data);
      router.push(`/r/${res.data.name}`);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  return (
    <Fragment>
      <Head>
        <title>Craete Community</title>
      </Head>
      <div className="flex w-screen h-screen gap-8 bg-white">
        <div
          className="bg-center bg-cover sm:w-12 md:w-24 lg:w-44"
          style={{ backgroundImage: "url('/images/createSub.jpg')" }}
        ></div>
        <div className="flex items-center">
          <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
            <h1 className="text-lg font-medium">Create Community</h1>
            <div className="mt-4">
              <label className="block font-medium" htmlFor="name">
                Name*
              </label>
              <p className="mb-2 text-xs text-gray-500">
                {errors.name ? (
                  <span className="text-red-500">{errors.name}</span>
                ) : (
                  <span>
                    Community names including capitalization cannot be changed.
                  </span>
                )}{" "}
                <i
                  className={classNames("fas fa-exclamation-circle", {
                    "text-red-500": errors.name,
                  })}
                ></i>
              </p>
              <input
                className={classNames(
                  "w-full p-2 border border-gray-300 rounded",
                  {
                    "border-red-300": errors.name,
                  }
                )}
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label className="block font-medium" htmlFor="name">
                Title*
              </label>
              <p className="mb-2 text-xs text-gray-500">
                {errors.title ? (
                  <span className="text-red-500">{errors.title}</span>
                ) : (
                  <span>
                    This will help relevant users find your community.
                  </span>
                )}{" "}
                <i
                  className={classNames("fas fa-exclamation-circle", {
                    "text-red-500": errors.name,
                  })}
                ></i>
              </p>
              <input
                className={classNames(
                  "w-full p-2 border border-gray-300 rounded",
                  {
                    "border-red-300": errors.title,
                  }
                )}
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label className="block font-medium" htmlFor="name">
                Description
              </label>
              <p className="mb-2 text-xs text-gray-500">
                This is how new members come to understand your community.
              </p>
              <textarea
                className="w-full p-2 border border-gray-300 rounded"
                name="desc"
                id="desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              ></textarea>
            </div>

            <div className="flex justify-between mt-8">
              <div>
                <button
                  onClick={() => router.push("/")}
                  className="block w-full px-6 py-1 m-auto font-medium text-blue-500 bg-white border border-blue-500 rounded-full focus:outline-none hover:bg-blue-100 text-medium"
                >
                  Cancel
                </button>
              </div>
              <div>
                <button
                  type="submit"
                  className="block w-full px-6 py-1 font-medium text-white bg-blue-500 border border-blue-500 rounded-full focus:outline-none hover:bg-blue-400 text-medium"
                >
                  Create Community
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default CraeteSubPage;

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
