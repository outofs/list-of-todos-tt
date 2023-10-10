import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ModalForm } from './components/ModalForm';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as modalActions } from './features/modal';
import { actions as filterActions } from './features/filter';
import { TodoList } from './components/TodoList';
import { Button, Dropdown } from 'react-bootstrap';
import { Status } from './types/Status';

function App() {
  const modalIsOpen = useAppSelector(state => state.modal);
  const status = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const openModalHandler = () => {
    dispatch(modalActions.openModal());
  };

  const setSatusHandler = (statusValue: Status) => {
    dispatch(filterActions.setStatus(statusValue));
  }

  return (
    <div className="App">
      <h1>Todo list</h1>
      <Button onClick={openModalHandler}>Add new Todo</Button>
      {modalIsOpen && <ModalForm />}
      <TodoList />
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {status}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setSatusHandler('all')}>
            All
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSatusHandler('completed')}>
            Completed
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSatusHandler('active')}>
            Active
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default App;
