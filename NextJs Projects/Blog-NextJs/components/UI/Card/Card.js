import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import classes from "./Card.module.css";

function Card({ post }) {
  return (
    <article className={classes.card}>
      <header className={classes.cardHeader}>
        <p className={classes.time}>
          {moment(post.createdAt).format("MMMM Do YYYY")}
        </p>
        <h2 className="text-color">
          <Link href={`/posts/${post._id}`}>{post.title}</Link>
        </h2>
      </header>
      <div className={classes.cardAuthor}>
        <a href="#!" className={classes.authorAvatar}>
          <Image src="/images/me.jpg" alt="me" width={40} height={40} />
        </a>
        <svg className={classes.halfCircle} viewBox="0 0 106 57">
          <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
        </svg>
        <div className={classes.authorName}>
          <div className={classes.authorNamePrefix}>Auhor</div>
          {post.author}
        </div>
      </div>
      <div className={classes.tags}>
        {post.tags.map((tag, index) => (
          <Link key={index} href="/">
            {tag}
          </Link>
        ))}
      </div>
    </article>
  );
}

export default Card;
