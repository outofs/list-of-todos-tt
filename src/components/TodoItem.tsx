import { Button, CloseButton } from 'react-bootstrap';
import { PenFill } from 'react-bootstrap-icons';

import { Todo } from '../types/Todo'

import { actions as todosActions } from '../features/todos';
import { actions as modalActions } from '../features/modal';
import { actions as currentTodoActions } from '../features/currentTodo';
import { useAppDispatch } from '../app/hooks';

type Props = {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch();

  const deleteHandler = ()=>{
    dispatch(todosActions.deleteTodo(todo.id));
  };

  const openModalHandler = () => {
    dispatch(currentTodoActions.selectCurrentTodo(todo));
    dispatch(modalActions.openModal());
  };

  return (
    <div className='d-flex justify-content-between'>
      <input type="checkbox" checked={todo.completed} onChange={()=>{}}/>
      <h2>{todo.title}</h2>
      <p>{todo.description}</p>
      <div>
      <Button variant="dark" onClick={openModalHandler}>
        <PenFill/>
      </Button>
      <CloseButton onClick={deleteHandler}/>
      </div>
    </div>
  )
}