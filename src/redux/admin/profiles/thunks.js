import { url } from 'constants/index';
import { showModal, updateModal } from 'redux/modal/actions';

import {
  getProfilesFetching,
  getProfilesFulfilled,
  getProfilesRejected,
  deleteProfilesFetching,
  deleteProfilesFulfilled,
  deleteProfilesRejected,
  createProfilesFetching,
  createProfilesFulfilled,
  createProfilesRejected,
  updateProfilesFetching,
  updateProfilesFulfilled,
  updateProfilesRejected,
  getProfileFetching,
  getProfileFulfilled,
  getProfileRejected
} from './actions';

//GET ONE PROFILE

export const getProfile = (id) => {
  return (dispatch) => {
    dispatch(getProfileFetching());
    fetch(`${url}/profile-types/${id}`)
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          const currentData = {
            name: data.name
          };
          return dispatch(getProfileFulfilled(currentData));
        }
      })
      .catch((err) => {
        dispatch(getProfileRejected(err));
      });
  };
};

//GET PROFILES
export const getProfiles = () => {
  return (dispatch) => {
    dispatch(getProfilesFetching());
    fetch(`${url}/Profile-types`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(getProfilesFulfilled(data));
      })
      .catch((err) => {
        dispatch(getProfilesRejected(err));
      });
  };
};

//DELETE PROFILES

export const deleteProfiles = (id) => {
  return (dispatch) => {
    dispatch(deleteProfilesFetching());
    dispatch(showModal('profiles', 'fetching'));
    fetch(`${url}/profile-types/${id}`, {
      method: 'DELETE'
    })
      .then(async (response) => {
        if (response.status === 200) {
          const data = await response.json();
          dispatch(deleteProfilesFulfilled(data));
          return dispatch(updateModal('deleted'));
        }
        const data = await response.json();
        dispatch(updateProfilesRejected(data));
      })
      .catch((err) => {
        dispatch(deleteProfilesRejected(err));
        dispatch(showModal('profiles', 'error', err.message));
      });
  };
};

//CREATE PROFILES

export const createProfiles = (profiles) => {
  return (dispatch) => {
    dispatch(createProfilesFetching());
    dispatch(showModal('profiles', 'fetching'));
    fetch(`${url}/profile-types`, {
      method: 'POST',
      body: JSON.stringify({
        name: profiles.name
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async (res) => {
        if (res.status === 201) {
          const data = await res.json();
          dispatch(createProfilesFulfilled(data));
          return dispatch(showModal('profiles', 'create', data.data));
        }
        const data = await res.json();
        dispatch(createProfilesRejected(data));
        dispatch(showModal('profiles', 'error', data.message));
      })
      .catch((err) => {
        dispatch(createProfilesRejected(err));
        dispatch(showModal('profiles', 'error', err.message));
      });
  };
};

//UPDATE PROFILES

export const updateProfiles = (id, profile) => {
  return (dispatch) => {
    dispatch(updateProfilesFetching());
    dispatch(showModal('profiles', 'fetching'));
    fetch(`${url}/profile-types/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        name: profile.name
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          dispatch(updateProfilesFulfilled(data));
          return dispatch(showModal('profiles', 'update', data.data));
        }
        const data = await res.json();
        dispatch(updateProfilesRejected(data));
        dispatch(showModal('profiles', 'error', data.message));
      })
      .catch((err) => {
        dispatch(updateProfilesRejected(err));
        dispatch(showModal('profiles', 'error', err.message));
      });
  };
};
