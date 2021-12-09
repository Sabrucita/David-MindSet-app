import {
  GET_SESSIONS_FETCHING,
  GET_SESSIONS_FULFILLED,
  GET_SESSIONS_REJECTED
} from '../../constants';

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
