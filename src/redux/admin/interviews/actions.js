import {
  GET_INTERVIEW_FETCHING,
  GET_INTERVIEW_FULFILLED,
  GET_INTERVIEW_REJECTED,
  GET_INTERVIEWS_FETCHING,
  GET_INTERVIEWS_FULFILLED,
  GET_INTERVIEWS_REJECTED,
  DELETE_INTERVIEW_FETCHING,
  DELETE_INTERVIEW_FULFILLED,
  DELETE_INTERVIEW_REJECTED,
  CREATE_INTERVIEW_FETCHING,
  CREATE_INTERVIEW_FULFILLED,
  CREATE_INTERVIEW_REJECTED,
  UPDATE_INTERVIEW_FETCHING,
  UPDATE_INTERVIEW_FULFILLED,
  UPDATE_INTERVIEW_REJECTED,
  INTERVIEWS_CLEANUP,
  GET_INTERVIEWS_OPTIONS_FETCHING,
  GET_INTERVIEWS_OPTIONS_FULFILLED,
  GET_INTERVIEWS_OPTIONS_REJECTED
} from 'constants/index';

//GET 1 INTERVIEW
export const getInterviewFetching = () => ({
  type: GET_INTERVIEW_FETCHING
});

export const getInterviewFulfilled = (payload) => ({
  type: GET_INTERVIEW_FULFILLED,
  payload
});

export const getInterviewRejected = () => ({
  type: GET_INTERVIEW_REJECTED
});

//CLEAN INTERVIEW
export const interviewsCleanUp = () => ({
  type: INTERVIEWS_CLEANUP
});

//GET ALL INTERVIEWS
export const getInterviewsFetching = () => ({
  type: GET_INTERVIEWS_FETCHING
});

export const getInterviewsFulfilled = (payload) => ({
  type: GET_INTERVIEWS_FULFILLED,
  payload
});

export const getInterviewsRejected = () => ({
  type: GET_INTERVIEWS_REJECTED
});

//DELETE INTERVIEWS
export const deleteInterviewFetching = () => ({
  type: DELETE_INTERVIEW_FETCHING
});

export const deleteInterviewFulfilled = (payload) => ({
  type: DELETE_INTERVIEW_FULFILLED,
  payload
});

export const deleteInterviewRejected = () => ({
  type: DELETE_INTERVIEW_REJECTED
});

//CREATE INTERVIEWS
export const createInterviewFetching = () => ({
  type: CREATE_INTERVIEW_FETCHING
});

export const createInterviewFulfilled = (payload) => ({
  type: CREATE_INTERVIEW_FULFILLED,
  payload
});

export const createInterviewRejected = () => ({
  type: CREATE_INTERVIEW_REJECTED
});

//UPDATE INTERVIEWS
export const updateInterviewFetching = () => ({
  type: UPDATE_INTERVIEW_FETCHING
});

export const updateInterviewFulfilled = (payload) => ({
  type: UPDATE_INTERVIEW_FULFILLED,
  payload
});

export const updateInterviewRejected = () => ({
  type: UPDATE_INTERVIEW_REJECTED
});

// GET OPTIONS
export const getInterviewsOptionsFetching = () => {
  return {
    type: GET_INTERVIEWS_OPTIONS_FETCHING
  };
};
export const getInterviewsOptionsFulfilled = (resource, payload) => {
  return {
    type: GET_INTERVIEWS_OPTIONS_FULFILLED,
    resource,
    payload
  };
};
export const getInterviewsOptionsRejected = () => {
  return {
    type: GET_INTERVIEWS_OPTIONS_REJECTED
  };
};
