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
  ADMINS_CLEANUP
} from 'constants/index';

const initialState = {
  isFetching: false,
  list: [],
  error: false,
  selectedElement: {}
};

const adminsReducer = (state = initialState, action) => {
  switch (action.type) {
    //GET ALL ADMINS
    case GET_ADMINS_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false
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
        error: true
      };
    //DELETE ADMIN
    case DELETE_ADMIN_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false
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
        error: true
      };
    //ADD NEW ADMIN
    case CREATE_ADMIN_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case CREATE_ADMIN_FULFILLED:
      return {
        ...state,
        isFetching: false,
        selectedElement: {}
      };
    case CREATE_ADMIN_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    //GET ONE ADMIN (BY ID)
    case GET_ADMIN_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false
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
        error: true
      };
    // ADMINS CLEANUP
    case ADMINS_CLEANUP:
      return {
        ...state,
        isFetching: false,
        selectedElement: {},
        error: false
      };
    //UPDATE ADMIN
    case UPDATE_ADMIN_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case UPDATE_ADMIN_FULFILLED:
      return {
        ...state,
        isFetching: false,
        selectedElement: {}
      };
    case UPDATE_ADMIN_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    default:
      return state;
  }
};

export default adminsReducer;
