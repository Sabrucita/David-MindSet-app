export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const CLEAN_ERROR = 'CLEAN_ERROR';
export const SET_AUTHENTICATION = 'SET_AUTHENTICATION';

export const SIGNUP_PENDING = 'SIGNUP_PENDING';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';

export const loginPending = () => {
  return {
    type: LOGIN_PENDING
  };
};

export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data
  };
};

export const loginError = (error) => {
  return {
    type: LOGIN_ERROR,
    payload: error
  };
};

export const cleanError = () => {
  return {
    type: CLEAN_ERROR
  };
};

export const setAuthentication = () => {
  return {
    type: SET_AUTHENTICATION
  };
};

// SIGN UP
export const signupPending = () => {
  return {
    type: SIGNUP_PENDING
  };
};

export const signupSuccess = (data) => {
  return {
    type: SIGNUP_SUCCESS,
    payload: data
  };
};

export const signupError = (error) => {
  return {
    type: SIGNUP_ERROR,
    payload: error
  };
};
