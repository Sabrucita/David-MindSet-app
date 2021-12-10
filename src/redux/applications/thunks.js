import { url } from '../../constants';

import {
  getApplicationsFetching,
  getApplicationsFulfilled,
  getApplicationsRejected,
  deleteApplicationFetching,
  deleteApplicationFulfilled,
  deleteApplicationRejected
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

export const deleteApplication = (id) => {
  return (dispatch) => {
    dispatch(deleteApplicationFetching());
    fetch(`${url}/applications/${id}`, {
      method: 'DELETE'
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          dispatch(deleteApplicationFulfilled(data));
        } else {
          throw new Error(`HTTP ${res.status}`);
        }
      })
      .catch((err) => {
        dispatch(deleteApplicationRejected(err));
      });
  };
};
