import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import todosReducer from '../features/todos';
import modalReducer from '../features/modal';
import currentTodoReducer from '../features/currentTodo';
import filterReducer from '../features/filter';

const rootReducer = combineReducers({
  currentTodo: currentTodoReducer,
  filter: filterReducer,
  todos: todosReducer,
  modal: modalReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk),
));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
