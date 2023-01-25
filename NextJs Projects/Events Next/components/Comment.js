import styles from "../styles/comments.module.css";

function Comment({ eachComment }) {
  return (
    <li>
      <span>{eachComment.comment} </span>
      <span className={styles.spanUser}>by {eachComment.name}</span>
    </li>
  );
}

export default Comment;
