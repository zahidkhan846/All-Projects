import classes from "./Notification.module.css";

function Notification({ type, desc }) {
  let alertStyle = "";

  if (type === "success") {
    alertStyle = classes.success;
  }

  if (type === "error") {
    alertStyle = classes.error;
  }

  if (type === "loading") {
    alertStyle = classes.loading;
  }

  const styles = `${classes.notification} ${alertStyle}`;

  return (
    <section className={classes.alertContainer}>
      <article className={styles}>
        <h1>{type}</h1>
        <p>{desc}</p>
      </article>
    </section>
  );
}

export default Notification;
