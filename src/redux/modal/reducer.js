import { SHOW_MODAL, HIDE_MODAL } from '../../constants';

const initialState = {
  show: false,
  type: '',
  title: '',
  content: ''
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        show: true,
        type: action.payload.type,
        title: action.payload.title,
        content: action.payload.content ? action.payload.content : ''
      };
    case HIDE_MODAL:
      return initialState;
    default:
      return state;
  }
};

export default modalReducer;
