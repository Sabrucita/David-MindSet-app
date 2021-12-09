import {
  GET_SESSIONS_FETCHING,
  GET_SESSIONS_FULFILLED,
  GET_SESSIONS_REJECTED
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
    default:
      return state;
  }
};

export default sessionsReducer;
