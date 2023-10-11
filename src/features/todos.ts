import { Todo } from "../types/Todo";

type CreateTodo = {
  type: "todo/CREATE";
  payload: Todo;
};

type UpdateTodo = {
  type: "todo/UPDATE";
  payload: Todo;
};

type DeleteTodo = {
  type: "todo/DELETE";
  payload: String;
};

const createTodo = (todo: Todo): CreateTodo => ({
  type: "todo/CREATE",
  payload: todo,
});

const updateTodo = (updatedTodo: Todo): UpdateTodo => ({
  type: "todo/UPDATE",
  payload: updatedTodo,
});

const deleteTodo = (id: String): DeleteTodo => ({
  type: "todo/DELETE",
  payload: id,
});

export const actions = { createTodo, updateTodo, deleteTodo };

type Action = CreateTodo | UpdateTodo | DeleteTodo;

const initialState: Todo[] = [];

const todosReducer = (todos: Todo[] = initialState, action: Action): Todo[] => {
  switch (action.type) {
    case "todo/CREATE":
      return [...todos, action.payload];

    case "todo/UPDATE":
      return todos.map(todo => {
        if (todo.id === action.payload.id) {
          return action.payload;
        }

        return todo;
      });

    case "todo/DELETE":
      return todos.filter(todo => todo.id !== action.payload);

    default:
      return todos;
  }
};

export default todosReducer;