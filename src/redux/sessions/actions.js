import {
  GET_SESSIONS_FETCHING,
  GET_SESSIONS_FULFILLED,
  GET_SESSIONS_REJECTED,
  // GET_SESSION,
  // CREATE_SESSION,
  // EDIT_SESSION,
  DELETE_SESSION_FETCHING,
  DELETE_SESSION_FULFILLED,
  DELETE_SESSION_REJECTED
} from '../../constants';

export const getSessionsFetching = () => {
  return {
    type: GET_SESSIONS_FETCHING
  };
};

export const getSessionsFulfilled = (payload) => {
  return {
    type: GET_SESSIONS_FULFILLED,
    payload
  };
};

export const getSessionsRejected = (payload) => {
  return {
    type: GET_SESSIONS_REJECTED,
    payload
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
export const removeSessionFetching = () => {
  return {
    type: DELETE_SESSION_FETCHING
  };
};

export const removeSessionFulfilled = (payload) => {
  return {
    type: DELETE_SESSION_FULFILLED,
    payload
  };
};

export const removeSessionRejected = (payload) => {
  return {
    type: DELETE_SESSION_REJECTED,
    payload
  };
};
