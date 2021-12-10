import { url } from '../../constants';
import {
  getCandidatesFetching,
  getCandidatesFullfilled,
  getCandidatesRejected,
  //   getCandidateByIdFetching,
  //   getCandidateByIdFullfilled,
  //   getCandidateByIdRejected,
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
