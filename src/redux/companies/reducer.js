import {
  GET_COMPANIES_FETCHING,
  GET_COMPANIES_FULFILLED,
  GET_COMPANIES_REJECTED,
  DELETE_COMPANY_FETCHING,
  DELETE_COMPANY_FULFILLED,
  DELETE_COMPANY_REJECTED,
  CREATE_COMPANY_FETCHING,
  CREATE_COMPANY_FULFILLED,
  CREATE_COMPANY_REJECTED,
  UPDATE_COMPANY_FETCHING,
  UPDATE_COMPANY_FULFILLED,
  UPDATE_COMPANY_REJECTED,
  GET_COMPANY_FETCHING,
  GET_COMPANY_FULFILLED,
  GET_COMPANY_REJECTED,
  UPDATE_SELECTED_COMPANY,
  COMPANIES_CLEANUP
} from '../../constants';

const initialState = {
  isFetching: false,
  list: [],
  error: false,
  selectedElement: {}
};

const companiesReducer = (state = initialState, action) => {
  switch (action.type) {
    //GET COMPANIES
    case GET_COMPANIES_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case GET_COMPANIES_FULFILLED:
      return {
        ...state,
        isFetching: false,
        list: action.payload
      };
    case GET_COMPANIES_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    //DELETE COMPANY
    case DELETE_COMPANY_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case DELETE_COMPANY_FULFILLED:
      return {
        ...state,
        isFetching: false,
        list: state.list.filter((element) => element._id !== action.payload.data._id)
      };
    case DELETE_COMPANY_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    //CREATE A COMPANY
    case CREATE_COMPANY_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case CREATE_COMPANY_FULFILLED:
      return {
        ...state,
        isFetching: false,
        selectedElement: {}
      };
    case CREATE_COMPANY_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    //GET ONE COMPANY
    case GET_COMPANY_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case GET_COMPANY_FULFILLED:
      return {
        ...state,
        isFetching: false,
        selectedElement: action.payload
      };
    case GET_COMPANY_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    //UPDATE A COMPANY
    case UPDATE_SELECTED_COMPANY: {
      const newState = { ...state.selectedElement };
      newState[action.payload.field] = action.payload.value;
      return {
        ...state,
        selectedElement: newState
      };
    }
    // COMPANIES CLEANUP
    case COMPANIES_CLEANUP:
      return {
        ...state,
        isFetching: false,
        selectedElement: {},
        error: false
      };
    //UPDATE
    case UPDATE_COMPANY_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case UPDATE_COMPANY_FULFILLED:
      return {
        ...state,
        isFetching: false,
        selectedElement: {}
      };
    case UPDATE_COMPANY_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    default:
      return state;
  }
};

export default companiesReducer;
