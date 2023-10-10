import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const prepareTodos = (todos: Todo[],  status : Status) => {

  if (status !== 'all') {
    return todos.filter(todo => {
      switch (status) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return todo;
      }
    });
  }

  return todos;
};