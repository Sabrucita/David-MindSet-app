import { url } from '../../constants';
import { showModal } from '../modal/actions';

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

//Get all Psychologists

export const getPsychologists = () => {
  return (dispatch) => {
    dispatch(getPsychologistsFetching());
    fetch(`${url}/psychologists`)
      .then((data) => data.json())
      .then((response) => {
        dispatch(getPsychologistsFulfilled(response));
      })
      .catch((err) => {
        dispatch(getPsychologistsRejected(err));
      });
  };
};

//Get psychologist

export const getPsychologist = (id) => {
  return (dispatch) => {
    dispatch(getPsychologistFetching());
    fetch(`${url}/psychologists/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const currentData = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password
        };
        dispatch(getPsychologistFulfilled(currentData));
      })
      .catch((err) => {
        dispatch(getPsychologistRejected(err));
      });
  };
};

//Delete psychologist

export const deletePsychologist = (id) => {
  return (dispatch) => {
    dispatch(deletePsychologistFetching());
    dispatch(showModal('fetching', 'Deleting Psychologist', { info: 'Loading...' }));
    fetch(`${url}/psychologists/${id}`, {
      method: 'DELETE'
    })
      .then(async (response) => {
        if (response.status === 200) {
          const data = await response.json();
          dispatch(deletePsychologistFulfilled(data));
          dispatch(showModal('create', 'Psychologist Deleted', data.data));
        } else {
          throw new Error(`HTTP ${response.msg}`);
        }
      })
      .catch((err) => {
        dispatch(deletePsychologistRejected(err));
        dispatch(showModal('error', 'Upsss an error has happened', { info: err.message }));
      });
  };
};

//add a new Psychologist

export const createPsychologist = (psychologist) => {
  return (dispatch) => {
    dispatch(createPsychologistFetching());
    dispatch(showModal('fetching', 'Adding new psychologist', { info: 'Loading...' }));
    fetch(`${url}/psychologists`, {
      method: 'POST',
      body: JSON.stringify({
        firstName: psychologist.firstName,
        lastName: psychologist.lastName,
        email: psychologist.email,
        password: psychologist.password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async (res) => {
        if (res.status === 201) {
          const data = await res.json();
          dispatch(createPsychologistFulfilled(data));
          return dispatch(showModal('create', 'New psychologist added', data.data));
        }
        throw new Error(`HTTP ${res.status}`);
      })
      .catch((err) => {
        dispatch(createPsychologistRejected(err));
        dispatch(showModal('error', 'Upsss an error has happened', { info: err.message }));
      });
  };
};

//Update a psychologist

export const updatePsychologist = (id, psychologist) => {
  return (dispatch) => {
    dispatch(updatePsychologistFetching());
    dispatch(showModal('fetching', 'Updating psychologist', { info: 'Loading...' }));
    fetch(`${url}/psychologists/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        firstName: psychologist.firstName,
        lastName: psychologist.lastName,
        email: psychologist.email,
        password: psychologist.password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          dispatch(updatePsychologistFulfilled(data));
          return dispatch(showModal('update', 'Psychologist Updated', data.data));
        }
        throw new Error(`HTTP ${res.status}`);
      })
      .catch((err) => {
        dispatch(updatePsychologistRejected(err));
        dispatch(showModal('error', 'Upsss an error has happened', { info: err.message }));
      });
  };
};
