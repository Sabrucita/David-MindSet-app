import {
  GET_APPLICATIONS_FETCHING,
  GET_APPLICATIONS_FULFILLED,
  GET_APPLICATIONS_REJECTED
} from '../../constants';

const initialState = {
  isFetching: false,
  list: [],
  error: { error: false, msg: '' }
};

const applicationReducer = (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default applicationReducer;
