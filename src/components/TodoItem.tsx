import { Button, CloseButton, Form } from "react-bootstrap";
import { PenFill } from "react-bootstrap-icons";

import { Todo } from "../types/Todo"

import { actions as todoActions } from "../features/todos";
import { actions as modalActions } from "../features/modal";
import { actions as currentTodoActions } from "../features/currentTodo";
import { useAppDispatch } from "../app/hooks";

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch();

  const deleteHandler = () => {
    dispatch(todoActions.deleteTodo(todo.id));
  };

  const openModalHandler = () => {
    dispatch(currentTodoActions.selectCurrentTodo(todo));
    dispatch(modalActions.openModal());
  };

  const changeStatusHandler = () => {
    const updatedTodo: Todo = {
      id: todo.id,
      completed: !todo.completed,
      title: todo.title,
      description: todo.description,
    };

    dispatch(todoActions.updateTodo(updatedTodo));
  };

  return (
    <div className="d-flex align-items-center justify-content-between gap-2">
      <div className="d-flex gap-4 align-items-center">
        <Form.Check
          checked={todo.completed}
          onChange={changeStatusHandler}
          className="cursor-pointer"
          role="button"
        />

        <div className="align-items-center">
          <h3
            className={todo.completed ? "text-decoration-line-through text-muted" : "text-primary"}
          >
            {todo.title}
          </h3>
          <p
            className={`m-0 ${todo.completed ? "text-decoration-line-through text-muted" : "text-primary"}`}
          >
            {todo.description}</p>
        </div>
      </div>

      <div className="d-flex gap-3 align-items-center">
        <Button variant="dark" onClick={openModalHandler}>
          <PenFill />
        </Button>
        <CloseButton onClick={deleteHandler} />
      </div>
    </div>
  )
};