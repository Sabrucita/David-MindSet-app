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
      .then((res) => res.json())
      .then((data) => {
        dispatch(getCandidatesFullfilled(data));
      })
      .catch((err) => {
        dispatch(getCandidatesRejected(err));
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
      })
      .catch((err) => {
        dispatch(getCandidateByIdRejected(err));
      });
  };
};

//DELETE CANDIDATE BY ID
export const deleteCandidates = (id) => {
  return (dispatch) => {
    dispatch(deleteCandidatesFetching());
    dispatch(showModal('candidates', 'fetching', { info: 'Loading...' }));
    fetch(`${url}/Candidates/${id}`, {
      method: 'DELETE'
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          dispatch(deleteCandidatesFullfilled(data));
          return dispatch(updateModal('deleted'));
        }
        const data = await res.json();
        dispatch(deleteCandidatesRejected(data));
      })
      .catch((err) => {
        dispatch(deleteCandidatesRejected(err));
        dispatch(showModal('candidates', 'Upsss an error has happened', err.message));
      });
  };
};

//CREATE CANDIDATE
export const createCandidates = (candidate) => {
  return (dispatch) => {
    candidate.address = { street: candidate.street, number: candidate.number };
    delete candidate.street;
    delete candidate.number;
    dispatch(createCandidatesFetching());
    dispatch(showModal('candidates', 'fetching', { info: 'Loading...' }));
    fetch(`${url}/candidates`, {
      method: 'POST',
      body: JSON.stringify(candidate),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async (res) => {
        if (res.status === 201) {
          const data = await res.json();
          dispatch(createCandidatesFullfilled(data));
          data.data.address = `${candidate.address.street} ${candidate.address.number}`;
          return dispatch(showModal('candidates', 'create', data.data));
        }
        const data = await res.json();
        dispatch(createCandidatesRejected(data));
        dispatch(showModal('candidates', 'error', data.msg));
      })
      .catch((err) => {
        dispatch(createCandidatesRejected(err));
        dispatch(showModal('candidates', 'error', err.message));
      });
  };
};

//UPDATE CANDIDATES
export const updateCandidates = (id, candidate) => {
  return (dispatch) => {
    dispatch(updateCandidatesFetching());
    dispatch(showModal('candidates', 'fetching', { info: 'Loading...' }));
    fetch(`${url}/candidates/${id}`, {
      method: 'PUT',
      body: JSON.stringify(candidate),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          dispatch(updateCandidatesFullfilled(data));
          data.data.address = `${candidate.address.street} ${candidate.address.number}`;
          return dispatch(showModal('candidates', 'update', data.data));
        }
        const data = await res.json();
        dispatch(updateCandidatesRejected(data));
        dispatch(showModal('candidates', 'error', data.msg));
      })
      .catch((err) => {
        dispatch(updateCandidatesRejected(err));
        dispatch(showModal('candidates', 'error', err.message));
      });
  };
};
