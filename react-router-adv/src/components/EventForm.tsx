import { Form, Params, useActionData, useNavigate, useNavigation } from "react-router-dom";
import { ActionFunctionArgs, json, redirect } from "react-router-dom";

import classes from "./EventForm.module.css";

interface EventFormProps {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  event?: EventType;
}

function EventForm({ method, event }: EventFormProps) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const data = useActionData() as { message: string; errors: { title: string; description: string; date: string; image: string } };

  const isSubmitting = navigation.state === "submitting";
  function cancelHandler() {
    navigate("..");
  }

  return (
    <Form className={classes.form} method={method}>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" defaultValue={event ? event.title : ""} required />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" defaultValue={event ? event.image : ""} required />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" defaultValue={event ? event.date : ""} required />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" defaultValue={event ? event.description : ""} rows={5} required />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Save"}</button>
      </div>
    </Form>
  );
}

export default EventForm;

interface actionProps extends ActionFunctionArgs {
  params: Params<parameterIds>;
}

export const manipulateEventAction = async ({ params, request }: actionProps) => {
  const data = await request.formData();
  const eventData: EventType = {
    title: data.get("title") as string,
    image: data.get("image") as string,
    date: data.get("date") as string,
    description: data.get("description") as string
  };

  const url = `http://localhost:8081/events${request.method === "PATCH" ? `/${params.eventId}` : ""}`;

  const response = await fetch(url, {
    method: request.method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(eventData)
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not save event." }, { status: 500 });
  }

  return redirect("/events");
};
