import { capitalize } from '../../Components/helpers';
import {
  GET_APPLICATION_FETCHING,
  GET_APPLICATION_FULFILLED,
  GET_APPLICATION_REJECTED,
  UPDATE_SELECTED_APPLICATION,
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
} from '../../constants';

const initialState = {
  isFetching: false,
  list: [],
  selectedElement: {},
  options: { candidates: [], openPositions: [] },
  error: { error: false, msg: '' }
};

const applicationReducer = (state = initialState, action) => {
  switch (action.type) {
    //GET 1
    case GET_APPLICATION_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: { error: false, msg: '' }
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
        error: action.payload
      };
    //UPDATE 1
    case UPDATE_SELECTED_APPLICATION: {
      const newState = { ...state.selectedElement };
      newState[action.payload.field] = action.payload.value;
      return {
        ...state,
        selectedElement: newState
      };
    }
    // CLEAN UP
    case APPLICATIONS_CLEANUP:
      return {
        ...state,
        isFetching: false,
        selectedElement: {},
        error: { error: false, msg: '' }
      };
    //GET ALL
    case GET_APPLICATIONS_FETCHING:
      return {
        ...state,
        isFetching: true
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
        error: { error: true, msg: action.payload }
      };
    //DELETE
    case DELETE_APPLICATION_FETCHING:
      return {
        ...state,
        isFetching: true
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
        error: { error: true, msg: action.payload }
      };
    //CREATE
    case CREATE_APPLICATION_FETCHING:
      return {
        ...state,
        isFetching: true
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
        error: { error: true, msg: action.payload }
      };
    //UPDATE
    case UPDATE_APPLICATION_FETCHING:
      return {
        ...state,
        isFetching: true
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
        error: { error: true, msg: action.payload }
      };

    // GET OPTIONS
    case GET_APPLICATIONS_OPTIONS_FETCHING:
      return {
        ...state,
        isFetching: true
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
        error: action.payload
      };
    default:
      return state;
  }
};

export default applicationReducer;
