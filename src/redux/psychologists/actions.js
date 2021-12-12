import {
  GET_PSYCHOLOGISTS_FETCHING,
  GET_PSYCHOLOGISTS_FULFILLED,
  GET_PSYCHOLOGISTS_REJECTED,
  GET_PSYCHOLOGIST_FETCHING,
  GET_PSYCHOLOGIST_FULFILLED,
  GET_PSYCHOLOGIST_REJECTED,
  CREATE_PSYCHOLOGIST_FETCHING,
  CREATE_PSYCHOLOGIST_FULFILLED,
  CREATE_PSYCHOLOGIST_REJECTED,
  UPDATE_PSYCHOLOGIST_FETCHING,
  UPDATE_PSYCHOLOGIST_FULFILLED,
  UPDATE_PSYCHOLOGIST_REJECTED,
  DELETE_PSYCHOLOGIST_FETCHING,
  DELETE_PSYCHOLOGIST_FULFILLED,
  DELETE_PSYCHOLOGIST_REJECTED,
  UPDATE_SELECTED_PSYCHOLOGIST,
  CLEAN_SELECTED_ELEMENT
} from '../../constants';

//Get all psychologists

export const getPsychologistsFetching = () => {
  return {
    type: GET_PSYCHOLOGISTS_FETCHING
  };
};

export const getPsychologistsFulfilled = (payload) => {
  return {
    type: GET_PSYCHOLOGISTS_FULFILLED,
    payload
  };
};

export const getPsychologistsRejected = (payload) => {
  return {
    type: GET_PSYCHOLOGISTS_REJECTED,
    payload
  };
};

//Get psychologist by ID

export const getPsychologistFetching = () => {
  return {
    type: GET_PSYCHOLOGIST_FETCHING
  };
};

export const getPsychologistFulfilled = (payload) => {
  return {
    type: GET_PSYCHOLOGIST_FULFILLED,
    payload
  };
};

export const getPsychologistRejected = (payload) => {
  return {
    type: GET_PSYCHOLOGIST_REJECTED,
    payload
  };
};

//Create psychologist

export const createPsychologistFetching = () => {
  return {
    type: CREATE_PSYCHOLOGIST_FETCHING
  };
};

export const createPsychologistFulfilled = (payload) => {
  return {
    type: CREATE_PSYCHOLOGIST_FULFILLED,
    payload
  };
};

export const createPsychologistRejected = (payload) => {
  return {
    type: CREATE_PSYCHOLOGIST_REJECTED,
    payload
  };
};

// Update psychologist

export const updatePsychologistFetching = () => {
  return {
    type: UPDATE_PSYCHOLOGIST_FETCHING
  };
};

export const updatePsychologistFulfilled = (payload) => {
  return {
    type: UPDATE_PSYCHOLOGIST_FULFILLED,
    payload
  };
};

export const updatePsychologistRejected = (payload) => {
  return {
    type: UPDATE_PSYCHOLOGIST_REJECTED,
    payload
  };
};

// Delete psychologist

export const deletePsychologistFetching = () => {
  return {
    type: DELETE_PSYCHOLOGIST_FETCHING
  };
};

export const deletePsychologistFulfilled = (payload) => {
  return {
    type: DELETE_PSYCHOLOGIST_FULFILLED,
    payload
  };
};

export const deletePsychologistRejected = (payload) => {
  return {
    type: DELETE_PSYCHOLOGIST_REJECTED,
    payload
  };
};

//Update selected psychologist
export const updateSelectedPsychologist = (field, value) => {
  return {
    type: UPDATE_SELECTED_PSYCHOLOGIST,
    payload: { field, value }
  };
};

//Clean selected element
export const cleanSelectedElement = () => ({
  type: CLEAN_SELECTED_ELEMENT
});
