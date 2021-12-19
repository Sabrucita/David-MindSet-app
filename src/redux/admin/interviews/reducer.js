import { capitalize } from 'helpers';
import {
  GET_INTERVIEW_FETCHING,
  GET_INTERVIEW_FULFILLED,
  GET_INTERVIEW_REJECTED,
  GET_INTERVIEWS_FETCHING,
  GET_INTERVIEWS_FULFILLED,
  GET_INTERVIEWS_REJECTED,
  DELETE_INTERVIEW_FETCHING,
  DELETE_INTERVIEW_FULFILLED,
  DELETE_INTERVIEW_REJECTED,
  CREATE_INTERVIEW_FETCHING,
  CREATE_INTERVIEW_FULFILLED,
  CREATE_INTERVIEW_REJECTED,
  UPDATE_INTERVIEW_FETCHING,
  UPDATE_INTERVIEW_FULFILLED,
  UPDATE_INTERVIEW_REJECTED,
  INTERVIEWS_CLEANUP,
  GET_INTERVIEWS_OPTIONS_FETCHING,
  GET_INTERVIEWS_OPTIONS_FULFILLED,
  GET_INTERVIEWS_OPTIONS_REJECTED
} from 'constants/index';

const initialState = {
  isFetching: false,
  list: [],
  selectedElement: {},
  options: { candidates: [], companies: [] },
  error: false
};

const interviewReducer = (state = initialState, action) => {
  switch (action.type) {
    //GET 1
    case GET_INTERVIEW_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case GET_INTERVIEW_FULFILLED:
      return {
        ...state,
        isFetching: false,
        selectedElement: action.payload
      };
    case GET_INTERVIEW_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    // CLEAN UP
    case INTERVIEWS_CLEANUP:
      return {
        ...state,
        isFetching: false,
        selectedElement: {},
        error: false
      };
    //GET ALL
    case GET_INTERVIEWS_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case GET_INTERVIEWS_FULFILLED:
      return {
        ...state,
        isFetching: false,
        list: action.payload
      };
    case GET_INTERVIEWS_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    //DELETE
    case DELETE_INTERVIEW_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case DELETE_INTERVIEW_FULFILLED:
      return {
        ...state,
        isFetching: false,
        list: state.list.filter((element) => element._id !== action.payload.data._id)
      };
    case DELETE_INTERVIEW_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    //CREATE
    case CREATE_INTERVIEW_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case CREATE_INTERVIEW_FULFILLED:
      return {
        ...state,
        isFetching: false,
        selectedElement: {}
      };
    case CREATE_INTERVIEW_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    //UPDATE
    case UPDATE_INTERVIEW_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case UPDATE_INTERVIEW_FULFILLED:
      return {
        ...state,
        isFetching: false,
        selectedElement: {}
      };
    case UPDATE_INTERVIEW_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      };

    // GET OPTIONS
    case GET_INTERVIEWS_OPTIONS_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case GET_INTERVIEWS_OPTIONS_FULFILLED: {
      let newOptions;
      if (action.resource === 'companies') {
        newOptions = action.payload.map((element) => {
          return {
            id: element._id,
            name: `${capitalize(element.name)}`
          };
        });
      } else {
        newOptions = action.payload.map((element) => {
          const value = `${element.firstName} ${element.lastName}`;
          return {
            id: element._id,
            name: capitalize(value)
          };
        });
      }
      const options = { ...state.options };
      options[action.resource] = newOptions;
      return {
        ...state,
        options
      };
    }
    case GET_INTERVIEWS_OPTIONS_REJECTED:
      return {
        ...state,
        error: true
      };
    default:
      return state;
  }
};

export default interviewReducer;
