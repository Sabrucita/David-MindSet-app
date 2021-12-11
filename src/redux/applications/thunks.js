import { url } from '../../constants';
import { showModal } from '../modal/actions';

import {
  getApplicationFetching,
  getApplicationFulfilled,
  getApplicationRejected,
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
  updateApplicationRejected,
  getApplicationsOptionsFetching,
  getApplicationsOptionsFulfilled,
  getApplicationsOptionsRejected
} from './actions';

//GET 1 APPLICATION
export const getApplication = (id) => {
  return (dispatch) => {
    dispatch(getApplicationFetching());
    fetch(`${url}/applications/${id}`)
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          const currentData = {
            idCandidate: data.idCandidate?._id,
            idOpenPosition: data.idOpenPosition?._id,
            status: data.status
          };
          return dispatch(getApplicationFulfilled(currentData));
        }
        const data = await res.json();
        throw new Error(data.msg);
      })
      .catch((err) => {
        dispatch(getApplicationRejected(err));
        dispatch(showModal('error', 'Upsss an error has happened', { info: err.message }));
      });
  };
};

//GET ALL APPLICATIONS
export const getApplications = () => {
  return (dispatch) => {
    dispatch(getApplicationsFetching());
    fetch(`${url}/applications`)
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          return dispatch(getApplicationsFulfilled(data));
        }
        const data = await res.json();
        throw new Error(data.msg);
      })
      .catch((err) => {
        dispatch(getApplicationsRejected(err));
        dispatch(showModal('error', 'Upsss an error has happened', { info: err.message }));
      });
  };
};

//DELETE APPLICATION
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
          dispatch(deleteApplicationFulfilled(data));
          //I used the create type to stop showing the accept button.
          return dispatch(showModal('create', 'Application Deleted', data.data));
        }
        const data = await res.json();
        throw new Error(data.msg);
      })
      .catch((err) => {
        dispatch(deleteApplicationRejected(err));
        dispatch(showModal('error', 'Upsss an error has happened', { info: err.message }));
      });
  };
};

//CREATE APPLICATION
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
        const data = await res.json();
        throw new Error(data.msg);
      })
      .catch((err) => {
        dispatch(createApplicationRejected(err));
        dispatch(showModal('error', 'Upsss an error has happened', { info: err.message }));
      });
  };
};

//UPDATE APPLICATION
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
        const data = await res.json();
        throw new Error(data.msg);
      })
      .catch((err) => {
        dispatch(updateApplicationRejected(err));
        dispatch(showModal('error', 'Upsss an error has happened', { info: err.message }));
      });
  };
};

//GET OPTIONS
export const getApplicationsOptions = (resource) => {
  return (dispatch) => {
    dispatch(getApplicationsOptionsFetching());
    fetch(`${url}/${resource}`)
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          return dispatch(getApplicationsOptionsFulfilled(resource, data));
        }
        const data = await res.json();
        throw new Error(data.msg);
      })
      .catch((err) => {
        dispatch(getApplicationsOptionsRejected(err));
        dispatch(showModal('error', 'Upsss an error has happened', { info: err.message }));
      });
  };
};
