import { url } from 'constants/index';
import { showModal } from 'redux/modal/actions';

import { loginPending, loginSuccess, loginError } from './actions';
import firebase from 'helpers/firebase';
import { createCandidates } from 'redux/admin/candidates/thunks';

export const login = (credentials) => {
  return (dispatch) => {
    dispatch(loginPending());
    return firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(async (response) => {
        const token = await response.user.getIdToken();
        sessionStorage.setItem('token', token);
        fetch(`${url}/auth/loginServer`, { headers: { token } }).then(async (res) => {
          const data = await res.json();
          if (res.status === 200) {
            return dispatch(loginSuccess(data.role));
          }
          dispatch(loginError(data));
          dispatch(showModal('Login', 'login', 'This user has no role'));
        });
      })
      .catch((error) => {
        dispatch(loginError(error.toString()));
        dispatch(showModal('Login', 'login', 'Incorrect Email/Password'));
      });
  };
};

export const signUp = (candidate) => {
  console.log(candidate);
  return (dispatch) => {
    const firebaseDate = {
      email: candidate.email,
      password: candidate.password
    };
    fetch(`${url}/auth/register`, {
      method: 'POST',
      body: JSON.stringify(firebaseDate),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async (res) => {
        console.log(res);
        if (res.status === 201) {
          const data = await res.json();
          dispatch(createCandidates(candidate));
          return dispatch(showModal('Sign Up', 'signUp', data.data));
        }
        const data = await res.json();
        dispatch(showModal('candidates', 'signUp', data.message));
      })
      .catch((err) => {
        dispatch(showModal('Sign Up', 'signUp', err.message));
      });
  };
};
