import { url } from 'constants/index';
import { showModal, updateModal } from 'redux/modal/actions';
import {
  getAvailableDatesFetching,
  getAvailableDatesFulfilled,
  getAvailableDatesRejected,
  createSessionFetching,
  createSessionFulfilled,
  createSessionRejected
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
        'Content-Type': 'application/json'
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
