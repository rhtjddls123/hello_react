import { Await, defer, json, useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

function EventsPage() {
  const { events } = useLoaderData() as { events: EventType[] };
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>{(loadEvents) => <EventsList events={loadEvents} />}</Await>
    </Suspense>
  );
}

export default EventsPage;

const loadEvents = async (): Promise<EventType[]> => {
  const response = await fetch("http://localhost:8081/events");
  if (!response.ok) {
    // throw new Response(JSON.stringify({ message: "Failed to fetch events" }), { status: 500 });
    throw json({ message: "Failed to fetch events" }, { status: 500 });
  } else {
    const resData = (await response.json()) as { events: EventType[] };
    return resData.events;
  }
};

export const eventsLoader = () => {
  return defer({
    events: loadEvents()
  });
};
