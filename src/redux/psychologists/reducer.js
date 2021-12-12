import {
  GET_PSYCHOLOGISTS_FETCHING,
  GET_PSYCHOLOGISTS_FULFILLED,
  GET_PSYCHOLOGISTS_REJECTED,
  GET_PSYCHOLOGIST_FETCHING,
  GET_PSYCHOLOGIST_FULFILLED,
  GET_PSYCHOLOGIST_REJECTED,
  CREATE_PSYCHOLOGIST_FETCHING,
  CREATE_PSYCHOLOGIST_FULFILLED,
  CREATE_PSYCHOLOGIST_REJECTED,
  UPDATE_PSYCHOLOGIST_FETCHING,
  UPDATE_PSYCHOLOGIST_FULFILLED,
  UPDATE_PSYCHOLOGIST_REJECTED,
  DELETE_PSYCHOLOGIST_FETCHING,
  DELETE_PSYCHOLOGIST_FULFILLED,
  DELETE_PSYCHOLOGIST_REJECTED,
  UPDATE_SELECTED_PSYCHOLOGIST,
  CLEAN_SELECTED_ELEMENT
} from '../../constants';

const initialState = {
  isFetching: false,
  isFetchingDelete: false,
  list: [],
  selectedElement: {},
  error: { error: false, msg: '' }
};

const psychologistsReducer = (state = initialState, action) => {
  switch (action.type) {
    //Get all psychologists
    case GET_PSYCHOLOGISTS_FETCHING:
      return {
        ...state,
        isFetching: true
      };
    case GET_PSYCHOLOGISTS_FULFILLED:
      return {
        ...state,
        isFetching: false,
        list: action.payload
      };
    case GET_PSYCHOLOGISTS_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: { error: true, msg: action.payload }
      };
    //Get only one psychologist (by ID)
    case GET_PSYCHOLOGIST_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: { error: false, msg: '' }
      };
    case GET_PSYCHOLOGIST_FULFILLED:
      return {
        ...state,
        isFetching: false,
        selectedElement: action.payload
      };
    case GET_PSYCHOLOGIST_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    //Add a new psychologist
    case CREATE_PSYCHOLOGIST_FETCHING:
      return {
        ...state,
        isFetching: true
      };
    case CREATE_PSYCHOLOGIST_FULFILLED:
      return {
        ...state,
        isFetching: false
      };
    case CREATE_PSYCHOLOGIST_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: { error: true, msg: action.payload }
      };
    //Update an psychologist
    case UPDATE_PSYCHOLOGIST_FETCHING:
      return {
        ...state,
        isFetching: true
      };
    case UPDATE_PSYCHOLOGIST_FULFILLED:
      return {
        ...state,
        isFetching: false
      };
    case UPDATE_PSYCHOLOGIST_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: { error: true, msg: action.payload }
      };
    //Delete one psychologist
    case DELETE_PSYCHOLOGIST_FETCHING:
      return {
        ...state,
        isFetching: true
      };
    case DELETE_PSYCHOLOGIST_FULFILLED:
      return {
        ...state,
        isFetching: false,
        list: state.list.filter((element) => element._id !== action.payload.data._id)
      };
    case DELETE_PSYCHOLOGIST_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: { error: true, msg: action.payload }
      };
    //Update selected psychologist
    case UPDATE_SELECTED_PSYCHOLOGIST: {
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

export default psychologistsReducer;
