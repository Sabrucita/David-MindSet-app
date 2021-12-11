import { url } from '../../constants';
import {
  getCandidatesFetching,
  getCandidatesFullfilled,
  getCandidatesRejected,
  getCandidateByIdFetching,
  getCandidateByIdFullfilled,
  getCandidateByIdRejected,
  //   createCandidatesFetching,
  //   createCandidatesFullfilled,
  //   createCandidatesRejected,
  //   updateCandidatesFetching,
  //   updateCandidatesFullfilled,
  //   updateCandidatesRejected,
  deleteCandidatesFetching,
  deleteCandidatesFullfilled,
  deleteCandidatesRejected
} from './actions';

//GET ALL THE CANDIDATES
export const getCandidates = () => {
  return (dispatch) => {
    dispatch(getCandidatesFetching());
    fetch(`${url}/candidates`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(getCandidatesFullfilled(data));
      })
      .catch((error) => {
        dispatch(getCandidatesRejected(error));
      });
  };
};

//GET A CANDIDATE BY ID
export const getCandidateById = (id) => {
  return (dispatch) => {
    dispatch(getCandidateByIdFetching());
    fetch(`${url}/candidates/${id}`)
      .then((res) => res.json())
      .then((data) => {
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
        dispatch(getCandidateByIdFullfilled(currentData));
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
    fetch(`${url}/Candidates/${id}`, {
      method: 'DELETE'
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          dispatch(deleteCandidatesFullfilled(data));
        } else {
          throw new Error(`HTTP ${res.status}`);
        }
      })
      .catch((err) => {
        dispatch(deleteCandidatesRejected(err));
      });
  };
};
