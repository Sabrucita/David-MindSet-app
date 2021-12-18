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
  UPDATE_ADMIN_FETCHING,
  UPDATE_ADMIN_FULFILLED,
  UPDATE_ADMIN_REJECTED,
  DELETE_ADMIN_FETCHING,
  DELETE_ADMIN_FULFILLED,
  DELETE_ADMIN_REJECTED,
  ADMINS_CLEANUP
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

export const getAdminsRejected = () => {
  return {
    type: GET_ADMINS_REJECTED
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

export const getAdminRejected = () => {
  return {
    type: GET_ADMIN_REJECTED
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

export const createAdminRejected = () => {
  return {
    type: CREATE_ADMIN_REJECTED
  };
};

// Update admins

export const updateAdminFetching = () => {
  return {
    type: UPDATE_ADMIN_FETCHING
  };
};

export const updateAdminFulfilled = (payload) => {
  return {
    type: UPDATE_ADMIN_FULFILLED,
    payload
  };
};

export const updateAdminRejected = () => {
  return {
    type: UPDATE_ADMIN_REJECTED
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

export const deleteAdminRejected = () => {
  return {
    type: DELETE_ADMIN_REJECTED
  };
};

//Clean selected element
export const adminsCleanUp = () => ({
  type: ADMINS_CLEANUP
});
