import {
  GET_CANDIDATE_BY_ID_FETCHING,
  GET_CANDIDATE_BY_ID_FULLFILLED,
  GET_CANDIDATE_BY_ID_REJECTED,
  UPDATE_CANDIDATES_FETCHING,
  UPDATE_CANDIDATES_FULLFILLED,
  UPDATE_CANDIDATES_REJECTED,
  GET_INTERVIEW_FETCHING,
  GET_INTERVIEW_FULFILLED,
  GET_INTERVIEW_REJECTED,
  GET_INTERVIEWS_FETCHING,
  GET_INTERVIEWS_FULFILLED,
  GET_INTERVIEWS_REJECTED,
  DELETE_INTERVIEW_FETCHING,
  DELETE_INTERVIEW_FULFILLED,
  DELETE_INTERVIEW_REJECTED,
  INTERVIEWS_CLEANUP,
  CANDIDATES_CLEANUP
} from 'constants/index';

//Get Candidates By ID
export const getCandidateByIdFetching = () => ({
  type: GET_CANDIDATE_BY_ID_FETCHING
});

export const getCandidateByIdFullfilled = (payload) => ({
  type: GET_CANDIDATE_BY_ID_FULLFILLED,
  payload
});

export const getCandidateByIdRejected = () => ({
  type: GET_CANDIDATE_BY_ID_REJECTED
});

export const candidatesCleanUp = () => ({
  type: CANDIDATES_CLEANUP
});

//Update Candidates
export const updateCandidatesFetching = () => ({
  type: UPDATE_CANDIDATES_FETCHING
});

export const updateCandidatesFullfilled = (payload) => ({
  type: UPDATE_CANDIDATES_FULLFILLED,
  payload
});

export const updateCandidatesRejected = () => ({
  type: UPDATE_CANDIDATES_REJECTED
});

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
