import { ActionFunctionArgs, Await, defer, json, LoaderFunctionArgs, Params, redirect, useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";
import { Suspense } from "react";
import EventsList from "../components/EventsList";

const EventDetailPage = () => {
  const { event, events } = useRouteLoaderData("event-detail" as RouteKey) as { event: EventType; events: EventType[] };
  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={event}>{(event) => <EventItem event={event} />}</Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>{(events) => <EventsList events={events} />}</Await>
      </Suspense>
    </>
  );
};

export default EventDetailPage;

interface loaderProps extends LoaderFunctionArgs {
  params: Params<parameterIds>;
}

const loadEvent = async (id: string): Promise<EventType> => {
  const response = await fetch(`http://localhost:8081/events/${id}`);
  if (!response.ok) {
    throw json({ message: "Could not fetch details for selected event." }, { status: 500 });
  } else {
    const resData = (await response.json()) as { event: EventType };
    return resData.event;
  }
};

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

export const eventDetailLoader = async ({ params }: loaderProps) => {
  const id = params.eventId;

  return defer({
    event: await loadEvent(id ? id : ""),
    events: loadEvents()
  });
};

interface actionProps extends ActionFunctionArgs {
  params: Params<parameterIds>;
}

export const eventDeleteAction = async ({ params, request }: actionProps) => {
  const id = params.eventId;
  const response = await fetch(`http://localhost:8081/events/${id}`, {
    method: request.method
  });
  if (!response.ok) {
    throw json({ message: "Could not delete event." }, { status: 500 });
  }
  return redirect("/events");
};
