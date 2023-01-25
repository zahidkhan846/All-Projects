import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "../../styles/featured.module.css";

function TrandingSub({ sub, index }) {
  return (
    <div
      className={`flex gap-2 place-items-center overflow-hidden ${styles.sub}`}
    >
      <p>{index + 1}</p>
      <p>
        <i className="text-green-400 fa fa-angle-up" aria-hidden="true"></i>
      </p>
      <Image
        className="rounded-full"
        src={sub.imageUrl}
        height={35}
        width={35}
      />
      <Link href={`/r/${sub.name}`}>
        <a className="font-semibol">{`r/${sub.name.toLowerCase()}`}</a>
      </Link>
    </div>
  );
}

export default TrandingSub;
