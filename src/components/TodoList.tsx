import { ListGroup } from "react-bootstrap";

import { useAppSelector } from "../app/hooks";
import { TodoItem } from "./TodoItem";
import { useMemo } from "react";
import { prepareTodos } from "../utils/prepareTodos";

export const TodoList = () => {
  const todos = useAppSelector(state => state.todos);
  const status = useAppSelector(state => state.filter);
  const preparedTodos = useMemo(
    () => prepareTodos(todos, status), [todos, status],
  );

  return (
    <ListGroup as="ul">
      {
        preparedTodos.map(todo => (
          <ListGroup.Item
            as="li"
            key={todo.id}>
            <TodoItem todo={todo} />
          </ListGroup.Item>
        ))
      }
    </ListGroup>
  )
}