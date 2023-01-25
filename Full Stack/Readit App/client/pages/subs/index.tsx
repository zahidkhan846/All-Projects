import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import useSWR from "swr";
import { Sub } from "../../utils/typeDefs";

function Subs() {
  const router = useRouter();

  const { data: subs, error } = useSWR<Sub[]>("/sub/get-subs");

  if (!subs) {
    return <p>Loading...</p>;
  }

  if (error) {
    router.push("/");
  }

  console.log(subs);

  return (
    <div className="mt-12">
      <section className="py-4 text-3xl font-bold text-center text-red-400">
        Select a community to create post
      </section>
      <ul
        className="container flex flex-col justify-center p-8"
        style={{ minHeight: "100vh" }}
      >
        {subs.map((sub) => (
          <li
            className="h-32 p-4 mb-4 overflow-hidden bg-white rounded cursor-pointer"
            key={sub.name}
          >
            <Link href={`/r/${sub.name}/create-post`}>
              <div className="flex items-center h-full gap-4">
                <div>
                  <Image
                    className="rounded-full"
                    src={sub.imageUrl}
                    height={80}
                    width={80}
                  />
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-500">
                    {sub.title}
                  </p>
                  <p>{sub.description}</p>
                  <p className="text-sm italic text-gray-400">
                    Created on {moment(sub.createdAt).format("YYYY MMM, DD")}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Subs;
