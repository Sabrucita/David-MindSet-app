import {
  GET_ADMINS_FETCHING,
  GET_ADMINS_FULFILLED,
  GET_ADMINS_REJECTED,
  GET_ADMIN_FETCHING,
  GET_ADMIN_FULFILLED,
  GET_ADMIN_REJECTED,
  CREATE_ADMIN_FETCHING,
  CREATE_ADMIN_FULFILLED,
  CREATE_ADMIN_REJECTED,
  DELETE_ADMIN_FETCHING,
  DELETE_ADMIN_FULFILLED,
  DELETE_ADMIN_REJECTED
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
    //Admins reducer: Get admins by ID part
    case GET_ADMIN_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: { error: false, msg: '' },
        selectedElement: initialState.selectedItem
      };
    case GET_ADMIN_FULFILLED:
      return {
        ...state,
        isFetching: false,
        selectedElement: action.payload
      };
    case GET_ADMIN_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: { error: true, msg: action.payload }
      };
    //Admins reducer: Create admin
    case CREATE_ADMIN_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: { error: false, msg: '' }
      };
    case CREATE_ADMIN_FULFILLED:
      return {
        ...state,
        isFetching: false,
        list: [...state.list, action.payload]
      };
    case CREATE_ADMIN_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: { error: true, msg: action.payload }
      };
    //Admins reducer: Delete admin
    case DELETE_ADMIN_FETCHING:
      return {
        ...state,
        isFetching: true
      };
    case DELETE_ADMIN_FULFILLED:
      return {
        ...state,
        isFetching: false,
        list: state.list.filter((element) => element._id !== action.payload.data._id)
      };
    case DELETE_ADMIN_REJECTED:
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
