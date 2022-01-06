import { url } from 'constants/index';
import { showModal, updateModal } from 'redux/modal/actions';

import {
  getPsychologistsFetching,
  getPsychologistsFulfilled,
  getPsychologistsRejected,
  getPsychologistFetching,
  getPsychologistFulfilled,
  getPsychologistRejected,
  createPsychologistFetching,
  createPsychologistFulfilled,
  createPsychologistRejected,
  updatePsychologistFetching,
  updatePsychologistFulfilled,
  updatePsychologistRejected,
  deletePsychologistFetching,
  deletePsychologistFulfilled,
  deletePsychologistRejected
} from './actions';

//Get one psychologist (by ID)

export const getPsychologist = (id) => {
  return (dispatch) => {
    dispatch(getPsychologistFetching());
    fetch(`${url}/admin/psychologists/${id}`, {
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
            pictureUrl: data.pictureUrl
          };
          return dispatch(getPsychologistFulfilled(currentData));
        }
      })
      .catch((err) => {
        dispatch(getPsychologistRejected(err));
      });
  };
};

//Get all Psychologists
export const getPsychologists = () => {
  return (dispatch) => {
    dispatch(getPsychologistsFetching());
    fetch(`${url}/admin/psychologists`, {
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage.getItem('token')
      }
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(getPsychologistsFulfilled(data));
      })
      .catch((err) => {
        dispatch(getPsychologistsRejected(err));
      });
  };
};

//Delete Psychologist

export const deletePsychologist = (id) => {
  return (dispatch) => {
    dispatch(deletePsychologistFetching());
    dispatch(showModal('psychologists', 'fetching'));
    fetch(`${url}/admin/psychologists/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage.getItem('token')
      }
    })
      .then(async (response) => {
        if (response.status === 200) {
          const data = await response.json();
          dispatch(deletePsychologistFulfilled(data));
          return dispatch(updateModal('deleted', data.data));
        }
        const data = await response.json();
        dispatch(updatePsychologistRejected(data));
      })
      .catch((err) => {
        dispatch(deletePsychologistRejected(err));
        dispatch(showModal('psychologists', 'error', err.message));
      });
  };
};

//Add new psychologist

export const createPsychologist = (psychologist) => {
  return (dispatch) => {
    dispatch(createPsychologistFetching());
    dispatch(showModal('psychologists', 'fetching'));
    fetch(`${url}/admin/psychologists`, {
      method: 'POST',
      body: JSON.stringify(psychologist),
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage.getItem('token')
      }
    })
      .then(async (res) => {
        if (res.status === 201) {
          const data = await res.json();
          dispatch(createPsychologistFulfilled(data));
          return dispatch(showModal('psychologists', 'create', data.data));
        }
        const data = await res.json();
        dispatch(createPsychologistRejected(data));
        dispatch(showModal('psychologists', 'error', data.msg || data.message));
      })
      .catch((err) => {
        dispatch(createPsychologistRejected(err));
        dispatch(showModal('psychologists', 'error', err.message));
      });
  };
};

//Update psychologist

export const updatePsychologist = (id, psychologist) => {
  return (dispatch) => {
    dispatch(updatePsychologistFetching());
    dispatch(showModal('psychologists', 'fetching'));
    fetch(`${url}/admin/psychologists/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        firstName: psychologist.firstName,
        lastName: psychologist.lastName,
        pictureUrl: psychologist.pictureUrl
      }),
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage.getItem('token')
      }
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          dispatch(updatePsychologistFulfilled(data));
          return dispatch(showModal('psychologists', 'update', data.data));
        }
        const data = await res.json();
        dispatch(updatePsychologistRejected(data));
        dispatch(showModal('psychologists', 'error', data.msg));
      })
      .catch((err) => {
        dispatch(updatePsychologistRejected(err));
        dispatch(showModal('psychologists', 'error', err.message));
      });
  };
};
