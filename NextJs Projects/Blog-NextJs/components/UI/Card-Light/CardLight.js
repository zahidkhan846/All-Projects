import { Delete, Edit } from "@material-ui/icons";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import EditPost from "../Form/EditPost";
import classes from "./CardLight.module.css";
import { useSession } from "next-auth/client";

function CardLight({ post }) {
  const [showModal, setShowModal] = useState(false);

  const [session] = useSession();

  const handleDelete = async () => {
    const res = await fetch(`/api/posts/${post._id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    console.log(data);
  };

  const handleEdit = () => {
    setShowModal(!showModal);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  let date = post.createdAt;

  if (post.updatedAt) {
    date = post.updatedAt;
  }

  return (
    <Fragment>
      {showModal && <EditPost closeModal={closeModal} post={post} />}
      <article className={classes.cardLight}>
        <header className={classes.cardLightHeader}>
          <p className={classes.time}>{moment(date).format("MMMM Do YYYY")}</p>
          <h2 className="text-dark">
            <Link href={`/posts/${post._id}`}>{post.title}</Link>
          </h2>
        </header>
        <div className={classes.cardLightAuthor}>
          <a href="#!" className={classes.authorAvatarLight}>
            <Image src="/images/me.jpg" alt="me" width={40} height={40} />
          </a>
          <svg className={classes.halfCircleLight} viewBox="0 0 106 57">
            <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
          </svg>
          <div className={classes.authorNameLight}>
            <div className={classes.authorNamePrefixLight}>Auhor</div>
            {post.author}
          </div>
        </div>
        <div className={classes.tagsLight}>
          {post.tags.map((tag, index) => (
            <Link key={index} href="/">
              {tag}
            </Link>
          ))}
        </div>
        {session && (
          <div className={classes.editDeleteSection}>
            <button className={classes.deleteBtn} onClick={handleDelete}>
              <Delete color="inherit" />
            </button>
            <button className={classes.editBtn} onClick={handleEdit}>
              <Edit color="inherit" />
            </button>
          </div>
        )}
      </article>
    </Fragment>
  );
}

export default CardLight;
