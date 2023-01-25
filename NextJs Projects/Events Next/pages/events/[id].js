import { Event } from "../../components/Event";
import { getElemntById, getFeaturedEvents } from "../../utils/dataFunctions";
import styles from "../../styles/singleEvent.module.css";
import { useEffect, useState } from "react";
import Comments from "../../components/Comments";
import { useNotification } from "../../store/NotificationContext";
import { events } from "../../utils/data";

export default function SingleEvent(props) {
  const [showModel, setShowModel] = useState(false);
  const [comments, setComments] = useState([]);

  const { showNotifcation, closeNotification } = useNotification();

  useEffect(() => {
    if (showModel) {
      showNotifcation({
        alertType: "info",
        title: "Loading...",
        message: "Please wait we fetching comments...",
      });

      fetch(`/api/comments/${props.event.id}`)
        .then((res) => res.json())
        .then((data) => {
          setComments(data.comments);
          closeNotification();
        });
    }
  }, [showModel]);

  const handleShow = () => {
    setShowModel(!showModel);
  };

  console.log(props.event);
  console.log(comments);

  const { event } = props;

  if (!event) {
    return <h1 className="flex-center">Loading...</h1>;
  }

  const { title, description, image, location, date, id } = event;

  return (
    <div style={{ flexDirection: "column" }}>
      <h1
        style={{
          textAlign: "left",
          margin: "1rem 0",
          color: "black",
          textTransform: "uppercase",
          borderBottom: "1px dashed black",
        }}
      >
        {title}
      </h1>
      <div className={styles.singleEvent}>
        <Event
          title={title}
          description={description}
          image={`/${image}`}
          location={location}
          date={date}
          linkText="Go Back"
          eventLink="/"
        />
        <div
          style={{
            lineHeight: "1.7",
            color: "black",
            fontSize: "20px",
          }}
        >
          <p>{description}</p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Consequatur dolores laborum vitae molestias maiores eum dolor
            reiciendis, aperiam doloremque explicabo molestiae voluptatibus
            ipsum corrupti maxime debitis, animi odio deserunt? Laborum.
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Consequatur dolores laborum vitae molestias maiores eum dolor
            reiciendis, aperiam doloremque explicabo molestiae voluptatibus
            ipsum corrupti maxime debitis, animi odio deserunt? Laborum.
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Consequatur dolores laborum vitae molestias maiores eum dolor
            reiciendis, aperiam doloremque explicabo molestiae voluptatibus
            ipsum corrupti maxime debitis, animi odio deserunt? Laborum. Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Nesciunt sit enim
            aliquam ipsa, porro sequi. Expedita optio architecto quaerat
            ducimus!
          </p>
        </div>
      </div>
      <button className="btn-comments" onClick={handleShow}>
        {!showModel ? "Open Comments" : "Close Comments"}
      </button>
      {showModel ? <Comments comments={comments} eventId={id} /> : null}
    </div>
  );
}

export const getStaticPaths = async () => {
  // const events = await getFeaturedEvents();

  const paths = events.map((event) => ({
    params: { id: event.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;

  // const event = await getElemntById(id);
  const event = events.find((e) => e.id === +id);

  return {
    props: { event },
    revalidate: 30,
  };
};
