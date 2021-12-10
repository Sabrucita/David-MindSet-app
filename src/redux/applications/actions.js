import {
  GET_APPLICATIONS_FETCHING,
  GET_APPLICATIONS_FULFILLED,
  GET_APPLICATIONS_REJECTED,
  DELETE_APPLICATION_FETCHING,
  DELETE_APPLICATION_FULFILLED,
  DELETE_APPLICATION_REJECTED
} from '../../constants';

//GET APPLICATIONS
export const getApplicationsFetching = () => ({
  type: GET_APPLICATIONS_FETCHING
});

export const getApplicationsFulfilled = (payload) => ({
  type: GET_APPLICATIONS_FULFILLED,
  payload
});

export const getApplicationsRejected = (payload) => ({
  type: GET_APPLICATIONS_REJECTED,
  payload
});

//DELETE APPLICATION
export const deleteApplicationFetching = () => ({
  type: DELETE_APPLICATION_FETCHING
});

export const deleteApplicationFulfilled = (payload) => ({
  type: DELETE_APPLICATION_FULFILLED,
  payload
});

export const deleteApplicationRejected = (payload) => ({
  type: DELETE_APPLICATION_REJECTED,
  payload
});
