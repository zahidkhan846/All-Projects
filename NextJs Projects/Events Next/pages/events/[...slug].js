import { getFilteredEvents } from "../../utils/dataFunctions";
import styles from "../../styles/home.module.css";
import { Event } from "../../components/Event";

function FilterdEvents(props) {
  if (props.hasError) {
    return <h2 className="flex-center">Please enter correct input...</h2>;
  }

  if (!props.filterdEvents || props.filterdEvents.length === 0) {
    return <h2 className="flex-center">No events found...</h2>;
  }

  return (
    <div className="container">
      <h1
        style={{ textAlign: "center" }}
      >{`Events in ${props.date.year} ${props.date.month}`}</h1>
      <div className={styles.homeContainer}>
        {props.filterdEvents.map((filterdEvent) => {
          const {
            title,
            image,
            description,
            location,
            date,
            id,
          } = filterdEvent;
          return (
            <Event
              key={id}
              title={title}
              description={description}
              location={location}
              date={date}
              id={id}
              image={`/${image}`}
            />
          );
        })}
      </div>
    </div>
  );
}

export default FilterdEvents;

export async function getServerSideProps(context) {
  const filterData = context.params.slug;

  const filterdYear = filterData[0];
  const filterdMonth = filterData[1];

  const numYear = +filterdYear;
  const numMonth = +filterdMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2022 ||
    numYear < 2018 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: {
        hasError: true,
      },
    };
  }

  const filterdEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      filterdEvents,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
}
