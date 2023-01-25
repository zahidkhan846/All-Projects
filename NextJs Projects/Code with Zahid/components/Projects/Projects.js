import ProjectCard from "../UI/Cards/ProjectCard/ProjectCard";
import styles from "./Projects.module.css";

function Projects({ allProjects }) {
  return (
    <div className={styles.projectsContainer}>
      <h1 className="text-center py-min">All Projects</h1>
      <div className="underline"></div>
      <div className={styles.projectGrid}>
        <section className={styles.cardWrapper}>
          {allProjects.map((project) => (
            <ProjectCard key={project.fields.id} project={project} />
          ))}
        </section>
      </div>
    </div>
  );
}

export default Projects;
