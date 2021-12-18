import {
  GET_PROFILES_FETCHING,
  GET_PROFILES_FULFILLED,
  GET_PROFILES_REJECTED,
  DELETE_PROFILES_FETCHING,
  DELETE_PROFILES_FULFILLED,
  DELETE_PROFILES_REJECTED,
  CREATE_PROFILES_FETCHING,
  CREATE_PROFILES_FULFILLED,
  CREATE_PROFILES_REJECTED,
  UPDATE_PROFILES_FETCHING,
  UPDATE_PROFILES_FULFILLED,
  UPDATE_PROFILES_REJECTED,
  GET_PROFILE_FETCHING,
  GET_PROFILE_FULFILLED,
  GET_PROFILE_REJECTED,
  PROFILES_CLEANUP
} from '../../constants';

//GET PROFILES

export const getProfilesFetching = () => ({
  type: GET_PROFILES_FETCHING
});

export const getProfilesFulfilled = (payload) => ({
  type: GET_PROFILES_FULFILLED,
  payload
});

export const getProfilesRejected = () => ({
  type: GET_PROFILES_REJECTED
});

//DELETE PROFILES

export const deleteProfilesFetching = () => ({
  type: DELETE_PROFILES_FETCHING
});

export const deleteProfilesFulfilled = (payload) => ({
  type: DELETE_PROFILES_FULFILLED,
  payload
});

export const deleteProfilesRejected = () => ({
  type: DELETE_PROFILES_REJECTED
});

//CREATE PROFILES

export const createProfilesFetching = () => ({
  type: CREATE_PROFILES_FETCHING
});

export const createProfilesFulfilled = (payload) => ({
  type: CREATE_PROFILES_FULFILLED,
  payload
});

export const createProfilesRejected = () => ({
  type: CREATE_PROFILES_REJECTED
});

//UPDATE PROFILES

export const updateProfilesFetching = () => ({
  type: UPDATE_PROFILES_FETCHING
});

export const updateProfilesFulfilled = (payload) => ({
  type: UPDATE_PROFILES_FULFILLED,
  payload
});

export const updateProfilesRejected = () => ({
  type: UPDATE_PROFILES_REJECTED
});

//GET ONE PROFILE

export const getProfileFetching = () => ({
  type: GET_PROFILE_FETCHING
});

export const getProfileFulfilled = (payload) => ({
  type: GET_PROFILE_FULFILLED,
  payload
});

export const getProfileRejected = () => ({
  type: GET_PROFILE_REJECTED
});

// CLEANUP
export const profilesCleanup = () => {
  return {
    type: PROFILES_CLEANUP
  };
};
