import {
  GET_SESSIONS_FETCHING,
  GET_SESSIONS_FULFILLED,
  GET_SESSIONS_REJECTED,
  // GET_SESSION,
  // CREATE_SESSION,
  // EDIT_SESSION,
  DELETE_SESSION_FETCHING,
  DELETE_SESSION_FULFILLED,
  DELETE_SESSION_REJECTED
} from '../../constants';

const initialState = {
  isFetching: false,
  list: [],
  error: { error: false, msg: '' }
};

const sessionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SESSIONS_FETCHING:
      return {
        ...state,
        isFetching: true
      };
    case GET_SESSIONS_FULFILLED:
      return {
        ...state,
        isFetching: false,
        list: action.payload
      };
    case GET_SESSIONS_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: { error: true, msg: action.payload }
      };
    // case GET_SESSION:
    //   return state;
    // case CREATE_SESSION:
    //   return state;
    // case EDIT_SESSION:
    //   return state;
    case DELETE_SESSION_FETCHING:
      return {
        ...state,
        isFetching: true
      };
    case DELETE_SESSION_FULFILLED:
      return {
        ...state,
        isFetching: false,
        list: state.list.filter((session) => session._id !== action.payload.data._id)
      };
    case DELETE_SESSION_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: { error: true, msg: action.payload }
      };
    default:
      return state;
  }
};

export default sessionsReducer;
