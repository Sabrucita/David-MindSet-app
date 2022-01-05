import { url } from 'constants/index';
import { showModal, updateModal } from 'redux/modal/actions';
import {
  getAvailableDatesFetching,
  getAvailableDatesFulfilled,
  getAvailableDatesRejected,
  createSessionFetching,
  createSessionFulfilled,
  createSessionRejected,
  updateSessionFetching,
  updateSessionFulfilled,
  updateSessionRejected,
  deleteSessionFetching,
  deleteSessionFulfilled,
  deleteSessionRejected,
  getSessionFetching,
  getSessionFulfilled,
  getSessionRejected
} from './actions';

export const getAvailableDates = () => {
  return (dispatch) => {
    dispatch(getAvailableDatesFetching());
    fetch(`${url}/candidate/sessions/availableDates`, {
      headers: { token: sessionStorage.getItem('token') }
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          return dispatch(getAvailableDatesFulfilled(data));
        }
      })
      .catch(() => {
        dispatch(getAvailableDatesRejected());
      });
  };
};

export const createSession = (session) => {
  return (dispatch) => {
    dispatch(createSessionFetching());
    dispatch(showModal('sessions', 'fetching'));
    fetch(`${url}/candidate/sessions`, {
      method: 'POST',
      body: JSON.stringify(session.data),
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage.getItem('token')
      }
    })
      .then(async (res) => {
        if (res.status === 201) {
          await res.json();
          dispatch(createSessionFulfilled(session));
          return dispatch(updateModal('create'));
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
    fetch(`${url}/candidate/sessions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(session.data),
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage.getItem('token')
      }
    })
      .then(async (res) => {
        if (res.status === 200) {
          await res.json();
          dispatch(updateSessionFulfilled(session));
          return dispatch(updateModal('update'));
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
    fetch(`${url}/candidate/sessions/${id}`, {
      method: 'DELETE',
      headers: { token: sessionStorage.getItem('token') }
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

export const getSession = (id) => {
  return (dispatch) => {
    dispatch(getSessionFetching());
    fetch(`${url}/candidate/sessions/${id}`, {
      headers: { token: sessionStorage.getItem('token') }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 1) return dispatch(getSessionFulfilled(data[0]));
        return dispatch(getSessionFulfilled({}));
      })
      .catch((err) => {
        dispatch(getSessionRejected());
        dispatch(showModal('sessions', 'error', err.message));
      });
  };
};
