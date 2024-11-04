import { useRouteLoaderData } from "react-router-dom";
import EventForm from "../components/EventForm";

const EditEventPage = () => {
  const event = useRouteLoaderData("event-detail" as RouteKey) as EventType;
  return <EventForm method="PATCH" event={event} />;
};

export default EditEventPage;
