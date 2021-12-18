import {
  GET_APPLICATION_FETCHING,
  GET_APPLICATION_FULFILLED,
  GET_APPLICATION_REJECTED,
  GET_APPLICATIONS_FETCHING,
  GET_APPLICATIONS_FULFILLED,
  GET_APPLICATIONS_REJECTED,
  DELETE_APPLICATION_FETCHING,
  DELETE_APPLICATION_FULFILLED,
  DELETE_APPLICATION_REJECTED,
  CREATE_APPLICATION_FETCHING,
  CREATE_APPLICATION_FULFILLED,
  CREATE_APPLICATION_REJECTED,
  UPDATE_APPLICATION_FETCHING,
  UPDATE_APPLICATION_FULFILLED,
  UPDATE_APPLICATION_REJECTED,
  APPLICATIONS_CLEANUP,
  GET_APPLICATIONS_OPTIONS_FETCHING,
  GET_APPLICATIONS_OPTIONS_FULFILLED,
  GET_APPLICATIONS_OPTIONS_REJECTED
} from '../../constants';

//GET 1 APPLICATION
export const getApplicationFetching = () => ({
  type: GET_APPLICATION_FETCHING
});

export const getApplicationFulfilled = (payload) => ({
  type: GET_APPLICATION_FULFILLED,
  payload
});

export const getApplicationRejected = () => ({
  type: GET_APPLICATION_REJECTED
});

//CLEAN APPLICATION
export const applicationsCleanUp = () => ({
  type: APPLICATIONS_CLEANUP
});

//GET ALL APPLICATIONS
export const getApplicationsFetching = () => ({
  type: GET_APPLICATIONS_FETCHING
});

export const getApplicationsFulfilled = (payload) => ({
  type: GET_APPLICATIONS_FULFILLED,
  payload
});

export const getApplicationsRejected = () => ({
  type: GET_APPLICATIONS_REJECTED
});

//DELETE APPLICATION
export const deleteApplicationFetching = () => ({
  type: DELETE_APPLICATION_FETCHING
});

export const deleteApplicationFulfilled = (payload) => ({
  type: DELETE_APPLICATION_FULFILLED,
  payload
});

export const deleteApplicationRejected = () => ({
  type: DELETE_APPLICATION_REJECTED
});

//CREATE APPLICATION
export const createApplicationFetching = () => ({
  type: CREATE_APPLICATION_FETCHING
});

export const createApplicationFulfilled = (payload) => ({
  type: CREATE_APPLICATION_FULFILLED,
  payload
});

export const createApplicationRejected = () => ({
  type: CREATE_APPLICATION_REJECTED
});

//UPDATE APPLICATION
export const updateApplicationFetching = () => ({
  type: UPDATE_APPLICATION_FETCHING
});

export const updateApplicationFulfilled = (payload) => ({
  type: UPDATE_APPLICATION_FULFILLED,
  payload
});

export const updateApplicationRejected = () => ({
  type: UPDATE_APPLICATION_REJECTED
});

// GET OPTIONS
export const getApplicationsOptionsFetching = () => {
  return {
    type: GET_APPLICATIONS_OPTIONS_FETCHING
  };
};
export const getApplicationsOptionsFulfilled = (resource, payload) => {
  return {
    type: GET_APPLICATIONS_OPTIONS_FULFILLED,
    resource,
    payload
  };
};
export const getApplicationsOptionsRejected = () => {
  return {
    type: GET_APPLICATIONS_OPTIONS_REJECTED
  };
};
