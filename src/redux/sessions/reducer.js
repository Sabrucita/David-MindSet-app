import { capitalize } from '../../Components/helpers';
import {
  GET_SESSIONS_FETCHING,
  GET_SESSIONS_FULFILLED,
  GET_SESSIONS_REJECTED,
  GET_SESSION_FETCHING,
  GET_SESSION_FULFILLED,
  GET_SESSION_REJECTED,
  UPDATE_SELECTED_SESSION,
  GET_SESSIONS_OPTIONS_FETCHING,
  GET_SESSIONS_OPTIONS_FULFILLED,
  GET_SESSIONS_OPTIONS_REJECTED,
  CREATE_SESSION_FETCHING,
  CREATE_SESSION_FULFILLED,
  CREATE_SESSION_REJECTED,
  UPDATE_SESSION_FETCHING,
  UPDATE_SESSION_FULFILLED,
  UPDATE_SESSION_REJECTED,
  DELETE_SESSION_FETCHING,
  DELETE_SESSION_FULFILLED,
  DELETE_SESSION_REJECTED,
  SESSIONS_CLEANUP
} from '../../constants';

const initialState = {
  isFetching: false,
  list: [],
  selectedElement: {},
  options: { candidates: [], psychologists: [] },
  error: false
};

const sessionsReducer = (state = initialState, action) => {
  switch (action.type) {
    // GET SESSIONS
    case GET_SESSIONS_FETCHING:
      return {
        ...state,
        isFetching: true,
        selectedElement: {},
        error: false
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
        error: true
      };

    // GET SESSION
    case GET_SESSION_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case GET_SESSION_FULFILLED:
      return {
        ...state,
        isFetching: false,
        selectedElement: action.payload
      };
    case GET_SESSION_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      };

    // UPDATE SELECTED SESSION
    case UPDATE_SELECTED_SESSION: {
      const newState = { ...state.selectedElement };
      newState[action.payload.field] = action.payload.value;
      return {
        ...state,
        selectedElement: newState
      };
    }

    // SESSIONS CLEANUP
    case SESSIONS_CLEANUP:
      return {
        ...state,
        isFetching: false,
        selectedElement: {},
        error: false
      };

    // GET OPTIONS
    case GET_SESSIONS_OPTIONS_FETCHING:
      return {
        ...state,
        isFetching: true
      };
    case GET_SESSIONS_OPTIONS_FULFILLED: {
      const newOptions = action.payload.map((element) => {
        const value = `${element.firstName} ${element.lastName}`;
        return {
          id: element._id,
          name: capitalize(value)
        };
      });
      const options = { ...state.options };
      options[action.resource] = newOptions;
      return {
        ...state,
        options
      };
    }
    case GET_SESSIONS_OPTIONS_REJECTED:
      return {
        ...state,
        error: true
      };

    // CREATE SESSIONS
    case CREATE_SESSION_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case CREATE_SESSION_FULFILLED:
      return {
        ...state,
        isFetching: false
        //list: [...state.list, action.payload.data]
      };
    case CREATE_SESSION_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      };

    // UPDATE SESSIONS
    case UPDATE_SESSION_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case UPDATE_SESSION_FULFILLED:
      return {
        ...state,
        isFetching: false
        //list: [...state.list, action.payload.data]
      };
    case UPDATE_SESSION_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      };

    // DELETE SESSION
    case DELETE_SESSION_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false
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
        error: true
      };
    default:
      return state;
  }
};

export default sessionsReducer;
