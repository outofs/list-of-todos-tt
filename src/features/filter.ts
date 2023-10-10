import { Status } from '../types/Status';

type SetStatus = {
  type: 'filter/SET_STATUS';
  payload: Status;
};

const setStatus = (status: Status): SetStatus => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

export const actions = { setStatus };

const initialState: Status = 'all';

const filterReducer = (
  status: Status = initialState,
  action: SetStatus,
): Status => {
  switch (action.type) {
    case 'filter/SET_STATUS':
      return action.payload;

    default:
      return status;
  }
};

export default filterReducer;