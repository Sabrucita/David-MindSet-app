import { SHOW_MODAL, HIDE_MODAL } from '../../constants';

export const showModal = (type, title, content) => {
  return {
    type: SHOW_MODAL,
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
