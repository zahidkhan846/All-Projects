import styles from "./Specialize.module.css";
import SimpleCard from "../UI/Cards/Simple/SimpleCard";
import { specializations } from "../../utils/specializations";

function Specialize() {
  return (
    <section className={styles.secializeContainer}>
      <h1 className="text-center font-2 text-colorful">I Specialize in</h1>
      <div className="underline bg-white"></div>
      <article className={styles.specialize}>
        {specializations.map((specialization) => (
          <SimpleCard key={specialization.id} specialization={specialization} />
        ))}
      </article>
    </section>
  );
}

export default Specialize;
