import {
  GET_APPLICATIONS_FETCHING,
  GET_APPLICATIONS_FULFILLED,
  GET_APPLICATIONS_REJECTED
} from '../../constants';

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
