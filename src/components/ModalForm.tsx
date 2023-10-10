import { Modal, Button } from 'react-bootstrap';
import { Overlay } from './Overlay';
import {v4 as uuidv4} from 'uuid';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { actions as currentTodoActions } from '../features/currentTodo';
import { actions as modalActions } from '../features/modal';
import { actions as todoActions } from '../features/todos';
import { useEffect, useRef } from 'react';
import { Todo } from '../types/Todo';

export const ModalForm = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const formTitle = useRef<HTMLInputElement>(null);
  const formDescription = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log(currentTodo);
  }, [])

  const closeModal = ()=>{
    if (currentTodo) {
      dispatch(currentTodoActions.unselectCurrentTodo());
    };

    dispatch(modalActions.closeModal());
  }

  const closeModalHandler = () => closeModal();

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!currentTodo) {
      if (formTitle.current && formDescription.current) {
        const newTodo: Todo = {
          id: uuidv4(),
          completed: false,
          title: formTitle.current.value,
          description: formDescription.current.value,
        };

        dispatch(todoActions.createTodo(newTodo));
        console.log(newTodo, 'Created!');
      }

      closeModal();
    }
  }

  return (
    <Overlay>
      <div
        className="modal show"
        style={{ display: 'block', position: 'initial' }}
      >
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
              action=""
              className='d-flex flex-column'
              onSubmit={submitHandler}
            >
              <input
                ref={formTitle}
                type="text"
                placeholder='Enter title'
                defaultValue={currentTodo?.title}
              />
              <input
                ref={formDescription}
                type="text"
                placeholder='Provide description'
                defaultValue={currentTodo?.description}
              />
              <Button variant="primary" type='submit'>
                {
                  currentTodo ? 'Edit' : 'Create'
                }
              </Button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModalHandler}>Close</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </Overlay>


  )
}