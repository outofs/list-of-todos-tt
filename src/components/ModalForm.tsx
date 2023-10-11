import { Modal, Button, Form, FormGroup } from "react-bootstrap";
import { Overlay } from "./Overlay";
import { v4 as uuidv4 } from "uuid";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { actions as currentTodoActions } from "../features/currentTodo";
import { actions as modalActions } from "../features/modal";
import { actions as todoActions } from "../features/todos";
import { useState } from "react";
import { Todo } from "../types/Todo";

interface FormErrors {
  isTitleError: boolean;
  isDescriptionError: boolean;
};

export const ModalForm = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const [isCompleted, setIsCompleted] = useState<boolean>(currentTodo?.completed || false);
  const [title, setTitle] = useState<string>(currentTodo?.title || "");
  const [description, setDescription] = useState<string>(currentTodo?.description || "");

  const [formErrors, setFormErrors] = useState<FormErrors>({
    isTitleError: false,
    isDescriptionError: false,
  });

  const isCompletedHandler = () => {
    setIsCompleted(prev => !prev);
  };

  const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setFormErrors(currErrors => ({
      ...currErrors,
      isTitleError: false,
    }));
  };

  const descriptionHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
    setFormErrors(currErrors => ({
      ...currErrors,
      isDescriptionError: false,
    }));
  };

  const closeModal = () => {
    if (currentTodo) {
      dispatch(currentTodoActions.unselectCurrentTodo());
    };

    dispatch(modalActions.closeModal());
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setFormErrors(currErrors => ({
        ...currErrors,
        isTitleError: true,
      }));
    };

    if (!description.trim()) {
      setFormErrors(currErrors => ({
        ...currErrors,
        isDescriptionError: true,
      }));
    };

    if (!title.trim() || !description.trim()) {
      return;
    };

    if (!currentTodo) {
      const newTodo: Todo = {
        id: uuidv4(),
        completed: isCompleted,
        title,
        description,
      };

      dispatch(todoActions.createTodo(newTodo));
      closeModal();
      return;
    }

    const updatedTodo: Todo = {
      id: currentTodo.id,
      completed: isCompleted,
      title,
      description,
    };

    dispatch(todoActions.updateTodo(updatedTodo));


    closeModal();
  };

  return (
    <Overlay>
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>
              {currentTodo ? "Editing form" : "Creating form"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              className="d-flex flex-column"
              onSubmit={submitHandler}
            >
              <FormGroup className="mb-3">
                <Form.Check
                  aria-label="option 1"
                  checked={isCompleted}
                  onChange={isCompletedHandler}
                  label="Is Completed"
                />
              </FormGroup>

              <FormGroup className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  onChange={titleHandler}
                  className="is-danger"
                />
                {
                  formErrors.isTitleError && (
                    <Form.Text className="text-danger">
                      Title is required!
                    </Form.Text>
                  )
                }
              </FormGroup>

              <FormGroup className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Provide description"
                  value={description}
                  onChange={descriptionHandler}
                />
                {
                  formErrors.isDescriptionError && (
                    <Form.Text className="text-danger">
                      Description is required!
                    </Form.Text>
                  )
                }
              </FormGroup>

              <Button variant="primary" type="submit">
                {currentTodo ? "Edit" : "Create"}
              </Button>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>Close</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </Overlay>
  )
}