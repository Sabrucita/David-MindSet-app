import { url } from 'constants/index';
import { hideModal, showModal, updateModal } from 'redux/modal/actions';
import {
  getCandidateByIdFetching,
  getCandidateByIdFullfilled,
  getCandidateByIdRejected,
  updateCandidatesFetching,
  updateCandidatesFullfilled,
  updateCandidatesRejected
} from './actions';

//delete other education
export const deleteOtherEducation = (idCandidate, candidate, idEducation) => {
  return (dispatch) => {
    dispatch(showModal('Other Educations', 'fetching', { info: 'Loading...' }));
    candidate.courses = candidate.courses.filter((element) => element._id !== idEducation);

    fetch(`${url}/candidate/profile/${idCandidate}`, {
      method: 'PUT',
      body: JSON.stringify(candidate),
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage.getItem('token')
      }
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          dispatch(updateCandidatesFullfilled(data));
          return dispatch(updateModal('deleted'));
        }
        const data = await res.json();
        dispatch(updateCandidatesRejected(data));
        dispatch(showModal('Other Educations', 'error', data.msg));
      })
      .catch((err) => {
        dispatch(updateCandidatesRejected(err));
        dispatch(showModal('Other Educations', 'error', err.message));
      });
  };
};
// create other education
export const createOtherEducation = (candidate, newEducation, type) => {
  return (dispatch) => {
    dispatch(showModal('Other Educations', 'fetching', { info: 'Loading...' }));
    newEducation.type = type;
    candidate.courses.push(newEducation);

    fetch(`${url}/candidate/profile/${candidate.idCandidate}`, {
      method: 'PUT',
      body: JSON.stringify(candidate),
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage.getItem('token')
      }
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          dispatch(updateCandidatesFullfilled(data));
          return dispatch(showModal('Other Educations', 'create'));
        }
        const data = await res.json();
        dispatch(updateCandidatesRejected(data));
        dispatch(showModal('Other Educations', 'error', data.msg));
      })
      .catch((err) => {
        dispatch(updateCandidatesRejected(err));
        dispatch(showModal('Other Educations', 'error', err.message));
      });
  };
};
//update other education
export const updateOtherEducation = (candidate) => {
  return (dispatch) => {
    dispatch(showModal('Other Educations', 'fetching', { info: 'Loading...' }));
    fetch(`${url}/candidate/profile/${candidate.idCandidate}`, {
      method: 'PUT',
      body: JSON.stringify(candidate),
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage.getItem('token')
      }
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          dispatch(updateCandidatesFullfilled(data));
          return dispatch(showModal('Other Educations', 'create'));
        }
        const data = await res.json();
        dispatch(updateCandidatesRejected(data));
        dispatch(showModal('Other Educations', 'error', data.msg));
      })
      .catch((err) => {
        dispatch(updateCandidatesRejected(err));
        dispatch(showModal('Other Educations', 'error', err.message));
      });
  };
};

//delete Hobbies
export const deleteHobbies = (idCandidate, candidate, idEducation) => {
  return (dispatch) => {
    dispatch(showModal('Hobbies and Skills', 'fetching', { info: 'Loading...' }));
    candidate.hobbies = candidate.hobbies.filter((element) => element._id !== idEducation);

    fetch(`${url}/candidate/profile/${idCandidate}`, {
      method: 'PUT',
      body: JSON.stringify(candidate),
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage.getItem('token')
      }
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          dispatch(updateCandidatesFullfilled(data));
          return dispatch(updateModal('deleted'));
        }
        const data = await res.json();
        dispatch(updateCandidatesRejected(data));
        dispatch(showModal('Hobbies and Skills', 'error', data.msg));
      })
      .catch((err) => {
        dispatch(updateCandidatesRejected(err));
        dispatch(showModal('Hobbies and Skills', 'error', err.message));
      });
  };
};

// create Hobbies
export const createHobbies = (candidate, newHobbie, type) => {
  return (dispatch) => {
    dispatch(showModal('Hobbies and Skills', 'fetching', { info: 'Loading...' }));
    newHobbie.type = type;
    candidate.hobbies.push(newHobbie);

    fetch(`${url}/candidate/profile/${candidate.idCandidate}`, {
      method: 'PUT',
      body: JSON.stringify(candidate),
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage.getItem('token')
      }
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          dispatch(updateCandidatesFullfilled(data));
          return dispatch(showModal('Hobbies and Skills', 'create'));
        }
        const data = await res.json();
        dispatch(updateCandidatesRejected(data));
        dispatch(showModal('Hobbies and Skills', 'error', data.msg));
      })
      .catch((err) => {
        dispatch(updateCandidatesRejected(err));
        dispatch(showModal('Hobbies and Skills', 'error', err.message));
      });
  };
};
//update Hobbies
export const updateHobbies = (candidate) => {
  return (dispatch) => {
    dispatch(showModal('Hobbies and Skills', 'fetching', { info: 'Loading...' }));
    fetch(`${url}/candidate/profile/${candidate.idCandidate}`, {
      method: 'PUT',
      body: JSON.stringify(candidate),
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage.getItem('token')
      }
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          dispatch(updateCandidatesFullfilled(data));
          return dispatch(showModal('Hobbies and Skills', 'create'));
        }
        const data = await res.json();
        dispatch(updateCandidatesRejected(data));
        dispatch(showModal('Hobbies and Skills', 'error', data.msg));
      })
      .catch((err) => {
        dispatch(updateCandidatesRejected(err));
        dispatch(showModal('Hobbies and Skills', 'error', err.message));
      });
  };
};

//delete education
export const deleteEducation = (idCandidate, candidate, idEducation) => {
  return (dispatch) => {
    dispatch(showModal('Educations', 'fetching', { info: 'Loading...' }));
    candidate.education = candidate.education.filter((element) => element._id !== idEducation);

    fetch(`${url}/candidate/profile/${idCandidate}`, {
      method: 'PUT',
      body: JSON.stringify(candidate),
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage.getItem('token')
      }
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          dispatch(updateCandidatesFullfilled(data));
          return dispatch(updateModal('deleted'));
        }
        const data = await res.json();
        dispatch(updateCandidatesRejected(data));
        dispatch(showModal('Educations', 'error', data.msg));
      })
      .catch((err) => {
        dispatch(updateCandidatesRejected(err));
        dispatch(showModal('Educations', 'error', err.message));
      });
  };
};
// create education
export const createEducation = (candidate, newEducation, type) => {
  return (dispatch) => {
    dispatch(showModal('Educations', 'fetching', { info: 'Loading...' }));
    newEducation.type = type;
    candidate.education.push(newEducation);

    fetch(`${url}/candidate/profile/${candidate.idCandidate}`, {
      method: 'PUT',
      body: JSON.stringify(candidate),
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage.getItem('token')
      }
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          dispatch(updateCandidatesFullfilled(data));
          return dispatch(showModal('Educations', 'create'));
        }
        const data = await res.json();
        dispatch(updateCandidatesRejected(data));
        dispatch(showModal('Educations', 'error', data.msg));
      })
      .catch((err) => {
        dispatch(updateCandidatesRejected(err));
        dispatch(showModal('Educations', 'error', err.message));
      });
  };
};
//update education
export const updateEducation = (candidate) => {
  return (dispatch) => {
    dispatch(showModal('Educations', 'fetching', { info: 'Loading...' }));
    fetch(`${url}/candidate/profile/${candidate.idCandidate}`, {
      method: 'PUT',
      body: JSON.stringify(candidate),
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage.getItem('token')
      }
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          dispatch(updateCandidatesFullfilled(data));
          return dispatch(showModal('Educations', 'create'));
        }
        const data = await res.json();
        dispatch(updateCandidatesRejected(data));
        dispatch(showModal('Educations', 'error', data.msg));
      })
      .catch((err) => {
        dispatch(updateCandidatesRejected(err));
        dispatch(showModal('Educations', 'error', err.message));
      });
  };
};

//GET A CANDIDATE BY ID
export const getCandidateById = (id) => {
  return (dispatch) => {
    dispatch(getCandidateByIdFetching());
    fetch(`${url}/candidate/profile/${id}`, { headers: { token: sessionStorage.getItem('token') } })
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
            birthday: data.birthday?.substr(0, 10),
            hobbies: data.hobbies,
            mainSkills: data.mainSkills,
            profileTypes: data.profileTypes,
            isOpenToWork: data.isOpenToWork,
            education: data.education,
            experiences: data.experiences,
            courses: data.courses,
            address: { street: data.address.street, number: data.address.number },
            timeRange: data.timeRange,
            hasPendingSession: data.hasPendingSession
          };
          return dispatch(getCandidateByIdFullfilled(currentData));
        }
      })
      .catch((err) => {
        dispatch(getCandidateByIdRejected(err));
      });
  };
};

//UPDATE CANDIDATES
export const updateCandidates = (id, candidate) => {
  return (dispatch) => {
    dispatch(updateCandidatesFetching());
    dispatch(showModal('candidates', 'fetching', { info: 'Loading...' }));
    fetch(`${url}/candidate/profile/${id}`, {
      method: 'PUT',
      body: JSON.stringify(candidate),
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage.getItem('token')
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

//UPDATE TIME RANGE
export const updateTimeRange = (candidate) => {
  return (dispatch) => {
    dispatch(updateCandidatesFetching());
    dispatch(showModal('candidates', 'fetching', { info: 'Loading...' }));
    fetch(`${url}/candidate/profile/${candidate.idCandidate}`, {
      method: 'PUT',
      body: JSON.stringify(candidate),
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage.getItem('token')
      }
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          dispatch(updateCandidatesFullfilled(data));
          return dispatch(showModal('Availability Time Rangess', 'update'));
        }
        const data = await res.json();
        dispatch(updateCandidatesRejected(data));
        dispatch(showModal('Availability Time Rangess', 'error', data.msg));
      })
      .catch((err) => {
        dispatch(updateCandidatesRejected(err));
        dispatch(showModal('Availability Time Rangess', 'error', err.message));
      });
  };
};

//UPDATE OPEN TO WORK
export const updateOpenToWork = (candidate) => {
  return (dispatch) => {
    fetch(`${url}/candidate/profile/${candidate.idCandidate}`, {
      method: 'PUT',
      body: JSON.stringify(candidate),
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage.getItem('token')
      }
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          dispatch(hideModal());
          return dispatch(updateCandidatesFullfilled(data));
        }
        const data = await res.json();
        dispatch(updateCandidatesRejected(data));
        dispatch(showModal('Availabilitys', 'error', data.msg));
      })
      .catch((err) => {
        dispatch(updateCandidatesRejected(err));
        dispatch(showModal('Availabilitys', 'error', err.message));
      });
  };
};
