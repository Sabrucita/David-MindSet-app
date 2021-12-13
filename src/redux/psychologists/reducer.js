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
  PSYCHOLOGISTS_CLEANUP
} from '../../constants';

const initialState = {
  isFetching: false,
  list: [],
  error: false,
  selectedElement: {}
};

const psychologistsReducer = (state = initialState, action) => {
  switch (action.type) {
    //GET ALL PSYCHOLOGISTS
    case GET_PSYCHOLOGISTS_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false
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
        error: true
      };
    //DELETE PSYCHOLOGIST
    case DELETE_PSYCHOLOGIST_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false
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
        error: true
      };
    //ADD NEW PSYCHOLOGIST
    case CREATE_PSYCHOLOGIST_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case CREATE_PSYCHOLOGIST_FULFILLED:
      return {
        ...state,
        isFetching: false,
        selectedElement: {}
      };
    case CREATE_PSYCHOLOGIST_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    //GET ONE PSYCHOLOGIST (BY ID)
    case GET_PSYCHOLOGIST_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false
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
        error: true
      };
    //UPDATE A PSYCHOLOGIST
    case UPDATE_SELECTED_PSYCHOLOGIST: {
      const newState = { ...state.selectedElement };
      newState[action.payload.field] = action.payload.value;
      return {
        ...state,
        selectedElement: newState
      };
    }
    // COMPANIES CLEANUP
    case PSYCHOLOGISTS_CLEANUP:
      return {
        ...state,
        isFetching: false,
        selectedElement: {},
        error: false
      };
    //UPDATE
    case UPDATE_PSYCHOLOGIST_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case UPDATE_PSYCHOLOGIST_FULFILLED:
      return {
        ...state,
        isFetching: false,
        selectedElement: {}
      };
    case UPDATE_PSYCHOLOGIST_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    default:
      return state;
  }
};

export default psychologistsReducer;
