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

const initialState = {
  isFetching: false,
  list: [],
  error: false,
  selectedElement: {}
};

const profilesReducers = (state = initialState, action) => {
  switch (action.type) {
    //GET PROFILES
    case GET_PROFILES_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case GET_PROFILES_FULFILLED:
      return {
        ...state,
        isFetching: false,
        list: action.payload
      };
    case GET_PROFILES_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    //DELETE PROFILES
    case DELETE_PROFILES_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case DELETE_PROFILES_FULFILLED:
      return {
        ...state,
        isFetching: false,
        list: state.list.filter((element) => element._id !== action.payload.data._id)
      };
    case DELETE_PROFILES_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    //UPDATE PROFILES
    case UPDATE_PROFILES_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case UPDATE_PROFILES_FULFILLED:
      return {
        ...state,
        isFetching: false,
        selectedElement: {}
      };
    case UPDATE_PROFILES_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    //CREATE PROFILES
    case CREATE_PROFILES_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case CREATE_PROFILES_FULFILLED:
      return {
        ...state,
        isFetching: false,
        selectedElement: {}
      };
    case CREATE_PROFILES_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    //GET ONE PROFILES
    case GET_PROFILE_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case GET_PROFILE_FULFILLED:
      return {
        ...state,
        isFetching: false,
        selectedElement: action.payload
      };
    case GET_PROFILE_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    // PROFILES CLEANUP
    case PROFILES_CLEANUP:
      return {
        ...state,
        isFetching: false,
        selectedElement: {},
        error: false
      };
    default:
      return state;
  }
};

export default profilesReducers;
