import { url } from 'constants/index';
import { showModal, updateModal } from 'redux/modal/actions';

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

//Get one admin (by ID)

export const getAdmin = (id) => {
  return (dispatch) => {
    dispatch(getAdminFetching());
    fetch(`${url}/admin/administrators/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage.getItem('token')
      }
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          const currentData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password
          };
          return dispatch(getAdminFulfilled(currentData));
        }
      })
      .catch((err) => {
        dispatch(getAdminRejected(err));
      });
  };
};

//Get all admins
export const getAdmins = () => {
  return (dispatch) => {
    dispatch(getAdminsFetching());
    fetch(`${url}/admin/administrators`, {
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage.getItem('token')
      }
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(getAdminsFulfilled(data));
      })
      .catch((err) => {
        dispatch(getAdminsRejected(err));
      });
  };
};

//Delete admin

export const deleteAdmin = (id) => {
  return (dispatch) => {
    dispatch(deleteAdminFetching());
    dispatch(showModal('administrators', 'fetching'));
    fetch(`${url}/admin/administrators/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage.getItem('token')
      }
    })
      .then(async (response) => {
        if (response.status === 200) {
          const data = await response.json();
          dispatch(deleteAdminFulfilled(data));
          return dispatch(updateModal('deleted', data.data));
        }
        const data = await response.json();
        dispatch(updateAdminRejected(data));
        dispatch(showModal('administrators', 'error', data.msg));
      })
      .catch((err) => {
        dispatch(deleteAdminRejected(err));
        dispatch(showModal('administrators', 'error', err.message));
      });
  };
};

//Update admin

export const updateAdmin = (id, admin) => {
  return (dispatch) => {
    dispatch(updateAdminFetching());
    dispatch(showModal('administrators', 'fetching'));
    fetch(`${url}/admin/administrators/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        password: admin.password
      }),
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage.getItem('token')
      }
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          dispatch(updateAdminFulfilled(data));
          return dispatch(showModal('administrators', 'update', data.data));
        }
        const data = await res.json();
        dispatch(updateAdminRejected(data));
        dispatch(showModal('administrators', 'error', data.msg));
      })
      .catch((err) => {
        dispatch(updateAdminRejected(err));
        dispatch(showModal('administrators', 'error', err.message));
      });
  };
};
