import { Todo } from '../types/Todo';

type CreateTodo = {
  type: 'todo/CREATE';
  payload: Todo;
};

type DeleteTodo = {
  type: 'todo/DELETE';
  payload: String;
};

const createTodo = (todo: Todo): CreateTodo => ({
  type: 'todo/CREATE',
  payload: todo,
});

const deleteTodo = (id: String): DeleteTodo => ({
  type: 'todo/DELETE',
  payload: id,
});

export const actions = { createTodo, deleteTodo };

type Action = CreateTodo | DeleteTodo;

const initialState: Todo[] = [
  {
    id: "sasasaas",
    completed: false,
    title: "Todo1",
    description: "Todo 1 description, Todo 1 description, Todo 1 description",
  },
  {
    id: "dadawdad",
    completed: true,
    title: "Todo2",
    description: "Todo 2 description, Todo 2 description, Todo 2 description",
  },
  {
    id: "dawdawddf",
    completed: true,
    title: "Todo3",
    description: "Todo 3 description, Todo 3 description, Todo 3 description",
  }
];

const todosReducer = (todos: Todo[] = initialState, action: Action): Todo[] => {
  switch (action.type) {
    case 'todo/CREATE':
      return [...todos, action.payload];

    case 'todo/DELETE':
      return todos.filter(todo => todo.id !== action.payload);

    default:
      return todos;
  }
};

export default todosReducer;