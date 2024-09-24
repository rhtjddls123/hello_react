import { useRef } from "react";
import Input from "./Input";
import Modal, { ModalHandle } from "./Modal";

interface Props {
  onAdd: (projectData: Omit<projectType, "id">) => void;
  onCancel: () => void;
}

const NewProject = ({ onAdd, onCancel }: Props) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const dueDateRef = useRef<HTMLInputElement>(null);

  const modalRef = useRef<ModalHandle>(null);

  const handleSave = () => {
    const enteredTitle = titleRef.current?.value;
    const enteredDescription = descriptionRef.current?.value;
    const enteredDueDate = dueDateRef.current?.value;

    if (enteredTitle?.trim() === "" || enteredDescription?.trim() === "" || enteredDueDate?.trim() === "") {
      modalRef.current?.open();
      return;
    }

    if (enteredTitle && enteredDescription && enteredDueDate) {
      onAdd({ title: enteredTitle, description: enteredDescription, dueDate: enteredDueDate });
    }
  };

  return (
    <>
      <Modal ref={modalRef} buttonCaption="Okay">
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
        <p className="text-stone-600 mb-4">Oops ... looks like you forgot to enter a value.</p>
        <p className="text-stone-600 mb-4">Please make sure you provide a valid value for every input field.</p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button onClick={onCancel} className="text-stone-800 hover:text-stone-950">
              Cancel
            </button>
          </li>
          <li>
            <button onClick={handleSave} className="px-6 py-2 bg-stone-800 text-stone-50 hover:bg-stone-950">
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input type="text" label="Title" ref={titleRef} />
          <Input label="Description" textarea ref={descriptionRef} />
          <Input type="date" label="Due Date" ref={dueDateRef} />
        </div>
      </div>
    </>
  );
};

export default NewProject;
