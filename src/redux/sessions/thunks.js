import { url } from '../../constants';

import { getSessionsFetching, getSessionsFulfilled, getSessionsRejected } from './actions';

export const getSessions = () => {
  return (dispatch) => {
    dispatch(getSessionsFetching());
    fetch(`${url}/sessions`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(getSessionsFulfilled(data));
      })
      .catch((err) => {
        dispatch(getSessionsRejected(err));
      });
  };
};
