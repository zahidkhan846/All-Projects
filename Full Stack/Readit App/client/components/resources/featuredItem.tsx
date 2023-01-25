import Image from "next/image";
import React from "react";
import styles from "../../styles/featured.module.css";

function FeaturedItem({ post }) {
  return (
    <div className="relative w-56 h-40">
      <Image
        src="/images/forest.jpg"
        height={160}
        width={224}
        alt={post.title}
        className="rounded"
      />
      <div className="absolute bottom-0 left-0 w-full px-4 py-2 text-sm font-bold text-white">
        <p className={styles.text}>{post.title}</p>
        <p className="text-xs font-bold text-red-500">
          {post.subName.toUpperCase()}
        </p>
      </div>
    </div>
  );
}

export default FeaturedItem;
