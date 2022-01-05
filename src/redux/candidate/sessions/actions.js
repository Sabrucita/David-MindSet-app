import {
  GET_AVAILABLE_DATES_FETCHING,
  GET_AVAILABLE_DATES_FULFILLED,
  GET_AVAILABLE_DATES_REJECTED,
  SET_SELECTED_SESSION,
  CREATE_SESSION_FETCHING,
  CREATE_SESSION_FULFILLED,
  CREATE_SESSION_REJECTED,
  UPDATE_SESSION_FETCHING,
  UPDATE_SESSION_FULFILLED,
  UPDATE_SESSION_REJECTED,
  DELETE_SESSION_FETCHING,
  DELETE_SESSION_FULFILLED,
  DELETE_SESSION_REJECTED,
  GET_SESSION_FETCHING,
  GET_SESSION_FULFILLED,
  GET_SESSION_REJECTED
} from 'constants/candidate/index';

//Get Available Dates
export const getAvailableDatesFetching = () => ({
  type: GET_AVAILABLE_DATES_FETCHING
});

export const getAvailableDatesFulfilled = (payload) => ({
  type: GET_AVAILABLE_DATES_FULFILLED,
  payload
});

export const getAvailableDatesRejected = () => ({
  type: GET_AVAILABLE_DATES_REJECTED
});

//Set Selected Session
export const setSelectedSession = (payload) => ({
  type: SET_SELECTED_SESSION,
  payload
});

//Create Session
export const createSessionFetching = () => ({
  type: CREATE_SESSION_FETCHING
});

export const createSessionFulfilled = (payload) => ({
  type: CREATE_SESSION_FULFILLED,
  payload
});

export const createSessionRejected = () => ({
  type: CREATE_SESSION_REJECTED
});

//Update Session
export const updateSessionFetching = () => ({
  type: UPDATE_SESSION_FETCHING
});

export const updateSessionFulfilled = () => ({
  type: UPDATE_SESSION_FULFILLED
});

export const updateSessionRejected = () => ({
  type: UPDATE_SESSION_REJECTED
});

//Delete Session
export const deleteSessionFetching = () => ({
  type: DELETE_SESSION_FETCHING
});

export const deleteSessionFulfilled = () => ({
  type: DELETE_SESSION_FULFILLED
});

export const deleteSessionRejected = () => ({
  type: DELETE_SESSION_REJECTED
});

//Get Session
export const getSessionFetching = () => ({
  type: GET_SESSION_FETCHING
});

export const getSessionFulfilled = (payload) => ({
  type: GET_SESSION_FULFILLED,
  payload
});

export const getSessionRejected = () => ({
  type: GET_SESSION_REJECTED
});
