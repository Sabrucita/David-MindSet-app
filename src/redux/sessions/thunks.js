import { url } from '../../constants';
import { showModal, updateModal } from '../modal/actions';
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
        dispatch(getSessionsRejected());
        dispatch(showModal('sessions', 'error', err.message));
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
          date: data.date.substr(0, 16)
        };
        dispatch(getSessionFulfilled(currentData));
      })
      .catch((err) => {
        dispatch(getSessionRejected());
        dispatch(showModal('sessions', 'error', err.message));
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
        dispatch(updateModal('error', data.msg));
      })
      .catch((err) => {
        dispatch(getSessionsOptionsRejected());
        dispatch(updateModal('error', err.message));
      });
  };
};

export const createSession = (session) => {
  return (dispatch) => {
    dispatch(createSessionFetching());
    dispatch(showModal('sessions', 'fetching'));
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
          return dispatch(updateModal('create', data.data));
        }
        const data = await res.json();
        dispatch(createSessionRejected(data));
        dispatch(updateModal('error', data.msg));
      })
      .catch((err) => {
        dispatch(createSessionRejected());
        dispatch(updateModal('error', err.message));
      });
  };
};

export const updateSession = (id, session) => {
  return (dispatch) => {
    dispatch(updateSessionFetching());
    dispatch(showModal('sessions', 'fetching'));
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
          data.data.idCandidate = data.data.idCandidate._id;
          data.data.idPsychologist = data.data.idPsychologist._id;
          dispatch(updateSessionFulfilled(data));
          return dispatch(updateModal('update', data.data));
        }
        const data = await res.json();
        dispatch(updateSessionRejected(data));
        dispatch(updateModal('error', data.msg));
      })
      .catch((err) => {
        dispatch(updateSessionRejected());
        dispatch(updateModal('error', err.message));
      });
  };
};

export const deleteSession = (id) => {
  return (dispatch) => {
    dispatch(deleteSessionFetching());
    dispatch(updateModal('fetching'));
    fetch(`${url}/sessions/${id}`, {
      method: 'DELETE'
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          data.data.idCandidate = data.data.idCandidate?._id;
          data.data.idPsychologist = data.data.idPsychologist?._id;
          dispatch(deleteSessionFulfilled(data));
          return dispatch(updateModal('deleted', data.data));
        }
        const data = await res.json();
        dispatch(updateSessionRejected(data));
        dispatch(updateModal('error', data.msg));
      })
      .catch((err) => {
        dispatch(deleteSessionRejected());
        dispatch(updateModal('error', err.message));
      });
  };
};
