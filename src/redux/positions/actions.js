import {
  GET_POSITIONS_FETCHING,
  GET_POSITIONS_FULFILLED,
  GET_POSITIONS_REJECTED,
  GET_POSITION_FETCHING,
  GET_POSITION_FULFILLED,
  GET_POSITION_REJECTED,
  UPDATE_SELECTED_POSITION,
  GET_POSITIONS_OPTIONS_FETCHING,
  GET_POSITIONS_OPTIONS_FULFILLED,
  GET_POSITIONS_OPTIONS_REJECTED,
  CREATE_POSITION_FETCHING,
  CREATE_POSITION_FULFILLED,
  CREATE_POSITION_REJECTED,
  UPDATE_POSITION_FETCHING,
  UPDATE_POSITION_FULFILLED,
  UPDATE_POSITION_REJECTED,
  DELETE_POSITION_FETCHING,
  DELETE_POSITION_FULFILLED,
  DELETE_POSITION_REJECTED,
  POSITIONS_CLEANUP,
  GET_SELECTED_POSITION
} from '../../constants';

// GET POSITIONS
export const getPositionsFetching = () => {
  return {
    type: GET_POSITIONS_FETCHING
  };
};
export const getPositionsFulfilled = (payload) => {
  return {
    type: GET_POSITIONS_FULFILLED,
    payload
  };
};
export const getPositionsRejected = () => {
  return {
    type: GET_POSITIONS_REJECTED
  };
};

// GET POSITION
export const getPositionFetching = () => {
  return {
    type: GET_POSITION_FETCHING
  };
};
export const getPositionFulfilled = (payload) => {
  return {
    type: GET_POSITION_FULFILLED,
    payload
  };
};
export const getPositionRejected = () => {
  return {
    type: GET_POSITION_REJECTED
  };
};

// SELECTED POSITION
export const getSelectedPosition = (payload) => {
  return {
    type: GET_SELECTED_POSITION,
    payload
  };
};
export const updateSelectedPosition = (field, value) => {
  return {
    type: UPDATE_SELECTED_POSITION,
    payload: { field, value }
  };
};

// GET OPTIONS
export const getPositionsOptionsFetching = () => {
  return {
    type: GET_POSITIONS_OPTIONS_FETCHING
  };
};
export const getPositionsOptionsFulfilled = (resource, payload) => {
  return {
    type: GET_POSITIONS_OPTIONS_FULFILLED,
    resource,
    payload
  };
};
export const getPositionsOptionsRejected = () => {
  return {
    type: GET_POSITIONS_OPTIONS_REJECTED
  };
};

// CREATE POSITION
export const createPositionFetching = () => {
  return {
    type: CREATE_POSITION_FETCHING
  };
};
export const createPositionFulfilled = (payload) => {
  return {
    type: CREATE_POSITION_FULFILLED,
    payload
  };
};
export const createPositionRejected = () => {
  return {
    type: CREATE_POSITION_REJECTED
  };
};

// UPDATE POSITION
export const updatePositionFetching = () => {
  return {
    type: UPDATE_POSITION_FETCHING
  };
};
export const updatePositionFulfilled = (payload) => {
  return {
    type: UPDATE_POSITION_FULFILLED,
    payload
  };
};
export const updatePositionRejected = () => {
  return {
    type: UPDATE_POSITION_REJECTED
  };
};

// DELETE POSITION
export const deletePositionFetching = () => {
  return {
    type: DELETE_POSITION_FETCHING
  };
};
export const deletePositionFulfilled = (payload) => {
  return {
    type: DELETE_POSITION_FULFILLED,
    payload
  };
};
export const deletePositionRejected = () => {
  return {
    type: DELETE_POSITION_REJECTED
  };
};

// CLEANUP
export const positionsCleanup = () => {
  return {
    type: POSITIONS_CLEANUP
  };
};
