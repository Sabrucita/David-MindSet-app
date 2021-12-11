import {
  GET_ADMINS_FETCHING,
  GET_ADMINS_FULFILLED,
  GET_ADMINS_REJECTED
} from '../../constants';

const initialState = {
  isFetching: false,
  isFetchingDelete: false,
  list: [],
  selectedElement: {},
  error: { error: false, msg: '' }
};

const adminsReducer = (state = initialState, action) => {
  switch (action.type) {
    //Admins reducer: Get all admins part
    case GET_ADMINS_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: { error: false, msg: '' }
      };
    case GET_ADMINS_FULFILLED:
      return {
        ...state,
        isFetching: false,
        list: action.payload
      };
    case GET_ADMINS_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: { error: true, msg: action.payload }
      };
    //Default
    default:
      return state;
  }
};

export default adminsReducer;
