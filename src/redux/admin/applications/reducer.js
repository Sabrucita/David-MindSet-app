import { capitalize } from 'helpers';
import {
  GET_APPLICATION_FETCHING,
  GET_APPLICATION_FULFILLED,
  GET_APPLICATION_REJECTED,
  APPLICATIONS_CLEANUP,
  GET_APPLICATIONS_FETCHING,
  GET_APPLICATIONS_FULFILLED,
  GET_APPLICATIONS_REJECTED,
  DELETE_APPLICATION_FETCHING,
  DELETE_APPLICATION_FULFILLED,
  DELETE_APPLICATION_REJECTED,
  CREATE_APPLICATION_FETCHING,
  CREATE_APPLICATION_FULFILLED,
  CREATE_APPLICATION_REJECTED,
  UPDATE_APPLICATION_FETCHING,
  UPDATE_APPLICATION_FULFILLED,
  UPDATE_APPLICATION_REJECTED,
  GET_APPLICATIONS_OPTIONS_FETCHING,
  GET_APPLICATIONS_OPTIONS_FULFILLED,
  GET_APPLICATIONS_OPTIONS_REJECTED
} from 'constants/index';

const initialState = {
  isFetching: false,
  list: [],
  selectedElement: {},
  options: { candidates: [], openPositions: [] },
  error: false
};

const applicationReducer = (state = initialState, action) => {
  switch (action.type) {
    //GET 1
    case GET_APPLICATION_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case GET_APPLICATION_FULFILLED:
      return {
        ...state,
        isFetching: false,
        selectedElement: action.payload
      };
    case GET_APPLICATION_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    // CLEAN UP
    case APPLICATIONS_CLEANUP:
      return {
        ...state,
        isFetching: false,
        selectedElement: {},
        error: false
      };
    //GET ALL
    case GET_APPLICATIONS_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case GET_APPLICATIONS_FULFILLED:
      return {
        ...state,
        isFetching: false,
        list: action.payload
      };
    case GET_APPLICATIONS_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    //DELETE
    case DELETE_APPLICATION_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case DELETE_APPLICATION_FULFILLED:
      return {
        ...state,
        isFetching: false,
        list: state.list.filter((element) => element._id !== action.payload.data._id)
      };
    case DELETE_APPLICATION_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    //CREATE
    case CREATE_APPLICATION_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case CREATE_APPLICATION_FULFILLED:
      return {
        ...state,
        isFetching: false,
        selectedElement: {}
      };
    case CREATE_APPLICATION_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    //UPDATE
    case UPDATE_APPLICATION_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case UPDATE_APPLICATION_FULFILLED:
      return {
        ...state,
        isFetching: false,
        selectedElement: {}
      };
    case UPDATE_APPLICATION_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      };

    // GET OPTIONS
    case GET_APPLICATIONS_OPTIONS_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case GET_APPLICATIONS_OPTIONS_FULFILLED: {
      let newOptions;
      if (action.resource === 'open-positions') {
        newOptions = action.payload.map((element) => {
          return {
            id: element._id,
            name: `${capitalize(element.jobDescription)}`
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
      // in order to avoid using a - in an object property
      if (action.resource === 'open-positions') {
        options['openPositions'] = newOptions;
      } else {
        options[action.resource] = newOptions;
      }
      return {
        ...state,
        options
      };
    }
    case GET_APPLICATIONS_OPTIONS_REJECTED:
      return {
        ...state,
        error: true
      };
    default:
      return state;
  }
};

export default applicationReducer;
