import { url } from '../../constants';
import { showModal } from '../modal/actions';

import {
  getAdminsFetching,
  getAdminsFulfilled,
  getAdminsRejected,
  getAdminFetching,
  getAdminFulfilled,
  getAdminRejected,
  createAdminFetching,
  createAdminFulfilled,
  createAdminRejected,
  updateAdminFetching,
  updateAdminFulfilled,
  updateAdminRejected,
  deleteAdminFetching,
  deleteAdminFulfilled,
  deleteAdminRejected
} from './actions';

//Get all admins

export const getAdmins = () => {
  return (dispatch) => {
    dispatch(getAdminsFetching());
    fetch(`${url}/administrators`)
      .then((data) => data.json())
      .then((response) => {
        dispatch(getAdminsFulfilled(response));
      })
      .catch((err) => {
        dispatch(getAdminsRejected(err));
      });
  };
};

//Get one administrator

export const getAdmin = (id) => {
  return (dispatch) => {
    dispatch(getAdminFetching());
    fetch(`${url}/administrators/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const currentData = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password
        };
        dispatch(getAdminFulfilled(currentData));
      })
      .catch((err) => {
        dispatch(getAdminRejected(err));
      });
  };
};

//Delete admin

export const deleteAdmin = (id) => {
  return (dispatch) => {
    dispatch(deleteAdminFetching());
    dispatch(showModal('fetching', 'Deleting Admin', { info: 'Loading...' }));
    fetch(`${url}/administrators/${id}`, {
      method: 'DELETE'
    })
      .then(async (response) => {
        if (response.status === 200) {
          const data = await response.json();
          dispatch(deleteAdminFulfilled(data));
          dispatch(showModal('create', 'Admin Deleted', data.data));
        } else {
          throw new Error(`HTTP ${response.msg}`);
        }
      })
      .catch((err) => {
        dispatch(deleteAdminRejected(err));
        dispatch(showModal('error', 'Upsss an error has happened', { info: err.message }));
      });
  };
};

//add a new admin

export const createAdmin = (admin) => {
  return (dispatch) => {
    dispatch(createAdminFetching());
    dispatch(showModal('fetching', 'Adding new admin', { info: 'Loading...' }));
    fetch(`${url}/administrators`, {
      method: 'POST',
      body: JSON.stringify({
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        password: admin.password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async (res) => {
        if (res.status === 201) {
          const data = await res.json();
          dispatch(createAdminFulfilled(data));
          return dispatch(showModal('create', 'New admin added', data.data));
        }
        throw new Error(`HTTP ${res.status}`);
      })
      .catch((err) => {
        dispatch(createAdminRejected(err));
        dispatch(showModal('error', 'Upsss an error has happened', { info: err.message }));
      });
  };
};

//Update an admin

export const updateAdmin = (id, admin) => {
  return (dispatch) => {
    dispatch(updateAdminFetching());
    dispatch(showModal('fetching', 'Updating admin', { info: 'Loading...' }));
    fetch(`${url}/administrators/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        password: admin.password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          dispatch(updateAdminFulfilled(data));
          return dispatch(showModal('update', 'Admin Updated', data.data));
        }
        throw new Error(`HTTP ${res.status}`);
      })
      .catch((err) => {
        dispatch(updateAdminRejected(err));
        dispatch(showModal('error', 'Upsss an error has happened', { info: err.message }));
      });
  };
};
