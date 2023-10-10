type OpenModal = {
  type: 'modal/OPEN';
};

type CloseModal = {
  type: 'modal/CLOSE';
};

const openModal = (): OpenModal => ({
  type: 'modal/OPEN',
});

const closeModal = (): CloseModal => ({
  type: 'modal/CLOSE',
});

export const actions = { openModal, closeModal };

const initialState: boolean = false;

type Action = OpenModal | CloseModal;

const modalReducer = (
  modalIsOpen: boolean = initialState,
  action: Action
): boolean => {
  switch (action.type) {
    case 'modal/OPEN':
      return true;

    case 'modal/CLOSE':
      return false;

    default:
      return modalIsOpen;
  }
};

export default modalReducer;