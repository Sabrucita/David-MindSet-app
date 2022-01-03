import {
  GET_AVAILABLE_DATES_FETCHING,
  GET_AVAILABLE_DATES_FULFILLED,
  GET_AVAILABLE_DATES_REJECTED,
  SET_SELECTED_SESSION,
  CREATE_SESSION_FETCHING,
  CREATE_SESSION_FULFILLED,
  CREATE_SESSION_REJECTED
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

export const createSessionFulfilled = () => ({
  type: CREATE_SESSION_FULFILLED
});

export const createSessionRejected = () => ({
  type: CREATE_SESSION_REJECTED
});
