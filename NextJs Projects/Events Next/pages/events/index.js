import { Event } from "../../components/Event";
import { getAllEvents } from "../../utils/dataFunctions";
import styles from "../../styles/home.module.css";
import FilterEvent from "../../components/FilterEvent";
import { useRouter } from "next/router";
import { events } from "../../utils/data";

export default function Events(props) {
  const { allEvents } = props;

  const router = useRouter();

  const handleSearch = (year, month) => {
    const path = `events/${year}/${month}`;
    router.push(path);
  };

  return (
    <div className="container">
      <div className={styles.filter}>
        <FilterEvent onSearch={handleSearch} />
      </div>
      <h1 className={styles.homeHead}>Events</h1>
      <div className={styles.homeContainer}>
        {allEvents.map((event) => {
          const { title, image, description, location, date, id } = event;
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
  // const allEvents = await getAllEvents();

  // const events = allEvents.filter((event) => +event.id !== 0);

  return {
    props: {
      allEvents: events,
    },
    revalidate: 60,
  };
};
