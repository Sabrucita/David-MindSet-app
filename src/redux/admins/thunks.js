import { url } from '../../constants';
import { showModal } from '../modal/actions';

import {
  getAdminsFetching,
  getAdminsFulfilled,
  getAdminsRejected,
  //getAdminFetching,
  //getAdminFulfilled,
  //getAdminRejected,
  createAdminFetching,
  createAdminFulfilled,
  createAdminRejected,
  deleteAdminFetching,
  deleteAdminFulfilled,
  deleteAdminRejected
} from './actions';

export const getAdmins = () => {
  return (dispatch) => {
    dispatch(getAdminsFetching());
    fetch(`${url}/administrators`)
      .then((data) => data.json())
      .then((res) => {
        dispatch(getAdminsFulfilled(res));
      })
      .catch((err) => {
        dispatch(getAdminsRejected(err));
      });
  };
};

export const createAdmin = (val) => {
  return (dispatch) => {
    dispatch(createAdminFetching());
    dispatch(showModal('fetching', 'Adding new administrator', { info: 'Loading...' }));
    fetch(`${url}/administrators`, {
      method: 'POST',
      body: JSON.stringify(val),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async (res) => {
        if (res.status === 201) {
          const data = await res.json();
          dispatch(createAdminFulfilled(data));
          return dispatch(showModal('create', 'New administrator added', data.data));
        }
        throw new Error(`HTTP ${res.status}`);
      })
      .catch((err) => {
        dispatch(createAdminRejected(err));
        dispatch(showModal('error', 'Upsss an error has happened', err));
      });
  };
};

export const deleteAdmin = (id) => {
  return (dispatch) => {
    dispatch(deleteAdminFetching());
    dispatch(showModal('fetching', 'Deleting Administator', { info: 'Loading...' }));
    fetch(`${url}/administrator/${id}`, {
      method: 'DELETE'
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          dispatch(deleteAdminFulfilled(data));
          dispatch(showModal('create', 'Administrator Deleted', data.data));
        } else {
          throw new Error(`HTTP ${res.status}`);
        }
      })
      .catch((err) => {
        dispatch(deleteAdminRejected(err));
        dispatch(showModal('error', 'Upsss an error has happened', err));
      });
  };
};
