import {
  GET_APPLICATIONS_FETCHING,
  GET_APPLICATIONS_FULFILLED,
  GET_APPLICATIONS_REJECTED,
  DELETE_APPLICATION_FETCHING,
  DELETE_APPLICATION_FULFILLED,
  DELETE_APPLICATION_REJECTED
} from '../../constants';

const initialState = {
  isFetching: false,
  isFetchingDelete: false,
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
    case DELETE_APPLICATION_FETCHING:
      return {
        ...state,
        isFetchingDelete: true
      };
    case DELETE_APPLICATION_FULFILLED:
      return {
        ...state,
        isFetchingDelete: false,
        list: state.list.filter((element) => element._id !== action.payload.data._id)
      };
    case DELETE_APPLICATION_REJECTED:
      return {
        ...state,
        isFetchingDelete: false,
        error: { error: true, msg: action.payload }
      };
    default:
      return state;
  }
};

export default applicationReducer;
