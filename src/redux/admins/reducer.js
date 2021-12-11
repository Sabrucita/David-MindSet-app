import {
  GET_ADMINS_FETCHING,
  GET_ADMINS_FULFILLED,
  GET_ADMINS_REJECTED,
  GET_ADMIN_FETCHING,
  GET_ADMIN_FULFILLED,
  GET_ADMIN_REJECTED,
  CREATE_ADMIN_FETCHING,
  CREATE_ADMIN_FULFILLED,
  CREATE_ADMIN_REJECTED,
  UPDATE_ADMIN_FETCHING,
  UPDATE_ADMIN_FULFILLED,
  UPDATE_ADMIN_REJECTED,
  DELETE_ADMIN_FETCHING,
  DELETE_ADMIN_FULFILLED,
  DELETE_ADMIN_REJECTED,
  UPDATE_SELECTED_ADMIN,
  CLEAN_SELECTED_ELEMENT
} from '../../constants';

const initialState = {
  isFetching: false,
  isFetchingDelete: false,
  list: [],
  selectedElement: {},
  error: { error: false, msg: '' }
};

const adminsReducer = (state = initialState, action) => {
  switch (action.type) {
    //Get all admins
    case GET_ADMINS_FETCHING:
      return {
        ...state,
        isFetching: true
      };
    case GET_ADMINS_FULFILLED:
      return {
        ...state,
        isFetching: false,
        list: action.payload
      };
    case GET_ADMINS_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: { error: true, msg: action.payload }
      };
    //Get only one admin (by ID)
    case GET_ADMIN_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: { error: false, msg: '' }
      };
    case GET_ADMIN_FULFILLED:
      return {
        ...state,
        isFetching: false,
        selectedElement: action.payload
      };
    case GET_ADMIN_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    //Add a new admin
    case CREATE_ADMIN_FETCHING:
      return {
        ...state,
        isFetching: true
      };
    case CREATE_ADMIN_FULFILLED:
      return {
        ...state,
        isFetching: false
      };
    case CREATE_ADMIN_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: { error: true, msg: action.payload }
      };
    //Update an admin
    case UPDATE_ADMIN_FETCHING:
      return {
        ...state,
        isFetching: true
      };
    case UPDATE_ADMIN_FULFILLED:
      return {
        ...state,
        isFetching: false
      };
    case UPDATE_ADMIN_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: { error: true, msg: action.payload }
      };
    //Delete one admin
    case DELETE_ADMIN_FETCHING:
      return {
        ...state,
        isFetching: true
      };
    case DELETE_ADMIN_FULFILLED:
      return {
        ...state,
        isFetching: false,
        list: state.list.filter((element) => element._id !== action.payload.data._id)
      };
    case DELETE_ADMIN_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: { error: true, msg: action.payload }
      };
    //Update selected admin
    case UPDATE_SELECTED_ADMIN: {
      const newState = { ...state.selectedElement };
      newState[action.payload.field] = action.payload.value;
      return {
        ...state,
        selectedElement: newState
      };
    }
    // Clean selected element
    case CLEAN_SELECTED_ELEMENT:
      return { ...state, selectedElement: '' };
    //Default
    default:
      return state;
  }
};

export default adminsReducer;
