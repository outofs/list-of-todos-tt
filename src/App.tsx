import "bootstrap/dist/css/bootstrap.min.css";
import { ModalForm } from "./components/ModalForm";

import { useAppDispatch, useAppSelector } from "./app/hooks";
import { actions as modalActions } from "./features/modal";

import { TodoList } from "./components/TodoList";
import { Button } from "react-bootstrap";
import { Filter } from "./components/Filter";


function App() {
  const modalIsOpen = useAppSelector(state => state.modal);
  const todos = useAppSelector(state => state.todos);

  const dispatch = useAppDispatch();

  const openModalHandler = () => {
    dispatch(modalActions.openModal());
  };



  return (
    <div className="App">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-9 col-xl-7">
            <div className="card rounded-3">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between mb-5">
                  <h1>Todo list</h1>
                  <Button onClick={openModalHandler}>Add new Todo</Button>
                </div>

                {
                  todos.length === 0 ? (
                    <p>There is no todos for you</p>
                  ) : (
                    <>
                      <Filter />
                      <TodoList />
                    </>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      {modalIsOpen && <ModalForm />}
    </div>
  );
}

export default App;
