import { Link, useNavigate, useParams } from "react-router-dom";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchEvent, queryClient, updateEvent } from "../../util/http.js";
import { FetchError } from "./NewEventsSection.js";
import LoadingIndicator from "../UI/LoadingIndicator.js";
import ErrorBlock from "../UI/ErrorBlock.js";

export default function EditEvent() {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const { data, isPending, isError, error } = useQuery<EventType, FetchError>({
    queryKey: ["events", id],
    queryFn: ({ signal }) => fetchEvent({ id, signal })
  });

  const { mutate } = useMutation({
    mutationFn: updateEvent,
    onMutate: async (data) => {
      const newEvent = data.event;

      await queryClient.cancelQueries({ queryKey: ["events", id] });
      const previousEvent = queryClient.getQueryData(["events", id]);
      queryClient.setQueryData(["events", id], newEvent);

      return { previousEvent };
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(["events", id], context?.previousEvent);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["events", id] });
    }
  });
  function handleSubmit(formData: InputDataType) {
    mutate({ id, event: formData });
    navigate("../");
  }

  function handleClose() {
    navigate("../");
  }

  let content;
  if (isPending) {
    content = (
      <div className="center">
        <LoadingIndicator />
      </div>
    );
  }

  if (isError) {
    content = (
      <>
        <ErrorBlock
          title="Failed to load event"
          message={error.info?.message || "Failed to load event data. Please check your inputs and try again later."}
        />
        <div className="form-actions">
          <Link to={"../"} className="button">
            Okay
          </Link>
        </div>
      </>
    );
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}
