import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNUP_PENDING,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  CLEAN_ERROR,
  SET_AUTHENTICATION
} from './actions';

const initialState = {
  isLoading: false,
  authenticated: false,
  error: '',
  role: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: initialState.error
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        authenticated: true,
        role: action.payload?.role
      };
    }
    case LOGIN_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    }
    case CLEAN_ERROR: {
      return {
        ...state,
        error: initialState.error
      };
    }
    case SET_AUTHENTICATION: {
      return {
        ...state,
        authenticated: true
      };
    }
    //SIGN UP
    case SIGNUP_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: initialState.error
      };
    }
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        isFetching: false
      };
    }
    case SIGNUP_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
