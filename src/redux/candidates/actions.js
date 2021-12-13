import {
  GET_CANDIDATES_FETCHING,
  GET_CANDIDATES_FULLFILLED,
  GET_CANDIDATES_REJECTED,
  GET_CANDIDATE_BY_ID_FETCHING,
  GET_CANDIDATE_BY_ID_FULLFILLED,
  GET_CANDIDATE_BY_ID_REJECTED,
  CREATE_CANDIDATES_FETCHING,
  CREATE_CANDIDATES_FULLFILLED,
  CREATE_CANDIDATES_REJECTED,
  UPDATE_CANDIDATES_FETCHING,
  UPDATE_CANDIDATES_FULLFILLED,
  UPDATE_CANDIDATES_REJECTED,
  DELETE_CANDIDATES_FETCHING,
  DELETE_CANDIDATES_FULLFILLED,
  DELETE_CANDIDATES_REJECTED,
  UPDATE_SELECTED_CANDIDATE,
  CANDIDATES_CLEANUP
} from '../../constants';

//Get all Candidates
export const getCandidatesFetching = () => ({
  type: GET_CANDIDATES_FETCHING
});

export const getCandidatesFullfilled = (payload) => ({
  type: GET_CANDIDATES_FULLFILLED,
  payload
});

export const getCandidatesRejected = (payload) => ({
  type: GET_CANDIDATES_REJECTED,
  payload
});

//Get Candidates By ID
export const getCandidateByIdFetching = () => ({
  type: GET_CANDIDATE_BY_ID_FETCHING
});

export const getCandidateByIdFullfilled = (payload) => ({
  type: GET_CANDIDATE_BY_ID_FULLFILLED,
  payload
});

export const getCandidateByIdRejected = (payload) => ({
  type: GET_CANDIDATE_BY_ID_REJECTED,
  payload
});

export const updateSelectedCandidate = (field, value) => {
  return {
    type: UPDATE_SELECTED_CANDIDATE,
    payload: { field, value }
  };
};
export const candidatesCleanUp = () => ({
  type: CANDIDATES_CLEANUP
});

//Create Candidates
export const createCandidatesFetching = () => ({
  type: CREATE_CANDIDATES_FETCHING
});

export const createCandidatesFullfilled = (payload) => ({
  type: CREATE_CANDIDATES_FULLFILLED,
  payload
});

export const createCandidatesRejected = (payload) => ({
  type: CREATE_CANDIDATES_REJECTED,
  payload
});

//Update Candidates
export const updateCandidatesFetching = () => ({
  type: UPDATE_CANDIDATES_FETCHING
});

export const updateCandidatesFullfilled = (payload) => ({
  type: UPDATE_CANDIDATES_FULLFILLED,
  payload
});

export const updateCandidatesRejected = (payload) => ({
  type: UPDATE_CANDIDATES_REJECTED,
  payload
});

//Delete Candidates
export const deleteCandidatesFetching = () => ({
  type: DELETE_CANDIDATES_FETCHING
});

export const deleteCandidatesFullfilled = (payload) => ({
  type: DELETE_CANDIDATES_FULLFILLED,
  payload
});

export const deleteCandidatesRejected = (payload) => ({
  type: DELETE_CANDIDATES_REJECTED,
  payload
});
