import Comment from "../components/Comment";
import React, { useState } from "react";
import { useNotification } from "../store/NotificationContext";
import styles from "../styles/comments.module.css";

function Comments({ eventId, comments }) {
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userComment, setUserComment] = useState("");
  const [error, setError] = useState("");

  const { showNotifcation } = useNotification();

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (!userName || !userComment) {
      return setError("Plaese fill the input boxes!");
    }

    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify({
        name: userName,
        email: userEmail,
        comment: userComment,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((data) => {
          throw new Error(`${data.message || "Somthing went wrong!"}`);
        });
      })
      .then((data) =>
        showNotifcation({
          alertType: "success",
          title: "Success",
          message:
            data.message ||
            "Congratulations! you are subscribed to our newsletter.",
        })
      )
      .catch((err) =>
        showNotifcation({
          alertType: "error",
          title: "Error",
          message: err.message || "Sorry! Something went wrong.",
        })
      );

    setError("");
    setUserComment("");
    setUserEmail("");
    setUserName("");
  };

  return (
    <div className={styles.comments}>
      <div className={styles.commentContainer}>
        <form onSubmit={handleSubmit}>
          <h2>Add an comment</h2>
          <div className={styles.formControl}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="comment">Comment</label>
              <textarea
                id="comment"
                rows="5"
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
              ></textarea>
            </div>
          </div>
          <button type="submit" className="btn-comments my-5">
            Submit
          </button>
          {error && <p className="text-danger text-center">{error}</p>}
        </form>
        <div className={styles.outputComments}>
          <ul>
            {comments &&
              comments.map((eachComment) => (
                <Comment key={eachComment._id} eachComment={eachComment} />
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Comments;
