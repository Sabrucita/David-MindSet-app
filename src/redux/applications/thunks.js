import { url } from '../../constants';
import { showModal } from '../modal/actions';

import {
  getApplicationsFetching,
  getApplicationsFulfilled,
  getApplicationsRejected,
  deleteApplicationFetching,
  deleteApplicationFulfilled,
  deleteApplicationRejected,
  createApplicationFetching,
  createApplicationFulfilled,
  createApplicationRejected,
  updateApplicationFetching,
  updateApplicationFulfilled,
  updateApplicationRejected
} from './actions';

export const getApplications = () => {
  return (dispatch) => {
    dispatch(getApplicationsFetching());
    fetch(`${url}/applications`)
      .then((data) => data.json())
      .then((res) => {
        dispatch(getApplicationsFulfilled(res));
      })
      .catch((err) => {
        dispatch(getApplicationsRejected(err));
      });
  };
};

export const deleteApplication = (id) => {
  return (dispatch) => {
    dispatch(deleteApplicationFetching());
    dispatch(showModal('fetching', 'Deleting Application', { info: 'Loading...' }));
    fetch(`${url}/applications/${id}`, {
      method: 'DELETE'
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          console.log(data);
          dispatch(deleteApplicationFulfilled(data));
          //I used the create type to stop showing the accept button.
          dispatch(showModal('create', 'Application Delete', { info: 'Loading...' }));
        } else {
          throw new Error(`HTTP ${res.status}`);
        }
      })
      .catch((err) => {
        dispatch(deleteApplicationRejected(err));
        dispatch(showModal('error', 'Upsss an error has happened', err));
      });
  };
};

export const createApplication = (obj) => {
  return (dispatch) => {
    dispatch(createApplicationFetching());
    dispatch(showModal('fetching', 'Creating Application', { info: 'Loading...' }));
    fetch(`${url}/applications`, {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async (res) => {
        if (res.status === 201) {
          const data = await res.json();
          dispatch(createApplicationFulfilled(data));
          return dispatch(showModal('create', 'Application Created', data.data));
        }
        throw new Error(`HTTP ${res.status}`);
      })
      .catch((err) => {
        dispatch(createApplicationRejected(err));
        dispatch(showModal('error', 'Upsss an error has happened', err));
      });
  };
};

export const updateApplication = (id, obj) => {
  return (dispatch) => {
    dispatch(updateApplicationFetching());
    dispatch(showModal('fetching', 'Updating Application', { info: 'Loading...' }));
    fetch(`${url}/applications/${id}`, {
      method: 'PUT',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          dispatch(updateApplicationFulfilled(data));
          return dispatch(showModal('update', 'Application Updated', data.data));
        }
        throw new Error(`HTTP ${res.status}`);
      })
      .catch((err) => {
        dispatch(updateApplicationRejected(err));
        dispatch(showModal('error', 'Upsss an error has happened', err));
      });
  };
};
