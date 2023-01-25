import { getFeaturedEvents } from "../utils/dataFunctions";
import { Event } from "../components/Event";
import styles from "../styles/home.module.css";
import { events } from "../utils/data";

export default function Home(props) {
  const { featuredEvents } = props;

  return (
    <div className="container">
      <h1
        style={{
          margin: ".5rem 0",
        }}
      >
        Featured Events
      </h1>
      <div className={styles.homeContainer}>
        {featuredEvents &&
          featuredEvents.map((featuredEvent) => {
            const {
              title,
              image,
              description,
              location,
              date,
              id,
            } = featuredEvent;
            return (
              <Event
                key={id}
                title={title}
                description={description}
                location={location}
                date={date}
                id={id}
                image={image}
              />
            );
          })}
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  // const featuredEvents = await getFeaturedEvents();

  const featuredEvents = events.filter((e) => e.isFeatured);

  return {
    props: {
      featuredEvents,
    },
    revalidate: 600,
  };
};
