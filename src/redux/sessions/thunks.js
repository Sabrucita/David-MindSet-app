import { url } from '../../constants';

import {
  getSessionsFetching,
  getSessionsFulfilled,
  getSessionsRejected,
  removeSessionFetching,
  removeSessionFulfilled,
  removeSessionRejected
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
        dispatch(getSessionsRejected(err));
      });
  };
};
/*
export const getSession = (id) => {
  return {
    type: GET_SESSION,
    payload: {
      id
    }
  };
};

export const createSession = (id, session) => {
  return {
    type: CREATE_SESSION,
    payload: {
      id,
      session
    }
  };
};

export const editSession = (id, session) => {
  return {
    type: EDIT_SESSION,
    payload: {
      id,
      session
    }
  };
};
*/
export const removeSession = (id) => {
  return (dispatch) => {
    dispatch(removeSessionFetching());
    fetch(`${url}/sessions/${id}`, {
      method: 'DELETE'
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          dispatch(removeSessionFulfilled(data));
        } else {
          throw new Error(`HTTP ${res.status}`);
        }
      })
      .catch((err) => {
        dispatch(removeSessionRejected(err));
      });
  };
};
