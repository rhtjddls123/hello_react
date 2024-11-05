interface EventType {
  id?: string;
  title: string;
  image: string;
  date: string;
  description: string;
}

type parameterIds = "eventId";

type RouteKey = "event-detail";

interface responseType {
  message?: string;
  errors?: { [key: string]: string };
  token?: string;
  user?: { id: string; email: string };
}
