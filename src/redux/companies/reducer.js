import {
  GET_COMPANIES_FETCHING,
  GET_COMPANIES_FULFILLED,
  GET_COMPANIES_REJECTED
} from '../../constants';

const initialState = {
  isFetching: false,
  isFetchingDelete: false,
  list: [],
  error: { error: false, msg: '' }
};

const companiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMPANIES_FETCHING:
      return {
        ...state,
        isFetching: true
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
        error: { error: true, msg: action.payload }
      };
    default:
      return state;
  }
};

export default companiesReducer;
