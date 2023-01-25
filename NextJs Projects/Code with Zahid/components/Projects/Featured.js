import Card from "../UI/Cards/Card-Dark/Card";
import styles from "./Featured.module.css";

function Featured({ featured }) {
  return (
    <div className={styles.featuredContainer}>
      <div className={styles.header}>
        <h1 className="text-center text-colorful font-2">Featured Projects</h1>
        <div className="underline bg-white"></div>
      </div>
      <section className="card-list">
        {featured.map((project) => (
          <Card key={project.fields.id} project={project} />
        ))}
      </section>
    </div>
  );
}

export default Featured;
