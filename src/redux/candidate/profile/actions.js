import {
  GET_CANDIDATE_BY_ID_FETCHING,
  GET_CANDIDATE_BY_ID_FULLFILLED,
  GET_CANDIDATE_BY_ID_REJECTED,
  UPDATE_CANDIDATES_FETCHING,
  UPDATE_CANDIDATES_FULLFILLED,
  UPDATE_CANDIDATES_REJECTED,
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
