import {
  GET_ADMINS_FETCHING,
  GET_ADMINS_FULFILLED,
  GET_ADMINS_REJECTED
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
