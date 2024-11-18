import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorBlock from "../UI/ErrorBlock";
import EventItem from "./EventItem";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "../../util/http";

export interface FetchError extends Error {
  code?: number;
  info?: { message: string };
}

export default function NewEventsSection() {
  const { data, isPending, isError, error } = useQuery<EventType[], FetchError, EventType[], [string, { max: number }]>({
    queryKey: ["events", { max: 3 }],
    queryFn: ({ signal, queryKey }) => fetchEvents({ signal, ...queryKey[1] })
  });
  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = <ErrorBlock title="An error occurred" message={error.info?.message || "Failed to fetch events."} />;
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
