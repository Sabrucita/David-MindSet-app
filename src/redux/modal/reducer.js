import { SHOW_MODAL, HIDE_MODAL, UPDATE_MODAL } from 'constants/index';

const initialState = {
  show: false,
  resource: '',
  type: '',
  content: ''
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        show: true,
        resource: action.payload.resource,
        type: action.payload.type,
        content: action.payload.content
      };
    case UPDATE_MODAL:
      return {
        ...state,
        type: action.payload.type,
        content: action.payload.content
      };
    case HIDE_MODAL:
      return initialState;
    default:
      return state;
  }
};

export default modalReducer;
