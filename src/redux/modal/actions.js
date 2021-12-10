import {
  SHOW_MODAL_SUCCESS,
  SHOW_MODAL_DELETE,
  SHOW_MODAL_ERROR,
  HIDE_MODAL
} from '../../constants';

export const showSuccessModal = (type, title, content) => {
  return {
    type: SHOW_MODAL_SUCCESS,
    payload: {
      type,
      title,
      content
    }
  };
};
export const showDeleteModal = () => {
  return {
    type: SHOW_MODAL_DELETE
  };
};
export const showErrorModal = (type, title, content) => {
  return {
    type: SHOW_MODAL_ERROR,
    payload: {
      type,
      title,
      content
    }
  };
};
export const hideModal = () => {
  return {
    type: HIDE_MODAL
  };
};
