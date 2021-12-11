import {
  GET_ADMINS_FETCHING,
  GET_ADMINS_FULFILLED,
  GET_ADMINS_REJECTED,
  GET_ADMIN_FETCHING,
  GET_ADMIN_FULFILLED,
  GET_ADMIN_REJECTED,
  CREATE_ADMIN_FETCHING,
  CREATE_ADMIN_FULFILLED,
  CREATE_ADMIN_REJECTED,
  DELETE_ADMIN_FETCHING,
  DELETE_ADMIN_FULFILLED,
  DELETE_ADMIN_REJECTED
} from '../../constants';

//Get all admins

export const getAdminsFetching = () => {
  return {
    type: GET_ADMINS_FETCHING
  };
};

export const getAdminsFulfilled = (payload) => {
  return {
    type: GET_ADMINS_FULFILLED,
    payload
  };
};

export const getAdminsRejected = (payload) => {
  return {
    type: GET_ADMINS_REJECTED,
    payload
  };
};

//Get admins by ID

export const getAdminFetching = () => {
  return {
    type: GET_ADMIN_FETCHING
  };
};

export const getAdminFulfilled = (payload) => {
  return {
    type: GET_ADMIN_FULFILLED,
    payload
  };
};

export const getAdminRejected = (payload) => {
  return {
    type: GET_ADMIN_REJECTED,
    payload
  };
};

//Create admins

export const createAdminFetching = () => {
  return {
    type: CREATE_ADMIN_FETCHING
  };
};

export const createAdminFulfilled = (payload) => {
  return {
    type: CREATE_ADMIN_FULFILLED,
    payload
  };
};

export const createAdminRejected = (payload) => {
  return {
    type: CREATE_ADMIN_REJECTED,
    payload
  };
};

// Delete admins

export const deleteAdminFetching = () => {
  return {
    type: DELETE_ADMIN_FETCHING
  };
};

export const deleteAdminFulfilled = (payload) => {
  return {
    type: DELETE_ADMIN_FULFILLED,
    payload
  };
};

export const deleteAdminRejected = (payload) => {
  return {
    type: DELETE_ADMIN_REJECTED,
    payload
  };
};
