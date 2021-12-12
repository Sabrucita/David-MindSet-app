import { url } from '../../constants';
import { showModal, updateModal } from '../modal/actions';

import {
  getInterviewFetching,
  getInterviewFulfilled,
  getInterviewRejected,
  getInterviewsFetching,
  getInterviewsFulfilled,
  getInterviewsRejected,
  deleteInterviewFetching,
  deleteInterviewFulfilled,
  deleteInterviewRejected,
  createInterviewFetching,
  createInterviewFulfilled,
  createInterviewRejected,
  updateInterviewFetching,
  updateInterviewFulfilled,
  updateInterviewRejected,
  getInterviewsOptionsFetching,
  getInterviewsOptionsFulfilled,
  getInterviewsOptionsRejected
} from './actions';

//GET 1 INTERVIEW
export const getInterview = (id) => {
  return (dispatch) => {
    dispatch(getInterviewFetching());
    fetch(`${url}/interviews/${id}`)
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          const currentData = {
            idCandidate: data.idCandidate?._id,
            idCompany: data.idCompany?._id,
            date: data.date,
            status: data.status
          };
          return dispatch(getInterviewFulfilled(currentData));
        }
        const data = await res.json();
        throw new Error(data.msg);
      })
      .catch((err) => {
        dispatch(getInterviewRejected());
        dispatch(showModal('interviews', 'error', err.message));
      });
  };
};

//GET ALL INTERVIEWS
export const getInterviews = () => {
  return (dispatch) => {
    dispatch(getInterviewsFetching());
    fetch(`${url}/interviews`)
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          return dispatch(getInterviewsFulfilled(data));
        }
        const data = await res.json();
        throw new Error(data.msg);
      })
      .catch((err) => {
        dispatch(getInterviewsRejected());
        dispatch(showModal('interviews', 'error', err.message));
      });
  };
};

//DELETE INTERVIEW
export const deleteInterview = (id) => {
  return (dispatch) => {
    dispatch(deleteInterviewFetching());
    dispatch(updateModal('fetching', { info: 'Loading...' }));
    fetch(`${url}/interviews/${id}`, {
      method: 'DELETE'
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          dispatch(deleteInterviewFulfilled(data));
          data.data.idCompany = data.data.idCompany._id;
          data.data.idCandidate = data.data.idCandidate._id;
          return dispatch(updateModal('deleted', data.data));
        }
        const data = await res.json();
        throw new Error(data.msg);
      })
      .catch((err) => {
        dispatch(deleteInterviewRejected());
        dispatch(updateModal('error', err.message));
      });
  };
};

//CREATE INTERVIEW
export const createInterview = (obj) => {
  return (dispatch) => {
    obj.status = true;
    dispatch(createInterviewFetching());
    dispatch(showModal('interviews', 'fetching', { info: 'Loading...' }));
    fetch(`${url}/interviews`, {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          dispatch(createInterviewFulfilled(data));
          return dispatch(updateModal('create', data.data));
        }
        const data = await res.json();
        throw new Error(data.msg);
      })
      .catch((err) => {
        dispatch(createInterviewRejected());
        dispatch(updateModal('error', err.message));
      });
  };
};

//UPDATE INTERVIEW
export const updateInterview = (id, obj) => {
  return (dispatch) => {
    dispatch(updateInterviewFetching());
    dispatch(showModal('interviews', 'fetching', { info: 'Loading...' }));
    fetch(`${url}/interviews/${id}`, {
      method: 'PUT',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          dispatch(updateInterviewFulfilled(data));
          data.data.idCompany = data.data.idCompany._id;
          data.data.idCandidate = data.data.idCandidate._id;
          return dispatch(updateModal('update', data.data));
        }
        const data = await res.json();
        throw new Error(data.msg);
      })
      .catch((err) => {
        dispatch(updateInterviewRejected());
        dispatch(updateModal('error', err.message));
      });
  };
};

//GET OPTIONS
export const getInterviewsOptions = (resource) => {
  return (dispatch) => {
    dispatch(getInterviewsOptionsFetching());
    fetch(`${url}/${resource}`)
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          return dispatch(getInterviewsOptionsFulfilled(resource, data));
        }
        const data = await res.json();
        throw new Error(data.msg);
      })
      .catch((err) => {
        dispatch(getInterviewsOptionsRejected());
        dispatch(showModal('interviews', 'error', err.message));
      });
  };
};
