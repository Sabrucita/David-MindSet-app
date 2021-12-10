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
  DELETE_CANDIDATES_REJECTED
} from '../../constants';

//Get all Candidates
export const getCandidatesFetching = () => ({
  type: GET_CANDIDATES_FETCHING
});

export const getCandidatesFullfilled = (data) => ({
  type: GET_CANDIDATES_FULLFILLED,
  payload: data
});

export const getCandidatesRejected = (error) => ({
  type: GET_CANDIDATES_REJECTED,
  payload: error
});

//Get Candidates By ID
export const getCandidateByIdFetching = () => ({
  type: GET_CANDIDATE_BY_ID_FETCHING
});

export const getCandidateByIdFullfilled = (data) => ({
  type: GET_CANDIDATE_BY_ID_FULLFILLED,
  payload: data
});

export const getCandidateByIdRejected = (error) => ({
  type: GET_CANDIDATE_BY_ID_REJECTED,
  payload: error
});

//Create Candidates
export const createCandidatesFetching = () => ({
  type: CREATE_CANDIDATES_FETCHING
});

export const createCandidatesFullfilled = (data) => ({
  type: CREATE_CANDIDATES_FULLFILLED,
  payload: data
});

export const createCandidatesRejected = (error) => ({
  type: CREATE_CANDIDATES_REJECTED,
  payload: error
});

//Update Candidates
export const updateCandidatesFetching = () => ({
  type: UPDATE_CANDIDATES_FETCHING
});

export const updateCandidatesFullfilled = (data) => ({
  type: UPDATE_CANDIDATES_FULLFILLED,
  payload: data
});

export const updateCandidatesRejected = (error) => ({
  type: UPDATE_CANDIDATES_REJECTED,
  payload: error
});

//Delete Candidates
export const deleteCandidatesFetching = () => ({
  type: DELETE_CANDIDATES_FETCHING
});

export const deleteCandidatesFullfilled = (data) => ({
  type: DELETE_CANDIDATES_FULLFILLED,
  payload: data
});

export const deleteCandidatesRejected = (error) => ({
  type: DELETE_CANDIDATES_REJECTED,
  payload: error
});
