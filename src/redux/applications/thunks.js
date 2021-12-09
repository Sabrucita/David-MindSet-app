import { url } from '../../constants';

import {
  getApplicationsFetching,
  getApplicationsFulfilled,
  getApplicationsRejected
} from './actions';

export const getApplications = () => {
  return (dispatch) => {
    dispatch(getApplicationsFetching());
    fetch(`${url}/applications`)
      .then((data) => data.json())
      .then((response) => {
        dispatch(getApplicationsFulfilled(response));
      })
      .catch((err) => {
        dispatch(getApplicationsRejected(err));
      });
  };
};
