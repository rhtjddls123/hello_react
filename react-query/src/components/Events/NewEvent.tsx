import { Link, useNavigate } from "react-router-dom";
import Modal from "../UI/Modal";
import EventForm from "./EventForm";
import { useMutation } from "@tanstack/react-query";
import { createNewEvent, queryClient } from "../../util/http";
import ErrorBlock from "../UI/ErrorBlock";
import { FetchError } from "./NewEventsSection";

export default function NewEvent() {
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation<unknown, FetchError, { event: InputDataType }>({
    mutationFn: createNewEvent,
    onSuccess: () => {
      navigate("../");
      queryClient.invalidateQueries({ queryKey: ["events"] });
    }
  });

  function handleSubmit(formData: InputDataType) {
    mutate({ event: formData });
  }

  return (
    <Modal onClose={() => navigate("../")}>
      <EventForm onSubmit={handleSubmit}>
        {isPending ? (
          "Submitting..."
        ) : (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Create
            </button>
          </>
        )}
      </EventForm>
      {isError && (
        <ErrorBlock
          title="Failed to create event"
          message={error.info?.message || "Failed to create event. Please check your inputs and try again later"}
        />
      )}
    </Modal>
  );
}
