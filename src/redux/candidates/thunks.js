import { url } from '../../constants';
import { showModal, updateModal } from '../modal/actions';
import {
  getCandidatesFetching,
  getCandidatesFullfilled,
  getCandidatesRejected,
  getCandidateByIdFetching,
  getCandidateByIdFullfilled,
  getCandidateByIdRejected,
  createCandidatesFetching,
  createCandidatesFullfilled,
  createCandidatesRejected,
  updateCandidatesFetching,
  updateCandidatesFullfilled,
  updateCandidatesRejected,
  deleteCandidatesFetching,
  deleteCandidatesFullfilled,
  deleteCandidatesRejected
} from './actions';

//GET ALL THE CANDIDATES
export const getCandidates = () => {
  return (dispatch) => {
    dispatch(getCandidatesFetching());
    fetch(`${url}/candidates`)
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          return dispatch(getCandidatesFullfilled(data));
        }
        const data = await res.json();
        throw new Error(data.msg);
      })
      .catch((err) => {
        dispatch(getCandidatesRejected());
        dispatch(showModal('applications', 'error', err.message));
      });
  };
};

//GET A CANDIDATE BY ID
export const getCandidateById = (id) => {
  return (dispatch) => {
    dispatch(getCandidateByIdFetching());
    fetch(`${url}/candidates/${id}`)
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          const currentData = {
            idCandidate: data._id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            phone: data.phone,
            city: data.city,
            province: data.province,
            country: data.country,
            postalCode: data.postalCode,
            birthday: data.birthday,
            hobbies: data.hobbies,
            mainSkills: data.mainSkills,
            profileTypes: data.profileTypes,
            isOpenToWork: data.isOpenToWork,
            education: data.education,
            experiences: data.experiences,
            courses: data.courses,
            address: { street: data.address.street, number: data.address.number }
          };
          return dispatch(getCandidateByIdFullfilled(currentData));
        }
        const data = await res.json();
        throw new Error(data.msg);
      })
      .catch((err) => {
        dispatch(getCandidateByIdRejected());
        dispatch(showModal('candidates', 'error', err.message));
      });
  };
};

//DELETE CANDIDATE BY ID
export const deleteCandidates = (id) => {
  return (dispatch) => {
    dispatch(deleteCandidatesFetching());
    dispatch(updateModal('fetching', { info: 'Loading...' }));
    fetch(`${url}/Candidates/${id}`, {
      method: 'DELETE'
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          dispatch(deleteCandidatesFullfilled(data));
          return dispatch(updateModal('deleted', data.data));
        }
        const data = await res.json();
        throw new Error(data.msg);
      })
      .catch((err) => {
        dispatch(deleteCandidatesRejected());
        dispatch(updateModal('error', err.message));
      });
  };
};

//CREATE CANDIDATE
export const createCandidates = (obj) => {
  return (dispatch) => {
    dispatch(createCandidatesFetching());
    dispatch(showModal('candidates', 'fetching', { info: 'Loading...' }));
    fetch(`${url}/candidates`, {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async (res) => {
        if (res.status === 201) {
          const data = await res.json();
          dispatch(createCandidatesFullfilled(data));
          return dispatch(updateModal('create', data.data));
        }
        const data = await res.json();
        throw new Error(data.msg);
      })
      .catch((err) => {
        dispatch(createCandidatesRejected());
        dispatch(updateModal('error', err.message));
      });
  };
};

//UPDATE CANDIDATES
export const updateCandidates = (id, obj) => {
  return (dispatch) => {
    dispatch(updateCandidatesFetching());
    dispatch(showModal('candidates', 'fetching', { info: 'Loading...' }));
    fetch(`${url}/candidates/${id}`, {
      method: 'PUT',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          dispatch(updateCandidatesFullfilled(data));
          return dispatch(updateModal('update', data.data));
        }
        const data = await res.json();
        throw new Error(data.msg);
      })
      .catch((err) => {
        dispatch(updateCandidatesRejected());
        dispatch(updateModal('error', err.message));
      });
  };
};
