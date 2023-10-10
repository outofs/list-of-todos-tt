import { Todo } from '../types/Todo';

type SelectCurrentTodo = {
  type: 'currentTodo/SELECT';
  payload: Todo;
};

type UnselectCurrentTodo = {
  type: 'currentTodo/UNSELECT';
};

const selectCurrentTodo = (todo: Todo): SelectCurrentTodo => ({
  type: 'currentTodo/SELECT',
  payload: todo,
});

const unselectCurrentTodo = (): UnselectCurrentTodo => ({
  type: 'currentTodo/UNSELECT',
});

export const actions = { selectCurrentTodo, unselectCurrentTodo };

const initialState: Todo | null = null;

type Action = SelectCurrentTodo | UnselectCurrentTodo;

const currentTodoReducer = (
  currentTodo:Todo | null = initialState,
  action: Action
):Todo | null => {
  switch (action.type) {
    case 'currentTodo/SELECT':
      return action.payload;

    case 'currentTodo/UNSELECT':
      return null;

    default:
      return currentTodo;
  }
};

export default currentTodoReducer;