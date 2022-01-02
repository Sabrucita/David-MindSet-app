import {
  GET_AVAILABLE_DATES_FETCHING,
  GET_AVAILABLE_DATES_FULFILLED,
  GET_AVAILABLE_DATES_REJECTED
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
