import { url } from 'constants/index';
import { showModal } from 'redux/modal/actions';

import {
  loginPending,
  loginSuccess,
  loginError,
  signupPending,
  signupSuccess,
  signupError,
  logoutPending,
  logoutSuccess,
  logoutError
} from './actions';
import firebase from 'helpers/firebase';

import { getAuth } from 'firebase/auth';

export const logOut = () => {
  return (dispatch) => {
    const auth = getAuth();

    dispatch(logoutPending());
    return firebase
      .auth()
      .signOut(auth)
      .then(() => {
        sessionStorage.removeItem('token');
        dispatch(logoutSuccess());
      })
      .catch((error) => {
        sessionStorage.removeItem('token');
        dispatch(logoutError(error));
      });
  };
};

export const login = (credentials) => {
  return (dispatch) => {
    dispatch(loginPending());
    return firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(async (response) => {
        const token = await response.user.getIdToken();
        sessionStorage.setItem('token', token);
        fetch(`${url}/auth/loginServer`, { headers: { token } })
          .then(async (res) => {
            const data = await res.json();
            // console.log(data);
            if (res.status === 200) return dispatch(loginSuccess(data));
            sessionStorage.removeItem('token');
            dispatch(loginError(data));
            dispatch(showModal('Login', 'login', 'This user has no role'));
          })
          .catch((error) => {
            sessionStorage.removeItem('token');
            dispatch(loginError(error.toString()));
            dispatch(showModal('Login', 'error', error.message));
          });
      })
      .catch((error) => {
        sessionStorage.removeItem('token');
        dispatch(loginError(error.toString()));
        dispatch(showModal('Login', 'error', 'Incorrect Email/Password'));
      });
  };
};

export const fetchLogin = () => {
  return (dispatch) => {
    dispatch(loginPending());
    const token = sessionStorage.getItem('token');
    fetch(`${url}/auth/loginServer`, { headers: { token } })
      .then(async (res) => {
        const data = await res.json();
        if (res.status === 200) return dispatch(loginSuccess(data));
        sessionStorage.removeItem('token');
        dispatch(loginError(data));
        dispatch(showModal('Login', 'login', 'This user has no role'));
      })
      .catch((error) => {
        sessionStorage.removeItem('token');
        dispatch(loginError(error.toString()));
        dispatch(showModal('Login', 'error', error.message));
      });
  };
};

export const signUp = (candidate) => {
  return (dispatch) => {
    dispatch(signupPending());
    fetch(`${url}/auth/register`, {
      method: 'POST',
      body: JSON.stringify(candidate),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async (res) => {
        if (res.status === 201) {
          dispatch(signupSuccess());
          return dispatch(
            showModal(
              'Sign Up',
              'signUp',
              'Congratulations! Your account has been created. Please Login'
            )
          );
        }
        const data = await res.json();
        dispatch(signupError(data.msg || data.message));
        dispatch(showModal('candidates', 'error', data.msg || data.message));
      })
      .catch((err) => {
        dispatch(signupError(err.msg || err.message));
        dispatch(showModal('Sign Up', 'error', err.message));
      });
  };
};
