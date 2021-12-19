import { SHOW_MODAL, HIDE_MODAL, UPDATE_MODAL } from 'constants/index';

export const showModal = (resource, type, content) => {
  return {
    type: SHOW_MODAL,
    payload: {
      resource,
      type,
      content
    }
  };
};
export const updateModal = (type, content) => {
  return {
    type: UPDATE_MODAL,
    payload: {
      type,
      content
    }
  };
};
export const hideModal = () => {
  return {
    type: HIDE_MODAL
  };
};
