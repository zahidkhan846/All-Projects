export const getAllEvents = async () => {
  const res = await fetch(
    "https://next-js-be3e8-default-rtdb.firebaseio.com/events.json"
  );

  const data = await res.json();

  let events = [];

  for (let key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  return events;
};

export const getFeaturedEvents = async () => {
  const events = await getAllEvents();

  const featuredEvents = events.filter((event) => event.isFeatured);
  return featuredEvents;
};

export const getFilteredEvents = async (dataFilter) => {
  const { year, month } = dataFilter;

  const events = await getAllEvents();

  let filterdEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filterdEvents;
};

export const getElemntById = async (id) => {
  const events = await getAllEvents();

  const event = events.find((event) => +event.id === +id);
  return event;
};
