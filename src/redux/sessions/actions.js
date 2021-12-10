import {
  GET_SESSIONS_FETCHING,
  GET_SESSIONS_FULFILLED,
  GET_SESSIONS_REJECTED,
  GET_SESSION_FETCHING,
  GET_SESSION_FULFILLED,
  GET_SESSION_REJECTED,
  UPDATE_SELECTED_SESSION,
  GET_SESSIONS_OPTIONS_FETCHING,
  GET_SESSIONS_OPTIONS_FULFILLED,
  GET_SESSIONS_OPTIONS_REJECTED,
  CREATE_SESSION_FETCHING,
  CREATE_SESSION_FULFILLED,
  CREATE_SESSION_REJECTED,
  UPDATE_SESSION_FETCHING,
  UPDATE_SESSION_FULFILLED,
  UPDATE_SESSION_REJECTED,
  DELETE_SESSION_FETCHING,
  DELETE_SESSION_FULFILLED,
  DELETE_SESSION_REJECTED
} from '../../constants';

// GET SESSIONS
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

// GET SESSION
export const getSessionFetching = () => {
  return {
    type: GET_SESSION_FETCHING
  };
};
export const getSessionFulfilled = (payload) => {
  return {
    type: GET_SESSION_FULFILLED,
    payload
  };
};
export const getSessionRejected = (payload) => {
  return {
    type: GET_SESSION_REJECTED,
    payload
  };
};

// UPDATE SELECTED SESSION
export const updateSelectedSession = (field, value) => {
  return {
    type: UPDATE_SELECTED_SESSION,
    payload: { field, value }
  };
};

// GET OPTIONS
export const getSessionsOptionsFetching = () => {
  return {
    type: GET_SESSIONS_OPTIONS_FETCHING
  };
};
export const getSessionsOptionsFulfilled = (resource, payload) => {
  return {
    type: GET_SESSIONS_OPTIONS_FULFILLED,
    resource,
    payload
  };
};
export const getSessionsOptionsRejected = (payload) => {
  return {
    type: GET_SESSIONS_OPTIONS_REJECTED,
    payload
  };
};

// CREATE SESSIONS
export const createSessionFetching = () => {
  return {
    type: CREATE_SESSION_FETCHING
  };
};
export const createSessionFulfilled = (payload) => {
  return {
    type: CREATE_SESSION_FULFILLED,
    payload
  };
};
export const createSessionRejected = (payload) => {
  return {
    type: CREATE_SESSION_REJECTED,
    payload
  };
};

// UPDATE SESSIONS
export const updateSessionFetching = () => {
  return {
    type: UPDATE_SESSION_FETCHING
  };
};
export const updateSessionFulfilled = (payload) => {
  return {
    type: UPDATE_SESSION_FULFILLED,
    payload
  };
};
export const updateSessionRejected = (payload) => {
  return {
    type: UPDATE_SESSION_REJECTED,
    payload
  };
};

// DELETE SESSION
export const deleteSessionFetching = () => {
  return {
    type: DELETE_SESSION_FETCHING
  };
};
export const deleteSessionFulfilled = (payload) => {
  return {
    type: DELETE_SESSION_FULFILLED,
    payload
  };
};
export const deleteSessionRejected = (payload) => {
  return {
    type: DELETE_SESSION_REJECTED,
    payload
  };
};
