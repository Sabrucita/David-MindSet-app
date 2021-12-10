import {
  SHOW_MODAL_SUCCESS,
  SHOW_MODAL_DELETE,
  SHOW_MODAL_ERROR,
  HIDE_MODAL
} from '../../constants';

const initialState = {
  show: false,
  type: '',
  tile: '',
  content: ''
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL_SUCCESS:
      return {
        ...state,
        show: true,
        type: action.payload.type,
        title: action.payload.title,
        content: action.payload.content
      };
    case SHOW_MODAL_DELETE:
      return {
        ...state,
        show: true,
        type: 'delete',
        title: 'Delete!'
      };
    case SHOW_MODAL_ERROR:
      return {
        ...state,
        show: true,
        type: action.payload.type,
        title: action.payload.title,
        content: action.payload.content
      };
    case HIDE_MODAL:
      return initialState;
    default:
      return state;
  }
};

export default modalReducer;
