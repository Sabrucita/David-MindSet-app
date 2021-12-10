import { url } from '../../constants';
import { showSuccessModal } from '../modal/actions';

import {
  getSessionsFetching,
  getSessionsFulfilled,
  getSessionsRejected,
  getSessionFetching,
  getSessionFulfilled,
  getSessionRejected,
  getSessionsOptionsFulfilled,
  getSessionsOptionsRejected,
  getSessionsOptionsFetching,
  createSessionFetching,
  createSessionFulfilled,
  createSessionRejected,
  updateSessionFetching,
  updateSessionFulfilled,
  updateSessionRejected,
  deleteSessionFetching,
  deleteSessionFulfilled,
  deleteSessionRejected
} from './actions';

export const getSessions = () => {
  return (dispatch) => {
    dispatch(getSessionsFetching());
    fetch(`${url}/sessions`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(getSessionsFulfilled(data));
      })
      .catch((err) => {
        const error = { error: true, msg: err };
        dispatch(getSessionsRejected(error));
      });
  };
};

export const getSession = (id) => {
  return (dispatch) => {
    dispatch(getSessionFetching());
    fetch(`${url}/sessions/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const currentData = {
          idCandidate: data.idCandidate?._id,
          idPsychologist: data.idPsychologist?._id,
          date: data.date
        };
        dispatch(getSessionFulfilled(currentData));
      })
      .catch((err) => {
        const error = { error: true, msg: err };
        dispatch(getSessionRejected(error));
      });
  };
};

export const getSessionsOptions = (resource) => {
  return (dispatch) => {
    dispatch(getSessionsOptionsFetching());
    fetch(`${url}/${resource}`)
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          dispatch(getSessionsOptionsFulfilled(resource, data));
        }
        const data = await res.json();
        dispatch(getSessionsOptionsRejected(data));
      })
      .catch((err) => {
        const error = { error: true, msg: err };
        dispatch(getSessionsOptionsRejected(error));
      });
  };
};

export const createSession = (session) => {
  return (dispatch) => {
    dispatch(createSessionFetching());
    fetch(`${url}/sessions`, {
      method: 'POST',
      body: JSON.stringify(session),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async (res) => {
        if (res.status === 201) {
          const data = await res.json();
          dispatch(createSessionFulfilled(data));
          return dispatch(showSuccessModal('create', 'Application Created', data.data));
        }
        const data = await res.json();
        dispatch(createSessionRejected(data));
      })
      .catch((err) => {
        const error = { error: true, msg: err };
        dispatch(createSessionRejected(error));
      });
  };
};

export const updateSession = (id, session) => {
  return (dispatch) => {
    dispatch(updateSessionFetching());
    fetch(`${url}/sessions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(session),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          dispatch(updateSessionFulfilled(data));
          return dispatch(showSuccessModal('update', 'Application Updated', data.data));
        }
        const data = await res.json();
        dispatch(updateSessionRejected(data));
      })
      .catch((err) => {
        const error = { error: true, msg: err };
        dispatch(updateSessionRejected(error));
      });
  };
};

export const deleteSession = (id) => {
  return (dispatch) => {
    dispatch(deleteSessionFetching());
    fetch(`${url}/sessions/${id}`, {
      method: 'DELETE'
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          dispatch(deleteSessionFulfilled(data));
        } else {
          throw new Error(`HTTP ${res.status}`);
        }
      })
      .catch((err) => {
        const error = { error: true, msg: err };
        dispatch(deleteSessionRejected(error));
      });
  };
};
